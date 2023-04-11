import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
  RouteRecordRaw,
} from "vue-router";
import Home from "../modules/home/Home.vue";
import Room from "../modules/room/Room.vue";
import { Room as RoomType } from "../modules/room/room.type";
import { ref as dbRef, set,get, query, child } from "firebase/database";
import { db } from "../firebase";

const routes: RouteRecordRaw[] = [
  { path: "/", component: Home },
  {
    path: "/:roomID",
    component: Room,
    beforeEnter: async (to, from) => {
      const id = typeof to.params.roomID === "string" ? to.params.roomID : "-1";

      const roomSnapshot = await get(child(dbRef(db), `rooms/${id}`))
      
      if(roomSnapshot.exists()){
        return true
      }

      const emptyRoom: RoomType = {
        id,
        cardsRevealed: false,
        focusedTaskID: null,
        tasks: [],
        voters: {},
      };

      await set(dbRef(db, `rooms/${id}`), emptyRoom);
      return true
    },
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});
