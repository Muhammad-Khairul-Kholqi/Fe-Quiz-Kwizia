<template>
    <div class="flex justify-center px-5 py-10 bg-[#F8F9FD]">
        <div class="w-full max-w-[1300px]">
            <div class="flex flex-wrap justify-center items-center gap-3 md:gap-5">
                <div class="w-full max-w-[280px] border-3 border-white bg-white rounded-xl order-2 md:order-1 shadow-lg"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 400)">
                    <div
                        class="relative bg-gradient-to-tr from-[#F4F2FF] via-[#ECFBFF] to-[#FFF2EC] h-[110px] rounded-xl overflow-visible">
                        <div class="absolute top-2 right-3 text-right leading-none">
                            <p class="text-5xl font-bold text-white">
                                2<span class="text-xl align-top">nd</span>
                            </p>
                        </div>

                        <img src="https://placehold.co/80x80/f97316/white?text=2nd" alt="Second Place"
                            class="absolute bottom-0 left-5 translate-y-1/2 w-[80px] h-[80px] rounded-full border-3 border-white object-cover" />
                    </div>

                    <div class="p-4 mt-6">
                        <h2 class="text-xl font-bold text-[#0C2347]">Sarah Johnson</h2>
                        <div class="grid grid-cols-3 items-center gap-2 mt-4 divide-x divide-gray-200">
                            <div class="px-2">
                                <p class="text-base font-semibold text-[#0C2347]">1350</p>
                                <p class="text-xs text-gray-600">Points</p>
                            </div>
                            <div class="px-2">
                                <p class="text-base font-semibold text-[#0C2347]">280</p>
                                <p class="text-xs text-gray-600">Quizzes</p>
                            </div>
                            <div class="px-2">
                                <p class="text-base font-semibold text-[#0C2347]">45</p>
                                <p class="text-xs text-gray-600">Success</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full max-w-[320px] border-3 border-white bg-white rounded-xl order-1 md:order-2 shadow-lg"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 200)">
                    <div
                        class="relative bg-gradient-to-tr from-[#F3E7FF] via-[#FEE4F3] to-[#FEEFD0] h-[130px] rounded-xl overflow-visible">
                        <div class="absolute top-2 right-3 text-right leading-none">
                            <p class="text-7xl font-bold text-white">
                                1<span class="text-3xl align-top">st</span>
                            </p>
                        </div>

                        <img src="https://placehold.co/100x100/9333ea/white?text=1st" alt="First Place"
                            class="absolute bottom-0 left-5 translate-y-1/2 w-[100px] h-[100px] rounded-full border-4 border-white object-cover" />
                    </div>

                    <div class="p-5 mt-8">
                        <h2 class="text-2xl font-bold text-[#0C2347]">Khairul Kholqi</h2>
                        <div class="grid grid-cols-3 items-center gap-2 mt-5 divide-x divide-gray-200">
                            <div class="px-2">
                                <p class="text-lg font-semibold text-[#0C2347]">1500</p>
                                <p class="text-sm text-gray-600">Points</p>
                            </div>
                            <div class="px-2">
                                <p class="text-lg font-semibold text-[#0C2347]">300</p>
                                <p class="text-sm text-gray-600">Quizzes</p>
                            </div>
                            <div class="px-2">
                                <p class="text-lg font-semibold text-[#0C2347]">50</p>
                                <p class="text-sm text-gray-600">Success</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full max-w-[280px] border-3 border-white bg-white rounded-xl order-3 shadow-lg"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 600)">
                    <div
                        class="relative bg-gradient-to-tr from-[#E6F5FA] via-[#FFF0F0] to-[#E9F9E8] h-[110px] rounded-xl overflow-visible">
                        <div class="absolute top-2 right-3 text-right leading-none">
                            <p class="text-5xl font-bold text-white">
                                3<span class="text-xl align-top">rd</span>
                            </p>
                        </div>

                        <img src="https://placehold.co/80x80/ef4444/white?text=3rd" alt="Third Place"
                            class="absolute bottom-0 left-5 translate-y-1/2 w-[80px] h-[80px] rounded-full border-3 border-white object-cover" />
                    </div>

                    <div class="p-4 mt-6">
                        <h2 class="text-xl font-bold text-[#0C2347]">Michael Chen</h2>
                        <div class="grid grid-cols-3 items-center gap-2 mt-4 divide-x divide-gray-200">
                            <div class="px-2">
                                <p class="text-base font-semibold text-[#0C2347]">1200</p>
                                <p class="text-xs text-gray-600">Points</p>
                            </div>
                            <div class="px-2">
                                <p class="text-base font-semibold text-[#0C2347]">250</p>
                                <p class="text-xs text-gray-600">Quizzes</p>
                            </div>
                            <div class="px-2">
                                <p class="text-base font-semibold text-[#0C2347]">40</p>
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
</script>