<template>
    <div class="flex justify-center p-5 select-none">
        <div class="w-full max-w-[1500px]">
            <div class="bg-white rounded-lg shadow-lg p-4 sm:p-8 text-center">
                <div class="mb-6">
                    <svg class="w-16 h-16 sm:w-20 sm:h-20 mx-auto text-green-500" fill="none" stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>
                <h1 class="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Quiz Selesai!</h1>
                <div class="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6 mb-6">
                    <p class="text-4xl sm:text-5xl font-bold text-green-600 mb-2">{{ score }}/{{ totalQuestions }}</p>
                    <p class="text-sm sm:text-base text-gray-600">Jawaban Benar</p>
                </div>

                <div v-if="showDetails" class="mb-6 text-left max-w-2xl mx-auto">
                    <h2 class="text-lg sm:text-xl font-bold text-gray-800 mb-4">Detail Jawaban:</h2>
                    <div class="space-y-3">
                        <div v-for="(question, index) in questions" :key="index" class="border rounded-lg p-3 sm:p-4"
                            :class="selectedAnswers[index] === question.correctAnswer ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'">
                            <div class="flex items-start gap-2 mb-2">
                                <span class="font-semibold text-sm sm:text-base">{{ index + 1 }}.</span>
                                <p class="text-sm sm:text-base text-gray-800">{{ question.question }}</p>
                            </div>
                            <div class="ml-6 text-xs sm:text-sm">
                                <p class="text-gray-600">
                                    Jawaban Anda:
                                    <span
                                        :class="selectedAnswers[index] === question.correctAnswer ? 'text-green-600 font-semibold' : 'text-red-600 font-semibold'">
                                        {{ selectedAnswers[index] !== undefined ?
                                            question.options[selectedAnswers[index]] : 'Tidak dijawab' }}
                                    </span>
                                </p>
                                <p v-if="selectedAnswers[index] !== question.correctAnswer" class="text-green-600">
                                    Jawaban Benar: <span class="font-semibold">{{
                                        question.options[question.correctAnswer] }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                    <button @click="toggleDetails"
                        class="w-full sm:w-auto px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition text-sm sm:text-base">
                        {{ showDetails ? 'Sembunyikan' : 'Lihat' }} Detail Jawaban
                    </button>
                    <button @click="$emit('restart')"
                        class="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm sm:text-base">
                        Kembali ke Awal
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'EndScreen',
    props: {
        questions: {
            type: Array,
            required: true
        },
        selectedAnswers: {
            type: Object,
            required: true
        }
    },
    emits: ['restart'],
    data() {
        return {
            showDetails: false
        }
    },
    computed: {
        score() {
            let correct = 0;
            this.questions.forEach((q, index) => {
                if (this.selectedAnswers[index] === q.correctAnswer) {
                    correct++;
                }
            });
            return correct;
        },
        totalQuestions() {
            return this.questions.length;
        }
    },
    methods: {
        toggleDetails() {
            this.showDetails = !this.showDetails;
        }
    }
}
</script>

<style scoped>
* {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
</style>