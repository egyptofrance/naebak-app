-- Setup test data for naebak authentication system testing

-- Insert roles if they don't exist
INSERT INTO roles (id, name, display_name, description) VALUES 
(1, 'admin', 'مدير النظام', 'مدير عام للنظام'),
(2, 'manager', 'مدير', 'مدير المحتوى'),
(3, 'citizen', 'مواطن', 'مواطن عادي'),
(4, 'candidate', 'مرشح', 'مرشح للانتخابات'),
(5, 'mp', 'نائب حالي', 'عضو مجلس النواب أو الشيوخ')
ON CONFLICT (id) DO UPDATE SET 
  display_name = EXCLUDED.display_name,
  description = EXCLUDED.description;

-- Insert governorates if they don't exist
INSERT INTO governorates (id, name) VALUES 
(1, 'القاهرة'),
(2, 'الجيزة'),
(3, 'الإسكندرية'),
(4, 'الدقهلية'),
(5, 'الشرقية'),
(6, 'القليوبية'),
(7, 'كفر الشيخ'),
(8, 'الغربية'),
(9, 'المنوفية'),
(10, 'البحيرة'),
(11, 'الإسماعيلية'),
(12, 'السويس'),
(13, 'بورسعيد'),
(14, 'شمال سيناء'),
(15, 'جنوب سيناء'),
(16, 'الفيوم'),
(17, 'بني سويف'),
(18, 'المنيا'),
(19, 'أسيوط'),
(20, 'سوهاج'),
(21, 'قنا'),
(22, 'الأقصر'),
(23, 'أسوان'),
(24, 'البحر الأحمر'),
(25, 'الوادي الجديد'),
(26, 'مطروح'),
(27, 'شمال سيناء')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Insert councils if they don't exist
INSERT INTO councils (id, name) VALUES 
(1, 'مجلس النواب'),
(2, 'مجلس الشيوخ')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Insert parties if they don't exist
INSERT INTO parties (id, name) VALUES 
(1, 'مستقل'),
(2, 'حزب المؤتمر'),
(3, 'حزب الوفد'),
(4, 'حزب النور'),
(5, 'الحزب المصري الديمقراطي الاجتماعي'),
(6, 'حزب المصريين الأحرار'),
(7, 'حزب مستقبل وطن'),
(8, 'حزب الشعب الجمهوري')
ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name;

-- Create test user profiles (these will be created through the registration process)
-- Note: The actual user accounts will be created via Supabase Auth during registration testing
