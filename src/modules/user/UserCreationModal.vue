<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useJoinRoom, useCurrentRoom, injectUser } from "../room/room.service";
import PModal from "../shared/PModal.vue";
import PButton from "../shared/PButton.vue";
import {
  localstorageNameKey,
  localstorageLastLoginKey,
} from "../room/room.service";

const getStoredName = () => localStorage.getItem(localstorageNameKey) || "";
const getStoredLoginTime = () =>
  localStorage.getItem(localstorageLastLoginKey) || "";

const userRef = injectUser()!;
const room = useCurrentRoom().ref;

const nameInputValue = ref(getStoredName());
const unavailableNames = computed(() =>
  Object.values(room.value?.voters || {}).filter(([k, v]) => {
    return !(k === getStoredName() && v === getStoredLoginTime());
  }),
);

const showApp = computed(() => !!room.value);
const showForm = computed(() => showApp.value && !userRef?.value );

const inputRef = ref<undefined | HTMLInputElement>();
const inputValid = computed(() => {
  return Boolean(
    nameInputValue.value.length &&
      !(unavailableNames.value ?? [])?.includes(nameInputValue.value),
  );
});

const joinRoom = useJoinRoom();

// autologin
const voters = computed(()=>room.value?.voters)
watch(
  voters,
  () => {
    const storedName = getStoredName();
    const storedTime = getStoredLoginTime();
    const voters = room.value?.voters ?? {};
    if (storedName && !(storedName in voters) || voters[storedName] === storedTime) {
      userRef.value = storedName;
      joinRoom(storedName, storedTime)
    }
  },
  { immediate: true },
);

watch(
  [inputValid],
  () => {
    const error = inputValid ? "" : "Name Unavailable";
    inputRef!.value?.setCustomValidity(error);
  },
  {
    immediate: true,
  },
);

async function handleSubmit() {
  const user = nameInputValue.value;
  await joinRoom(user).then(() => {
    userRef.value = user;
  });
}
</script>

<template>
  <PModal
    v-if="showForm"
    :open="showForm"
    title="Choose your display name"
    hideClose
  >
    <form @submit.prevent="handleSubmit" class="mb-4">
      <p class="mb-2 font-semibold">Your display name</p>
      <input
        class="form-input mr-2 w-full cursor-pointer border-2 border-slate-200 text-base font-semibold text-slate-500 hover:border-slate-300 hover:text-slate-600"
        v-model="nameInputValue"
        placeholder="Name"
        ref="inputRef"
        type="text"
        required
        maxlength="30"
      />
    </form>

    <PButton
      :disabled="!inputValid"
      :variant="!inputValid ? 'disabled' : 'primary'"
      type="submit"
      @click="handleSubmit"
      class="mt-4 w-full"
      >Continue</PButton
    >
  </PModal>

  <slot v-if="showApp"></slot>
</template>
