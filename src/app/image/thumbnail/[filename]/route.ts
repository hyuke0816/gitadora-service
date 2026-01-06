import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // 배포 환경(production)이면 /home/bitnami/image 사용
  // 개발 환경(development)이면 프로젝트 내부 public/image/thumbnail 사용
  const baseDir =
    process.env.NODE_ENV === "production"
      ? "/home/bitnami/image/thumbnail"
      : path.join(process.cwd(), "public/image/thumbnail");

  // 보안: 파일명에 상위 경로 이동(..)이 포함되어 있는지 체크
  const safeFilename = path.basename(filename);
  const filePath = path.join(baseDir, safeFilename);

  if (!fs.existsSync(filePath)) {
    return new NextResponse("File not found", { status: 404 });
  }

  try {
    const fileBuffer = fs.readFileSync(filePath);

    // 확장자에 따른 Content-Type 설정
    const ext = path.extname(filePath).toLowerCase();
    let contentType = "application/octet-stream";
    if (ext === ".jpg" || ext === ".jpeg") contentType = "image/jpeg";
    else if (ext === ".png") contentType = "image/png";
    else if (ext === ".gif") contentType = "image/gif";
    else if (ext === ".webp") contentType = "image/webp";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        // 브라우저 캐시 설정 (1년)
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving image:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
