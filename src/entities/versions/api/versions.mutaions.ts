import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createVersions,
  updateVersions,
  deleteVersions,
} from "./versions.service";
import { versionsKeys } from "./versions.queries";

export const useCreateVersions = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: createVersions,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: versionsKeys.all() });
    },
  });
};

export const useUpdateVersions = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: updateVersions,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: versionsKeys.all() });
    },
  });
};

export const useDeleteVersions = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: deleteVersions,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: versionsKeys.all() });
    },
  });
};
