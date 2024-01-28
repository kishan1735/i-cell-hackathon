import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/userModel";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session }) {
      return {
        ...session,
        user: {
          name: session.user?.name ?? "",
          email: session.user?.email ?? "",
          image: session.user?.image ?? "",
        },
      };
    },
    async signIn({ profile }) {
      try {
        await dbConnect();
        const user = await User.findOne({ email: profile?.email });

        try {
          if (!user) {
            await User.create({
              email: profile?.email,
              name: profile?.name,
              id: profile?.email?.split("@")[0],
            });
          }
        } catch (err) {
          console.log(err);
        }

        return true;
      } catch (err) {
        return false;
      }
    },
  },
};
