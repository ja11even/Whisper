import { supabase } from "./Supabase";

export async function signUp({ email, password, userName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        userName,
        avatar_url: "",
      },
    },
  });
  if (data?.user) {
    await supabase
      .from("Circle")
      .update({ invited_user_id: data.user.id })
      .eq("invited_email", data.user.email);
  }
  if (error) throw new Error(error.message);
  return data;
}

export async function logIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw new Error(error.message);
  if (data?.user) {
    await supabase
      .from("Circle")
      .update({ invited_user_id: data.user.id })
      .eq("invited_email", data.user.email);
  }
  return data;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data.user;
}
