<template>
    <div class="w-full">
        <label v-if="label" :for="inputId" class="block text-sm font-medium text-gray-700 mb-2">
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <div class="relative">
            <input :id="inputId" :type="type" :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)" :placeholder="placeholder" :required="required"
                :disabled="disabled" :readonly="readonly"
                class="w-full px-4 py-2.5 text-sm border border-gray-300 rounded-lg outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                :class="{
                    'border-red-500 focus:ring-red-500 focus:border-red-500': error,
                    'pr-10': icon
                }" />

            <div v-if="icon" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <component :is="icon" :size="20" />
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
        type: [String, Number],
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
    type: {
        type: String,
        default: 'text'
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
    icon: {
        type: Object,
        default: null
    }
});

defineEmits(['update:modelValue']);

const inputId = computed(() => `input-${Math.random().toString(36).substr(2, 9)}`);
</script>