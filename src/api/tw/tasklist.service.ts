import { useTWGet } from "./useTWFetch.hook";
import { ref } from "vue";
import { UseFetchReturn } from "@vueuse/core";
import { useCurrentRoom } from "../../modules/room/room.service";

export type TWTasklist = {
  id: number;
  name: string;
};

export const useTWTasklistFetch = (
  projectId: number,
): UseFetchReturn<TWTasklist[]> => {
  const currentRoom = useCurrentRoom();
  const url = `/projects/${currentRoom.ref.value?.installation.projectId}/tasklists.json`;

  return useTWGet(ref(url), {
    afterFetch: ctx => {
      ctx.data = ctx.data.tasklists as TWTasklist[];
      return ctx;
    },
  });
};
