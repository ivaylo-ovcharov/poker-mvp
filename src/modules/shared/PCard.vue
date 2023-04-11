<script setup lang="ts">
import { Nullable } from "vitest"
import { computed } from "vue"

const props = defineProps<{
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  value?: string | number | null | undefined
}>()

const sizes = {
  xs: "w-10 h-16 text-1xl",
  sm: "w-16 h-24 text-2xl",
  lg: "w-20 h-28 text-3xl",
}

const variants = {
  default: {
    classes: "border-2 border-blue-500 hover:bg-blue-50 text-blue-500 cursor-pointer",
  },
  active: {
    classes: "bg-blue-500 text-white",
    styles:
      "margin-top: -6px; transition: margin-top 0.1s;",
  },
  voting: {
    classes: "text-transparent",
    styles:
      "background: url(cardBG.svg); background-size: cover;",
  },
  // voting: {
  //   classes: "text-transparent border-3 border-red-500",
  //   styles:
  //     "background: url(cardBG.svg); border: 3px solid white;",
  // },
  disabled: {
    classes: "bg-gray-200 text-transparent",
  },
  "dark-outline": {
    classes: "border-2 border-gray-500",
  },
}

const currentVariant = computed(() => variants[props.variant ?? "default"])
const currentSizeClasses = computed(() => sizes[props.size ?? "lg"])
</script>
<template>
  <div
    :style="'styles' in currentVariant ? currentVariant.styles : ''"
    :class="[currentVariant.classes, currentSizeClasses]"
    class="flex items-center justify-center rounded-md font-semibold shadow-md select-none"
  >
  <span v-if="variant === 'default' || variant === 'active' || variant === 'dark-outline'"> {{ value }}</span>
   
  </div>
</template>
