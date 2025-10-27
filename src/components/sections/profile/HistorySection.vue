<template>
    <div class="flex justify-center p-5 mt-10">
        <div class="w-full max-w-[1500px] space-y-6 sm:space-y-8">
            <div class="flex justify-start">
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
                            class="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg">
                            <button v-for="filter in filterOptions" :key="filter.value" @click="selectFilter(filter)"
                                class="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors text-sm sm:text-base cursor-pointer"
                                :class="{ 'bg-blue-50 text-blue-600 font-medium': selectedFilter === filter.label }">
                                {{ filter.label }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="loading" class="space-y-3">
                <div v-for="i in 5" :key="i" class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <div class="flex items-center gap-4 flex-1 min-w-0">
                            <LoadingSkeleton type="square" width="64px" height="64px" class="rounded-lg" />
                            <div class="min-w-0 flex-1 space-y-3">
                                <LoadingSkeleton type="text" width="200px" height="24px" />
                                <div class="flex items-center gap-2">
                                    <LoadingSkeleton type="text" width="80px" height="20px" />
                                    <LoadingSkeleton type="text" width="100px" height="20px" />
                                </div>
                            </div>
                        </div>

                        <div class="hidden sm:flex items-center gap-3 sm:gap-4">
                            <LoadingSkeleton type="square" width="70px" height="64px" class="rounded-xl" />
                            <LoadingSkeleton type="square" width="70px" height="64px" class="rounded-xl" />
                            <LoadingSkeleton type="square" width="70px" height="64px" class="rounded-xl" />
                            <LoadingSkeleton type="square" width="70px" height="64px" class="rounded-xl" />
                            <LoadingSkeleton type="square" width="90px" height="64px"
                                class="rounded-xl hidden md:block" />
                        </div>
                    </div>
                </div>
            </div>

            <div v-else-if="filteredData.length > 0" class="space-y-3">
                <div v-for="(attempt, index) in filteredData" :key="attempt.id"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 200 + index * 100)"
                    class="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6">

                    <div class="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                        <div class="flex items-center gap-4 flex-1 min-w-0">
                            <div class="w-14 h-14 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-white font-bold text-2xl flex-shrink-0"
                                :class="getScoreColor(attempt.score)">
                                {{ attempt.score }}
                            </div>
                            <div class="min-w-0 flex-1">
                                <h3 class="font-bold text-lg sm:text-xl text-gray-800 truncate mb-1">
                                    {{ attempt.quiz.title }}
                                </h3>
                                <div class="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                                    <span class="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg font-medium">
                                        {{ attempt.quiz.category_quiz.name }}
                                    </span>
                                    <span>•</span>
                                    <span>{{ formatDate(attempt.completed_at) }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center gap-3 sm:gap-4">
                            <div
                                class="text-center px-3 py-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl min-w-[70px]">
                                <p class="text-xs text-blue-600 font-medium mb-1">Points</p>
                                <p class="font-bold text-blue-600 text-lg">{{ attempt.total_correct * 10 }}</p>
                            </div>

                            <div class="text-center px-3 py-2 bg-gray-50 rounded-xl min-w-[70px]">
                                <p class="text-xs text-gray-500 font-medium mb-1">Questions</p>
                                <p class="font-bold text-gray-700 text-lg">{{ attempt.quiz.total_questions }}</p>
                            </div>

                            <div class="hidden sm:block text-center px-3 py-2 bg-green-50 rounded-xl min-w-[70px]">
                                <p class="text-xs text-green-600 font-medium mb-1">Correct</p>
                                <p class="font-bold text-green-600 text-lg">{{ attempt.total_correct }}</p>
                            </div>

                            <div class="hidden sm:block text-center px-3 py-2 bg-red-50 rounded-xl min-w-[70px]">
                                <p class="text-xs text-red-500 font-medium mb-1">Wrong</p>
                                <p class="font-bold text-red-500 text-lg">
                                    {{ attempt.quiz.total_questions - attempt.total_correct }}
                                </p>
                            </div>

                            <div class="hidden md:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl">
                                <Clock class="w-4 h-4 text-gray-500" />
                                <span class="font-semibold text-gray-700">{{ calculateTime(attempt) }}m</span>
                            </div>
                        </div>
                    </div>

                    <div class="sm:hidden flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                        <div class="flex items-center gap-4">
                            <div class="text-center">
                                <p class="text-xs text-green-600 font-medium mb-1">Correct</p>
                                <p class="font-bold text-green-600">{{ attempt.total_correct }}</p>
                            </div>
                            <div class="text-center">
                                <p class="text-xs text-red-500 font-medium mb-1">Wrong</p>
                                <p class="font-bold text-red-500">
                                    {{ attempt.quiz.total_questions - attempt.total_correct }}
                                </p>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg">
                            <Clock class="w-4 h-4 text-gray-500" />
                            <span class="font-semibold text-gray-700 text-sm">{{ calculateTime(attempt) }}m</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="text-center py-10">
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
import { ref, computed, onMounted } from 'vue';
import { Clock, Search, ChevronDown } from "lucide-vue-next";
import * as motionAnimation from '../../animation/motionAnimation';
import LoadingSkeleton from '../../../components/ui/LoadingSkeleton.vue';
import { getMyQuizHistory } from '../../../api/quizApi';
import Swal from 'sweetalert2';

const loading = ref(false);
const searchQuery = ref('');
const isDropdownOpen = ref(false);
const selectedFilter = ref('Most Recent');
const historyData = ref([]);

const filterOptions = [
    { label: 'Most Recent', value: 'recent' },
    { label: 'Highest Score', value: 'score' },
    { label: 'Highest Points', value: 'points' }
];

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const selectFilter = (filter) => {
    selectedFilter.value = filter.label;
    isDropdownOpen.value = false;
};

const getScoreColor = (score) => {
    if (score === 100) return 'bg-gradient-to-br from-yellow-500 to-yellow-600';
    if (score >= 80) return 'bg-gradient-to-br from-green-500 to-green-600';
    if (score >= 60) return 'bg-gradient-to-br from-blue-500 to-blue-600';
    if (score >= 40) return 'bg-gradient-to-br from-orange-500 to-orange-600';
    return 'bg-gradient-to-br from-red-500 to-red-600';
};

const calculateTime = (attempt) => {
    const start = new Date(attempt.started_at);
    const end = new Date(attempt.completed_at);
    const minutes = Math.round((end - start) / 1000 / 60);
    return minutes;
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const filteredData = computed(() => {
    let result = [...historyData.value];

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(attempt =>
            attempt.quiz.title.toLowerCase().includes(query) ||
            attempt.quiz.category_quiz.name.toLowerCase().includes(query)
        );
    }

    if (selectedFilter.value === 'Most Recent') {
        result.sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at));
    } else if (selectedFilter.value === 'Highest Score') {
        result.sort((a, b) => b.score - a.score);
    } else if (selectedFilter.value === 'Highest Points') {
        result.sort((a, b) => (b.total_correct * 10) - (a.total_correct * 10));
    }

    return result;
});

const fetchHistory = async () => {
    try {
        loading.value = true;
        const response = await getMyQuizHistory(50);

        if (response.success && response.data) {
            historyData.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching quiz history:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load quiz history. Please try again later.',
        });
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchHistory();
});
</script>