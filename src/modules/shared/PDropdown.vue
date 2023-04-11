<template>
  <div class="relative inline-flex w-full ">
    <button
      ref="trigger"
      class="btn px-3 justify-between w-full rounded-sm min-w-44 bg-white border-2 border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
      aria-label="Select date range"
      aria-haspopup="true"
      @click.prevent="dropdownOpen = !dropdownOpen"
      :aria-expanded="dropdownOpen"
    >
      <span class="flex items-center">
        <span>{{ options.find((e) => e.id === selectedId)?.text || 'All available tasks'}}</span>
      </span>
      <svg class="shrink-0 ml-1 fill-current text-slate-400" width="11" height="7" viewBox="0 0 11 7">
        <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
      </svg>
    </button>
    <transition
      enter-active-class="transition ease-out duration-100 transform"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-out duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-show="dropdownOpen" class="z-10  absolute top-full left-0 w-full bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1">
        <div
          class="font-medium text-sm text-slate-600 divide-y divide-slate-200"
          @focusin="dropdownOpen = true"
          @focusout="dropdownOpen = false"
        >

          <button
            v-for="option in options"
            :key="option.id"
            class="flex items-center justify-between w-full hover:bg-slate-50 py-3 px-4 cursor-pointer"
            :class="option.id === selectedId && 'text-indigo-500'"
            @click="emit('change', option.id); dropdownOpen = false"
          >
            <span>{{option.text}}</span>
            <svg class="shrink-0 ml-2 fill-current text-indigo-400" :class="option.id !== selectedId && 'invisible'" width="12" height="9" viewBox="0 0 12 9">
              <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
            </svg>
          </button>          
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

type DropdownOption = {
  id: number,
  text: string 
}
const props = defineProps<{
  options: DropdownOption[]
  selectedId: number | null
}>()
const emit = defineEmits(['change'])
const dropdownOpen = ref(false)
const selectedOption = computed(() => props.selectedId !== null ? props.options[props.selectedId] : null)
</script>