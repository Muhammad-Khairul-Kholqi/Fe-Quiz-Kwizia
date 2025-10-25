<template>
    <div class="flex justify-center p-5">
        <div class="w-full max-w-[1500px]">
            <div class="text-center space-y-2 mt-5">
                <h1 v-motion="motionAnimation.bottomToTop"
                    class="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-bold">
                    Make Learning<br> Fun With <span class="text-blue-600">Quizzes</span>
                </h1>
                <div v-motion="motionAnimation.bottomToTopDelayed" class="flex justify-center">
                    <p class="w-full max-w-[600px] text-gray-600">
                        Answer interesting questions, discover new insights, and see how much your knowledge grows every
                        day.
                    </p>
                </div>
            </div>

            <div class="mt-10 flex flex-wrap gap-5 justify-center items-center">
                <RouterLink v-if="!isAuthenticated"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideLeft, 1000)" to="/signin"
                    class="group flex justify-center items-center gap-2 border border-gray-200 px-3 py-2 rounded-full">
                    <span>Get Started</span>
                    <div class="bg-blue-600 p-1 rounded-full relative overflow-hidden">
                        <ArrowUpRight
                            class="w-5 h-5 text-white relative z-10 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 translate-x-[-150%] translate-y-[150%]" />
                        <ArrowUpRight
                            class="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:translate-x-[150%] group-hover:translate-y-[-150%]" />
                    </div>
                </RouterLink>

                <RouterLink v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideLeft, 1000)"
                    to="/blog"
                    class="group flex justify-center items-center gap-2 border border-gray-200 px-3 py-2 rounded-full">
                    <span>See Today's Article</span>
                    <div class="bg-blue-600 p-1 rounded-full relative overflow-hidden">
                        <ArrowUpRight
                            class="w-5 h-5 text-white relative z-10 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 translate-x-[-150%] translate-y-[150%]" />
                        <ArrowUpRight
                            class="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:translate-x-[150%] group-hover:translate-y-[-150%]" />
                    </div>
                </RouterLink>
            </div>

            <div class="mt-10 flex justify-center">
                <div class="w-full max-w-[800px]">
                    <div class="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 items-center gap-10">
                        <div v-for="(data, index) in staticsData" :key="index"
                            v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 1200 + index * 200)"
                            class="text-center space-y-1">
                            <h2 class="text-4xl font-bold">{{ data.number }}</h2>
                            <p class="text-gray-500 text-sm">{{ data.label }}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-10 flex justify-center">
                <div v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 1800)"
                    class="w-[25px] h-[40px] rounded-full border border-gray-400 flex justify-center items-start pt-2.5">
                    <div class="w-1.5 h-3 border-2 border-gray-400 rounded-full animate-bounce"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { ArrowUpRight, Users } from 'lucide-vue-next';
import * as motionAnimation from "../../animation/motionAnimation"
import authApi from '../../../api/authApi';

const router = useRouter();
const isAuthenticated = ref(true);

const checkAuthStatus = () => {
    isAuthenticated.value = authApi.isAuthenticated();
};

watch(() => router.currentRoute.value, () => {
    checkAuthStatus();
});

onMounted(() => {
    checkAuthStatus();
});

const staticsData = [
    { number: '100K+', label: 'USERS WORLDWIDE' },
    { number: '200', label: 'FUN QUIZZES' },
    { number: '150', label: 'INSIGHTFUL BLOGS' },
]
</script>