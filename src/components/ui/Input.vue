<template>
    <div class="relative" :class="containerClass">
        <input :type="computedType" :placeholder="placeholder" :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)" :class="[
                'w-full border border-gray-300 outline-none text-gray-700 py-3 px-4 placeholder:text-sm rounded-lg transition-colors',
                type === 'password' ? 'pr-12' : '',
                inputClass
            ]" v-bind="$attrs" />

        <button v-if="type === 'password'" type="button" @click="togglePassword"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600 cursor-pointer transition-colors">
            <EyeOff v-if="showPassword" :size="20" />
            <Eye v-else :size="20" />
        </button>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';

const props = defineProps({
    modelValue: {
        type: [String, Number],
        default: ''
    },
    type: {
        type: String,
        default: 'text'
    },
    placeholder: {
        type: String,
        default: ''
    },
    containerClass: {
        type: String,
        default: ''
    },
    inputClass: {
        type: String,
        default: ''
    }
});

defineEmits(['update:modelValue']);

const showPassword = ref(false);

const computedType = computed(() => {
    if (props.type === 'password') {
        return showPassword.value ? 'text' : 'password';
    }
    return props.type;
});

const togglePassword = () => {
    showPassword.value = !showPassword.value;
};
</script>