import {
  createEntity,
  roomPath,
  useEntity,
  EntityManager,
} from "../../utils/api";
import { Room } from "./room.type";
import { useRouter } from "vue-router";
import { computed, Ref, ref, watch, provide, inject, InjectionKey } from "vue";
import { User } from "../user/user.type";
import { onDisconnect, ref as dbRef, remove } from "firebase/database";
import { db } from "../../firebase";

export const localstorageNameKey = "lastLoginUsername";
export const localstorageLastLoginKey = "lastLoginTime";

const useRoom = (roomID: Ref<string>) => {
  const path = computed((): roomPath => `rooms/${roomID.value}`);
  return useEntity<Room>(path);
};

let res: Function;
const roomLoaded = new Promise(_res => (res = _res));
export type RoomManager = EntityManager<Room>;

export const useCurrentRoom = () => {
  const router = useRouter();
  const route = router.currentRoute;
  const room = useRoom(ref(String(route.value.params.roomID)));

  const unwatch = watch(room.ref, () => {
    if (room.ref.value) {
      res(room.ref.value);
      unwatch();
    }
  });

  return {
    roomLoaded,
    ...room,
  };
};

export const createRoom = createEntity<Room>("rooms");

export const useJoinRoom = () => {
  const room = useCurrentRoom();

  return async (user: User, time?: string): Promise<void> => {
    await room.roomLoaded;
    const loginAttemptTime = time ?? Date.now().toString();

    return room
      .update({
        voters: {
          ...room.ref.value!.voters,
          [user]: loginAttemptTime,
        },
      })
      .then(() => {
        localStorage.setItem(localstorageNameKey, user);
        localStorage.setItem(
          localstorageLastLoginKey,
          time ?? loginAttemptTime,
        );

        onDisconnect(
          dbRef(db, `/rooms/${room.ref.value?.id}/voters/${user}`),
        ).remove();
        window.addEventListener("beforeunload", () => {
          remove(dbRef(db, `/rooms/${room.ref.value?.id}/voters/${user}`));
        });
      });
  };
};

const userKey: InjectionKey<Ref<null | User>> = Symbol("userInjectionKey");
export const provideUser = (userRef: Ref<null | User>) =>
  provide(userKey, userRef);
export const injectUser = () => inject(userKey);
