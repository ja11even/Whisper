import { supabase } from "./Supabase";

export async function fetchWhispers(userId) {
  const { data: circleMembers } = await supabase
    .from("Circle")
    .select("invited_user_id")
    .eq("inviter_user_id", userId);

  const membersIds = [
    userId,
    ...circleMembers.map((m) => m.invited_user_id).filter(Boolean),
  ];

  const { data, error } = await supabase
    .from("Whispers")
    .select("*")
    .in("user_id", membersIds)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data;
}

export async function addWhisper(whisper) {
  const { data, error } = await supabase
    .from("Whispers")
    .insert([whisper])
    .select();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateWhisper(id, updates) {
  const { data, error } = await supabase
    .from("Whispers")
    .update(updates)
    .eq("id", id)
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteWhisper(id) {
  const { error } = await supabase.from("Whispers").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
