import { Task } from "../modules/task/task.type";
import { RoomManager } from "../modules/room/room.type";

export const importTasksToFb = async (
  tasks: Task[],
  currentRoomManager: RoomManager,
) => {
  currentRoomManager.update({
    tasks: tasks.map(task => {
      return {
        ...task,
        estimate: task.estimate || null,
        id: task.id || 0,
      };
    }),
  });
};
