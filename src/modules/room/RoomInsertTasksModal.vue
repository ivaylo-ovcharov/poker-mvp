<script lang="ts" setup>
import { ref, computed, watch, reactive } from "vue";
import PModal from "../shared/PModal.vue";
import PButton from "../shared/PButton.vue";
import { importTasksToFb } from "../../api/import.service";
import { useTWTasklistFetch, useTWTaskFetch } from "../../api/tw";

import InsertTasksModalTaskItem from "./InsertTasksModalTaskItem.vue";
import PDropdown from "../shared/PDropdown.vue";
import { useCurrentRoom } from "../room/room.service";

defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});
const showNeedEstimate = ref(false);
const currentRoomManager = useCurrentRoom();
const projectId = 450319;
const estimationFieldId = 1072;
const selectedTaskListId = ref<number>(-1);
const { data: tasklists } = useTWTasklistFetch(projectId);
const {
  data: importTasks,
  isFetching,
  isFinished,
} = useTWTaskFetch(selectedTaskListId, estimationFieldId);

const prevImportedTaskIds = computed(
  () => currentRoomManager.ref.value?.tasks?.map(task => task.id) || [],
);
const tasklistOptions = computed(
  () =>
    tasklists.value?.map(tasklist => ({
      id: Number(tasklist.id),
      text: tasklist.name,
    })) || [],
);
const allTasks = computed(() => {
  if (!importTasks.value) return [];

  return reactive(
    importTasks.value.map(task => ({
      ...task,
      isIncluded: prevImportedTaskIds.value?.includes(task.id) || false,
    })),
  );
});
const includedImportTasks = computed(() =>
  allTasks.value.filter(task => task.isIncluded),
);
const newlyIncludedTaskCount = computed(
  () => includedImportTasks.value.length - prevImportedTaskIds.value?.length,
);

watch(tasklists, () => {
  if (tasklists.value && tasklists.value.length > 0) {
    selectedTaskListId.value = tasklists.value[0].id;
  }
});
</script>
<template>
  <PModal
    :open="open"
    @close="$emit('close')"
    title="Insert tasks"
    sizeClass="max-w-3xl"
  >
    <div class="mb-4 flex items-center">
      <PDropdown
        class="mr-3 w-64"
        :options="tasklistOptions"
        :selectedId="selectedTaskListId"
        @change="selectedTaskListId = $event"
      />
      <!-- <input
      id="name"
      class="form-input font-semibold text-base cursor-pointer w-60 mr-2 border-2 border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
      style="height: 51.6px"
      placeholder="Search by task name..."
      type="text"
    /> -->
      <!-- Start -->
      <div class="flex items-center">
        <div class="form-switch">
          <input
            type="checkbox"
            id="toggle1"
            class="sr-only"
            v-model="showNeedEstimate"
          />
          <label class="bg-slate-400" for="toggle1">
            <span class="bg-white shadow-sm" aria-hidden="true"></span>
            <span class="sr-only">Toggle</span>
          </label>
        </div>
        <div class="ml-2 text-sm italic text-slate-400">
          {{ showNeedEstimate ? "Hide" : "Show" }} need estimate
        </div>
      </div>

      <!-- <span class="ml-4 text-gray-600 mt-3">
       {{ allTasks.length }} available tasks
      </span> -->
    </div>
    <div v-if="isFetching">
      <div
        v-for="i in 5"
        class="mb-4 flex animate-pulse items-center space-x-4"
      >
        <div class="h-5 w-5 rounded-md bg-slate-200"></div>
        <div class="flex-1 space-y-6 py-1">
          <div class="space-y-3">
            <div class="gap-4">
              <div class="col-span-2 mb-2 h-5 w-2/3 rounded bg-slate-200"></div>
              <div class="col-span-1 h-5 w-1/3 rounded bg-slate-200"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isFinished" class="h-96 overflow-y-auto overflow-x-hidden">
      <InsertTasksModalTaskItem
        v-for="task in allTasks"
        :key="task.id"
        :task="task"
        :disabled="prevImportedTaskIds?.includes(task.id) || false"
        @toggleIncluded="task.isIncluded = !task.isIncluded"
      />
      <div v-if="!allTasks.length">No tasks found</div>
    </div>

    <div class="mt-8 flex justify-between">
      <PButton @click="$emit('close')" variant="outline">Close</PButton>
      <PButton
        v-if="newlyIncludedTaskCount"
        @click="
          importTasksToFb(includedImportTasks, currentRoomManager);
          $emit('close');
        "
      >
        Import {{ newlyIncludedTaskCount }} issues
      </PButton>
      <PButton v-else variant="disabled"> Import selected issues </PButton>
    </div>
  </PModal>
</template>
