<template>
    <div class="flex justify-center p-4 sm:p-6">
        <div class="w-full max-w-[1300px] space-y-6 sm:space-y-8">
            <div class="text-center">
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">Your Quiz History</h1>
                <p class="text-gray-500 mt-1 text-sm sm:text-base">See how far you've come in your learning journey!</p>
            </div>

            <div class="flex justify-center">
                <div class="w-full max-w-[700px] flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div class="flex-1 border border-gray-200 p-3 flex items-center gap-2 rounded-lg">
                        <Search class="w-5 h-5 text-gray-600 flex-shrink-0" />
                        <input v-model="searchQuery" type="text" class="w-full px-2 outline-none"
                            placeholder="Search quiz by name or category">
                    </div>

                    <div class="relative sm:w-[180px]">
                        <button @click="toggleDropdown"
                            class="w-full border border-gray-200 p-3 flex items-center justify-between gap-2 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                            <span class="text-gray-600 text-sm sm:text-base">{{ selectedFilter }}</span>
                            <ChevronDown class="w-5 h-5 text-gray-600 flex-shrink-0 transition-transform"
                                :class="{ 'rotate-180': isDropdownOpen }" />
                        </button>

                        <div v-if="isDropdownOpen"
                            class="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg overflow-hidden">
                            <button v-for="filter in filterOptions" :key="filter.value" @click="selectFilter(filter)"
                                class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm sm:text-base cursor-pointer"
                                :class="{ 'bg-blue-50 text-blue-600 font-medium': selectedFilter === filter.label }">
                                {{ filter.label }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="filteredData.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                <div v-for="(quiz, index) in filteredData" :key="index"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 200 + index * 200)"
                    class="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 flex flex-col justify-between">
                    <div class="flex items-center gap-3 sm:gap-4 mb-4">
                        <img :src="quiz.avatar" :alt="quiz.quizName"
                            class="w-12 h-12 sm:w-15 sm:h-15 rounded-xl object-cover flex-shrink-0" />
                        <div class="min-w-0">
                            <h3 class="font-bold text-base sm:text-lg text-gray-800 truncate">{{ quiz.quizName }}</h3>
                            <p class="text-gray-400 text-xs sm:text-sm">{{ quiz.category }}</p>
                        </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 sm:gap-3 text-sm text-gray-700 mb-4">
                        <div class="bg-gray-50 rounded-xl p-2 sm:p-3 text-center">
                            <p class="text-xs text-gray-500">Points</p>
                            <p class="font-bold text-blue-600 text-base sm:text-lg">{{ quiz.point }}</p>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-2 sm:p-3 text-center">
                            <p class="text-xs text-gray-500">Questions</p>
                            <p class="font-bold text-base sm:text-lg">{{ quiz.question }}</p>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-2 sm:p-3 text-center">
                            <p class="text-xs text-gray-500">Correct</p>
                            <p class="font-bold text-green-600 text-base sm:text-lg">{{ quiz.correctAnswer }}</p>
                        </div>
                        <div class="bg-gray-50 rounded-xl p-2 sm:p-3 text-center">
                            <p class="text-xs text-gray-500">Wrong</p>
                            <p class="font-bold text-red-500 text-base sm:text-lg">{{ quiz.wrongAnswer }}</p>
                        </div>
                    </div>

                    <div
                        class="flex items-center justify-between text-gray-500 text-xs sm:text-sm mt-auto pt-3 border-t border-gray-100">
                        <div class="flex items-center gap-1">
                            <Clock class="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{{ quiz.time }}s</span>
                        </div>
                        <span>{{ quiz.date }}</span>
                    </div>
                </div>
            </div>

            <div v-else class="text-center">
                <h3 class="font-semibold text-gray-700 text-base sm:text-lg mb-1">
                    {{ searchQuery ? 'No Results Found' : 'No Quiz History Yet' }}
                </h3>
                <p class="text-gray-500 text-xs sm:text-sm">
                    {{ searchQuery ? 'Try adjusting your search or filter.' : 'Take your first quiz to start tracking your learning progress.' }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Clock, Search, ChevronDown } from "lucide-vue-next";
import motionAnimation from "../../../components/animation/motionAnimation";

const searchQuery = ref('');
const isDropdownOpen = ref(false);
const selectedFilter = ref('Most Recent');

const filterOptions = [
    { label: 'Most Recent', value: 'recent' },
    { label: 'Highest Points', value: 'points' }
];

const leaderboardData = [
    {
        quizName: "Sejarah Indonesia",
        avatar: "https://placehold.co/60x60",
        category: "History",
        question: 15,
        time: 120,
        point: 450,
        correctAnswer: 12,
        wrongAnswer: 3,
        date: "Oct 1, 2025",
        timestamp: new Date('2025-10-01').getTime()
    },
    {
        quizName: "Mathematics Mastery",
        avatar: "https://placehold.co/60x60",
        category: "Math",
        question: 20,
        time: 150,
        point: 620,
        correctAnswer: 18,
        wrongAnswer: 2,
        date: "Sep 28, 2025",
        timestamp: new Date('2025-09-28').getTime()
    },
    {
        quizName: "Tech Fundamentals",
        avatar: "https://placehold.co/60x60",
        category: "Technology",
        question: 10,
        time: 90,
        point: 300,
        correctAnswer: 8,
        wrongAnswer: 2,
        date: "Sep 22, 2025",
        timestamp: new Date('2025-09-22').getTime()
    },
];

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const selectFilter = (filter) => {
    selectedFilter.value = filter.label;
    isDropdownOpen.value = false;
};

const filteredData = computed(() => {
    let result = [...leaderboardData];

    // Filter berdasarkan search query
    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(quiz =>
            quiz.quizName.toLowerCase().includes(query) ||
            quiz.category.toLowerCase().includes(query)
        );
    }

    // Sort berdasarkan filter yang dipilih
    if (selectedFilter.value === 'Most Recent') {
        result.sort((a, b) => b.timestamp - a.timestamp);
    } else if (selectedFilter.value === 'Highest Points') {
        result.sort((a, b) => b.point - a.point);
    }

    return result;
});
</script>