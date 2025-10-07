<template>
    <div class="space-y-3">
        <div class="md:hidden flex items-center gap-2 border border-gray-200 p-3 rounded-lg w-full mb-5">
            <Search class="w-6 h-6 text-gray-400" />
            <input :value="searchQuery" @input="$emit('update:search-query', $event.target.value)" type="text"
                class="px-2 w-full outline-none" placeholder="Search quiz" />
        </div>

        <div class="flex items-center justify-between gap-3">
            <button @click="$emit('show-filter-modal')"
                class="hidden md:flex lg:hidden items-center gap-2 px-4 py-2.5 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors">
                <SlidersHorizontal class="w-5 h-5" />
                <span>Filter</span>
            </button>

            <div class="hidden md:flex items-center gap-2 border border-gray-200 p-3 rounded-lg w-full max-w-[330px]">
                <Search class="w-6 h-6 text-gray-400" />
                <input :value="searchQuery" @input="$emit('update:search-query', $event.target.value)" type="text"
                    class="px-2 w-full outline-none" placeholder="Search quiz" />
            </div>

            <div class="flex items-center gap-5 text-gray-600 ml-auto">
                <span>{{ filteredQuizzes.length }} quizzes</span>
                <span>|</span>
                <div class="relative">
                    <div @click="handleSortClick"
                        class="hover:bg-gray-50 p-2 rounded-md cursor-pointer transition-colors">
                        <ArrowDownUp class="w-5 h-5" />
                    </div>
                    <div v-if="openDropdown === 'sort'"
                        class="absolute right-0 mt-2 w-40 bg-white px-2 border border-gray-200 rounded-lg overflow-hidden shadow-lg z-10">
                        <ul>
                            <li v-for="(option, index) in sortOptions" :key="index"
                                @click="$emit('select-sort', option)"
                                class="px-4 py-2 hover:bg-blue-50 hover:text-blue-600 my-2 rounded-md cursor-pointer"
                                :class="{ 'bg-blue-50 text-blue-600 rounded-md': selectedSort === option }">
                                {{ option }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="md:hidden flex items-center justify-between">
            <button @click="$emit('show-filter-modal')"
                class="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors -mt-15">
                <SlidersHorizontal class="w-5 h-5" />
                <span>Filter</span>
            </button>
        </div>

        <div class="space-y-3">
            <div v-for="(quiz, index) in filteredQuizzes" :key="index"
                class="flex items-center gap-5 p-5 hover:bg-gray-50 cursor-pointer rounded-xl group">
                <img :src="quiz.image" :alt="quiz.title" class="w-[100px] h-[100px] rounded-xl object-cover" />
                <div class="space-y-2">
                    <div class="flex">
                        <div class="bg-blue-50 px-2 py-1 rounded-md text-blue-600 text-sm">
                            <span>{{ quiz.subject }}</span>
                        </div>
                    </div>
                    <h3 class="lg:text-xl md:text-xl sm:text-lg font-bold group-hover:text-blue-600">{{ quiz.title }}
                    </h3>
                    <div class="flex flex-wrap items-center gap-2 text-gray-600">
                        <div class="flex items-center gap-2">
                            <MessageCircleQuestion class="w-4 h-4" />
                            <span>
                                {{ quiz.totalQuestions }}
                                <span class="hidden sm:inline">questions</span>
                            </span>
                        </div>

                        <div class="flex items-center gap-2">
                            <Play class="w-4 h-4" />
                            <span>{{ quiz.plays }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Search, ArrowDownUp, SlidersHorizontal, MessageCircleQuestion, Play } from "lucide-vue-next";

const props = defineProps({
    searchQuery: String,
    selectedSort: String,
    filteredQuizzes: Array,
    openDropdown: String
});

const emit = defineEmits([
    'toggle-dropdown',
    'select-sort',
    'update:search-query',
    'show-filter-modal'
]);

const sortOptions = ["Latest", "Popularity"];

const handleSortClick = () => {
    console.log('Sort clicked, current openDropdown:', props.openDropdown);
    emit('toggle-dropdown', 'sort');
};
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
</style>