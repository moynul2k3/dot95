"use server"; // ✅ Required for Server Actions
import { cookies } from "next/headers";

// ✅ Get a cookie (Server-side only)
export const getCookie = async (name: string): Promise<string | undefined> => {
    const cookieStore = await cookies();
    return cookieStore.get(name)?.value;
};

// ✅ Set a cookie (Server-side only)
export const setCookie = async (
  name: string,
  value: string,
  options?: { days?: number; hours?: number; minutes?: number; seconds?: number; httpOnly?:boolean }
) => {
  const { days = 0, hours = 0, minutes = 0, seconds = 0, httpOnly = false } = options || {};
  
  const expires = new Date(
    Date.now() + 
    days * 24 * 60 * 60 * 1000 + 
    hours * 60 * 60 * 1000 + 
    minutes * 60 * 1000 + 
    seconds * 1000
  );

  const cookieStore = await cookies();
  cookieStore.set(name, value, {
    path: "/",
    expires,
    httpOnly: httpOnly,
    secure: process.env.NODE_ENV === "production",
  });
};
