// Mock data service for testing when Supabase is not available

export const mockRoles = [
  { id: 1, name: 'admin', display_name: 'مدير النظام' },
  { id: 2, name: 'manager', display_name: 'مدير' },
  { id: 3, name: 'citizen', display_name: 'مواطن' },
  { id: 4, name: 'candidate', display_name: 'مرشح' },
  { id: 5, name: 'mp', display_name: 'نائب حالي' }
];

export const mockGovernorates = [
  { id: 1, name: 'القاهرة' },
  { id: 2, name: 'الجيزة' },
  { id: 3, name: 'الإسكندرية' },
  { id: 4, name: 'الدقهلية' },
  { id: 5, name: 'الشرقية' },
  { id: 6, name: 'القليوبية' },
  { id: 7, name: 'كفر الشيخ' },
  { id: 8, name: 'الغربية' },
  { id: 9, name: 'المنوفية' },
  { id: 10, name: 'البحيرة' }
];

export const mockCouncils = [
  { id: 1, name: 'مجلس النواب' },
  { id: 2, name: 'مجلس الشيوخ' }
];

export const mockParties = [
  { id: 1, name: 'مستقل' },
  { id: 2, name: 'حزب المؤتمر' },
  { id: 3, name: 'حزب الوفد' },
  { id: 4, name: 'حزب النور' },
  { id: 5, name: 'الحزب المصري الديمقراطي الاجتماعي' },
  { id: 6, name: 'حزب المصريين الأحرار' },
  { id: 7, name: 'حزب مستقبل وطن' },
  { id: 8, name: 'حزب الشعب الجمهوري' }
];

// Mock Supabase client for testing
export const mockSupabaseClient = {
  from: (table: string) => ({
    select: (columns: string) => ({
      order: (column: string) => ({
        then: (callback: (result: any) => void) => {
          let data: any[] = [];
          let error = null;
          
          switch (table) {
            case 'roles':
              data = mockRoles.filter(role => ['citizen', 'candidate', 'mp'].includes(role.name));
              break;
            case 'governorates':
              data = mockGovernorates;
              break;
            case 'councils':
              data = mockCouncils;
              break;
            case 'parties':
              data = mockParties;
              break;
            default:
              data = [];
          }
          
          callback({ data, error });
          return Promise.resolve({ data, error });
        }
      }),
      eq: (column: string, value: any) => ({
        single: () => ({
          then: (callback: (result: any) => void) => {
            let data = null;
            let error = null;
            
            switch (table) {
              case 'roles':
                data = mockRoles.find(role => role.name === value);
                break;
              default:
                error = { message: 'Table not found' };
            }
            
            callback({ data, error });
            return Promise.resolve({ data, error });
          }
        })
      }),
      in: (column: string, values: any[]) => ({
        order: (orderColumn: string) => ({
          then: (callback: (result: any) => void) => {
            let data: any[] = [];
            let error = null;
            
            switch (table) {
              case 'roles':
                data = mockRoles.filter(role => values.includes(role.name));
                break;
              default:
                data = [];
            }
            
            callback({ data, error });
            return Promise.resolve({ data, error });
          }
        })
      })
    })
  }),
  auth: {
    signUp: (credentials: any) => {
      return Promise.resolve({
        data: {
          user: {
            id: 'mock-user-id-' + Date.now(),
            email: credentials.email
          }
        },
        error: null
      });
    },
    signInWithPassword: (credentials: any) => {
      return Promise.resolve({
        data: {
          user: {
            id: 'mock-user-id',
            email: credentials.email
          }
        },
        error: null
      });
    },
    signOut: () => {
      return Promise.resolve({ error: null });
    },
    getUser: () => {
      return Promise.resolve({
        data: { user: null },
        error: null
      });
    }
  }
};

// Function to determine if we should use mock data
export const shouldUseMockData = () => {
  return process.env.NEXT_PUBLIC_SUPABASE_URL === 'https://demo.supabase.co';
};
