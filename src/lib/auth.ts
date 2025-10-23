import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: "patient" | "doctor" | "lab" | "admin";
      avatar?: string;
    };
  }

  interface User {
    id: string;
    email: string;
    name: string;
    role: "patient" | "doctor" | "lab" | "admin";
    avatar?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: "patient" | "doctor" | "lab" | "admin";
  }
}

// Mock user database - in production, this would be replaced with actual database queries
const mockUsers = [
  {
    id: "1",
    email: "patient@wedid.com",
    password: "password123",
    name: "John Patient",
    role: "patient" as const,
    avatar: "/api/placeholder/150/150",
  },
  {
    id: "2",
    email: "doctor@wedid.com",
    password: "password123",
    name: "Dr. Sarah Johnson",
    role: "doctor" as const,
    avatar: "/api/placeholder/150/150",
  },
  {
    id: "3",
    email: "lab@wedid.com",
    password: "password123",
    name: "Lab Technician",
    role: "lab" as const,
    avatar: "/api/placeholder/150/150",
  },
  {
    id: "4",
    email: "admin@wedid.com",
    password: "password123",
    name: "Admin User",
    role: "admin" as const,
    avatar: "/api/placeholder/150/150",
  },
];

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Authorize called with:", credentials);

        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        // In production, you would hash passwords and query your database
        const user = mockUsers.find(
          (u) =>
            u.email === credentials.email && u.password === credentials.password
        );

        console.log("Found user:", user);

        if (!user) {
          console.log("User not found");
          return null;
        }

        const returnUser = {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          avatar: user.avatar,
        };

        console.log("Returning user:", returnUser);
        return returnUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT callback - token:", token, "user:", user);
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session callback - session:", session, "token:", token);
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
  debug: true,
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here",
};
