
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://takohktcxmvhljpidyex.supabase.co';
// In a real app, this is in .env
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRha29oa3RjeG12aGxqcGlkeWV4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTEyMzQ1Njd9.example_key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper for image upload
export const uploadAdImage = async (file: File, userId: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}-${Math.random()}.${fileExt}`;
  const filePath = `ad-images/${fileName}`;

  const { data, error } = await supabase.storage
    .from('marketplace')
    .upload(filePath, file);

  if (error) throw error;
  
  const { data: { publicUrl } } = supabase.storage
    .from('marketplace')
    .getPublicUrl(filePath);

  return publicUrl;
};
