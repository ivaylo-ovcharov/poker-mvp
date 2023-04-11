<script setup lang="ts">
import { editTask } from "../../api/firebase/task.service";
import PCard from "../shared/PCard.vue";
import PButton from "../shared/PButton.vue";
import PProgress from "../shared/PProgress.vue";
import { Task } from "../task/task.type";
import { computed } from "vue";
import { votingOptions } from "../task/task.options";
import { useCurrentRoom } from "./room.service";

const props = defineProps<{
  selectedVotingOption: string | null;
  cardsRevealed: boolean;
  currentlyVotingTask: Task | null;
  votes: Task["votes"];
}>();

const emit = defineEmits(["selectVotingOption"]);
const currentRoom = useCurrentRoom();

const validOptions = votingOptions.filter(o => !isNaN(Number(o.value)));
const validOptionValues = votingOptions.map(({ value }) => Number(value));
const validVotes = computed(
  () =>
    Object.entries(props.votes ?? {})
      .filter(([voter, vote]) => {
        const voteAsNumber = Number(vote);
        return !isNaN(voteAsNumber) && validOptionValues.includes(voteAsNumber);
      })
      .map(([voter, vote]) => Number(vote)),
  // TODO sort by agreement
);

const average = computed((): number | null =>
  validVotes.value.length
    ? Number(
        (
          validVotes.value.reduce((acc, curr) => acc + curr, 0) /
          validVotes.value.length
        ).toFixed(1),
      )
    : null,
);

const voteFrequencies = computed(() => {
  const votes = validVotes.value;
  const frequencies = votes.reduce(
    (acc, curr) =>
      Object.assign(acc, { [curr]: acc[curr] ? acc[curr] + 1 : 1 }),
    {} as Record<number, number>,
  );

  return Object.entries(frequencies);
});

const suggestion = computed(() => {
  const avg = average.value;

  return typeof avg === "number"
    ? validOptions
        .map(opt => ({
          opt,
          distance: Math.abs(Number(opt.value) - avg),
        }))
        .sort((a, b) => a.distance - b.distance)[0].opt
    : null;
});
</script>

<template>
  <div id="voting_section" class="flex flex-col">
    <div v-if="cardsRevealed === false">
      <div class="mb-4 flex justify-center text-xl font-semibold">
        Choose your card 👇
      </div>
      <div class="flex justify-center gap-4">
        <button
          v-for="votingOption in votingOptions"
          :key="votingOption.value"
          :disabled="!currentlyVotingTask"
          @click="emit('selectVotingOption', votingOption.value)"
        >
          <hr />
          <PCard
            :variant="
              !currentlyVotingTask
                ? 'disabled'
                : selectedVotingOption == votingOption.value
                ? 'active'
                : 'default'
            "
            :value="votingOption.value"
          />
        </button>
      </div>
    </div>

    <div v-else class="flex justify-center">
      <div id="result_section" class="flex justify-center gap-4">
        <div
          v-for="entry in voteFrequencies"
          class="flex flex-col items-center"
        >
          <PProgress
            :percentage="(entry[1] / validVotes.length) * 100"
            class="mb-4"
          />
          <PCard variant="dark-outline" :value="entry[0]" size="xs" />
          <!-- TODO pluralization -->
          <span>{{ entry[1] }} {{ entry[1] === 1 ? "user" : "users" }}</span>
        </div>
      </div>
      <div class="ml-10 flex flex-col justify-center">
        <div class="space-between flex flex-col">
          <!-- <span class="text-blue-500 hover:text-blue-600 font-semibold cursor-pointer flex items-center mb-4">
        
        </span> -->
          <div>
            <p class="mb-2 text-gray-400">Average result</p>
            <p class="text-5xl font-semibold">{{ average }}</p>
          </div>
          <PButton
            @click="() => editTask(currentRoom, {...currentlyVotingTask!, estimate: suggestion?.text || null })"
            class="mt-6"
          >
            <svg
              v-if="currentlyVotingTask?.estimate"
              xmlns="http://www.w3.org/2000/svg"
              class="mr-1"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#fff"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M5 12l5 5l10 -10" />
            </svg>
            {{ suggestion?.text }}
          </PButton>
        </div>

        <!-- 
        <p class="mb-2 mt-4 text-gray-400">Agreement</p>
        <span class="text-5xl font-semibold">22%</span> -->
      </div>
    </div>
  </div>
</template>
