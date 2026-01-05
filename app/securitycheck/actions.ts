"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function login(data: { email: string; password: string }) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.error(error.message);

    if (error.message.includes("Email not confirmed")) {
      redirect("/check-email");
    }

    redirect("/auth-error");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(data: { email: string; password: string }) {
  const supabase = await createClient();

  const { data: authData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      emailRedirectTo: `${window.location.origin}/account`,
    },
  });

  if (error) {
    console.error(error.message);
    redirect("/auth-error");
  }
  console.log("auth credentials :", authData);

  if (!authData.session) {
    redirect("/check-email");
  }
  revalidatePath("/", "layout");
  redirect("/account");
}

export async function SignOut() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error(error.message);
  }
  if (!user) throw new Error("Unauthorized");

  await supabase.auth.signOut();
}
