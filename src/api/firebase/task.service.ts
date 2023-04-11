import { RoomManager } from "../../modules/room/room.type"
import { Task } from "../../modules/task/task.type";

export const editTask = (currentRoom: RoomManager, task: Task, skipUpdatedChange: boolean = false) => {
  const roomTasks = currentRoom.ref.value!.tasks!
  const index = roomTasks.findIndex((e: any) => e.id === task.id);
  const updatedTasks = {...roomTasks};
  
  if (!skipUpdatedChange) {
    task.updated = true;
  }
  updatedTasks[index] = task;

  currentRoom.update({ tasks: updatedTasks });
}