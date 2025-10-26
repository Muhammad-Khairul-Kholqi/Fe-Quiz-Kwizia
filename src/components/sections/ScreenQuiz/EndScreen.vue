<template>
    <div class="flex justify-center p-5 select-none">
        <div class="w-full max-w-[1500px]">
            <div class="bg-[#F8F9FD] p-5 rounded-xl flex flex-col md:flex-row items-center gap-5">
                <div class="w-full max-w-[300px] h-[300px] flex items-center justify-center bg-white rounded-xl">
                    <svg class="w-32 h-32 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                </div>

                <div class="space-y-5 text-center md:text-left w-full">
                    <div class="flex justify-center md:justify-start">
                        <div class="px-4 py-2 bg-green-50 text-green-600 rounded-lg">
                            <span>Quiz Selesai</span>
                        </div>
                    </div>

                    <h1 class="text-3xl font-bold">Hasil Quiz Anda</h1>

                    <div class="flex items-center gap-5 justify-center md:justify-start">
                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <span class="font-semibold text-lg">
                                {{ score }}/{{ totalQuestions }}
                                <span class="text-gray-600 font-normal">Benar</span>
                            </span>
                        </div>

                        <div class="flex items-center gap-2">
                            <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z">
                                </path>
                            </svg>
                            <span class="font-semibold text-lg">{{ score * 10 }} Poin</span>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 justify-center md:justify-start">
                        <div class="flex">
                            <button @click="$emit('restart')"
                                class="text-center w-[200px] bg-blue-600 hover:bg-blue-700 transition-colors cursor-pointer px-5 py-2 rounded-full text-white">
                                Kembali ke Awal
                            </button>
                        </div>

                        <div class="flex">
                            <button @click="toggleDetails"
                                class="border border-gray-200 flex items-center justify-center px-5 py-2 rounded-full hover:bg-gray-100 cursor-pointer bg-white">
                                <span class="text-gray-700 text-sm">{{ showDetails ? 'Sembunyikan' : 'Lihat' }}
                                    Detail</span>
                            </button>
                        </div>
                    </div>

                    <p class="text-gray-700">
                        {{ score === totalQuestions ? 'Sempurna! Anda berhasil menjawab semua pertanyaan dengan benar.'
                            :
                            score >= totalQuestions * 0.7 ? 'Bagus! Hasil yang memuaskan.' :
                        'Terus berlatih untuk hasil yang lebih baik!' }}
                    </p>
                </div>
            </div>

            <div v-if="showDetails" class="mt-5">
                <div class="bg-blue-50 border border-blue-200 rounded-xl p-6 md:p-8">
                    <h3 class="font-semibold text-blue-700 mb-5 text-xl">
                        Detail Jawaban
                    </h3>
                    <div class="space-y-4">
                        <div v-for="(question, index) in questions" :key="index"
                            class="bg-white rounded-lg p-4 border-l-4"
                            :class="selectedAnswers[index] === question.correctAnswer ? 'border-l-green-500' : 'border-l-red-500'">
                            <div class="flex items-start gap-3 mb-3">
                                <span class="font-semibold text-gray-700 min-w-[24px]">{{ index + 1 }}.</span>
                                <div class="flex-1">
                                    <p class="text-gray-800 font-medium mb-2">{{ question.question }}</p>
                                    <div class="text-sm space-y-1">
                                        <p class="text-gray-700">
                                            <span class="font-medium">Jawaban Anda:</span>
                                            <span
                                                :class="selectedAnswers[index] === question.correctAnswer ? 'text-green-600 font-semibold ml-1' : 'text-red-600 font-semibold ml-1'">
                                                {{ selectedAnswers[index] !== undefined ?
                                                    question.options[selectedAnswers[index]] : 'Tidak dijawab' }}
                                            </span>
                                        </p>
                                        <p v-if="selectedAnswers[index] !== question.correctAnswer"
                                            class="text-green-600">
                                            <span class="font-medium">Jawaban Benar:</span>
                                            <span class="font-semibold ml-1">{{ question.options[question.correctAnswer]
                                                }}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
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