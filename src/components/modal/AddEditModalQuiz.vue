<template>
    <Teleport to="body">
        <transition name="modal">
            <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-5">
                <div @click="handleClose" class="absolute inset-0 bg-black/50 transition-opacity"></div>

                <div class="relative bg-white rounded-xl max-w-md w-full">
                    <div
                        class="sticky top-0 bg-white px-6 py-4 flex items-center justify-between rounded-t-xl border-b border-gray-200 z-10">
                        <h2 class="text-xl font-semibold text-gray-800">
                            {{ mode === 'add' ? 'Create New Quiz' : 'Edit Quiz' }}
                        </h2>
                        <button @click="handleClose"
                            class="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                            <X :size="24" />
                        </button>
                    </div>

                    <div class="overflow-y-auto max-h-[60vh] px-6 py-6">
                        <div v-if="currentStep === 1" class="space-y-5">
                            <InputImage v-model="formData.image_cover" label="Quiz Cover Image"
                                :error="errors.image_cover" />

                            <div v-if="mode === 'edit' && existingImageUrl && !formData.image_cover"
                                class="mt-3 space-y-2">
                                <p class="text-sm font-medium text-gray-700">Current Image:</p>
                                <img :src="existingImageUrl" alt="Current image"
                                    class="w-full h-48 rounded-lg object-cover border-2 border-gray-200 shadow-sm" />
                            </div>

                            <DropDown v-model="formData.category_id" label="Category" placeholder="Select category..."
                                :options="categoryOptions" optionLabel="label" optionValue="value" :searchable="true"
                                :required="true" :error="errors.category_id" />

                            <InputText v-model="formData.title" label="Quiz Title" placeholder="Enter quiz title..."
                                :required="true" :error="errors.title" />

                            <InputText v-model="formData.time_limit" label="Time Limit (minutes)"
                                placeholder="Enter time limit (1-180)..." type="number" :required="true"
                                :error="errors.time_limit" hint="Set quiz time limit between 1 to 180 minutes" />
                        </div>

                        <div v-else class="space-y-5">
                            <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p class="text-sm font-semibold text-blue-900">
                                    Question {{ currentStep - 1 }} of {{ formData.questions.length }}
                                </p>
                            </div>

                            <InputTextarea v-model="currentQuestion.question" label="Question"
                                placeholder="Enter your question..." :required="true" :rows="3"
                                :error="questionErrors.question" />

                            <InputText v-model="currentQuestion.option_a" label="Option A"
                                placeholder="Enter option A..." :required="true" :error="questionErrors.option_a" />

                            <InputText v-model="currentQuestion.option_b" label="Option B"
                                placeholder="Enter option B..." :required="true" :error="questionErrors.option_b" />

                            <InputText v-model="currentQuestion.option_c" label="Option C"
                                placeholder="Enter option C..." :required="true" :error="questionErrors.option_c" />

                            <InputText v-model="currentQuestion.option_d" label="Option D"
                                placeholder="Enter option D..." :required="true" :error="questionErrors.option_d" />

                            <DropDown v-model="currentQuestion.correct_answer" label="Correct Answer"
                                placeholder="Select correct answer..." :options="answerOptions" optionLabel="label"
                                optionValue="value" :required="true" :error="questionErrors.correct_answer" />
                        </div>
                    </div>

                    <div v-if="totalSteps > 1" class="flex justify-center gap-2 px-6 py-3 border-t border-gray-200">
                        <div v-for="step in totalSteps" :key="step" :class="[
                            'w-2 h-2 rounded-full transition-all cursor-pointer',
                            currentStep === step ? 'bg-blue-500 w-8' : 'bg-gray-300'
                        ]" @click="goToStep(step)"></div>
                    </div>

                    <div
                        class="sticky bottom-0 bg-white px-6 py-4 flex items-center justify-between gap-3 rounded-b-xl border-t border-gray-200">
                        <div class="flex gap-3">
                            <button v-if="currentStep > 1" @click="previousStep"
                                class="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                Previous
                            </button>
                        </div>

                        <div class="flex gap-3">
                            <button v-if="currentStep === 1" @click="nextStep"
                                class="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                                Next
                            </button>

                            <button v-if="currentStep > 1 && currentStep < totalSteps" @click="nextStep"
                                class="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer">
                                Next Question
                            </button>

                            <button v-if="currentStep > 1" @click="addNewQuestion"
                                class="px-5 py-2.5 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                                Add Question
                            </button>

                            <button v-if="currentStep > 1 && formData.questions.length > 0" @click="handleSubmit"
                                :disabled="isSubmitting"
                                class="px-5 py-2.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                                <span v-if="!isSubmitting">
                                    {{ mode === 'add' ? 'Create Quiz' : 'Update Quiz' }}
                                </span>
                                <span v-else class="flex items-center gap-2">
                                    Processing...
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { X } from 'lucide-vue-next';
import InputImage from '../ui/input/InputImage.vue';
import InputText from '../ui/input/InputText.vue';
import InputTextarea from '../ui/input/InputTextarea.vue';
import DropDown from '../ui/DropDown.vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    mode: {
        type: String,
        default: 'add',
        validator: (value) => ['add', 'edit'].includes(value)
    },
    categoryOptions: {
        type: Array,
        default: () => []
    },
    initialData: {
        type: Object,
        default: () => ({})
    },
    existingImageUrl: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['close', 'submit']);

const formData = ref({
    image_cover: null,
    category_id: null,
    title: '',
    time_limit: 60,
    questions: []
});

const currentStep = ref(1);
const errors = ref({});
const questionErrors = ref({});
const isSubmitting = ref(false);

const answerOptions = [
    { label: 'A', value: 'A' },
    { label: 'B', value: 'B' },
    { label: 'C', value: 'C' },
    { label: 'D', value: 'D' }
];

const totalSteps = computed(() => {
    return 1 + formData.value.questions.length;
});

const currentQuestion = computed({
    get() {
        const index = currentStep.value - 2;
        if (index >= 0 && index < formData.value.questions.length) {
            return formData.value.questions[index];
        }
        return {
            question: '',
            option_a: '',
            option_b: '',
            option_c: '',
            option_d: '',
            correct_answer: ''
        };
    },
    set(value) {
        const index = currentStep.value - 2;
        if (index >= 0 && index < formData.value.questions.length) {
            formData.value.questions[index] = value;
        }
    }
});

watch(() => props.isOpen, (newVal) => {
    if (newVal) {
        initializeForm();
    }
}, { immediate: true });

const initializeForm = () => {
    if (props.mode === 'edit' && props.initialData) {
        formData.value = {
            image_cover: null,
            category_id: props.initialData.category_id,
            title: props.initialData.title || '',
            time_limit: props.initialData.time_limit || 60,
            questions: props.initialData.quiz_questions ?
                props.initialData.quiz_questions.map(q => ({
                    question: q.question || '',
                    option_a: q.option_a || '',
                    option_b: q.option_b || '',
                    option_c: q.option_c || '',
                    option_d: q.option_d || '',
                    correct_answer: q.correct_answer || ''
                })) : []
        };
    } else {
        formData.value = {
            image_cover: null,
            category_id: null,
            title: '',
            time_limit: 60,
            questions: []
        };
    }
    currentStep.value = 1;
    errors.value = {};
    questionErrors.value = {};
};

const validateBasicInfo = () => {
    errors.value = {};
    let isValid = true;

    if (props.mode === 'add' && !formData.value.image_cover) {
        errors.value.image_cover = 'Cover image is required';
        isValid = false;
    }

    if (!formData.value.category_id) {
        errors.value.category_id = 'Category is required';
        isValid = false;
    }

    if (!formData.value.title || !formData.value.title.trim()) {
        errors.value.title = 'Title is required';
        isValid = false;
    }

    const timeLimit = parseInt(formData.value.time_limit);
    if (!timeLimit || timeLimit < 1 || timeLimit > 180) {
        errors.value.time_limit = 'Time limit must be between 1 and 180 minutes';
        isValid = false;
    }

    return isValid;
};

const validateQuestion = () => {
    questionErrors.value = {};
    let isValid = true;
    const q = currentQuestion.value;

    if (!q.question || !q.question.trim()) {
        questionErrors.value.question = 'Question is required';
        isValid = false;
    }

    if (!q.option_a || !q.option_a.trim()) {
        questionErrors.value.option_a = 'Option A is required';
        isValid = false;
    }

    if (!q.option_b || !q.option_b.trim()) {
        questionErrors.value.option_b = 'Option B is required';
        isValid = false;
    }

    if (!q.option_c || !q.option_c.trim()) {
        questionErrors.value.option_c = 'Option C is required';
        isValid = false;
    }

    if (!q.option_d || !q.option_d.trim()) {
        questionErrors.value.option_d = 'Option D is required';
        isValid = false;
    }

    if (!q.correct_answer) {
        questionErrors.value.correct_answer = 'Correct answer is required';
        isValid = false;
    }

    return isValid;
};

const nextStep = () => {
    if (currentStep.value === 1) {
        if (!validateBasicInfo()) return;

        if (formData.value.questions.length === 0) {
            formData.value.questions.push({
                question: '',
                option_a: '',
                option_b: '',
                option_c: '',
                option_d: '',
                correct_answer: ''
            });
        }
        currentStep.value++;
    } else {
        if (!validateQuestion()) return;

        if (currentStep.value < totalSteps.value) {
            currentStep.value++;
        }
    }
};

const previousStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const goToStep = (step) => {
    if (step === 1) {
        currentStep.value = step;
    } else if (step <= formData.value.questions.length + 1) {
        if (currentStep.value === 1) {
            if (!validateBasicInfo()) return;
        } else {
            if (!validateQuestion()) return;
        }
        currentStep.value = step;
    }
};

const addNewQuestion = () => {
    if (!validateQuestion()) return;

    formData.value.questions.push({
        question: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correct_answer: ''
    });
    currentStep.value = totalSteps.value;
};

const handleSubmit = async () => {
    if (!validateBasicInfo()) {
        currentStep.value = 1;
        return;
    }

    if (!validateQuestion()) return;

    if (formData.value.questions.length === 0) {
        alert('Please add at least one question');
        return;
    }

    isSubmitting.value = true;

    try {
        await emit('submit', {
            mode: props.mode,
            data: { ...formData.value }
        });
    } finally {
        isSubmitting.value = false;
    }
};

const handleClose = () => {
    if (!isSubmitting.value) {
        emit('close');
    }
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