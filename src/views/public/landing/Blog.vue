<template>
    <div class="flex justify-center p-5">
        <div class="w-full max-w-[1500px]">
            <div class="mt-5 text-center">
                <h1 class="text-4xl font-bold">Kwizia Quiz Blog</h1>
                <p class="mt-2 text-gray-600 text-lg">Stay updated with the latest news, tips, and insights from Kwizia
                </p>
            </div>

            <div class="flex justify-center mt-5 px-4">
                <div class="w-full max-w-[600px] border border-gray-300 rounded-full p-2 flex items-center gap-2">
                    <input type="text" class="flex-1 outline-none px-4 py-3 min-w-0" placeholder="Search articles...">
                    <button
                        class="bg-blue-600 hover:bg-blue-700 cursor-pointer px-6 py-3 text-white rounded-full whitespace-nowrap transition-colors flex-shrink-0">
                        Search
                    </button>
                </div>
            </div>

            <div class="scrollbar-hide flex items-center gap-7 w-full overflow-auto mt-20 pb-3 text-lg">
                <div class="cursor-pointer hover:text-blue-600 transition-colors">All</div>
                <div class="cursor-pointer hover:text-blue-600 transition-colors">Technology</div>
                <div class="cursor-pointer hover:text-blue-600 transition-colors">Education</div>
                <div class="cursor-pointer hover:text-blue-600 transition-colors">Productivity</div>
                <div class="cursor-pointer hover:text-blue-600 transition-colors">Announcements</div>
            </div>

            <div class="mt-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 items-center gap-6">
                <div v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 200 + index * 200)"
                    v-for="index in 6" :key="index" class="group cursor-pointer">
                    <div class="relative overflow-hidden rounded-lg border border-gray-200">
                        <img src="https://img.freepik.com/free-vector/gradient-isometric-laptop-technology-background_52683-6159.jpg"
                            alt="" class="w-full h-[200px] object-cover rounded-lg group-hover:scale-110 duration-300">
                    </div>
                    <h2 class="text-2xl font-semibold mt-3 group-hover:text-blue-700">
                        Make Every Round Count: How to Use ‘Round Mode’ for Active Learning
                    </h2>
                    <p class="text-gray-700 text-lg mt-1">
                        A real teacher’s review of the gamified quiz platform ZEP QUIZ: see how it
                    </p>
                    <div class="text-gray-600 mt-2">Jan 21, 2024</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import * as motionAnimation from "../../../components/animation/motionAnimation";
</script>