<template>
    <div class="flex justify-center p-5 bg-[#F8F9FD]/70">
        <div class="w-full max-w-[1500px]">
            <span class="text-gray-600 text-sm font-bold">PROFILE</span>

            <div class="flex flex-col md:flex-row items-center gap-5 mt-5">
                <img src="https://placehold.co/250x250" alt="Profile Picture" class="w-[250px] h-[250px] rounded-xl" />

                <div class="text-center md:text-left">
                    <span class="font-bold text-blue-600 text-lg">#5</span>
                    <div class="flex items-center justify-center md:justify-start gap-2">
                        <h1 class="font-bold text-3xl mt-2">Sarah Johnson</h1>
                        <button class="cursor-pointer hover:text-blue-600 transition-colors">
                            <Pencil class="w-5 h-5" />
                        </button>
                    </div>

                    <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-3 text-gray-600">
                        <span>sarah@gmail.com</span>
                        <div class="bg-gray-500 p-0.5 rounded-full"></div>
                        <span>12 August 2012</span>
                    </div>

                    <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-5">
                        <div v-for="(stat, index) in stats" :key="index"
                            class="flex items-center gap-3 border border-gray-200 py-2 px-4 rounded-full">
                            <div :class="`bg-gradient-to-br ${stat.gradient} p-2 rounded-full`">
                                <component :is="stat.icon" class="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 class="font-bold text-sm">{{ stat.title }}</h3>
                                <h4 :class="`text-sm font-bold ${stat.color} text-start`">{{ stat.value }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Coins, CircleQuestionMark, LaptopMinimalCheck, Pencil } from 'lucide-vue-next'

const stats = [
    {
        title: "TOTAL POINTS EARNED",
        value: "290",
        color: "text-green-500",
        gradient: "from-green-700 to-green-500",
        icon: Coins,
    },
    {
        title: "QUIZZES COMPLETED",
        value: "280",
        color: "text-purple-500",
        gradient: "from-purple-700 to-purple-500",
        icon: CircleQuestionMark,
    },
    {
        title: "SUCCESSFUL ATTEMPTS",
        value: "45",
        color: "text-pink-500",
        gradient: "from-pink-700 to-pink-500",
        icon: LaptopMinimalCheck,
    },
]
</script>
