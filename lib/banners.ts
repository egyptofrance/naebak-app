import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const supabase = createClientComponentClient();

interface Banner {
  id: string;
  image_path: string;
  is_default: boolean;
  page_type: string;
  governorate_id: string | null;
  is_active: boolean;
}

interface BannerPublicUrl {
  publicUrl: string;
}

// Cache for banner URLs to reduce Supabase calls
const bannerCache = new Map<string, { url: string; timestamp: number }>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Get banner for a specific page type and governorate
 * @param pageType - The type of page (landing, candidates, mps, complaints)
 * @param governorateId - Optional governorate ID for location-specific banners
 * @returns Promise<BannerPublicUrl | null>
 */
export async function getBanner(
  pageType: string, 
  governorateId: string | null = null
): Promise<BannerPublicUrl | null> {
  // Create cache key
  const cacheKey = `${pageType}-${governorateId || 'null'}`;
  
  // Check cache first
  const cached = bannerCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return { publicUrl: cached.url };
  }

  try {
    let query = supabase
      .from('banners_public')
      .select('id, image_path, is_default, page_type, governorate_id, is_active')
      .eq('page_type', pageType)
      .eq('is_active', true);

    // Handle governorate-specific or general banners
    if (governorateId) {
      // First try to get governorate-specific banner, then fall back to general
      query = query.or(`governorate_id.eq.${governorateId},governorate_id.is.null`);
    } else {
      // Only get general banners (no specific governorate)
      query = query.is('governorate_id', null);
    }

    const { data: banners, error } = await query
      .order('governorate_id', { ascending: false, nullsFirst: false }) // Prioritize specific over general
      .order('is_default', { ascending: true }) // Prioritize custom over default
      .limit(1);

    if (error && error.code !== 'PGRST116') { // PGRST116 means no rows found
      console.error('Error fetching banner:', error);
      return await getDefaultBanner();
    }

    if (banners && banners.length > 0) {
      const banner = banners[0];
      const publicUrl = await getBannerPublicUrl(banner.image_path);
      
      if (publicUrl) {
        // Cache the result
        bannerCache.set(cacheKey, { url: publicUrl, timestamp: Date.now() });
        return { publicUrl };
      }
    }

    // Fallback to default banner if no specific banner is found
    return await getDefaultBanner();
  } catch (error) {
    console.error('Unexpected error fetching banner:', error);
    return await getDefaultBanner();
  }
}

/**
 * Get the default banner
 * @returns Promise<BannerPublicUrl | null>
 */
export async function getDefaultBanner(): Promise<BannerPublicUrl | null> {
  const cacheKey = 'default-banner';
  
  // Check cache first
  const cached = bannerCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return { publicUrl: cached.url };
  }

  try {
    const { data: defaultBanner, error } = await supabase
      .from('banners_public')
      .select('id, image_path, is_default')
      .eq('is_default', true)
      .eq('is_active', true)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching default banner:', error);
      return null;
    }

    if (defaultBanner) {
      const publicUrl = await getBannerPublicUrl(defaultBanner.image_path);
      
      if (publicUrl) {
        // Cache the result
        bannerCache.set(cacheKey, { url: publicUrl, timestamp: Date.now() });
        return { publicUrl };
      }
    }

    return null;
  } catch (error) {
    console.error('Unexpected error fetching default banner:', error);
    return null;
  }
}

/**
 * Get public URL for a banner image from Supabase Storage
 * @param imagePath - Path to the image in storage
 * @returns Promise<string | null>
 */
async function getBannerPublicUrl(imagePath: string): Promise<string | null> {
  try {
    const { data: publicUrlData } = supabase.storage
      .from('banners')
      .getPublicUrl(imagePath);
    
    if (publicUrlData?.publicUrl) {
      // Verify the image exists by making a HEAD request
      try {
        const response = await fetch(publicUrlData.publicUrl, { method: 'HEAD' });
        if (response.ok) {
          return publicUrlData.publicUrl;
        } else {
          console.warn(`Banner image not accessible: ${imagePath}`);
          return null;
        }
      } catch (fetchError) {
        console.warn(`Error verifying banner image: ${imagePath}`, fetchError);
        // Return URL anyway, let the Image component handle the error
        return publicUrlData.publicUrl;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error getting banner public URL:', error);
    return null;
  }
}

/**
 * Clear banner cache (useful for testing or when banners are updated)
 */
export function clearBannerCache(): void {
  bannerCache.clear();
}

/**
 * Preload banner for better performance
 * @param pageType - The type of page
 * @param governorateId - Optional governorate ID
 */
export async function preloadBanner(
  pageType: string, 
  governorateId: string | null = null
): Promise<void> {
  try {
    await getBanner(pageType, governorateId);
  } catch (error) {
    console.warn('Error preloading banner:', error);
  }
}
