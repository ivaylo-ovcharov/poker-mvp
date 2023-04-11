<template>
  <div class="relative">
    <div @click="open = true">
      <slot />
    </div>
    <div class="absolute right-full top-1/2 z-10 -translate-y-1/2">
      <transition
        enter-active-class="transition ease-out duration-200 transform"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-out duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="open"
          class="min-w-72 mr-2 overflow-hidden rounded border border-slate-200 bg-white p-3 shadow-lg"
        >
          <div class="flex" style="flex-wrap: wrap; width: 260px">
            <POptionButton
              style="flex: 0 0 25%"
              v-for="votingOption in votingOptions"
              @click="
                editTask(currentRoom, { ...task, estimate: votingOption.text });
                open = false;
              "
            >
              {{ votingOption.value }}
            </POptionButton>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { editTask } from "../../api/firebase/task.service"
import { Task } from "../task/task.type";
import { useCurrentRoom } from "../room/room.service";
import { votingOptions } from '../task/task.options';
import POptionButton from "./POptionButton.vue";

defineProps<{
  task: Task
}>()

const currentRoom = useCurrentRoom()

const open = ref(false);
</script>
