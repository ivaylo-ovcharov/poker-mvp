<script setup lang="ts">
const props = defineProps<{
  percentage:number
}>()
</script>
<template>
  <div
    style="height: 100px"
    class="flex w-2 flex-col justify-end rounded-full bg-slate-300"
  >
    <div class="w-2 rounded-full bg-slate-600" :style="{
      height: `${props.percentage}px`
    }"></div>
  </div>
</template>
