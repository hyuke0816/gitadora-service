import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import fs from "fs";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 배포 환경(production)이면 /home/bitnami/image 사용
    // 개발 환경(development)이면 프로젝트 내부 public/image/thumbnail 사용
    const uploadDir =
      process.env.NODE_ENV === "production"
        ? "/home/bitnami/image/thumbnail"
        : path.join(process.cwd(), "public/image/thumbnail");

    // 디렉토리가 없으면 생성
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    // 파일명 생성 (특수문자 제거 및 유니크 ID 추가)
    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(safeName);
    const nameWithoutExt = path.basename(safeName, ext);
    const filename = `${nameWithoutExt}-${uniqueSuffix}${ext}`;

    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);

    // 클라이언트가 접근할 URL 경로 반환
    // 실제 파일은 외부에 있지만, Route Handler가 이 경로를 가로채서 외부 파일을 보여줌
    const url = `/image/thumbnail/${filename}`;

    return NextResponse.json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
