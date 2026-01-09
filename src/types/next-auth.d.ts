import NextAuth, { DefaultSession } from "next-auth"
import { UserRole, InstrumentType } from "@prisma/client"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: UserRole
      gameProfileId?: number | null
      nickname?: string | null
      bio?: string | null
      isOnboarded: boolean
      preferredInstrument: InstrumentType
    } & DefaultSession["user"]
  }

  interface User {
    role: UserRole
    nickname?: string | null
    bio?: string | null
    isOnboarded: boolean
    preferredInstrument: InstrumentType
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole
    gameProfileId?: number | null
    nickname?: string | null
    bio?: string | null
    isOnboarded: boolean
    preferredInstrument: InstrumentType
  }
}
