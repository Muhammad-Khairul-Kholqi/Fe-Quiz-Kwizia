<template>
    <div class="flex items-center justify-between mt-4 px-2">
        <div class="text-sm text-gray-600">
            Showing {{ startEntry }} to {{ endEntry }} of {{ totalEntries }} entries
        </div>

        <div class="flex gap-2">
            <button @click="goToPrevious" :disabled="currentPage === 1" :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                currentPage === 1
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
            ]">
                Prev
            </button>

            <button @click="goToNext" :disabled="currentPage === totalPages" :class="[
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200',
                currentPage === totalPages
                    ? 'bg-gray-50 text-gray-600 cursor-not-allowed'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer'
            ]">
                Next
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
    currentPage: {
        type: Number,
        required: true,
    },
    totalEntries: {
        type: Number,
        required: true,
    },
    perPage: {
        type: Number,
        required: true,
    },
});

const emit = defineEmits(['update:currentPage']);

const totalPages = computed(() => {
    return Math.ceil(props.totalEntries / props.perPage);
});

const startEntry = computed(() => {
    if (props.totalEntries === 0) return 0;
    return (props.currentPage - 1) * props.perPage + 1;
});

const endEntry = computed(() => {
    const end = props.currentPage * props.perPage;
    return end > props.totalEntries ? props.totalEntries : end;
});

const goToPrevious = () => {
    if (props.currentPage > 1) {
        emit('update:currentPage', props.currentPage - 1);
    }
};

const goToNext = () => {
    if (props.currentPage < totalPages.value) {
        emit('update:currentPage', props.currentPage + 1);
    }
};
</script>