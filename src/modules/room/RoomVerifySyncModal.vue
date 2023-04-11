<script setup lang="ts">
import PButton from "../shared/PButton.vue";
import PModal from "../shared/PModal.vue";
import TaskSyncItem from "./TaskSyncItem.vue"
import { useCurrentRoom } from "./room.service";
import { computed, ref } from "vue";
import { editTask } from "../../api/firebase/task.service"
import { useTWTaskCustomfieldUpdate } from "../../api/tw/task.service";
import { Task } from "../task/task.type";

defineProps({
  open: {
    type: Boolean
  },
})
const emit = defineEmits(['close'])
const currentRoom = useCurrentRoom()
const updatedTasks = computed(() => currentRoom.ref.value?.tasks?.filter(task => task.updated) || [])
const batchTask = ref<Task | Partial<Task>>({})
const res = useTWTaskCustomfieldUpdate(batchTask)
const performBatch = () => {
  updatedTasks.value.forEach(task => {
    batchTask.value = task
    res.execute()

    task.updated = false
    editTask(currentRoom, task, true)
  })

  emit('close')
}
</script>

<template>
  <PModal
    :open="open"
    @close="emit('close')"
    :title="`You are about to update ${ updatedTasks.length } tasks`"
  >
    <TaskSyncItem 
      v-for="task in updatedTasks"
      :key="task.id"
      :task="task"
    />
  
    <div class="flex justify-between mt-8">
      <PButton @click="emit('close')" variant="outline">Close</PButton>
      <PButton @click="performBatch" >Update {{ updatedTasks.length }} tasks</PButton>
    </div>
  </PModal>
</template>
