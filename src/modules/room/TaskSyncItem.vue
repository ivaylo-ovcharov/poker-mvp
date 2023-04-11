<script setup lang="ts">
import PButton from "../shared/PButton.vue";
import SyncIcon from "../icons/SyncIcon.vue";
import ArrowRightIcon from "../icons/ArrowRightIcon.vue";
import { Task } from "../task/task.type";

defineProps<{
  task: Task
}>()
</script>

<template>
  <div class="flex flex-col">
    <div class="flex items-center justify-between p-2">
      <div class="flex items-center">
        <SyncIcon />
        <div class="flex flex-col ml-5">
          <span class="text-blue-500">{{ task.taskListName }}</span>
          <span>{{ task.name }}</span>
        </div>
      </div>
      <ArrowRightIcon />
      <PButton variant="lightGray">{{ task.estimate }}</PButton>
    </div>
  </div>
</template>
