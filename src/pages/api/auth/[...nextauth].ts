import NextAuth from "next-auth";
import { FaunaAdapter } from "@next-auth/fauna-adapter";
import EmailProvider from "next-auth/providers/email";
import { fauna } from "../../../services/fauna";

export const authOptions = {
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      maxAge: 1 * 60 * 60,
    }),
  ],
  adapter: FaunaAdapter(fauna),
  pages: {
    signIn: "/home",
    signOut: "/",
  },
};
export default NextAuth(authOptions);
