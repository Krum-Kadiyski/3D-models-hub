import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const uploadFile = async ({ username, file, type }) => {
  const randomUUID = globalThis.crypto.randomUUID();
  const ext = file.name.split(".").pop();
  const fileName = `${randomUUID}.${ext}`;

  const { data, error } = await supabase.storage
    .from(import.meta.env.VITE_S3_BUCKET_NAME)
    .upload(`${username}/${type}/${fileName}`, file, {
      cacheControl: "3600",
      upsert: false,
    });

  return { data, error };
};

export const deleteFiles = async (files) => {
  const filePathsToDelete = files.map((file) => {
    const [, pathFromModel] = file.url.split(
      import.meta.env.VITE_S3_BUCKET_NAME
    );

    const pathWithoutSlash = pathFromModel.slice(1);

    return pathWithoutSlash;
  });
  const { data, error } = await supabase.storage
    .from(import.meta.env.VITE_S3_BUCKET_NAME)
    .remove(filePathsToDelete);

  return { data, error };
};
