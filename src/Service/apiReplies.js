import { supabase } from "./Supabase";

export async function fetchReplies(userId, whisperId) {
  const { data: circleMembers } = await supabase
    .from("Circle")
    .select("invited_user_id")
    .eq("inviter_user_id", userId);

  const membersIds = [
    userId,
    ...circleMembers.map((m) => m.invited_user_id).filter(Boolean),
  ];

  const { data, error } = await supabase
    .from("Replies")
    .select("*")
    .eq("whisper_id", whisperId)
    .in("user_id", membersIds)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}
export async function addReplies(reply) {
  const { data, error } = await supabase
    .from("Replies")
    .insert([reply])
    .select();
  if (error) throw new Error(error.message);
  return data;
}
export async function updateReplies(id, updates) {
  const { data, error } = await supabase
    .from("Replies")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
}
export async function deleteReplies(id) {
  const { error } = await supabase.from("Replies").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
