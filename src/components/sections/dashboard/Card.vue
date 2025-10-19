<template>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="(item, index) in stats" :key="index"
            class="border border-gray-200 shadow-md rounded-xl p-5 bg-white">
            <div class="flex items-center gap-2 text-gray-600">
                <component :is="item.icon" class="w-5 h-5" />
                <span>{{ item.label }}</span>
            </div>

            <div class="flex items-center gap-2 mt-3">
                <span class="text-3xl font-bold">{{ item.value }}</span>
                <div :class="[
                    'px-2 py-1 rounded-full flex items-center gap-1 justify-center',
                    item.trend === 'up'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-red-100 text-red-600'
                ]">
                    <component :is="item.trend === 'up' ? ArrowUp : ArrowDown" class="w-4 h-4" />
                    <span class="text-xs font-bold">{{ item.percent }}</span>
                </div>
            </div>

            <p class="text-gray-600 mt-3">
                <span :class="item.trend === 'up' ? 'text-green-600' : 'text-red-600'" class="font-bold">
                    {{ item.trend === 'up' ? '+' : '' }}{{ item.change }}
                </span>
                than last month
            </p>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import {
    Users,
    ArrowUp,
    ArrowDown,
    MessageCircleQuestionMark,
    BookOpen,
} from "lucide-vue-next"

const stats = ref([
    {
        label: "Users",
        value: 120,
        percent: "12.8%",
        change: 12,
        trend: "up",
        icon: Users,
    },
    {
        label: "Quiz",
        value: 85,
        percent: "8.4%",
        change: -9,
        trend: "down",
        icon: MessageCircleQuestionMark,
    },
    {
        label: "Blog",
        value: 45,
        percent: "10.2%",
        change: 6,
        trend: "up",
        icon: BookOpen,
    },
    {
        label: "Completed Quizzes",
        value: 300,
        percent: "9.7%",
        change: -27,
        trend: "down",
        icon: MessageCircleQuestionMark,
    },
])
</script>
