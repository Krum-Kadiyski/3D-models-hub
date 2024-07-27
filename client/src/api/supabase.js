import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const uploadFile = async ({ username, file, type }) => {
  const randomUUID = globalThis.crypto.randomUUID();
  const ext = file.name.split('.').pop();
  const fileName = `${randomUUID}.${ext}`;

  const { data, error } = await supabase.storage
    .from('models')
    .upload(`${username}/${type}/${fileName}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  return { data, error };
};
