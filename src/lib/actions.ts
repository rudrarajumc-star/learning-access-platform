"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ACCESS_CODE, SESSION_COOKIE, SESSION_VALUE } from "./auth";

export async function signIn(formData: FormData) {
  const code = String(formData.get("code") || "").trim();
  const from = String(formData.get("from") || "/dashboard");

  if (code !== ACCESS_CODE) {
    redirect(`/login?error=1${from ? `&from=${encodeURIComponent(from)}` : ""}`);
  }

  const jar = await cookies();
  jar.set(SESSION_COOKIE, SESSION_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  redirect(from.startsWith("/") ? from : "/dashboard");
}

export async function signOut() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/login");
}
