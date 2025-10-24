<template>
    <div class="flex justify-center px-5 py-10 bg-[#F8F9FD]/70">
        <div class="w-full max-w-[1500px]">
            <div v-if="loading" class="flex flex-wrap justify-center items-center gap-3 md:gap-5">
                <div v-for="i in 3" :key="i" :class="['w-full border-3 border-white bg-white rounded-xl shadow-lg',
                    i === 2 ? 'max-w-[320px] order-1 md:order-2' : 'max-w-[280px]',
                    i === 1 ? 'order-2 md:order-1' : '',
                    i === 3 ? 'order-3' : '']">
                    <div :class="['relative bg-gradient-to-tr from-gray-200 to-gray-100 rounded-xl overflow-visible',
                        i === 2 ? 'h-[130px]' : 'h-[110px]']">
                        <LoadingSkeleton type="circle" :size="i === 2 ? '100px' : '80px'"
                            class="absolute -bottom-3 left-5 translate-y-1/2" />
                    </div>
                    <div :class="['p-4', i === 2 ? 'mt-8' : 'mt-6']">
                        <LoadingSkeleton type="text" width="70%" height="24px" class="mb-4" />
                        <div class="grid grid-cols-3 items-center gap-2 divide-x divide-gray-200">
                            <div class="px-2">
                                <LoadingSkeleton type="text" width="60%" height="20px" class="mb-2" />
                                <LoadingSkeleton type="text" width="80%" height="14px" />
                            </div>
                            <div class="px-2">
                                <LoadingSkeleton type="text" width="60%" height="20px" class="mb-2" />
                                <LoadingSkeleton type="text" width="80%" height="14px" />
                            </div>
                            <div class="px-2">
                                <LoadingSkeleton type="text" width="60%" height="20px" class="mb-2" />
                                <LoadingSkeleton type="text" width="80%" height="14px" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="flex flex-wrap justify-center items-center gap-3 md:gap-5">
                <div v-if="topThree[1]"
                    class="w-full max-w-[280px] border-3 border-white bg-white rounded-xl order-2 md:order-1 shadow-lg"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 400)">
                    <div
                        class="relative bg-gradient-to-tr from-[#F4F2FF] via-[#ECFBFF] to-[#FFF2EC] h-[110px] rounded-xl overflow-visible">
                        <div class="absolute top-2 right-3 text-right leading-none">
                            <p class="text-5xl font-bold text-white">
                                2<span class="text-xl align-top">nd</span>
                            </p>
                        </div>
                        <img :src="topThree[1].avatars?.image_url || 'https://placehold.co/80x80/f97316/white?text=2nd'"
                            :alt="topThree[1].username"
                            class="absolute bottom-0 left-5 translate-y-1/2 w-[80px] h-[80px] rounded-full border-3 border-white object-cover" />
                    </div>
                    <div class="p-4 mt-6">
                        <h2 class="text-xl font-bold text-[#0C2347]">{{ topThree[1].username }}</h2>
                        <div class="grid grid-cols-3 items-center gap-2 mt-4 divide-x divide-gray-200">
                            <div class="px-2">
                                <p class="text-base font-semibold text-[#0C2347]">{{ topThree[1].total_points }}</p>
                                <p class="text-xs text-gray-600">Points</p>
                            </div>
                            <div class="px-2">
                                <p class="text-base font-semibold text-[#0C2347]">{{ topThree[1].total_quiz_completed }}
                                </p>
                                <p class="text-xs text-gray-600">Quizzes</p>
                            </div>
                            <div class="px-2">
                                <p class="text-base font-semibold text-[#0C2347]">{{ topThree[1].total_perfect_attempts
                                    }}</p>
                                <p class="text-xs text-gray-600">Success</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="topThree[0]"
                    class="w-full max-w-[320px] border-3 border-white bg-white rounded-xl order-1 md:order-2 shadow-lg"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 200)">
                    <div
                        class="relative bg-gradient-to-tr from-[#F3E7FF] via-[#FEE4F3] to-[#FEEFD0] h-[130px] rounded-xl overflow-visible">
                        <div class="absolute top-2 right-3 text-right leading-none">
                            <p class="text-7xl font-bold text-white">
                                1<span class="text-3xl align-top">st</span>
                            </p>
                        </div>
                        <img :src="topThree[0].avatars?.image_url || 'https://placehold.co/100x100/9333ea/white?text=1st'"
                            :alt="topThree[0].username"
                            class="absolute bottom-0 left-5 translate-y-1/2 w-[100px] h-[100px] rounded-full border-4 border-white object-cover" />
                    </div>
                    <div class="p-5 mt-8">
                        <h2 class="text-2xl font-bold text-[#0C2347]">{{ topThree[0].username }}</h2>
                        <div class="grid grid-cols-3 items-center gap-2 mt-5 divide-x divide-gray-200">
                            <div class="px-2">
                                <p class="text-lg font-semibold text-[#0C2347]">{{ topThree[0].total_points }}</p>
                                <p class="text-sm text-gray-600">Points</p>
                            </div>
                            <div class="px-2">
                                <p class="text-lg font-semibold text-[#0C2347]">{{ topThree[0].total_quiz_completed }}
                                </p>
                                <p class="text-sm text-gray-600">Quizzes</p>
                            </div>
                            <div class="px-2">
                                <p class="text-lg font-semibold text-[#0C2347]">{{ topThree[0].total_perfect_attempts }}
                                </p>
                                <p class="text-sm text-gray-600">Success</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div v-if="topThree[2]"
                    class="w-full max-w-[280px] border-3 border-white bg-white rounded-xl order-3 shadow-lg"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 600)">
                    <div
                        class="relative bg-gradient-to-tr from-[#E6F5FA] via-[#FFF0F0] to-[#E9F9E8] h-[110px] rounded-xl overflow-visible">
                        <div class="absolute top-2 right-3 text-right leading-none">
                            <p class="text-5xl font-bold text-white">
                                3<span class="text-xl align-top">rd</span>
                            </p>
                        </div>
                        <img :src="topThree[2].avatars?.image_url || 'https://placehold.co/80x80/ef4444/white?text=3rd'"
                            :alt="topThree[2].username"
                            class="absolute bottom-0 left-5 translate-y-1/2 w-[80px] h-[80px] rounded-full border-3 border-white object-cover" />
                    </div>
                    <div class="p-4 mt-6">
                        <h2 class="text-xl font-bold text-[#0C2347]">{{ topThree[2].username }}</h2>
                        <div class="grid grid-cols-3 items-center gap-2 mt-4 divide-x divide-gray-200">
                            <div class="px-2">
                                <p class="text-base font-semibold text-[#0C2347]">{{ topThree[2].total_points }}</p>
                                <p class="text-xs text-gray-600">Points</p>
                            </div>
                            <div class="px-2">
                                <p class="text-base font-semibold text-[#0C2347]">{{ topThree[2].total_quiz_completed }}
                                </p>
                                <p class="text-xs text-gray-600">Quizzes</p>
                            </div>
                            <div class="px-2">
                                <p class="text-base font-semibold text-[#0C2347]">{{ topThree[2].total_perfect_attempts
                                    }}</p>
                                <p class="text-xs text-gray-600">Success</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import * as motionAnimation from "../../animation/motionAnimation";
import LoadingSkeleton from '../../ui/LoadingSkeleton.vue';

defineProps({
    loading: {
        type: Boolean,
        required: true
    },
    topThree: {
        type: Array,
        default: () => []
    }
});
</script>