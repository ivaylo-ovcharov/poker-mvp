<script setup>
import { nanoid } from "nanoid";

const newRoomID = nanoid();
</script>

<template>
  <router-link
    class="btn h-12 w-full bg-blue-500 font-bold text-white shadow-sm hover:bg-blue-400"
    :to="`/${newRoomID}`"
    >Start new game</router-link
  >
</template>
