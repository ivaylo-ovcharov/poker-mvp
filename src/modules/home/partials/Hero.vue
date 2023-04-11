<template>
  <section class="relative">
    <!-- Bg -->
    <div
      class="pointer-events-none absolute inset-0 -z-10 bg-gray-50"
      aria-hidden="true"
    ></div>

    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <div class="pt-32 pb-12 md:pt-60 md:pb-20">
        <!-- Hero content -->
        <div
          class="relative mx-auto flex max-w-xl flex-col text-center md:max-w-none md:flex-row md:text-left"
        >
          <!-- Content -->
          <div class="md:w-[640px]">
            <!-- Copy -->
            <h1
              class="h1 mb-6 font-cabinet-grotesk"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              Scrum Poker for happy
              <span class="relative inline-flex text-blue-500">
                <svg
                  class="absolute left-0 top-full -z-10 -mt-4 max-w-full"
                  width="220"
                  height="24"
                  viewBox="0 0 220 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M134.66 13.107c-10.334-.37-20.721-.5-31.12-.291l-2.6.06c-4.116.04-8.193.602-12.3.749-14.502.43-29.029 1.196-43.514 2.465-6.414.63-12.808 1.629-19.04 2.866-7.93 1.579-16.113 3.71-23.367 5.003-2.211.374-3.397-1.832-2.31-4.906.5-1.467 1.838-3.456 3.418-4.813a16.047 16.047 0 0 1 6.107-3.365c16.88-4.266 33.763-6.67 51.009-7.389C71.25 3.187 81.81 1.6 92.309.966c11.53-.65 23.097-.938 34.66-.96 7.117-.054 14.25.254 21.36.318l16.194.803 4.62.39c3.85.32 7.693.618 11.53.813 8.346.883 16.673.802 25.144 2.159 1.864.276 3.714.338 5.566.873l.717.225c6.162 1.977 7.92 3.64 7.9 7.197l-.003.203c-.017.875.05 1.772-.112 2.593-.581 2.762-4.066 4.12-8.637 3.63-13.696-1.06-27.935-3.332-42.97-4.168-11.055-.83-22.314-1.459-33.596-1.603l-.022-.332Z"
                    fill="#ECF0FA"
                    fill-rule="evenodd"
                  />
                </svg>
                agile
              </span>
              teams.
            </h1>
            <p
              class="mb-10 text-xl text-gray-500"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              Quick, simple and reliable estimations
            </p>
            <!-- Buttons -->
            <div
              class="mx-auto mb-12 max-w-xs space-y-4 sm:flex sm:max-w-none sm:justify-center sm:space-y-0 sm:space-x-4 md:mb-20 md:justify-start"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <div>
                <StartBtn />
              </div>
            </div>
            <!-- Stats -->
          </div>

          <!-- Image -->
          <div
            style="border-radius: 10px"
            class="!mr-7 md:absolute md:left-[40rem] md:ml-16 md:-mt-12 md:max-w-none lg:ml-10"
            data-aos="fade-left"
            data-aos-duration="1100"
          >
            <img
              src="/creative1.png"
              style="margin-top: 80px"
              class="!rounded-md md:max-w-none"
              width="584"
              height="659"
              alt="Hero Illustration"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex w-full justify-center">
      <button
        @click="showVideo = true"
        class="group absolute top-full flex -translate-y-1/2 transform items-center rounded-full bg-white p-4 font-medium shadow-lg"
        aria-controls="modal"
      >
        <svg
          class="h-6 w-6 shrink-0 fill-current text-gray-400 group-hover:text-blue-600"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm0 2C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12z"
          />
          <path d="M10 17l6-5-6-5z" />
        </svg>
        <span class="ml-3">Watch the full video (2 min)</span>
      </button>
    </div>

    <PModal
      customStyle="min-height: 500px !important; min-width: 800px"
      id="modal"
      ariaLabel="modal-headline"
      :open="showVideo"
      @close="showVideo = false"
    >
      <div class="pb-9/16 relative">
        <iframe
          v-if="showVideo"
          id="ytplayer"
          style="height: 400px !important; width: 750px"
          class="absolute h-full w-full"
          src="https://www.youtube.com/embed/ApqYl-AfFlM?autoplay=1&origin=http://example.com"
          frameborder="0"
        ></iframe>
      </div>
    </PModal>
  </section>
</template>

<script setup>
import { ref } from "vue";
import PModal from "../../shared/PModal.vue";

import StartBtn from "../StartBtn.vue";

const showVideo = ref(false);
</script>