
// This is a mock implementation of the supabase client
// It's used for development purposes only

const mockSupabase = {
  auth: {
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    getUser: () => Promise.resolve({ data: { user: null }, error: null }),
    signUp: () => Promise.resolve({ data: { user: null }, error: null }),
    signIn: () => Promise.resolve({ data: { session: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
    onAuthStateChange: () => ({ 
      data: { subscription: { unsubscribe: () => {} } },
      error: null 
    }),
    updateUser: () => Promise.resolve({ data: { user: null }, error: null }),
    resetPasswordForEmail: () => Promise.resolve({ data: {}, error: null }),
    resend: () => Promise.resolve({ data: {}, error: null }),
  },
  from: (table: string) => ({
    select: (query?: string) => ({
      eq: (_column: string, _value: any) => ({
        single: () => Promise.resolve({ data: null, error: null }),
        order: (_column: string, { ascending }: { ascending: boolean }) => 
          Promise.resolve({ data: [], error: null }),
      }),
      order: (_column: string, { ascending }: { ascending: boolean }) => ({
        eq: (_column: string, _value: any) => 
          Promise.resolve({ data: [], error: null }),
      }),
      eq: (_column: string, _value: any) => 
        Promise.resolve({ data: [], error: null }),
    }),
    insert: (data: any) => ({
      select: () => ({
        single: () => Promise.resolve({ data, error: null }),
      }),
    }),
    update: (data: any) => ({
      eq: (_column: string, _value: any) => 
        Promise.resolve({ data, error: null }),
    }),
    delete: () => ({
      eq: (_column: string, _value: any) => 
        Promise.resolve({ data: null, error: null }),
    })
  }),
  storage: {
    from: (bucket: string) => ({
      upload: (_path: string, _file: File) => 
        Promise.resolve({ data: { path: "" }, error: null }),
      getPublicUrl: (_path: string) => ({ data: { publicUrl: "" } }),
    }),
  },
  rpc: (functionName: string, params: any) => 
    Promise.resolve({ data: [], error: null }),
};

export const supabase = mockSupabase;
