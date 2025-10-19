<template>
    <Teleport to="body">
        <transition name="modal">
            <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
                <!-- Backdrop -->
                <div @click="handleClose" class="absolute inset-0 bg-black bg-opacity-50 transition-opacity"></div>

                <!-- Modal Content -->
                <div class="relative bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                    <!-- Header -->
                    <div
                        class="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-xl z-10">
                        <h2 class="text-xl font-semibold text-gray-800">
                            {{ mode === 'add' ? `Add New ${title}` : `Edit ${title}` }}
                        </h2>
                        <button @click="handleClose" class="text-gray-400 hover:text-gray-600 transition-colors">
                            <X :size="24" />
                        </button>
                    </div>

                    <!-- Body -->
                    <div class="px-6 py-6 space-y-5">
                        <component v-for="field in fields" :key="field.name" :is="getComponentType(field.type)"
                            v-model="formData[field.name]" :label="field.label" :placeholder="field.placeholder"
                            :required="field.required" :error="errors[field.name]" :hint="field.hint" :rows="field.rows"
                            :maxLength="field.maxLength" :type="field.inputType" :icon="field.icon"
                            :toolbar="field.toolbar" :disabled="field.disabled" :readonly="field.readonly" />
                    </div>

                    <!-- Footer -->
                    <div
                        class="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 rounded-b-xl">
                        <button @click="handleClose"
                            class="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
                            Cancel
                        </button>
                        <button @click="handleSubmit" :disabled="isSubmitting"
                            class="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                            <span v-if="!isSubmitting">
                                {{ mode === 'add' ? 'Add' : 'Update' }}
                            </span>
                            <span v-else class="flex items-center gap-2">
                                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
                                    </path>
                                </svg>
                                Processing...
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { X } from 'lucide-vue-next';
import InputImage from '../ui/input/InputImage.vue';
import InputText from '../ui/input/InputText.vue';
import InputTextarea from '../ui/input/InputTextarea.vue';
import InputTextEditor from '../ui/input/InputTextEditor.vue';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    mode: {
        type: String,
        default: 'add', // 'add' or 'edit'
        validator: (value) => ['add', 'edit'].includes(value)
    },
    title: {
        type: String,
        required: true
    },
    fields: {
        type: Array,
        required: true,
        // Example structure:
        // [
        //   {
        //     name: 'fieldName',
        //     type: 'text' | 'textarea' | 'editor' | 'image',
        //     label: 'Field Label',
        //     placeholder: 'Enter...',
        //     required: true,
        //     hint: 'Helper text',
        //     rows: 4, // for textarea
        //     maxLength: 200, // for textarea
        //     inputType: 'email', // for text input type
        //     icon: IconComponent, // for text input
        //     toolbar: [], // for editor
        //     disabled: false,
        //     readonly: false
        //   }
        // ]
    },
    initialData: {
        type: Object,
        default: () => ({})
    }
});

const emit = defineEmits(['close', 'submit']);

const formData = ref({});
const errors = ref({});
const isSubmitting = ref(false);

// Initialize form data when modal opens or initialData changes
watch([() => props.isOpen, () => props.initialData], () => {
    if (props.isOpen) {
        initializeFormData();
        errors.value = {};
    }
}, { immediate: true, deep: true });

const initializeFormData = () => {
    const data = {};
    props.fields.forEach(field => {
        data[field.name] = props.initialData[field.name] ?? getDefaultValue(field.type);
    });
    formData.value = data;
};

const getDefaultValue = (type) => {
    switch (type) {
        case 'image':
            return null;
        case 'textarea':
        case 'editor':
        case 'text':
        default:
            return '';
    }
};

const getComponentType = (type) => {
    const components = {
        text: InputText,
        textarea: InputTextarea,
        editor: InputTextEditor,
        image: InputImage
    };
    return components[type] || InputText;
};

const validateForm = () => {
    errors.value = {};
    let isValid = true;

    props.fields.forEach(field => {
        if (field.required) {
            const value = formData.value[field.name];
            if (!value || (typeof value === 'string' && !value.trim())) {
                errors.value[field.name] = `${field.label} is required`;
                isValid = false;
            }
        }

        // Additional validation for maxLength
        if (field.maxLength && formData.value[field.name]) {
            if (formData.value[field.name].length > field.maxLength) {
                errors.value[field.name] = `${field.label} must be less than ${field.maxLength} characters`;
                isValid = false;
            }
        }

        // Custom validation function
        if (field.validate && typeof field.validate === 'function') {
            const validationResult = field.validate(formData.value[field.name], formData.value);
            if (validationResult !== true) {
                errors.value[field.name] = validationResult;
                isValid = false;
            }
        }
    });

    return isValid;
};

const handleSubmit = async () => {
    if (!validateForm()) {
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