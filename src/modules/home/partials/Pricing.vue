<template>
  <section class="relative border-t border-gray-100">

    <!-- Bg gradient -->
    <div class="absolute top-0 left-0 right-0 bg-gradient-to-b from-gray-50 to-white h-1/2 pointer-events-none -z-10" aria-hidden="true"></div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="py-12 md:py-20">

        <!-- Section header -->
        <div class="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <h2 class="h2 font-cabinet-grotesk">Become a member of the best creative community</h2>
        </div>

        <!-- Pricing tables -->
        <div>

          <!-- Pricing toggle -->
          <div class="flex justify-center max-w-[18rem] m-auto mb-8 lg:mb-16">
            <div class="relative flex w-full mx-6 p-1 bg-gray-200 rounded-full">
              <span class="absolute inset-0 m-1 pointer-events-none" aria-hidden="true">
                <span class="absolute inset-0 w-1/2 bg-white rounded-full shadow transform transition duration-150 ease-in-out" :class="annual ? 'translate-x-0' : 'translate-x-full'"></span>
              </span>
              <button class="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out" :class="{'text-gray-500':!annual}" @click.prevent="annual = true">Yearly <span class="text-green-500">-20%</span>
              </button>
              <button class="relative flex-1 text-sm font-medium p-1 transition duration-150 ease-in-out" :class="{'text-gray-500':annual}" @click.prevent="annual = false">Monthly</button>
            </div>
          </div>

          <div class="max-w-sm mx-auto grid gap-8 lg:grid-cols-2 lg:gap-6 items-start lg:max-w-3xl pt-4">

            <!-- Pricing table 1 -->
            <div class="relative flex flex-col h-full p-6" data-aos="fade-right">
              <div class="mb-6">
                <div class="font-cabinet-grotesk text-xl font-semibold mb-1">Starter</div>
                <div class="font-cabinet-grotesk inline-flex items-baseline mb-2">
                  <span class="text-5xl font-bold">Free</span>
                </div>
                <div class="text-gray-500 mb-6">Explore the tool, save inspiration and create collections.</div>
                <router-link class="btn text-white bg-blue-500 hover:bg-blue-600 w-full shadow-sm" to="/signup">Join The Community</router-link>
              </div>
              <div class="font-medium mb-4">Features include:</div>
              <ul class="text-gray-500 space-y-3 grow">
                <li class="flex items-center">
                  <svg class="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                  </svg>
                  <span>Unlimited placeholder texts</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                  </svg>
                  <span>Consectetur adipiscing elit</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                  </svg>
                  <span>Excepteur sint occaecat cupidatat</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                  </svg>
                  <span>Officia deserunt mollit anim</span>
                </li>
              </ul>
            </div>

            <!-- Pricing table 2 -->
            <div class="relative flex flex-col h-full p-6 bg-gray-800" data-aos="fade-left">
              <div class="absolute top-0 right-0 mr-6 -mt-4">
                <div class="inline-flex items-center text-sm font-semibold py-1 px-4 text-emerald-600 bg-emerald-200 rounded-full">Most Popular</div>
              </div>
              <div class="mb-6">
                <div class="font-cabinet-grotesk text-xl text-gray-100 font-semibold mb-1">Business</div>
                <div class="font-cabinet-grotesk text-gray-100 inline-flex items-baseline mb-2">
                  <span class="text-3xl font-medium text-gray-400">$</span>
                  <span class="text-5xl font-bold">{{annual ? '29' : '35'}}</span>
                  <span class="font-medium text-gray-400">/mo</span>
                </div>
                <div class="text-gray-400 mb-6">Get unlimited access to our new mood boarding tool.</div>
                <router-link class="btn text-white bg-blue-500 hover:bg-blue-600 w-full shadow-sm" to="/signup">Start Free Trial</router-link>
              </div>
              <div class="font-medium text-gray-100 mb-4">All free features, plus:</div>
              <ul class="text-gray-400 space-y-3 grow">
                <li class="flex items-center">
                  <svg class="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                  </svg>
                  <span>Unlimited placeholder texts</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                  </svg>
                  <span>Consectetur adipiscing elit</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                  </svg>
                  <span>Excepteur sint occaecat cupidatat</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                  </svg>
                  <span>Officia deserunt mollit anim</span>
                </li>
                <li class="flex items-center">
                  <svg class="w-3 h-3 fill-current text-emerald-500 mr-3 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                  </svg>
                  <span>Excepteur sint occaecat cupidatat</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>

  </section>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Pricing',
  setup() {
    const annual = ref(true)

    return {
      annual,
    }
  },
}
</script>