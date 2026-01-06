import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvent, updateEvent, deleteEvent } from "./events.service";
import { eventKeys } from "./events.queries";

export const useCreateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      // invalidate만 하고 refetch는 하지 않음 (자동 조회 방지)
      queryClient.invalidateQueries({
        queryKey: eventKeys.all,
        refetchType: "none",
      });
    },
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateEvent,
    onSuccess: (data) => {
      // invalidate만 하고 refetch는 하지 않음 (자동 조회 방지)
      queryClient.invalidateQueries({
        queryKey: eventKeys.all,
        refetchType: "none",
      });
      queryClient.invalidateQueries({
        queryKey: eventKeys.detail(data.id),
        refetchType: "none",
      });
    },
  });
};

export const useDeleteEvent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      // invalidate만 하고 refetch는 하지 않음 (자동 조회 방지)
      queryClient.invalidateQueries({
        queryKey: eventKeys.all,
        refetchType: "none",
      });
    },
  });
};
