"use client";

import { useParams } from "next/navigation";
import { UserSongDetail } from "@features/song-detail/ui/UserSongDetail";

export default function UserSongDetailPage() {
  const params = useParams();
  const songId = parseInt(params.id as string);

  return <UserSongDetail songId={songId} />;
}
