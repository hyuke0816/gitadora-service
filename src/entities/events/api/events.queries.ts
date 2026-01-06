import { useQuery } from "@tanstack/react-query";
import { getAllEvents, getEventById } from "./events.service";

export const eventKeys = {
  all: ["events"] as const,
  detail: (id: number) => ["events", id] as const,
};

export const useEvents = () =>
  useQuery({
    queryKey: eventKeys.all,
    queryFn: getAllEvents,
  });

export const useEvent = (id: number) =>
  useQuery({
    queryKey: eventKeys.detail(id),
    queryFn: () => getEventById(id),
    enabled: !!id && !isNaN(id),
  });
