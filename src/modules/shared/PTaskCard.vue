<script lang="ts" setup>
import PButton from "../shared/PButton.vue"
import PMenu from "../shared/PMenu.vue"
import SyncIcon from "../icons/SyncIcon.vue"
import DeleteIcon from "../icons/DeleteIcon.vue"
import { Task } from "../task/task.type";

defineProps<{
  task: Task
  active: boolean
}>()
const emit = defineEmits(["selectCurrentlyVotingOn", 'delete', 'openTaskDetailsModal'])
</script>
<template>
  <div
    v-if="task"
    class="mb-3 flex h-40 w-full cursor-pointer flex-col justify-between rounded-md p-4 shadow-md bg-slate-50 hover:bg-slate-100"
  >
    <!-- <img src="/twlogo.png" class="!rounded-full md:max-w-none absolute top-1 left-1" width="20" height="20" alt="Hero Illustration" /> -->

    <div class="flex justify-between">
      <div>
        <p @click="emit('openTaskDetailsModal')"  class="text-lg font-semibold hover:underline">{{ task.name }}</p>
        <p class="mb-1 text-lg text-gray-500">{{ task.taskListName }}</p>
      </div>
      <DeleteIcon v-if="!active" @click="emit('delete', task.id)" />
    </div>
    
    <div class="flex justify-between items-end">
      <div @click="emit('selectCurrentlyVotingOn', task.id)">
        <PButton :variant="active ? 'primary' : 'outline'">
          <span v-if="false">Vote again</span>
          <span v-else-if="active">Voting now...</span>
          <span v-else> Vote this issue</span>
        </PButton>
      </div>
      <PMenu :task="task">
        <PButton variant="dark">
          <SyncIcon v-if="task.updated" class="mr-2" /> 
          {{ task.estimate || '-' }}
        </PButton>
      </PMenu>
     
    </div>
  </div>
</template>
