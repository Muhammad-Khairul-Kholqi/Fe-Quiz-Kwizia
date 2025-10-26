<template>
    <Teleport to="body">
        <transition name="modal">
            <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-5">
                <div @click="handleClose" class="absolute inset-0 bg-black/50 transition-opacity"></div>

                <div class="relative bg-white rounded-xl max-w-md w-full">
                    <div
                        class="sticky top-0 bg-white px-6 py-4 flex items-center justify-between rounded-t-xl border-b border-gray-200 z-10">
                        <h2 class="text-xl font-semibold text-gray-800">
                            {{ quizData?.title || 'Quiz Details' }}
                        </h2>
                        <button @click="handleClose"
                            class="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                            <X :size="24" />
                        </button>
                    </div>

                    <div class="overflow-y-auto max-h-[60vh] px-6 py-6">
                        <div v-if="quizData" class="space-y-6">
                            <div class="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                                <div>
                                    <p class="text-sm text-gray-600">Category</p>
                                    <span
                                        class="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                        {{ quizData.category_quiz?.name || 'No Category' }}
                                    </span>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-600">Time Limit</p>
                                    <p class="text-base font-semibold text-gray-900 mt-1">{{ quizData.time_limit }}
                                        minutes</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-600">Total Questions</p>
                                    <p class="text-base font-semibold text-gray-900 mt-1">{{ quizData.total_questions }}
                                        questions</p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-600">Total Players</p>
                                    <p class="text-base font-semibold text-gray-900 mt-1">{{ quizData.total_players || 0
                                        }} players</p>
                                </div>
                            </div>

                            <div v-if="quizData.image_cover">
                                <p class="text-sm font-medium text-gray-700 mb-2">Cover Image</p>
                                <img :src="quizData.image_cover" alt="Quiz Cover"
                                    class="w-full h-64 rounded-lg object-cover border-2 border-gray-200 shadow-sm" />
                            </div>

                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-4">Questions & Answers</h3>

                                <div v-for="(question, index) in sortedQuestions" :key="question.id"
                                    class="mb-6 bg-white border border-gray-200 rounded-lg p-5 shadow-sm">
                                    <div class="flex items-start gap-3 mb-4">
                                        <span
                                            class="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold">
                                            {{ index + 1 }}
                                        </span>
                                        <p class="flex-1 text-gray-900 font-medium text-base">{{ question.question }}
                                        </p>
                                    </div>

                                    <div class="space-y-2 ml-11">
                                        <div v-for="option in ['A', 'B', 'C', 'D']" :key="option" :class="[
                                            'p-3 rounded-lg border-2 transition-colors',
                                            question.correct_answer === option
                                                ? 'bg-green-50 border-green-500 text-green-900'
                                                : 'bg-gray-50 border-gray-200 text-gray-700'
                                        ]">
                                            <div class="flex items-center gap-3">
                                                <span class="font-semibold">{{ option }}.</span>
                                                <span>{{ question[`option_${option.toLowerCase()}`] }}</span>
                                                <span v-if="question.correct_answer === option"
                                                    class="ml-auto text-green-600 text-sm font-semibold flex items-center gap-1">
                                                    <Check :size="16" />
                                                    Correct
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div v-if="!sortedQuestions || sortedQuestions.length === 0"
                                    class="text-center py-8 text-gray-500">
                                    No questions available
                                </div>
                            </div>
                        </div>

                        <div v-else class="text-center py-10 text-gray-500">
                            Loading quiz details...
                        </div>
                    </div>

                    <div class="sticky bottom-0 bg-white px-6 py-4 flex justify-end rounded-b-xl border-t border-gray-200">
                        <button @click="handleClose"
                            class="px-5 py-2.5 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors cursor-pointer">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
import { computed } from 'vue';
import { X, Check } from 'lucide-vue-next';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    quizData: {
        type: Object,
        default: null
    }
});

const emit = defineEmits(['close']);

const sortedQuestions = computed(() => {
    if (!props.quizData?.quiz_questions) return [];
    return [...props.quizData.quiz_questions].sort((a, b) => a.question_order - b.question_order);
});

const handleClose = () => {
    emit('close');
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
    transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
    transform: scale(0.9);
}
</style>