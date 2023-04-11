<template>
  <header class="absolute z-30 w-full">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="flex h-16 items-center justify-between md:h-20">
        <!-- Site branding -->
        <div class="mr-4 shrink-0">
          <!-- Logo -->
          <router-link class="group block" to="/" aria-label="Cruip">
            <img src="/scrumpal.png" style="width: 200px; margin-left: -30px" />
          </router-link>
        </div>

        <!-- Desktop navigation -->
        <nav class="flex grow">
          <!-- Desktop sign in links -->
          <ul class="flex grow flex-wrap items-center justify-end">
            <li class="ml-3">
              <StartBtn />
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup>
import StartBtn from "../StartBtn.vue"
</script>
