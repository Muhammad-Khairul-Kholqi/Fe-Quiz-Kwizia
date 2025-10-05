<template>
    <div class="flex justify-center p-5 mt-10">
        <div class="w-full max-w-[1300px]">
            <div class="scrollbar-hide w-full overflow-x-auto">
                <div class="flex justify-between items-center font-semibold p-3 min-w-[700px]">
                    <div class="flex items-center gap-5">
                        <span class="text-gray-600 w-12">Rank</span>
                        <span class="text-gray-600 w-40">Name</span>
                    </div>

                    <div class="flex items-center text-center divide-x divide-gray-300">
                        <span class="w-24 text-sm tracking-wide">Points</span>
                        <span class="w-24 text-sm tracking-wide">Quizzes</span>
                        <span class="w-24 text-sm tracking-wide">Success</span>
                    </div>
                </div>

                <div v-for="(user, index) in leaderboardData" :key="index" v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideLeft, 200 + index * 200)"
                    class=" flex justify-between items-center p-3 border-b border-gray-200 min-w-[700px]
                    hover:bg-gray-50 transition-colors">
                    <div class="flex items-center gap-5">
                        <span class="text-gray-600 w-12">{{ user.rank }}</span>
                        <div class="flex items-center gap-2">
                            <img :src="user.avatar" :alt="user.name" class="w-10 h-10 rounded-full">
                            <span class="text-gray-600 w-40">{{ user.name }}</span>
                        </div>
                    </div>

                    <div class="flex items-center divide-x divide-gray-200 text-center">
                        <span class="w-24 text-gray-700">{{ user.points }}</span>
                        <span class="w-24 text-gray-700">{{ user.quizzes }}</span>
                        <span class="w-24 text-gray-700">{{ user.success }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import * as motionAnimation from "../../animation/motionAnimation"

const leaderboardData = [
    { rank: 4, name: 'Khairul Kholqi', avatar: 'https://placehold.co/40x40', points: 300, quizzes: 200, success: 100 },
    { rank: 5, name: 'Sarah Johnson', avatar: 'https://placehold.co/40x40', points: 290, quizzes: 195, success: 98 },
    { rank: 6, name: 'Michael Chen', avatar: 'https://placehold.co/40x40', points: 285, quizzes: 190, success: 95 },
    { rank: 7, name: 'Emily Davis', avatar: 'https://placehold.co/40x40', points: 280, quizzes: 185, success: 92 },
    { rank: 8, name: 'James Wilson', avatar: 'https://placehold.co/40x40', points: 275, quizzes: 180, success: 90 },
    { rank: 9, name: 'Olivia Brown', avatar: 'https://placehold.co/40x40', points: 270, quizzes: 175, success: 88 },
    { rank: 10, name: 'Daniel Martinez', avatar: 'https://placehold.co/40x40', points: 265, quizzes: 170, success: 85 },
]
</script>