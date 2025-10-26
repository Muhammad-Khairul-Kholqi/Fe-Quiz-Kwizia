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
                            Question {{ currentQuestion + 1 }} of {{ questions.length }}
                        </div>
                    </div>

                    <div class="p-4 sm:p-6">
                        <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6">
                            {{ questions[currentQuestion].question }}
                        </h2>

                        <div class="space-y-3">
                            <div v-for="(option, index) in ['A', 'B', 'C', 'D']" :key="index"
                                @click="selectAnswer(index)"
                                class="border-2 rounded-lg p-3 sm:p-4 cursor-pointer transition" :class="selectedAnswers[currentQuestion] === index
                                    ? 'border-blue-500 bg-blue-50'
                                    : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full border-2 flex items-center justify-center font-semibold flex-shrink-0"
                                        :class="selectedAnswers[currentQuestion] === index
                                            ? 'border-blue-500 bg-blue-500 text-white'
                                            : 'border-gray-500 text-black'">
                                        {{ option }}
                                    </div>
                                    <span class="text-sm sm:text-lg text-black">{{
                                        questions[currentQuestion][`option_${option.toLowerCase()}`] }}</span>
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
                                {{ currentQuestion === questions.length - 1 ? 'Finish' : 'Next' }}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    class="w-full lg:w-[30%] lg:sticky lg:top-4 bg-white rounded-lg border border-gray-200 max-h-[500px] lg:max-h-screen overflow-auto scrollbar-hide">
                    <div class="p-4 sm:p-6 sticky top-0 bg-white border-b border-gray-100 z-10">
                        <h2 class="text-lg sm:text-xl font-semibold text-gray-800 mb-2">Question Navigation</h2>
                        <p class="text-gray-600 text-xs sm:text-sm">Click question number to jump.</p>
                    </div>
                    <div class="grid grid-cols-5 sm:grid-cols-3 lg:grid-cols-1 gap-2 sm:gap-3 p-4 sm:p-6">
                        <button v-for="(question, index) in questions" :key="index" @click="goToQuestion(index)"
                            class="h-12 sm:h-[60px] rounded-lg transition flex items-center px-2 cursor-pointer text-sm sm:text-base"
                            :class="getQuestionButtonClass(index)">
                            <span class="hidden sm:inline">Question {{ index + 1 }}</span>
                            <span class="sm:hidden">{{ index + 1 }}</span>
                        </button>
                    </div>
                    <div
                        class="sticky bottom-0 p-4 sm:p-6 bg-white border-t border-gray-200 space-y-2 text-xs sm:text-sm">
                        <div class="flex items-center gap-2">
                            <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-green-100 flex-shrink-0"></div>
                            <span class="text-gray-600">Answered</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-[#E8EFF6] flex-shrink-0"></div>
                            <span class="text-gray-600">Not Answered</span>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="showWarning" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                    <h3 class="text-xl font-bold text-red-600 mb-4">⚠️ Warning!</h3>
                    <p class="text-gray-700 mb-4">{{ warningMessage }}</p>
                    <button @click="closeWarning"
                        class="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
                        I Understand
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import Swal from 'sweetalert2';

const props = defineProps({
    quizData: {
        type: Object,
        required: true
    },
    startedAt: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['finish', 'terminate']);

const currentQuestion = ref(0);
const selectedAnswers = ref({});
const timeLeft = ref(0);
const timerInterval = ref(null);
const showWarning = ref(false);
const warningMessage = ref('');
const tabSwitchCount = ref(0);
const maxTabSwitches = 2;

const questions = computed(() => props.quizData?.questions || []);

const progress = computed(() => {
    return ((currentQuestion.value + 1) / questions.value.length) * 100;
});

onMounted(() => {
    timeLeft.value = props.quizData.time_limit * 60;
    startTimer();
    preventCopyPaste();
    preventScreenshot();
    preventDevTools();
    preventRightClick();
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
});

onBeforeUnmount(() => {
    if (timerInterval.value) {
        clearInterval(timerInterval.value);
    }
    document.removeEventListener('visibilitychange', handleVisibilityChange);
    window.removeEventListener('blur', handleWindowBlur);
});

const selectAnswer = (answerIndex) => {
    selectedAnswers.value = {
        ...selectedAnswers.value,
        [currentQuestion.value]: answerIndex
    };
};

const nextQuestion = () => {
    if (currentQuestion.value < questions.value.length - 1) {
        currentQuestion.value++;
    } else {
        checkAndFinishQuiz();
    }
};

const previousQuestion = () => {
    if (currentQuestion.value > 0) {
        currentQuestion.value--;
    }
};

const goToQuestion = (index) => {
    currentQuestion.value = index;
};

const getQuestionButtonClass = (index) => {
    const isAnswered = selectedAnswers.value[index] !== undefined;
    const isCurrent = currentQuestion.value === index;

    if (isCurrent) {
        return isAnswered
            ? 'bg-green-50 border-2 border-green-300'
            : 'bg-[#E8EFF6]/80 text-gray-700 border-2 border-blue-500 hover:bg-[#E8EFF6]';
    }

    return isAnswered
        ? 'bg-green-50 border-2 border-green-300 hover:bg-green-100'
        : 'bg-[#E8EFF6]/80 text-gray-700 hover:bg-[#E8EFF6]';
};

const startTimer = () => {
    timerInterval.value = setInterval(() => {
        if (timeLeft.value > 0) {
            timeLeft.value--;
        } else {
            finishQuiz();
        }
    }, 1000);
};

const checkAndFinishQuiz = async () => {
    const answeredCount = Object.keys(selectedAnswers.value).length;
    const totalQuestions = questions.value.length;

    if (answeredCount < totalQuestions) {
        const result = await Swal.fire({
            icon: 'warning',
            title: 'Incomplete Quiz',
            html: `You have answered <strong>${answeredCount}</strong> out of <strong>${totalQuestions}</strong> questions.<br><br>Please answer all questions before submitting.`,
            confirmButtonText: 'Continue Quiz',
            confirmButtonColor: '#3b82f6'
        });

        if (result.isConfirmed) {
            const firstUnanswered = questions.value.findIndex((_, index) =>
                selectedAnswers.value[index] === undefined
            );
            if (firstUnanswered !== -1) {
                currentQuestion.value = firstUnanswered;
            }
        }
    } else {
        const result = await Swal.fire({
            icon: 'question',
            title: 'Submit Quiz?',
            text: 'Are you sure you want to submit your answers?',
            showCancelButton: true,
            confirmButtonText: 'Yes, Submit',
            cancelButtonText: 'Review Answers',
            confirmButtonColor: '#3b82f6',
            cancelButtonColor: '#6b7280'
        });

        if (result.isConfirmed) {
            finishQuiz();
        }
    }
};

const finishQuiz = () => {
    if (timerInterval.value) {
        clearInterval(timerInterval.value);
    }
    emit('finish', selectedAnswers.value);
};

const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const showWarningMessage = (message) => {
    warningMessage.value = message;
    showWarning.value = true;
};

const closeWarning = () => {
    showWarning.value = false;
};

const preventCopyPaste = () => {
    document.addEventListener('copy', (e) => {
        e.preventDefault();
        showWarningMessage('Copy text is not allowed during the quiz!');
    });

    document.addEventListener('cut', (e) => {
        e.preventDefault();
        showWarningMessage('Cut text is not allowed during the quiz!');
    });

    document.addEventListener('paste', (e) => {
        e.preventDefault();
        showWarningMessage('Paste text is not allowed during the quiz!');
    });
};

const preventScreenshot = () => {
    document.addEventListener('keyup', (e) => {
        if (e.key === 'PrintScreen') {
            showWarningMessage('Screenshot is not allowed during the quiz!');
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
            showWarningMessage('Screenshot is not allowed during the quiz!');
        }
    });
};

const preventDevTools = () => {
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C')) ||
            (e.ctrlKey && e.key === 'U')
        ) {
            e.preventDefault();
            showWarningMessage('Developer Tools are not allowed during the quiz!');
        }
    });
};

const preventRightClick = () => {
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        showWarningMessage('Right click is not allowed during the quiz!');
    });
};

const handleVisibilityChange = () => {
    if (document.hidden) {
        tabSwitchCount.value++;

        if (tabSwitchCount.value >= maxTabSwitches) {
            Swal.fire({
                icon: 'error',
                title: 'Quiz Terminated!',
                html: `You have switched tabs <strong>${tabSwitchCount.value}</strong> times.<br><br>The quiz has been automatically terminated due to rule violation.`,
                confirmButtonColor: '#ef4444',
                allowOutsideClick: false
            }).then(() => {
                emit('terminate');
            });
        } else {
            showWarningMessage(`Warning ${tabSwitchCount.value}/${maxTabSwitches}: You switched tabs! One more violation will terminate the quiz.`);
        }
    }
};

const handleWindowBlur = () => {
    if (!document.hidden) {
        showWarningMessage('Please stay focused on the quiz window!');
    }
};
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

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>