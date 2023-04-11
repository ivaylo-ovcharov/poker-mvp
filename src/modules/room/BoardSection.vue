<script setup lang="ts">
import { computed } from "vue";
import PCard from "../shared/PCard.vue";
import PBoard from "../shared/PBoard.vue";
import InfoIcon from "../icons/InfoIcon.vue";

import { injectUser, useCurrentRoom } from "./room.service";
import { Task } from "../task/task.type";
import {
  clearVotes,
  setCardsRevealed,
} from "../../api/firebase/voting.service";
import { spreadVoters } from "../../utils/spreadVoters";

const props = defineProps<{
  currentlyVotingTask: Task | null;
  selectedVotingOption?: string | null;
  cardsRevealed: boolean;
}>();
const emit = defineEmits(["reveal", "startVoting", "openTaskDetailsModal"]);

const userRef = injectUser();

const getCardVariant = (vote: string | number | null) => {
  if (props.cardsRevealed) return "default";
  // todo: fix firebase storing
  if (vote && vote !== "undefined") return "voting";

  return "disabled";
};
const room = useCurrentRoom();
const votersSansUser = computed(() =>
  Object.keys(room.ref.value?.voters ?? {}).filter(_ => _ !== userRef?.value),
);
const votersFormatted = computed(() => {
  const _voters = spreadVoters(votersSansUser.value);
  _voters.bottom.splice(
    Math.floor(_voters.bottom.length / 2),
    0,
    userRef?.value ?? "",
  );
  return _voters;
});
const allVoters = computed(() => room.ref.value?.voters || {});
const votes = computed(() => props.currentlyVotingTask?.votes ?? {});
const everybodyVoted = computed(
  () =>
    Object.values(allVoters.value).length <= Object.values(votes.value).length,
);

const showCards = computed(() => props.currentlyVotingTask);

function handleVoteAgain() {
  clearVotes(room.ref.value!);
  setCardsRevealed(room.ref.value!, false)
}
</script>

<template>
  <div id="board_section" class="flex flex-col items-center justify-center">
    <div
      v-if="currentlyVotingTask"
      id="board_section__head"
      class="flex items-center"
    >
      <!-- <span class="mr-2 text-xl font-semibold">{{ currentlyVotingTask?.name }}</span>
      <InfoIcon @click="emit('openTaskDetailsModal')" class="w-4 h-4 cursor-pointer" /> -->
    </div>
    <PBoard
      id="board_section__board"
      :cardsRevealed="cardsRevealed"
      :currentlyVotingTask="currentlyVotingTask"
      :everybodyVoted="everybodyVoted"
      @reveal="emit('reveal')"
      @startVoting="emit('startVoting')"
      @voteAgain="handleVoteAgain"
      @openTaskDetailsModal="emit('openTaskDetailsModal')"
    />

    <div id="board_section__top" class="flex items-center justify-center gap-2">
      <div
        v-if="showCards"
        v-for="voter in votersFormatted.top"
        class="flex w-24 flex-col items-center !truncate"
      >
        <PCard
          class="mb-1"
          :variant="getCardVariant(votes[voter] || null)"
          :value="votes[voter]"
          size="sm"
        />
        <!-- TODO mark current user? -->
        <span class="w-full !truncate text-center font-semibold">{{
          voter
        }}</span>
      </div>
    </div>

    <div
      id="board_section__left"
      class="flex items-center justify-center gap-2"
    >
      <div
        v-if="showCards"
        v-for="voter in votersFormatted.left"
        class="flex w-24 flex-col items-center !truncate"
      >
        <PCard
          class="mb-1"
          :variant="getCardVariant(votes[voter] || null)"
          :value="votes[voter]"
          size="sm"
        />
        <!-- TODO mark current user? -->
        <span class="w-full !truncate text-center font-semibold">{{
          voter
        }}</span>
      </div>
    </div>

    <div
      id="board_section__bottom"
      class="flex items-center justify-center gap-2"
    >
      <div
        v-if="showCards"
        v-for="voter in votersFormatted.bottom"
        class="flex w-24 flex-col items-center !truncate"
      >
        <PCard
          class="mb-1"
          :variant="getCardVariant(votes[voter] || null)"
          :value="votes[voter]"
          size="sm"
        />
        <!-- TODO mark current user? -->
        <span class="w-full !truncate text-center font-semibold">{{
          voter
        }}</span>
      </div>
    </div>

    <div
      id="board_section__right"
      class="flex items-center justify-center gap-2"
    >
      <div
        v-if="showCards"
        v-for="voter in votersFormatted.right"
        class="flex w-24 flex-col items-center !truncate"
      >
        <PCard
          class="mb-1"
          :variant="getCardVariant(votes[voter] || null)"
          :value="votes[voter]"
          size="sm"
        />
        <!-- TODO mark current user? -->
        <span class="w-full !truncate text-center font-semibold">{{
          voter
        }}</span>
      </div>
    </div>
  </div>
</template>

<style>
#board_section {
  display: grid;
  grid-template-areas:
    "top top top"
    "left board right"
    "bottom bottom bottom";
  grid-template-columns: 200px auto 200px;
  gap: 16px;
}

#board_section__top {
  grid-area: top;
}
#board_section__left {
  justify-content: end;
  grid-area: left;
}
#board_section__right {
  justify-content: start;
  grid-area: right;
}
#board_section__board {
  grid-area: board;
}
#board_section__bottom {
  grid-area: bottom;
}
</style>
