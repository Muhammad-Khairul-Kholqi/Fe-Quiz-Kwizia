<template>
    <Teleport to="body">
        <transition name="modal">
            <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-5">
                <div @click="closeModal" class="absolute inset-0 bg-black/50 transition-opacity"></div>

                <div class="relative bg-white rounded-xl max-w-md w-full p-2">
                    <div class="overflow-y-auto max-h-[80vh]">
                        <div
                            class="sticky top-0 bg-white px-2 py-2 flex items-center justify-between rounded-t-xl z-10">
                            <h2 class="text-xl font-semibold text-gray-800">
                                {{ title }}
                            </h2>
                            <button @click="closeModal"
                                class="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                                <X :size="24" />
                            </button>
                        </div>

                        <div class="px-2 py-6 space-y-5">
                            <div v-for="field in fields" :key="field.key">
                                <div v-if="field.type === 'image'">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        {{ field.label }}
                                    </label>
                                    <img v-if="field.value" :src="field.value" :alt="field.label"
                                        class="w-full h-48 rounded-lg object-cover border-2 border-gray-200 shadow-sm">
                                    <div v-else
                                        class="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-gray-200">
                                        <div class="text-center">
                                            <ImageOff :size="40" class="text-gray-400 mx-auto mb-2" />
                                            <span class="text-sm text-gray-500">No image available</span>
                                        </div>
                                    </div>
                                </div>

                                <div v-else-if="field.type === 'badge'">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        {{ field.label }}
                                    </label>
                                    <span :class="[
                                        'inline-flex px-3 py-1.5 rounded-lg text-sm font-medium',
                                        field.badgeClass || 'bg-blue-100 text-blue-700'
                                    ]">
                                        {{ field.value || '-' }}
                                    </span>
                                </div>

                                <div v-else-if="field.type === 'html'">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        {{ field.label }}
                                    </label>
                                    <div v-if="field.value"
                                        class="prose max-w-none p-3 bg-gray-50 rounded-lg border border-gray-200 text-sm"
                                        v-html="field.value">
                                    </div>
                                    <p v-else class="text-sm text-gray-500 italic">No content available</p>
                                </div>

                                <div v-else-if="field.type === 'date'">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        {{ field.label }}
                                    </label>
                                    <p class="text-sm text-gray-900">{{ formatDate(field.value) }}</p>
                                </div>

                                <div v-else-if="field.type === 'link'">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        {{ field.label }}
                                    </label>
                                    <a :href="field.value" target="_blank"
                                        class="text-sm text-blue-600 hover:text-blue-800 hover:underline break-all">
                                        {{ field.value || '-' }}
                                    </a>
                                </div>

                                <div v-else-if="field.type === 'list'">
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        {{ field.label }}
                                    </label>
                                    <ul v-if="field.value && field.value.length > 0"
                                        class="list-disc list-inside space-y-1">
                                        <li v-for="(item, index) in field.value" :key="index"
                                            class="text-sm text-gray-900">
                                            {{ item }}
                                        </li>
                                    </ul>
                                    <p v-else class="text-sm text-gray-500 italic">No items available</p>
                                </div>

                                <div v-else>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        {{ field.label }}
                                    </label>
                                    <p class="text-sm text-gray-900 whitespace-pre-wrap">{{ field.value || '-' }}</p>
                                </div>
                            </div>
                        </div>

                        <div
                            class="sticky bottom-0 bg-white px-2 py-2 flex items-center justify-end gap-3 rounded-b-xl">
                            <button @click="closeModal"
                                class="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
import { X, ImageOff } from 'lucide-vue-next';

const props = defineProps({
    isOpen: {
        type: Boolean,
        required: true
    },
    title: {
        type: String,
        default: 'Details'
    },
    fields: {
        type: Array,
        required: true,
    }
});

const emit = defineEmits(['close']);

const closeModal = () => {
    emit('close');
};

const formatDate = (dateString) => {
    if (!dateString) return '-';

    const date = new Date(dateString);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    return date.toLocaleDateString('en-US', options);
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

.prose {
    color: #374151;
    line-height: 1.75;
}

.prose p {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4 {
    font-weight: 600;
    margin-top: 1.25em;
    margin-bottom: 0.5em;
}

.prose ul,
.prose ol {
    margin-top: 0.75em;
    margin-bottom: 0.75em;
    padding-left: 1.5em;
}

.prose li {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
}

.prose strong {
    font-weight: 600;
}

.prose a {
    color: #2563eb;
    text-decoration: underline;
}

.prose blockquote {
    border-left: 3px solid #e5e7eb;
    padding-left: 1em;
    font-style: italic;
    margin: 0.75em 0;
}

.prose code {
    background-color: #f3f4f6;
    padding: 0.2em 0.4em;
    border-radius: 0.25rem;
    font-size: 0.875em;
}

.prose pre {
    background-color: #1f2937;
    color: #f9fafb;
    padding: 0.75em;
    border-radius: 0.5rem;
    overflow-x: auto;
    font-size: 0.875em;
}

.prose img {
    border-radius: 0.5rem;
    margin: 0.75em 0;
}

.prose table {
    width: 100%;
    border-collapse: collapse;
    margin: 0.75em 0;
    font-size: 0.875em;
}

.prose th,
.prose td {
    border: 1px solid #e5e7eb;
    padding: 0.5em;
}

.prose th {
    background-color: #f3f4f6;
    font-weight: 600;
}
</style>