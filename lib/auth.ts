import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "./db";
export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text", placeholder: "Your Name" },
        email: { label: "Email", type: "email", placeholder: "Your Email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const hashedpassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            name: credentials.name,
          },
        });
        if (existingUser) {
          const check = await bcrypt.compare(
            credentials.password,
            existingUser.password
          );
          if (!check) return null;
          const { password, ...userWithoutPassword } = existingUser;
          return userWithoutPassword;
        }
        try {
          const user = await db.user.create({
            data: {
              name: credentials.name,
              password: hashedpassword,
              email: credentials.email,
            },
          });
          const { password, ...userWithoutPassword } = user;
          return userWithoutPassword;
        } catch (error) {
          console.log(error);
        }
        return null;
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async session({ token, session }: any) {
      session.user.id = token.id;
      return session;
    },
  },
};
