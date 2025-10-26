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

        <div v-if="isLoading" class="space-y-3">
            <div v-for="i in 5" :key="i" class="flex items-center gap-5 p-5 rounded-xl border border-gray-200">
                <LoadingSkeleton type="rect" width="100px" height="100px" rounded="xl" />
                <div class="flex-1 space-y-3">
                    <LoadingSkeleton type="text" width="20%" height="25px" />
                    <LoadingSkeleton type="text" width="50%" height="30px" />
                    <div>
                        <LoadingSkeleton type="text" width="30%" height="20px" class="inline-block mr-4" />
                        <LoadingSkeleton type="text" width="20%" height="20px" class="inline-block mr-4" />
                        <LoadingSkeleton type="text" width="15%" height="20px" class="inline-block" />
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="filteredQuizzes.length === 0" class="text-center py-20">
            <p class="text-gray-500 text-lg">No quizzes found.</p>
        </div>

        <div v-else class="space-y-3">
            <div v-for="(quiz, index) in filteredQuizzes" :key="index" @click="$emit('play-quiz', quiz.id)"
                class="flex items-center gap-5 p-5 hover:bg-gray-50 cursor-pointer rounded-xl group border border-gray-200 hover:border-blue-300 transition-all">
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
                            <Clock class="w-4 h-4" />
                            <span>{{ quiz.time_limit }} min</span>
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
import { Search, ArrowDownUp, SlidersHorizontal, MessageCircleQuestion, Play, Clock } from "lucide-vue-next";
import LoadingSkeleton from '../../ui/LoadingSkeleton.vue';

const props = defineProps({
    searchQuery: String,
    selectedSort: String,
    filteredQuizzes: Array,
    openDropdown: String,
    isLoading: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits([
    'toggle-dropdown',
    'select-sort',
    'update:search-query',
    'show-filter-modal',
    'play-quiz'
]);

const sortOptions = ["Latest", "Popularity"];

const handleSortClick = () => {
    emit('toggle-dropdown', 'sort');
};
</script>