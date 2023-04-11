<template>
  <!-- Modal backdrop -->
  <transition
    enter-active-class="transition ease-out duration-200"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition ease-out duration-100"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-show="open" class="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity" aria-hidden="true"></div>
  </transition>
  <!-- Modal dialog -->
  <transition
    enter-active-class="transition ease-in-out duration-200"
    enter-from-class="opacity-0 translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition ease-in-out duration-200"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 translate-y-4"
  >
    <div v-show="open" class="fixed inset-0 z-50 overflow-hidden flex items-center my-4 justify-center px-4 sm:px-6" role="dialog" aria-modal="true">
      <div ref="modalContent" class="bg-white rounded shadow-lg overflow-auto w-full max-h-full" :class="sizeClass" :style="customStyle">
        <!-- Modal header -->
        <div class="px-5 py-3" >
          <div class="flex justify-between items-center">
            <div class="font-semibold text-slate-800 text-2xl">{{ title }}</div>
            <button v-if="!hideClose" class="text-slate-400 hover:text-slate-500" @click.stop="$emit('close')">
              <div class="sr-only">Close</div>
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
            
          </div>
        </div>
        <div class="px-5 py-5">
          <slot />       

        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
  hideClose: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: ''
  },
  sizeClass: {
    type: String,
    default: 'max-w-lg'
  },
  customStyle: {
    type: String,
    default: ''
  }
})
</script>