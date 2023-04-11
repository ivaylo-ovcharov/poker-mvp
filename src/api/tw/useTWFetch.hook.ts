import { useFetch, UseFetchOptions } from "@vueuse/core";
import { Ref, computed } from "vue";
import { useCurrentRoom } from "../../modules/room/room.service";

const twUsername = "twp_Vi7ntXKi2MukGShR22eFTj9L183A_eu";
const twPassword = "randowm";
const twDomain = "https://ivayloscompany1.eu.teamwork.com";

export const useTWGet = <T>(
  url: Ref<string>,
  useFetchOptions: UseFetchOptions = {},
) => {
  console.log("Helooo");
  return useTWFetch<T>(url, useFetchOptions).get();
};

export const useTWPatch = <T>(
  url: Ref<string>,
  payload: T,
  useFetchOptions: UseFetchOptions = {},
) => {
  console.log("Helooo");

  return useTWFetch<T>(url, useFetchOptions).patch(payload);
};

export const useTWFetch = <T>(
  url: Ref<string>,
  useFetchOptions: UseFetchOptions = {},
) => {
  const currentRoom = useCurrentRoom();
  console.log({ room: currentRoom.ref.value?.installation.domain });

  const domaining = currentRoom.ref.value?.installation.domain;
  const keying = currentRoom.ref.value?.installation.key;

  console.log("helloo");
  const domainUrl = computed(() => domaining + url.value);
  return useFetch<T>(domainUrl, {
    ...useFetchOptions,
    beforeFetch: ({ options }) => {
      const twToken = btoa(
        "twp_e8t4n1egDdS7HrRU1CisJQfPvYyR" + ":" + twPassword,
      );

      options.headers = {
        ...options.headers,
        Authorization: `Basic ${twToken}`,
      };

      return {
        options,
      };
    },
  }).json();
};
