import { EntityManager } from "../../utils/api";
import { Task } from "../task/task.type";
import { User, Installation } from "../user/user.type";

export type Room = {
  id: string;

  // Is the admin included?
  voters?: Record<User, User>;
  installation?: Installation;

  tasks?: ReadonlyArray<Task>;
  focusedTaskID?: Task["id"] | null;
  cardsRevealed: boolean;
};

export type RoomManager = EntityManager<Room>;
