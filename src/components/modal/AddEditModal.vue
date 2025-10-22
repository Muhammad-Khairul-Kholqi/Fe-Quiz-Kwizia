<template>
    <Teleport to="body">
        <transition name="modal">
            <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-5">
                <div @click="handleClose" class="absolute inset-0 bg-black/50 transition-opacity"></div>

                <div class="relative bg-white rounded-xl max-w-md w-full p-2">
                    <div class="overflow-y-auto max-h-[80vh]">
                        <div
                            class="sticky top-0 bg-white px-2 py-2 flex items-center justify-between rounded-t-xl z-10">
                            <h2 class="text-xl font-semibold text-gray-800">
                                {{ mode === 'add' ? `Add New ${title}` : `Edit ${title}` }}
                            </h2>
                            <button @click="handleClose"
                                class="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                                <X :size="24" />
                            </button>
                        </div>

                        <div class="px-2 py-6 space-y-5">
                            <template v-for="field in fields" :key="field.name">
                                <component :is="getComponentType(field.type)" v-model="formData[field.name]"
                                    :label="field.label" :placeholder="field.placeholder" :required="field.required"
                                    :error="errors[field.name]" :hint="field.hint" :rows="field.rows"
                                    :maxLength="field.maxLength" :type="field.inputType" :icon="field.icon"
                                    :toolbar="field.toolbar" :disabled="field.disabled" :readonly="field.readonly"
                                    :options="field.options" :optionLabel="field.optionLabel"
                                    :optionValue="field.optionValue" :searchable="field.searchable"
                                    :emptyText="field.emptyText" />

                                <div v-if="field.type === 'image' && mode === 'edit' && existingImageUrl && !formData[field.name]"
                                    class="mt-3 space-y-2">
                                    <p class="text-sm font-medium text-gray-700">Current Image:</p>
                                    <img :src="existingImageUrl" alt="Current image"
                                        class="w-full h-48 rounded-lg object-cover border-2 border-gray-200 shadow-sm" />
                                </div>
                            </template>
                        </div>

                        <div
                            class="sticky bottom-0 bg-white px-2 py-2 flex items-center justify-end gap-3 rounded-b-xl">
                            <button @click="handleClose"
                                class="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                Cancel
                            </button>
                            <button @click="handleSubmit" :disabled="isSubmitting"
                                class="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                                <span v-if="!isSubmitting">
                                    {{ mode === 'add' ? 'Add' : 'Update' }}
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
import { ref, watch } from 'vue';
import { X } from 'lucide-vue-next';
import InputImage from '../ui/input/InputImage.vue';
import InputText from '../ui/input/InputText.vue';
import InputTextarea from '../ui/input/InputTextarea.vue';
import InputTextEditor from '../ui/input/InputTextEditor.vue';
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
    title: {
        type: String,
        required: true
    },
    fields: {
        type: Array,
        required: true,
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

const formData = ref({});
const errors = ref({});
const isSubmitting = ref(false);

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
        case 'dropdown':
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
        image: InputImage,
        dropdown: DropDown
    };
    return components[type] || InputText;
};

const validateForm = () => {
    errors.value = {};
    let isValid = true;

    props.fields.forEach(field => {
        if (field.required) {
            const value = formData.value[field.name];

            if (field.type === 'image' && props.mode === 'edit' && props.existingImageUrl) {
                return;
            }

            if (!value || (typeof value === 'string' && !value.trim())) {
                errors.value[field.name] = `${field.label} is required`;
                isValid = false;
            }
        }

        if (field.maxLength && formData.value[field.name]) {
            if (formData.value[field.name].length > field.maxLength) {
                errors.value[field.name] = `${field.label} must be less than ${field.maxLength} characters`;
                isValid = false;
            }
        }

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