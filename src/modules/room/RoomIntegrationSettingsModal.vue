<script setup>
import { ref } from "vue";

import PModal from "../shared/PModal.vue";
import PButton from "../shared/PButton.vue";
import { useCurrentRoom } from "./room.service";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  currentRoom: {
    type: Object,
    default: {},
  },
});

const currentRoom = useCurrentRoom();

const domain = ref(currentRoom.ref.value?.installation?.domain);
const key = ref(currentRoom.ref.value?.installation?.key);
const projectId = ref(currentRoom.ref.value?.installation?.projectId);

function updateInstallation() {
  currentRoom.update({
    installation: {
      domain: domain.value,
      key: key.value,
      projectId: projectId.value,
    },
  });
}
</script>

<template>
  <PModal :open="open" @close="$emit('close')" title="Installation settings">
    <div class="mb-4">
      <p class="mb-2 font-semibold">Teamwork endpoint url</p>
      <input
        v-model="domain"
        id="name"
        class="form-input mr-2 w-full cursor-pointer border-2 border-slate-200 text-base font-semibold text-slate-500 hover:border-slate-300 hover:text-slate-600"
        type="text"
      />
    </div>
    <div class="mb-4">
      <p class="mb-2 font-semibold">Teamwork secret key</p>
      <input
        v-model="key"
        id="name"
        class="form-input mr-2 w-full cursor-pointer border-2 border-slate-200 text-base font-semibold text-slate-500 hover:border-slate-300 hover:text-slate-600"
        type="password"
      />
    </div>
    <div class="mb-4">
      <p class="mb-2 font-semibold">Project ID</p>
      <input
        v-model="projectId"
        id="name"
        class="form-input mr-2 w-full cursor-pointer border-2 border-slate-200 text-base font-semibold text-slate-500 hover:border-slate-300 hover:text-slate-600"
      />
    </div>

    <div class="mt-8 flex justify-between">
      <PButton @click="$emit('close')" variant="outline">Close</PButton>
      <PButton @click="updateInstallation">Save</PButton>
    </div>
  </PModal>
</template>
