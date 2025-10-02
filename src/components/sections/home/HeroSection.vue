<template>
    <div class="flex justify-center p-5">
        <div class="w-full max-w-[1300px]">
            <div class="flex justify-center mt-5">
                <div v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideRight, 100)" class="border border-gray-200 rounded-full px-3 py-2 flex items-center gap-2">
                    <Users class="w-4 h-4 text-blue-500" />
                    <span>100K+ users worldwide</span>
                </div>
            </div>

            <div class="text-center space-y-2 mt-5">
                <h1 v-motion="motionAnimation.bottomToTop" class="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
                    Make Learning<br> Fun With <span class="text-blue-600">Quizzes</span>
                </h1>
                <div v-motion="motionAnimation.bottomToTopDelayed" class="flex justify-center">
                    <p class="w-full max-w-[600px] text-gray-600">
                        Answer interesting questions, discover new insights, and see how much your knowledge grows every
                        day.
                    </p>
                </div>
            </div>

            <button v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideUp, 1000)" class="flex justify-center m-auto">
                <RouterLink to=""
                    class="group mt-5 flex justify-center items-center gap-2 border border-gray-200 px-3 py-2 rounded-full">
                    <span>Get Started</span>
                    <div class="bg-blue-600 p-2 rounded-full relative overflow-hidden">
                        <ArrowUpRight
                            class="w-5 h-5 text-white relative z-10 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 translate-x-[-150%] translate-y-[150%]" />
                        <ArrowUpRight
                            class="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:translate-x-[150%] group-hover:translate-y-[-150%]" />
                    </div>
                </RouterLink>
            </button>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { ArrowUpRight, Users } from 'lucide-vue-next';
import * as motionAnimation from "../../animation/motionAnimation"
</script>