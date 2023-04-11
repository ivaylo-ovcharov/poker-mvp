<script lang="ts" setup>
import PButton from "../shared/PButton.vue";
import Refresh from "../icons/Refresh.vue";
import DescriptionIcon from "../icons/DescriptionIcon.vue";
import { Task } from "../task/task.type";

defineProps<{
  cardsRevealed: boolean;
  everybodyVoted: boolean;
  currentlyVotingTask: Task | null;
}>();

const emit = defineEmits([
  "voteAgain",
  "startVoting",
  "reveal",
  "openTaskDetailsModal",
]);
</script>
<template>
  <div
    class="w- flex h-40 flex-col items-center justify-center overflow-hidden rounded-lg bg-blue-100 p-8 text-center"
    style="width: 525px; height: 258px"
  >
    <!-- Nothing selected yet -->
    <p v-if="!currentlyVotingTask" class="text-2xl font-semibold">
      Pick your task!
    </p>

    <!-- Currectly have available task -->
    <div
      v-if="
        currentlyVotingTask &&
        !(everybodyVoted && currentlyVotingTask && !cardsRevealed) &&
        !cardsRevealed
      "
      class="flex flex-col justify-center"
    >
      <p class="flex justify-center text-2xl font-semibold">
        {{ currentlyVotingTask?.name }}
      </p>
      <p
        @click="emit('openTaskDetailsModal')"
        class="my-2 flex cursor-pointer items-center justify-center font-semibold text-blue-500 hover:text-blue-600"
      >
        <DescriptionIcon class="mr-1" />
        View task description
      </p>
    </div>
    <PButton
      v-if="everybodyVoted && currentlyVotingTask && !cardsRevealed"
      @click="emit('reveal')"
    >
      Reveal cards
    </PButton>
    <!-- <PButton 
      v-if="currentlyVotingTask && !cardsRevealed"
      @click="emit('reveal')"
    >
      Force reveal cards
    </PButton> -->
    <div v-if="cardsRevealed" class="flex items-center">
      <PButton
        v-if="currentlyVotingTask?.estimate"
        class="mr-2"
        @click="emit('startVoting')"
      >
        Vote next tasks
      </PButton>
      <PButton @click="emit('voteAgain')">
        <Refresh class="mr-2 cursor-pointer" />
        Vote again
      </PButton>
    </div>
  </div>
</template>
