import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTag, updateTag, deleteTag, Tag } from "./tags.service";
import { tagsKeys } from "./tags.queries";

export const useCreateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      key,
      name,
      color,
    }: {
      key: string;
      name: string;
      color?: string;
    }) => createTag(key, name, color),
    onSuccess: () => {
      // invalidate만 하고 refetch는 하지 않음 (자동 조회 방지)
      queryClient.invalidateQueries({
        queryKey: tagsKeys.all,
        refetchType: "none",
      });
    },
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      key,
      name,
      color,
    }: {
      id: number;
      key: string;
      name: string;
      color?: string;
    }) => updateTag(id, key, name, color),
    onSuccess: () => {
      // invalidate만 하고 refetch는 하지 않음 (자동 조회 방지)
      queryClient.invalidateQueries({
        queryKey: tagsKeys.all,
        refetchType: "none",
      });
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteTag(id),
    onSuccess: () => {
      // invalidate만 하고 refetch는 하지 않음 (자동 조회 방지)
      queryClient.invalidateQueries({
        queryKey: tagsKeys.all,
        refetchType: "none",
      });
    },
  });
};
