<template>
    <div class="w-full">
        <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-2">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <div class="relative">
            <textarea :id="inputId" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"
                :placeholder="placeholder" :required="required" :disabled="disabled" :readonly="readonly" :rows="rows"
                class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-y disabled:bg-gray-100 disabled:cursor-not-allowed"
                :class="{
                    'border-red-500 focus:ring-red-500 focus:border-red-500': error
                }"></textarea>

            <div v-if="maxLength" class="absolute bottom-2 right-2 text-xs text-gray-400">
                {{ characterCount }} / {{ maxLength }}
            </div>
        </div>

        <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
        <p v-if="hint && !error" class="mt-2 text-sm text-gray-500">{{ hint }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';

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
        default: ''
    },
    rows: {
        type: Number,
        default: 4
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
    },
    maxLength: {
        type: Number,
        default: null
    }
});

defineEmits(['update:modelValue']);

const inputId = computed(() => `textarea-${Math.random().toString(36).substr(2, 9)}`);
const characterCount = computed(() => props.modelValue?.length || 0);
</script>