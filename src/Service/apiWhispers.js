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

  const { data: whisper, error: whisperError } = await supabase
    .from("Whispers")
    .select("*")
    .in("user_id", membersIds)
    .order("created_at", { ascending: false });
  if (whisperError) throw new Error(whisperError.message);
  if (!whisper || whisper.length === 0) return [];

  const { data: profiles, error: profilesError } = await supabase
    .from("Profiles")
    .select("*")
    .in(
      "id",
      whisper.map((w) => w.user_id)
    );

  if (profilesError) throw new Error(profilesError.message);

  const whispersProfiles = whisper.map((w) => ({
    ...w,
    profile: profiles.find((p) => p.id === w.user_id) || null,
  }));

  return whispersProfiles;
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
