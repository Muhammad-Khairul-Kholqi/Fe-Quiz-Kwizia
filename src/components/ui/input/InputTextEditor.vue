<template>
    <div class="w-full">
        <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <div class="border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 transition-all bg-white"
            :class="{
                'border-red-500 focus-within:ring-red-500 focus-within:border-red-500': error,
                'bg-gray-50 cursor-not-allowed': disabled
            }">
            <div v-if="!readonly && !disabled" class="bg-gray-50 border-b border-gray-200 p-2 flex flex-wrap gap-1">
                <button v-for="tool in tools" :key="tool.name" @click.prevent="applyFormat(tool.action, tool.value)"
                    :title="tool.title" type="button"
                    class="p-2 hover:bg-gray-200 rounded transition-colors text-gray-600 hover:text-gray-900"
                    :class="{ 'bg-gray-200': activeFormats.includes(tool.name) }">
                    <component :is="tool.icon" :size="18" v-if="tool.icon" />
                    <span v-else class="text-xs font-semibold px-1">{{ tool.label }}</span>
                </button>
            </div>

            <div ref="editorRef" contenteditable="true" @input="handleInput" @keydown="handleKeydown"
                @mouseup="updateActiveFormats" @keyup="updateActiveFormats" :class="{
                    'cursor-not-allowed': disabled,
                    'bg-gray-50': disabled
                }" class="min-h-[200px] max-h-[400px] overflow-y-auto p-4 outline-none prose prose-sm max-w-none"
                :data-placeholder="placeholder"></div>
        </div>

        <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
        <p v-if="hint && !error" class="mt-2 text-sm text-gray-500">{{ hint }}</p>
    </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import {
    Bold,
    Italic,
    Underline,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Link,
    Quote
} from 'lucide-vue-next';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        default: 'Tulis sesuatu...'
    },
    required: {
        type: Boolean,
        default: false
    },
    disabled: {
        type: Boolean,
        default: false
    },
    readonly: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: ''
    },
    hint: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:modelValue']);

const editorRef = ref(null);
const activeFormats = ref([]);

const tools = [
    { name: 'bold', action: 'bold', icon: Bold, title: 'Bold (Ctrl+B)' },
    { name: 'italic', action: 'italic', icon: Italic, title: 'Italic (Ctrl+I)' },
    { name: 'underline', action: 'underline', icon: Underline, title: 'Underline (Ctrl+U)' },
    { name: 'h1', action: 'formatBlock', value: '<h1>', icon: Heading1, title: 'Heading 1' },
    { name: 'h2', action: 'formatBlock', value: '<h2>', icon: Heading2, title: 'Heading 2' },
    { name: 'ul', action: 'insertUnorderedList', icon: List, title: 'Bullet List' },
    { name: 'ol', action: 'insertOrderedList', icon: ListOrdered, title: 'Numbered List' },
    { name: 'quote', action: 'formatBlock', value: '<blockquote>', icon: Quote, title: 'Quote' },
    { name: 'link', action: 'createLink', icon: Link, title: 'Insert Link' },
];

onMounted(() => {
    if (props.modelValue && editorRef.value) {
        editorRef.value.innerHTML = props.modelValue;
    }

    if (props.disabled || props.readonly) {
        editorRef.value.contentEditable = 'false';
    }
});

watch(() => props.modelValue, (newValue) => {
    if (editorRef.value && editorRef.value.innerHTML !== newValue) {
        editorRef.value.innerHTML = newValue || '';
    }
});

watch(() => [props.disabled, props.readonly], ([newDisabled, newReadonly]) => {
    if (editorRef.value) {
        editorRef.value.contentEditable = (!newDisabled && !newReadonly).toString();
    }
});

const handleInput = () => {
    if (editorRef.value) {
        const content = editorRef.value.innerHTML;
        emit('update:modelValue', content);
    }
};

const applyFormat = (command, value = null) => {
    if (command === 'createLink') {
        const url = prompt('Enter URL:');
        if (url) {
            document.execCommand(command, false, url);
        }
    } else if (value) {
        document.execCommand(command, false, value);
    } else {
        document.execCommand(command, false, null);
    }

    editorRef.value?.focus();
    updateActiveFormats();
    handleInput();
};

const updateActiveFormats = () => {
    const formats = [];

    if (document.queryCommandState('bold')) formats.push('bold');
    if (document.queryCommandState('italic')) formats.push('italic');
    if (document.queryCommandState('underline')) formats.push('underline');
    if (document.queryCommandState('insertUnorderedList')) formats.push('ul');
    if (document.queryCommandState('insertOrderedList')) formats.push('ol');

    activeFormats.value = formats;
};

const handleKeydown = (e) => {
    if (e.ctrlKey || e.metaKey) {
        switch (e.key.toLowerCase()) {
            case 'b':
                e.preventDefault();
                applyFormat('bold');
                break;
            case 'i':
                e.preventDefault();
                applyFormat('italic');
                break;
            case 'u':
                e.preventDefault();
                applyFormat('underline');
                break;
        }
    }
};
</script>

<style scoped>
[contenteditable]:empty:before {
    content: attr(data-placeholder);
    color: #9ca3af;
    pointer-events: none;
}

[contenteditable] {
    outline: none;
}

:deep(h1) {
    font-size: 2em;
    font-weight: bold;
    margin: 0.67em 0;
}

:deep(h2) {
    font-size: 1.5em;
    font-weight: bold;
    margin: 0.75em 0;
}

:deep(h3) {
    font-size: 1.17em;
    font-weight: bold;
    margin: 0.83em 0;
}

:deep(p) {
    margin: 1em 0;
}

:deep(ul),
:deep(ol) {
    margin: 1em 0;
    padding-left: 2em;
}

:deep(li) {
    margin: 0.5em 0;
}

:deep(blockquote) {
    border-left: 4px solid #e5e7eb;
    padding-left: 1em;
    margin: 1em 0;
    color: #6b7280;
    font-style: italic;
}

:deep(a) {
    color: #3b82f6;
    text-decoration: underline;
}

:deep(strong),
:deep(b) {
    font-weight: bold;
}

:deep(em),
:deep(i) {
    font-style: italic;
}

:deep(u) {
    text-decoration: underline;
}
</style>