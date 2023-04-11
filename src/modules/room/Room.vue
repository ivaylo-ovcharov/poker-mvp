<script setup lang="ts">
import { ref as vueRef, computed } from "vue";
import PButton from "../shared/PButton.vue";
import InvitePlayerModal from "./InvitePlayerModal.vue";
import BoardSection from "./BoardSection.vue";
import VotingSection from "./VotingSection.vue";
import SettingsIcon from "../icons/SettingsIcon.vue";
import InvitePersonIcon from "../icons/InvitePersonIcon.vue";
import FileIcon from "../icons/FileIcon.vue";
import ChevronDownIcon from "../icons/ChevronDownIcon.vue";

import RoomTasksSidebar from "./RoomTasksSidebar.vue";
import RoomIntegrationSettingsModal from "./RoomIntegrationSettingsModal.vue";
import RoomMenuTaskDetailsModal from "./RoomMenuTaskDetailsModal.vue";

import UserCreationModal from "../user/UserCreationModal.vue";
import { RouterLink } from "vue-router";
import { provideUser, useCurrentRoom } from "./room.service";
import { User } from "../user/user.type";
import { Task } from "../task/task.type";
import { setVote, clearVotes } from "../../api/firebase/voting.service";

const userRef = vueRef<null | User>(null);
provideUser(userRef);

const currentRoom = useCurrentRoom();
const areCardsRevealed = computed(() => !!currentRoom.ref.value?.cardsRevealed);

const panelOpen = vueRef(false);
const isTaskDetailsModalOpen = vueRef(false);

const isInvitePlayerOpen = vueRef(false);
const isSettingsModalOpen = vueRef(false);

const selectedVotingOption = computed(() => {
  const task = currentlyVotingTask.value;
  const votes = task?.votes ?? {};
  const vote = votes[userRef.value ?? ""];

  return vote ? String(vote) : null;
});
const selectVotingOption = (option: string) => {
  const room = currentRoom.ref.value!;
  const user = userRef.value!;

  if (option === selectedVotingOption.value) {
    clearVotes(room, user);
  } else {
    setVote(room, user, option);
  }
};

const onReveal = () => {
  currentRoom.update({
    cardsRevealed: true,
  });
};
const onStartVoting = async () => {
  const nextTask = getNextTask();
  await currentRoom.update({
    cardsRevealed: false,
    focusedTaskID: nextTask?.id || null,
  });

  const room = currentRoom.ref.value!;
  clearVotes(room);
};
const getNextTask = () => {
  const room = currentRoom.ref.value!;
  const tasks = room.tasks!;
  const currentIndex = tasks.findIndex(task => task.id === room.focusedTaskID);

  if (tasks.length === currentIndex + 1) {
    return null;
  }

  return tasks[currentIndex + 1];
};

const currentlyVotingTask = computed(() => {
  const tasks = currentRoom.ref.value?.tasks ?? [];
  const id = currentRoom.ref.value?.focusedTaskID;
  if (tasks && id) {
    return tasks.find(task => task.id === id);
  }
  return null;
});

function setCurrentlyVotingTask(selectedTask: Task) {
  currentRoom.update({
    focusedTaskID: selectedTask.id,
  });
}
</script>

<template>
  <UserCreationModal>
    <div
      class="flex h-screen flex-col justify-between overflow-y-hidden px-10 py-8"
    >
      <div class="hidden sm:block">
        <div id="header" class="flex justify-between">
          <router-link class="group block" to="/" aria-label="Cruip">
            <img
              src="/scrumpal.png"
              style="margin-top: -10px; margin-left: 10px; height: 42px"
            />
          </router-link>
          <div class="flex">
            <button
              v-if="userRef"
              ref="trigger"
              class="group mr-6 inline-flex items-center justify-center"
              aria-haspopup="true"
              @click="isSettingsModalOpen = true"
            >
              <img class="h-10 w-10 rounded-full" src="/avatar.png" />
              <div class="flex items-center truncate">
                <span
                  class="text-md ml-2 truncate font-semibold group-hover:text-slate-800"
                  >{{ userRef }}</span
                >
                <ChevronDownIcon
                  class="ml-1 h-3 w-3 shrink-0 fill-current text-slate-400"
                />
              </div>
            </button>

            <PButton
              class="mr-2"
              variant="outline"
              @click="isInvitePlayerOpen = true"
            >
              <InvitePersonIcon class="mr-2" />
              Invite players
            </PButton>
            <PButton @click="panelOpen = true" variant="outline">
              <FileIcon class="mr-2" />
              Tasks
            </PButton>
          </div>
        </div>
      </div>

      <BoardSection
        :currentlyVotingTask="currentlyVotingTask ?? null"
        :cardsRevealed="areCardsRevealed"
        :selectedVotingOption="selectedVotingOption"
        @reveal="onReveal"
        @startVoting="onStartVoting"
        @openTaskDetailsModal="isTaskDetailsModalOpen = true"
      />
      <VotingSection
        class="pb-4"
        :cardsRevealed="areCardsRevealed"
        :selectedVotingOption="selectedVotingOption"
        :votes="currentlyVotingTask?.votes"
        @selectVotingOption="selectVotingOption($event)"
        :currentlyVotingTask="currentlyVotingTask || null"
      />
    </div>
    <RoomTasksSidebar
      :open="panelOpen"
      @close="panelOpen = false"
      :currentlyVotingTaskId="currentlyVotingTask?.id || null"
      @setCurrentlyVotingTask="setCurrentlyVotingTask($event)"
      @openTaskDetailsModal="isTaskDetailsModalOpen = true"
    />
    <RoomIntegrationSettingsModal
      :open="isSettingsModalOpen"
      @close="isSettingsModalOpen = false"
    />
    <InvitePlayerModal
      :open="isInvitePlayerOpen"
      @close="isInvitePlayerOpen = false"
    />
    <RoomMenuTaskDetailsModal
      v-if="currentlyVotingTask"
      :open="isTaskDetailsModalOpen"
      :currentlyVotingTask="currentlyVotingTask"
      @close="isTaskDetailsModalOpen = false"
    />
  </UserCreationModal>
</template>
