<template>
    <div class="w-full">
        <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <div class="border border-gray-300 rounded-lg overflow-hidden bg-white" :class="{
            'border-red-500 focus-within:ring-2 focus-within:ring-red-500 focus-within:border-red-500': error,
            'bg-gray-50 cursor-not-allowed': disabled
        }">
            <div ref="editorContainer" class="min-h-[200px]"></div>
        </div>

        <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
        <p v-if="hint && !error" class="mt-2 text-sm text-gray-500">{{ hint }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

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

const editorContainer = ref(null);
let quillInstance = null;

onMounted(() => {
    if (editorContainer.value) {
        quillInstance = new Quill(editorContainer.value, {
            theme: 'snow',
            placeholder: props.placeholder,
            readOnly: props.disabled || props.readonly,
            modules: {
                toolbar: props.disabled || props.readonly ? false : [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    ['blockquote', 'link'],
                    ['clean']
                ]
            }
        });

        if (props.modelValue) {
            quillInstance.root.innerHTML = props.modelValue;
        }

        quillInstance.on('text-change', () => {
            const html = quillInstance.root.innerHTML;
            if (html === '<p><br></p>') {
                emit('update:modelValue', '');
            } else {
                emit('update:modelValue', html);
            }
        });
    }
});

watch(() => props.modelValue, (newValue) => {
    if (quillInstance && quillInstance.root.innerHTML !== newValue) {
        const currentSelection = quillInstance.getSelection();
        quillInstance.root.innerHTML = newValue || '';
        if (currentSelection) {
            quillInstance.setSelection(currentSelection);
        }
    }
});

watch(() => [props.disabled, props.readonly], ([newDisabled, newReadonly]) => {
    if (quillInstance) {
        quillInstance.enable(!newDisabled && !newReadonly);
    }
});

onBeforeUnmount(() => {
    if (quillInstance) {
        quillInstance = null;
    }
});
</script>

<style>
.ql-container {
    font-family: inherit;
    font-size: 1rem;
}

.ql-editor {
    min-height: 150px;
    max-height: 400px;
    overflow-y: auto;
    padding: 1rem;
}

.ql-editor.ql-blank::before {
    color: #9ca3af;
    font-style: normal;
}

.ql-toolbar.ql-snow {
    border: none;
    border-bottom: 1px solid #e5e7eb;
    background: #f9fafb;
    padding: 0.5rem;
}

.ql-snow .ql-stroke {
    stroke: #6b7280;
}

.ql-snow .ql-fill {
    fill: #6b7280;
}

.ql-snow .ql-picker-label {
    color: #6b7280;
}

.ql-toolbar.ql-snow .ql-picker-label:hover,
.ql-toolbar.ql-snow .ql-picker-label.ql-active,
.ql-toolbar.ql-snow button:hover,
.ql-toolbar.ql-snow button.ql-active {
    color: #111827;
}

.ql-toolbar.ql-snow .ql-picker-label:hover .ql-stroke,
.ql-toolbar.ql-snow .ql-picker-label.ql-active .ql-stroke,
.ql-toolbar.ql-snow button:hover .ql-stroke,
.ql-toolbar.ql-snow button.ql-active .ql-stroke {
    stroke: #111827;
}

.ql-toolbar.ql-snow .ql-picker-label:hover .ql-fill,
.ql-toolbar.ql-snow .ql-picker-label.ql-active .ql-fill,
.ql-toolbar.ql-snow button:hover .ql-fill,
.ql-toolbar.ql-snow button.ql-active .ql-fill {
    fill: #111827;
}

.ql-container.ql-snow {
    border: none;
}

.ql-editor h1 {
    font-size: 2em;
    font-weight: bold;
    margin: 0.67em 0;
    line-height: 1.2;
}

.ql-editor h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin: 0.75em 0;
    line-height: 1.3;
}

.ql-editor h3 {
    font-size: 1.17em;
    font-weight: bold;
    margin: 0.83em 0;
    line-height: 1.4;
}

.ql-editor p {
    margin: 0.5em 0;
}

.ql-editor ul,
.ql-editor ol {
    padding-left: 1.5em;
    margin: 0.5em 0;
}

.ql-editor li {
    margin: 0.25em 0;
}

.ql-editor blockquote {
    border-left: 4px solid #e5e7eb;
    padding-left: 1em;
    margin: 1em 0;
    color: #6b7280;
}

.ql-editor a {
    color: #3b82f6;
    text-decoration: underline;
}

.ql-editor strong {
    font-weight: bold;
}

.ql-editor em {
    font-style: italic;
}

.ql-editor u {
    text-decoration: underline;
}
</style>