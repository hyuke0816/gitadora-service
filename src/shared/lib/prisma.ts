// lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // log: ['query'], // 쿼리 로그 보고 싶으면 주석 해제
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;