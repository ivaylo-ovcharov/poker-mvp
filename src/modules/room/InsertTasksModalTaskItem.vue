<script lang="ts" setup>
import { TaskImport } from "../task/task.type";
import PButton from "../shared/PButton.vue";

const props = defineProps<{
  task: TaskImport;
  disabled: boolean;
}>();

const emit = defineEmits(["toggleIncluded"]);
</script>
<template>
  <div
    class="flex cursor-pointer items-center justify-between p-2 hover:bg-slate-100"
    @click="() => !disabled && emit('toggleIncluded')"
  >
    <div class="flex items-center">
      <input
        class="form-checkbox h-5 w-5 cursor-pointer border-gray-400"
        type="checkbox"
        :class="disabled && '!bg-gray-400'"
        :value="Boolean(task.isIncluded)"
        :checked="Boolean(task.isIncluded)"
        :disabled="disabled"
      />
      <div class="ml-5 flex flex-col">
        <span class="text-blue-500">{{ task.taskListName }}</span>
        <span>{{ task.name }}</span>
      </div>
    </div>
    <PButton variant="lightGray">{{ task.estimate || "-" }}</PButton>
  </div>
</template>
