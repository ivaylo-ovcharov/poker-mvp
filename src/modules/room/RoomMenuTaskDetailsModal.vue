<script setup lang="ts">
import PModal from "../shared/PModal.vue";
import { Marked } from "@ts-stack/markdown";
import { Task } from "../task/task.type";
import { useCurrentRoom } from "../../modules/room/room.service";

defineProps<{
  open: boolean;
  currentlyVotingTask: Task;
}>();
const emit = defineEmits(["close"]);

const currentRoom = useCurrentRoom();
</script>

<template>
  <PModal
    :open="open"
    @close="emit('close')"
    :title="currentlyVotingTask.name"
    sizeClass="max-w-4xl"
  >
    <a
      :href="`${currentRoom.ref.value?.installation.domain}app/tasks/${currentlyVotingTask.id}`"
      target="_blank"
      class="text-blue-500 hover:underline"
      >Link</a
    >
    <div
      class="mt-2 bg-gray-50 p-10 p-3 hover:bg-gray-100"
      v-html="Marked.parse(currentlyVotingTask.description)"
    />
  </PModal>
</template>
