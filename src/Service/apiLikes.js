import { supabase } from "./Supabase";

export async function fetchLikes(whisperId, userId) {
  const { data, error } = await supabase
    .from("Likes")
    .select("*")
    .eq("whisper_id", whisperId);
  if (error) throw new Error(error.message);

  const count = data.length;
  const liked = data.some((like) => like.user_id === userId);
  return { count, liked };
}

export async function addLike(whisperId, userId) {
  const { error } = await supabase
    .from("Likes")
    .insert([{ whisper_id: whisperId, user_id: userId }]);
  if (error) throw new Error(error.message);
}

export async function removeLike(whisperId, userId) {
  const { error } = await supabase
    .from("Likes")
    .delete()
    .eq("whisper_id", whisperId)
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
}
