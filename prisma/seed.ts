import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  const version = await prisma.tb_gitadora_versions.create({
    data: {
      name: "GITADORA GALAXY WAVE DELTA",
      startedAt: new Date(), // 시작일은 현재 시간으로 설정 (필요시 수정)
    },
  });

  console.log(`Created version: ${version.name}`);
  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
