<template>
    <div class="w-full">
        <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <div class="relative">
            <input ref="fileInput" type="file" accept="image/*" @change="handleFileChange" class="hidden" />

            <div @click="triggerFileInput"
                class="relative w-full aspect-video max-w-md mx-auto border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer overflow-hidden bg-gray-50"
                :class="{ 'border-blue-500 bg-blue-50': isDragging }" @dragover.prevent="isDragging = true"
                @dragleave.prevent="isDragging = false" @drop.prevent="handleDrop">
                <img v-if="imageUrl" :src="imageUrl" alt="Preview" class="w-full h-full object-cover" />

                <div v-else class="absolute inset-0 flex flex-col items-center justify-center p-6 text-gray-400">
                    <Upload :size="48" class="mb-3" />
                    <p class="text-sm text-center">
                        Click or drag & drop the image here
                    </p>
                    <p class="text-xs text-center mt-1">PNG, JPG, GIF until 1MB</p>
                </div>

                <button v-if="imageUrl" @click.stop="removeImage"
                    class="absolute top-2 right-2 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors shadow-lg cursor-pointer">
                    <X :size="20" />
                </button>
            </div>
        </div>

        <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Upload, X } from 'lucide-vue-next';

const props = defineProps({
    modelValue: {
        type: [File, String, null],
        default: null
    },
    label: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    previewUrl: {
        type: String,
        default: null
    }
});

const emit = defineEmits(['update:modelValue']);

const fileInput = ref(null);
const imageUrl = ref(null);
const isDragging = ref(false);
const error = ref('');

watch(() => props.previewUrl, (newUrl) => {
    if (newUrl && !imageUrl.value) {
        imageUrl.value = newUrl;
    }
}, { immediate: true });

watch(() => props.modelValue, (newValue) => {
    if (newValue) {
        if (typeof newValue === 'string') {
            imageUrl.value = newValue;
        } else if (newValue instanceof File) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imageUrl.value = e.target.result;
            };
            reader.readAsDataURL(newValue);
        }
    } else if (!props.previewUrl) {
        imageUrl.value = null;
    }
}, { immediate: true });

const triggerFileInput = () => {
    fileInput.value.click();
};

const validateFile = (file) => {
    error.value = '';

    if (!file.type.startsWith('image/')) {
        error.value = 'File must be an image';
        return false;
    }

    if (file.size > 1 * 1024 * 1024) {
        error.value = 'File size cannot exceed 1 MB';
        return false;
    }

    return true;
};

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && validateFile(file)) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl.value = e.target.result;
            emit('update:modelValue', file);
        };
        reader.readAsDataURL(file);
    } else if (!validateFile(file)) {
        event.target.value = '';
    }
};

const handleDrop = (event) => {
    isDragging.value = false;
    const file = event.dataTransfer.files[0];
    if (file && validateFile(file)) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imageUrl.value = e.target.result;
            emit('update:modelValue', file);
        };
        reader.readAsDataURL(file);
    }
};

const removeImage = () => {
    imageUrl.value = props.previewUrl || null;
    error.value = '';
    if (fileInput.value) {
        fileInput.value.value = '';
    }
    emit('update:modelValue', null);
};
</script>