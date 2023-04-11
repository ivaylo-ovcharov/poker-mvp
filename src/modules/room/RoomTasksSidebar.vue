<script lang="ts" setup>
import { ref as vueRef, computed } from "vue";
import RoomInsertTasksModal from "./RoomInsertTasksModal.vue";
import RoomVerifySyncModal from "./RoomVerifySyncModal.vue";
import PSidebar from "../shared/PSidebar.vue";
import PTaskCard from "../shared/PTaskCard.vue";
import NoResultsRobot from "../icons/NoResultsRobot.vue";
import Import from "../icons/Import.vue";

import { useCurrentRoom } from "./room.service";
import { Task } from "../task/task.type";

defineProps<{
  currentlyVotingTaskId: number | null,
  open: boolean,
}>()
const emit = defineEmits(["setCurrentlyVotingTask", "openTaskDetailsModal", "editTask"]);
const room = useCurrentRoom();
const roomTasks = computed(() => room.ref?.value?.tasks || []);

function deleteFBTask(id: number) {
  room.update({ tasks: roomTasks.value.filter((task: any) => task.id !== id) });
}

const openInsertTaskModal = vueRef(false);
const isVerifySyncModalOpen = vueRef(false);
</script>
<template>
  <PSidebar :open="open" @close="$emit('close')">
    <template #header_icon>
      <Import
        @click="openInsertTaskModal = true"
        class="group absolute top-0 right-0 p-2"
        style="margin-top: 30px; margin-right: 70px"
      />
    </template>
    <template #header>
      <div class="flex items-center">
        <p class="text-xl font-semibold">Tasks</p>
        <span
          v-if="roomTasks.length"
          class="ml-2 flex cursor-pointer items-center text-sm font-semibold text-blue-500 hover:text-blue-600"
          style="margin-top: 3px"
          @click="isVerifySyncModalOpen = true"
        >
          <svg
            class="mr-1"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_19_930)">
              <path
                d="M10.0007 3.33337V0.833374L6.66732 4.16671L10.0007 7.50004V5.00004C12.759 5.00004 15.0007 7.24171 15.0007 10C15.0007 10.8417 14.7923 11.6417 14.4173 12.3334L15.634 13.55C16.284 12.525 16.6673 11.3084 16.6673 10C16.6673 6.31671 13.684 3.33337 10.0007 3.33337ZM10.0007 15C7.24232 15 5.00065 12.7584 5.00065 10C5.00065 9.15837 5.20898 8.35837 5.58398 7.66671L4.36732 6.45004C3.71732 7.47504 3.33398 8.69171 3.33398 10C3.33398 13.6834 6.31732 16.6667 10.0007 16.6667V19.1667L13.334 15.8334L10.0007 12.5V15Z"
                fill="#4461D7"
              />
            </g>
            <defs>
              <clipPath id="clip0_19_930">
                <rect width="20" height="20" fill="white" />
              </clipPath>
            </defs>
          </svg>

          Sync tasks
        </span>
      </div>

      <!-- <p class="text-sm font-semibold text-slate-500">{{ roomTasks.length }} issues</p> -->
    </template>
    <div class="mt-8 ml-8 flex w-full justify-center">
      <NoResultsRobot v-if="!roomTasks.length" />
    </div>
    <PTaskCard
      v-for="task in roomTasks"
      :key="task.id"
      :task="task"
      :active="task.id === currentlyVotingTaskId"
      @selectCurrentlyVotingOn="emit('setCurrentlyVotingTask', task)"
      @openTaskDetailsModal="emit('openTaskDetailsModal')"
      @delete="deleteFBTask"
    />
  </PSidebar>
  <RoomInsertTasksModal
    v-if="openInsertTaskModal"
    :open="openInsertTaskModal"
    @close="openInsertTaskModal = false"
  />
  <RoomVerifySyncModal
    v-if="isVerifySyncModalOpen"
    :open="isVerifySyncModalOpen"
    @close="isVerifySyncModalOpen = false"
  />
</template>
