import { supabase } from "./Supabase";

export async function fetchCircle(userId) {
  const { data, error } = await supabase
    .from("Circle")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function addCircle(friend) {
  const { data, error } = await supabase
    .from("Circle")
    .insert([friend])
    .select();
  if (error) throw new Error(error.message);
  return data;
}

export async function deleteCircle(id) {
  const { error } = await supabase.from("Circle").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
