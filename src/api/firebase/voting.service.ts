import { Room } from "../../modules/room/room.type"
import { remove, ref as dbRef, set } from 'firebase/database';
import { db } from '../../firebase';

export const clearVotes = (room: Room, user: string = '') =>{
  const taskID = room.focusedTaskID
  const taskIndex = room.tasks!.findIndex(task => task.id === taskID)
  const votesPath = `rooms/${room.id}/tasks/${taskIndex}/votes${user !== '' ? '/' + user : ''}`
  remove(dbRef(db,votesPath))
}

export const setCardsRevealed = (room:Room , cardsRevealed:boolean) => {
  return set(dbRef(db,`rooms/${room.id}/cardsRevealed`),cardsRevealed)
}

export const setVote = (room: Room, user: string, option: string) => {
  const currentTaskIndex = room.tasks!.findIndex(
    task => task.id === room.focusedTaskID,
  );

  const path = `rooms/${room.id}/tasks/${currentTaskIndex}/votes/${user}`;

  set(dbRef(db, path), option);
}