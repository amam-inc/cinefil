import { env } from "@/env";
import { SupabaseAdapter } from "@auth/supabase-adapter";
import NextAuth from "next-auth";
import Github from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: SupabaseAdapter({
    url: env.SUPABASE_URL,
    secret: env.SUPABASE_ANON_KEY,
  }),
  providers: [Github],
  debug: true
});
