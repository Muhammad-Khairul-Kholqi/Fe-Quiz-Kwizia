<template>
    <div class="flex justify-center px-5 py-10 bg-[#F8F9FD]">
        <div class="w-full max-w-[1500px]">
            <div class="flex items-center justify-between gap-5">
                <span class="text-gray-600 text-sm font-bold">PROFILE</span>
                <button
                    class="border border-blue-600 hover:bg-blue-50 px-3 py-2 rounded-full text-sm text-blue-600 cursor-pointer">
                    EDIT PROFILE
                </button>
            </div>

            <div class="flex flex-col md:flex-row items-center gap-5 mt-5">
                <img src="https://placehold.co/250x250" alt="" class="w-[250px] h-[250px] rounded-xl">
                <div class="text-center md:text-left">
                    <span class="font-bold text-blue-600 text-lg">#5</span>
                    <h1 class="font-bold text-2xl mt-2">Sarah Johnson</h1>
                    <div class="flex items-center justify-center md:justify-start gap-3 mt-2">
                        <span class="text-blue-600">sarah@gmail.com</span>
                        <div class="bg-gray-500 p-0.5 rounded-full"></div>
                        <span>12 August 2012</span>
                    </div>
                    <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-5">
                        <div class="flex items-center gap-3 border border-gray-200 py-2 px-3 rounded-full">
                            <div class="bg-gradient-to-br from-green-700 to-green-500 p-2 rounded-full">
                                <Coins class="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 class="font-bold text-sm">TOTAL POINTS EARNED</h3>
                                <h4 class="text-sm font-bold text-green-500 text-start">290</h4>
                            </div>
                        </div>

                        <div class="flex items-center gap-3 border border-gray-200 py-2 px-3 rounded-full">
                            <div class="bg-gradient-to-br from-purple-700 to-purple-500 p-2 rounded-full">
                                <CircleQuestionMark class="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 class="font-bold text-sm">QUIZZES COMPLETED</h3>
                                <h4 class="text-sm font-bold text-purple-500 text-start">290</h4>
                            </div>
                        </div>

                        <div class="flex items-center gap-3 border border-gray-200 py-2 px-3 rounded-full">
                            <div class="bg-gradient-to-br from-pink-700 to-pink-500 p-2 rounded-full">
                                <Coins class="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 class="font-bold text-sm">SUCCESSFUL ATTEMPTS</h3>
                                <h4 class="text-sm font-bold text-pink-500 text-start">290</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Coins, CircleQuestionMark } from 'lucide-vue-next';
</script>