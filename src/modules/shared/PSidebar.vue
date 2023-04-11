<template>
  <div
    ref="panelContent"
    class="absolute inset-0 z-20 shadow-xl transition-transform duration-200 ease-in-out sm:left-auto"
    :class="open ? 'translate-x-0' : 'translate-x-full'"
  >
    <div
      class="no-scrollbar sticky h-screen w-full shrink-0 overflow-y-auto overflow-x-hidden border-l border-slate-200 bg-white sm:w-[490px]"
      style="width: 640px"

      >
      <slot name="header_icon"/>
      <button
        ref="closeBtn"
        @click.stop="$emit('close')"
        class="group absolute top-0 right-0 mt-8 mr-8 p-2"
      >
        <svg
          class="fill-black-400 pointer-events-none h-5 w-5 group-hover:fill-slate-600"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m7.95 6.536 4.242-4.243a1 1 0 1 1 1.415 1.414L9.364 7.95l4.243 4.242a1 1 0 1 1-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 0 1-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 0 1 1.414-1.414L7.95 6.536Z"
          />
        </svg>
      </button>

      <div class="py-8 px-4 lg:px-8">
        <div class="mx-auto max-w-sm lg:max-w-none">
          <slot name="header"></slot>
        

          <div class="mt-12"><slot /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const emit = ["close"]
</script>
