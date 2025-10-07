<template>
    <div class="hidden lg:block p-5 bg-gray-50 rounded-xl lg:sticky lg:top-20 space-y-6">
        <h1 class="font-bold text-xl">Select <span class="text-blue-600">Filter</span></h1>

        <div v-if="activeFilters.length" class="flex flex-wrap gap-2 mt-3">
            <div v-for="(filter, index) in activeFilters" :key="index"
                class="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full text-sm font-medium">
                <span>{{ filter }}</span>
                <X size="16" class="cursor-pointer hover:text-blue-700" @click="$emit('remove-filter', filter)" />
            </div>
        </div>

        <div>
            <button @click="$emit('toggle-dropdown', 'subject')"
                class="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                <span class="text-gray-700">{{ selectedSubject || 'Subject' }}</span>
                <ChevronDown
                    :class="['transition-transform duration-300', { 'rotate-180': openDropdown === 'subject' }]"
                    size="18" />
            </button>

            <transition name="expand">
                <ul v-if="openDropdown === 'subject'"
                    class="mt-2 w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <li v-for="(subject, index) in subjects" :key="index"
                        @click="$emit('select-option', 'subject', subject)"
                        class="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700">
                        {{ subject }}
                    </li>
                </ul>
            </transition>
        </div>

        <div>
            <button @click="$emit('toggle-dropdown', 'questions')"
                class="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                <span class="text-gray-700">{{ selectedQuestions || 'Total Questions' }}</span>
                <ChevronDown
                    :class="['transition-transform duration-300', { 'rotate-180': openDropdown === 'questions' }]"
                    size="18" />
            </button>

            <transition name="expand">
                <ul v-if="openDropdown === 'questions'"
                    class="mt-2 w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <li v-for="(range, index) in questionRanges" :key="index"
                        @click="$emit('select-option', 'questions', range)"
                        class="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700">
                        {{ range }}
                    </li>
                </ul>
            </transition>
        </div>
    </div>

    <transition name="slide-up">
        <div v-if="showFilterModal" class="fixed inset-0 z-50 lg:hidden"
            @click.self="$emit('update:show-filter-modal', false)">
            <div class="absolute inset-0 bg-black/60" @click="$emit('update:show-filter-modal', false)"></div>
            <div
                class="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto filter-modal">
                <div class="flex justify-between items-center mb-6">
                    <h1 class="font-bold text-xl text-blue-600">Filter</h1>
                    <button @click="$emit('update:show-filter-modal', false)"
                        class="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X class="w-6 h-6" />
                    </button>
                </div>

                <div v-if="activeFilters.length" class="flex flex-wrap gap-2 mb-6">
                    <div v-for="(filter, index) in activeFilters" :key="index"
                        class="flex items-center gap-2 border border-blue-600 text-blue-600 px-3 py-1.5 rounded-full text-sm font-medium">
                        <span>{{ filter }}</span>
                        <X size="16" class="cursor-pointer hover:text-blue-700"
                            @click="$emit('remove-filter', filter)" />
                    </div>
                </div>

                <div class="space-y-4 pb-8">
                    <div>
                        <button @click="$emit('toggle-dropdown', 'subject')"
                            class="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                            <span class="text-gray-700">{{ selectedSubject || 'Subject' }}</span>
                            <ChevronDown
                                :class="['transition-transform duration-300', { 'rotate-180': openDropdown === 'subject' }]"
                                size="18" />
                        </button>

                        <transition name="expand">
                            <ul v-if="openDropdown === 'subject'"
                                class="mt-2 w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <li v-for="(subject, index) in subjects" :key="index"
                                    @click="$emit('select-option', 'subject', subject)"
                                    class="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700">
                                    {{ subject }}
                                </li>
                            </ul>
                        </transition>
                    </div>

                    <div>
                        <button @click="$emit('toggle-dropdown', 'questions')"
                            class="w-full flex justify-between items-center px-4 py-3 bg-white border border-gray-300 rounded-lg hover:border-blue-500 transition-colors cursor-pointer">
                            <span class="text-gray-700">{{ selectedQuestions || 'Total Questions' }}</span>
                            <ChevronDown
                                :class="['transition-transform duration-300', { 'rotate-180': openDropdown === 'questions' }]"
                                size="18" />
                        </button>

                        <transition name="expand">
                            <ul v-if="openDropdown === 'questions'"
                                class="mt-2 w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <li v-for="(range, index) in questionRanges" :key="index"
                                    @click="$emit('select-option', 'questions', range)"
                                    class="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700">
                                    {{ range }}
                                </li>
                            </ul>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ChevronDown, X } from "lucide-vue-next";

defineProps({
    openDropdown: String,
    selectedSubject: String,
    selectedQuestions: String,
    activeFilters: Array,
    showFilterModal: Boolean
});

defineEmits([
    'toggle-dropdown',
    'select-option',
    'remove-filter',
    'update:show-filter-modal'
]);

const subjects = ["Science", "Math", "History", "English", "Geography"];
const questionRanges = ["1 - 5", "1 - 10", "1 - 15", "1 - 20", "1 - 25"];
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
    transition: all 0.25s ease;
}

.expand-enter-from,
.expand-leave-to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-5px);
}

.expand-enter-to,
.expand-leave-from {
    opacity: 1;
    max-height: 200px;
    transform: translateY(0);
}

.slide-up-enter-active {
    transition: all 0.3s ease;
}

.slide-up-leave-active {
    transition: all 0.25s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
    opacity: 0;
}

.slide-up-enter-from .filter-modal,
.slide-up-leave-to .filter-modal {
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.slide-up-enter-to .filter-modal,
.slide-up-leave-from .filter-modal {
    transform: translateY(0);
    transition: transform 0.3s ease;
}

.filter-modal {
    touch-action: pan-y;
}
</style>