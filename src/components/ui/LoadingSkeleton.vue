<template>
    <div :class="[
        'animate-pulse bg-gray-200 dark:bg-gray-700 overflow-hidden relative',
        shapeClass,
    ]" :style="styleObject">
        <div
            class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent">
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    type: {
        type: String,
        default: 'rect',
    },
    width: {
        type: String,
        default: '100%',
    },
    height: {
        type: String,
        default: '16px',
    },
    size: {
        type: String,
        default: '50px', 
    },
    rounded: {
        type: String,
        default: 'md',
    },
})

const shapeClass = computed(() => {
    if (props.type === 'circle') return 'rounded-full'
    if (props.type === 'text') return 'rounded-sm'
    return `rounded-${props.rounded}`
})

const styleObject = computed(() => {
    if (props.type === 'circle') {
        return { width: props.size, height: props.size }
    }
    return { width: props.width, height: props.height }
})
</script>

<style scoped>
@keyframes shimmer {
    100% {
        transform: translateX(100%);
    }
}

.animate-shimmer {
    animation: shimmer 1.5s infinite;
}
</style>
