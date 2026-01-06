import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

// 간단한 비밀번호 해시
function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function main() {
  console.log("Seeding database...");

  // 기존 데이터 삭제 (선택사항)
  await prisma.tb_auth_users.deleteMany({});

  // 관리자 계정 생성
  const admin = await prisma.tb_auth_users.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hashPassword("admin"),
      role: "ADMIN",
      name: "관리자",
    },
  });
  console.log("Created admin user:", admin);

  // 기존 tb_users에 user 1, 2 생성 (북마크릿에서 사용)
  const gameUser1 = await prisma.tb_users.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "User 1",
    },
  });
  console.log("Created game user 1:", gameUser1);

  // user/user 로그인 계정에 매핑되는 tb_users id 2 생성
  const gameUser2 = await prisma.tb_users.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "User",
    },
  });
  console.log("Created game user 2:", gameUser2);

  // 일반 사용자 계정 생성 (gameUserId를 DB에서 조회한 값으로 설정)
  const user = await prisma.tb_auth_users.upsert({
    where: { username: "user" },
    update: {
      gameUserId: gameUser2.id, // DB에서 조회한 tb_users id 사용
    },
    create: {
      username: "user",
      password: hashPassword("user"),
      role: "USER",
      name: "사용자",
      gameUserId: gameUser2.id, // DB에서 조회한 tb_users id 사용
    },
  });
  console.log("Created user:", user);

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
