// Supabase types removed - empty file to prevent build errors
export type Database = {
  public: {
    Tables: {}
    Views: {}
    Functions: {}
    Enums: {}
  }
}

export type Tables<T extends keyof Database['public']['Tables']> = any
export type TablesInsert<T extends keyof Database['public']['Tables']> = any
