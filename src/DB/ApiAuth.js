import supabase, { supabaseUrl } from "./Supabase";

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  } else {
    return data;
  }
}

export async function GetCurrentuser() {
  const { data: session, error } = await supabase.auth.getSession();
  if (!session.session) {
    return null;
  }
  if (error) {
    throw new Error(error.message);
  }
  return session.session?.user;
}

export async function signup({ name, email, password, profile_pic }) {
  const filename = `dp ${name.split(" ").join("-")}-${Math.random()}`;

  const { error: storageerror } = await supabase.storage
    .from("profile_pic")
    .upload(filename, profile_pic);

  if (storageerror) {
    throw new Error(storageerror.message);
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_pic: `${supabaseUrl}/storage/v1/object/public/profile_pic/${filename}`,
      },
    },
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(error.message);
  }
}
