import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "../../backend/src/utils/db";
import axios from "axios";
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
        const response = await axios.post(
          "http://localhost:8000/api/auth/signin",
          {
            credentials,
          }
        );
        if (response.status === 200) {
          return {
            ...response.data.userWithoutPassword,
            deviceId: response.data.session.deviceId,
          };
        }
        return null;
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    jwt: async ({ token, user }: any) => {
      if (user) {
        token.id = user.id;
        token.Twofactor = user.Twofactor;
        token.deviceId = user.deviceId;
      }
      return token;
    },
    session: async ({ session, token }: any) => {
      if (token.id) {
        session.user.id = token.id;
        session.user.Twofactor = token.Twofactor;
        session.user.deviceId = token.deviceId;
      }
      return session;
    },
  },
};
