<template>
    <div class="flex justify-center p-5 select-none">
        <div class="w-full max-w-[1500px]">
            <div class="flex flex-col lg:flex-row items-start gap-4">
                <div class="w-full lg:w-[70%] bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <div class="flex flex-col sm:flex-row items-center justify-between p-4 gap-3">
                        <div class="w-full sm:flex-1 bg-gray-200 h-3 rounded-full sm:mr-4 overflow-hidden">
                            <div class="bg-blue-500 h-3 transition-all duration-300 rounded-full"
                                :style="{ width: progress + '%' }"></div>
                        </div>

                        <div class="flex items-center gap-2 font-bold whitespace-nowrap"
                            :class="timeLeft < 60 ? 'text-red-500' : 'text-black'">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            {{ formatTime(timeLeft) }}
                        </div>
                    </div>

                    <div class="px-4 sm:px-6">
                        <div class="font-semibold text-black text-sm sm:text-base">
                            Soal {{ currentQuestion + 1 }} dari {{ questions.length }}
                        </div>
                    </div>

                    <div class="p-4 sm:p-6">
                        <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
                            {{ questions[currentQuestion].question }}
                        </h2>

                        <div class="space-y-3">
                            <div v-for="(option, index) in questions[currentQuestion].options" :key="index"
                                @click="selectAnswer(index)"
                                class="border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition" :class="selectedAnswers[currentQuestion] === index
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold flex-shrink-0"
                                        :class="selectedAnswers[currentQuestion] === index
                                            ? 'border-blue-500 bg-blue-500 text-white'
                                            : 'border-gray-500 text-black'">
                                        {{ String.fromCharCode(65 + index) }}
                                    </div>
                                    <span class="text-sm sm:text-lg text-black">{{ option }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="mt-6 sm:mt-8 flex justify-between sm:justify-end gap-3 sm:gap-4">
                            <button @click="previousQuestion" :disabled="currentQuestion === 0"
                                class="flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-lg transition text-sm sm:text-base"
                                :class="currentQuestion !== 0
                                    ? 'border border-blue-500 text-blue-500 hover:bg-blue-50 cursor-pointer'
                                    : 'bg-gray-100 text-gray-500 cursor-not-allowed'">
                                Previous
                            </button>
                            <button @click="nextQuestion"
                                class="flex-1 sm:flex-none px-4 sm:px-5 py-2 rounded-lg transition bg-blue-500 text-white hover:bg-blue-600 cursor-pointer text-sm sm:text-base">
                                {{ currentQuestion === questions.length - 1 ? 'Selesai' : 'Next' }}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    class="w-full lg:w-[30%] lg:sticky lg:top-4 bg-white rounded-lg border border-gray-200 max-h-[500px] lg:max-h-screen overflow-auto scrollbar-hide">
                    <div class="p-4 sm:p-6 sticky top-0 bg-white border-b border-gray-100 z-10">
                        <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Navigasi Soal</h2>
                        <p class="text-gray-600 text-xs sm:text-sm">Klik nomor soal untuk langsung menuju soal tersebut.
                        </p>
                    </div>
                    <div class="grid grid-cols-5 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3 p-4 sm:p-6">
                        <button v-for="(question, index) in questions" :key="index" @click="goToQuestion(index)"
                            class="h-12 sm:h-[60px] rounded-lg transition flex items-center px-2 cursor-pointer text-sm sm:text-base"
                            :class="getQuestionButtonClass(index)">
                            <span class="hidden sm:inline">Soal {{ index + 1 }}</span>
                            <span class="sm:hidden">{{ index + 1 }}</span>
                        </button>
                    </div>
                    <div
                        class="sticky bottom-0 p-4 sm:p-6 bg-white border-t border-gray-200 space-y-2 text-xs sm:text-sm">
                        <div class="flex items-center gap-2">
                            <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-green-100 flex-shrink-0"></div>
                            <span class="text-gray-600">Terjawab</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#E8EFF6] flex-shrink-0"></div>
                            <span class="text-gray-600">Belum Dijawab</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="showWarning" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <h3 class="text-xl font-bold text-red-600 mb-4">⚠️ Peringatan!</h3>
                    <p class="text-gray-700 mb-4">{{ warningMessage }}</p>
                    <button @click="closeWarning"
                        class="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                        Mengerti
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'QuizScreen',
    props: {
        questions: {
            type: Array,
            required: true
        },
        timeLimit: {
            type: Number,
            default: 600
        }
    },
    emits: ['finish'],
    data() {
        return {
            currentQuestion: 0,
            selectedAnswers: {},
            timeLeft: this.timeLimit,
            timerInterval: null,
            showWarning: false,
            warningMessage: ''
        }
    },
    computed: {
        progress() {
            return ((this.currentQuestion + 1) / this.questions.length) * 100;
        }
    },
    mounted() {
        this.startTimer();
        this.preventCopyPaste();
        this.preventScreenshot();
        this.preventDevTools();
        this.preventRightClick();
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
    },
    beforeUnmount() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
        }
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    },
    methods: {
        selectAnswer(answerIndex) {
            this.selectedAnswers = {
                ...this.selectedAnswers,
                [this.currentQuestion]: answerIndex
            };
        },
        nextQuestion() {
            if (this.currentQuestion < this.questions.length - 1) {
                this.currentQuestion++;
            } else {
                this.finishQuiz();
            }
        },
        previousQuestion() {
            if (this.currentQuestion > 0) {
                this.currentQuestion--;
            }
        },
        goToQuestion(index) {
            this.currentQuestion = index;
        },
        getQuestionButtonClass(index) {
            const isAnswered = this.selectedAnswers[index] !== undefined;
            const isCurrent = this.currentQuestion === index;

            if (isCurrent) {
                return isAnswered
                    ? 'bg-green-50 border-2 border-green-300'
                    : 'bg-[#E8EFF6]/80 text-gray-700 border-2 border-blue-500 hover:bg-[#E8EFF6]';
            }

            return isAnswered
                ? 'bg-green-50 border-2 border-green-300 hover:bg-green-100'
                : 'bg-[#E8EFF6]/80 text-gray-700 hover:bg-[#E8EFF6]';
        },
        startTimer() {
            this.timerInterval = setInterval(() => {
                if (this.timeLeft > 0) {
                    this.timeLeft--;
                } else {
                    this.finishQuiz();
                }
            }, 1000);
        },
        finishQuiz() {
            if (this.timerInterval) {
                clearInterval(this.timerInterval);
            }
            this.$emit('finish', this.selectedAnswers);
        },
        formatTime(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        },
        showWarningMessage(message) {
            this.warningMessage = message;
            this.showWarning = true;
        },
        closeWarning() {
            this.showWarning = false;
        },
        preventCopyPaste() {
            document.addEventListener('copy', (e) => {
                e.preventDefault();
                this.showWarningMessage('Copy text tidak diperbolehkan selama quiz!');
            });

            document.addEventListener('cut', (e) => {
                e.preventDefault();
                this.showWarningMessage('Cut text tidak diperbolehkan selama quiz!');
            });

            document.addEventListener('paste', (e) => {
                e.preventDefault();
                this.showWarningMessage('Paste text tidak diperbolehkan selama quiz!');
            });
        },
        preventScreenshot() {
            document.addEventListener('keyup', (e) => {
                if (e.key === 'PrintScreen') {
                    this.showWarningMessage('Screenshot tidak diperbolehkan selama quiz!');
                    navigator.clipboard.writeText('');
                }
            });

            document.addEventListener('keydown', (e) => {
                if (
                    (e.key === 'PrintScreen') ||
                    (e.metaKey && e.shiftKey && (e.key === '3' || e.key === '4' || e.key === '5')) ||
                    (e.metaKey && e.shiftKey && e.key === 's')
                ) {
                    e.preventDefault();
                    this.showWarningMessage('Screenshot tidak diperbolehkan selama quiz!');
                }
            });
        },
        preventDevTools() {
            document.addEventListener('keydown', (e) => {
                if (
                    e.key === 'F12' ||
                    (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
                    (e.ctrlKey && e.key === 'U')
                ) {
                    e.preventDefault();
                    this.showWarningMessage('Developer Tools tidak diperbolehkan selama quiz!');
                }
            });
        },
        preventRightClick() {
            document.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                this.showWarningMessage('Right click tidak diperbolehkan selama quiz!');
            });
        },
        handleVisibilityChange() {
            if (document.hidden) {
                this.showWarningMessage('Anda terdeteksi berpindah tab! Mohon tetap di halaman quiz.');
            }
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

img,
svg {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
}
</style>