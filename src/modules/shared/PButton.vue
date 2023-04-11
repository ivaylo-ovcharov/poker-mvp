<script setup lang="ts">
import { computed } from "vue"

const variants = {
  primary: "bg-blue-500 hover:bg-blue-600 text-white",
  dark: "bg-gray-200 hover:bg-gray-300 text-black text-sm !rounded-full",
  disabled: "bg-gray-300 hover:bg-gray-400 text-white",
  lightGray: "bg-gray-200 text-black text-sm !rounded-full",
  outline: "text-blue-500 hover:bg-blue-100 border-2 border-blue-500",
}
const props = defineProps<{ variant?: keyof typeof variants }>()

const currentVariantClasses = computed(
  () => variants[props.variant ?? "primary"],
)
</script>
<template>
  <button :class="currentVariantClasses" class="btn py-2 px-4 rounded-sm">
    <slot />
  </button>
</template>
