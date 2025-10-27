<template>
    <div class="flex justify-center p-5 select-none">
        <div class="w-full max-w-[1500px]">
            <div class="bg-[#F8F9FD] p-5 rounded-xl flex flex-col md:flex-row items-center gap-5">
                <div class="w-full max-w-[300px] h-[300px] flex items-center justify-center bg-white rounded-xl">
                    <svg v-if="resultData.is_perfect" class="w-32 h-32 text-yellow-500" fill="none"
                        stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <svg v-else class="w-32 h-32 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>

                <div class="space-y-5 text-center md:text-left w-full">
                    <div class="flex justify-center md:justify-start">
                        <div :class="[
                            'px-4 py-2 rounded-lg',
                            resultData.is_perfect ? 'bg-yellow-50 text-yellow-600' : 'bg-green-50 text-green-600'
                        ]">
                            <span>{{ resultData.is_perfect ? 'Perfect Score!' : 'Quiz Completed' }}</span>
                        </div>
                    </div>

                    <h1 class="text-3xl font-bold">Your Quiz Results</h1>

                    <div class="flex items-center gap-5 justify-center md:justify-start flex-wrap">
                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="font-semibold text-lg">
                                {{ resultData.total_correct }}/{{ resultData.total_questions }}
                                <span class="text-gray-600 font-normal">Correct</span>
                            </span>
                        </div>

                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                                </path>
                            </svg>
                            <span class="font-semibold text-lg">{{ resultData.points_earned }} Points</span>
                        </div>

                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="font-semibold text-lg">{{ resultData.time_taken }}/{{ resultData.time_limit }}
                                min</span>
                        </div>

                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z">
                                </path>
                            </svg>
                            <span class="font-semibold text-lg">{{ resultData.score }}%</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 justify-center md:justify-start">
                        <div class="flex">
                            <button @click="$emit('back')"
                                class="text-center w-[200px] bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer px-5 py-2 rounded-full text-white">
                                Back to Quiz List
                            </button>
                        </div>

                        <div class="flex">
                            <button @click="toggleDetails"
                                class="border border-gray-200 flex items-center justify-center px-5 py-2 rounded-full hover:bg-gray-100 cursor-pointer bg-white">
                                <span class="text-gray-700 text-sm">{{ showDetails ? 'Hide' : 'View' }} Details</span>
                            </button>
                        </div>
                    </div>

                    <p class="text-gray-700">
                        {{ getMessage() }}
                    </p>
                </div>
            </div>

            <div v-if="showDetails" class="mt-5">
                <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 md:p-8">
                    <h3 class="font-semibold text-blue-700 mb-5 text-xl">
                        Detailed Answers
                    </h3>
                    <div class="space-y-4">
                        <div v-for="(result, index) in resultData.results" :key="index"
                            class="bg-white rounded-lg p-4 border-l-4"
                            :class="result.is_correct ? 'border-l-green-500' : 'border-l-red-500'">
                            <div class="flex items-start gap-3 mb-3">
                                <span class="font-semibold text-gray-700 min-w-[24px]">{{ index + 1 }}.</span>
                                <div class="flex-1">
                                    <p class="text-gray-800 font-medium mb-2">{{ result.question }}</p>
                                    <div class="text-sm space-y-1">
                                        <p class="text-gray-700">
                                            <span class="font-medium">Your Answer:</span>
                                            <span
                                                :class="result.is_correct ? 'text-green-600 font-semibold ml-1' : 'text-red-600 font-semibold ml-1'">
                                                {{ result.your_answer }}
                                            </span>
                                        </p>
                                        <p v-if="!result.is_correct" class="text-green-600">
                                            <span class="font-medium">Correct Answer:</span>
                                            <span class="font-semibold ml-1">{{ result.correct_answer }}</span>
                                        </p>
                                    </div>
                                </div>
                                <div class="flex-shrink-0">
                                    <svg v-if="result.is_correct" class="w-6 h-6 text-green-500" fill="none"
                                        stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <svg v-else class="w-6 h-6 text-red-500" fill="none" stroke="currentColor"
                                        viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
                                        </path>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    resultData: {
        type: Object,
        required: true
    }
});

defineEmits(['restart', 'back']);

const showDetails = ref(false);

const toggleDetails = () => {
    showDetails.value = !showDetails.value;
};

const getMessage = () => {
    const score = props.resultData.score;
    const totalQuestions = props.resultData.total_questions;
    const totalCorrect = props.resultData.total_correct;

    if (totalCorrect === totalQuestions) {
        return 'Perfect! You answered all questions correctly!';
    } else if (score >= 70) {
        return 'Great job! You did really well on this quiz.';
    } else if (score >= 50) {
        return 'Good effort! Keep practicing to improve your score.';
    } else {
        return 'Don\'t give up! Review the material and try again.';
    }
};
</script>