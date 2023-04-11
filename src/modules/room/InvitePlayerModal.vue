<script setup lang="ts">
import { ref } from "vue";
import PButton from "../shared/PButton.vue";
import PModal from "../shared/PModal.vue";

defineProps({
  open: {
    type: Boolean
  },
})
const emit = defineEmits(['close'])

const inviteURL = location.href

</script>

<template>
  <PModal
    :open="open"
    @close="emit('close')"
    title="Invite players"
  >
    <p class="mb-2 font-semibold">Bring your team together</p>
    <input
      
      disabled
      :value="inviteURL"
      id="name"
      class="form-input mb-4 font-semibold text-base cursor-pointer w-full mr-2 border-2 border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
      type="text"
    />
    <!-- <PButton class="mt-4 w-full">Copy invitation link</PButton> -->
  </PModal>
</template>
