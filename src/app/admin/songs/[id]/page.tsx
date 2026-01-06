"use client";

import { useParams } from "next/navigation";
import { SongDetail } from "@features/song-detail/ui/SongDetail";

export default function AdminSongDetail() {
  const params = useParams();
  const songId = parseInt(params.id as string);

  return <SongDetail songId={songId} isAdmin={true} backPath="/admin/songs" />;
}
