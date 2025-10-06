<template>
    <div class="flex justify-center p-5">
        <div class="w-full max-w-[1300px]">
            <div class="flex items-start gap-5 mt-5">
                <div class="w-full max-w-[25%] p-5 bg-gray-50 rounded-xl sticky top-20 space-y-6">
                    <h1 class="font-bold text-xl text-blue-600">Filter</h1>

                    <div v-if="activeFilters.length" class="flex flex-wrap gap-2 mt-3">
                        <div v-for="(filter, index) in activeFilters" :key="index"
                            class="flex items-center gap-2 border border-blue-600 text-blue-600 px-3 py-1.5 rounded-full text-sm font-medium">
                            <span>{{ filter }}</span>
                            <X size="16" class="cursor-pointer hover:text-blue-700" @click="removeFilter(filter)" />
                        </div>
                    </div>

                    <div>
                        <button @click="toggleDropdown('subject')"
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
                                    @click="selectOption('subject', subject)"
                                    class="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700">
                                    {{ subject }}
                                </li>
                            </ul>
                        </transition>
                    </div>

                    <div>
                        <button @click="toggleDropdown('questions')"
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
                                    @click="selectOption('questions', range)"
                                    class="px-4 py-2 hover:bg-blue-50 cursor-pointer text-gray-700">
                                    {{ range }}
                                </li>
                            </ul>
                        </transition>
                    </div>
                </div>

                <div class="w-full max-w-[50%]">
                    <div class="flex items-center gap-5">
                        <div class="flex items-center gap-2 border border-gray-200 p-3 rounded-lg w-full max-w-[330px]">
                            <Search class="w-6 h-6 text-gray-400" />
                            <input type="text" class="px-2 w-full outline-none" placeholder="Search quiz">
                        </div>

                        <div class="flex items-center gap-5 text-gray-600">
                            <span>2,618 quizzes</span>
                            <span>|</span>
                            <div class="hover:bg-gray-50 p-1 rounded-md cursor-pointer transition-colors">
                                <ArrowDownUp class="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div class="mt-5 space-y-3">
                        <div class="flex items-center gap-5 p-5 hover:bg-gray-50 cursor-pointer rounded-xl group">
                            <img src="https://placehold.co/120x120" alt="" class="w-[120px h-[120px] rounded-xl">
                            <div class="space-y-2">
                                <div class="flex">
                                    <div class="bg-blue-50 px-2 py-1 rounded-md text-blue-600 text-sm">
                                        <span>Science</span>
                                    </div>
                                </div>
                                <h3 class="text-2xl font-bold group-hover:text-blue-600">Keanekaragaman Hayati</h3>
                                <div class="flex items-center gap-5 text-gray-600">
                                    <div class="flex items-center gap-2">
                                        <MessageCircleQuestionMark class="w-4 -h-4" />
                                        <span>5 questions</span>
                                    </div>

                                    <div class="flex items-center gap-2">
                                        <Play class="w-4 -h-4" />
                                        <span>874</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center gap-5 p-5 hover:bg-gray-50 cursor-pointer rounded-xl group">
                            <img src="https://placehold.co/120x120" alt="" class="w-[120px h-[120px] rounded-xl">
                            <div class="space-y-2">
                                <div class="flex">
                                    <div class="bg-blue-50 px-2 py-1 rounded-md text-blue-600 text-sm">
                                        <span>Science</span>
                                    </div>
                                </div>
                                <h3 class="text-2xl font-bold group-hover:text-blue-600">Keanekaragaman Hayati</h3>
                                <div class="flex items-center gap-5 text-gray-600">
                                    <div class="flex items-center gap-2">
                                        <MessageCircleQuestionMark class="w-4 -h-4" />
                                        <span>5 questions</span>
                                    </div>

                                    <div class="flex items-center gap-2">
                                        <Play class="w-4 -h-4" />
                                        <span>874</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center gap-5 p-5 hover:bg-gray-50 cursor-pointer rounded-xl group">
                            <img src="https://placehold.co/120x120" alt="" class="w-[120px h-[120px] rounded-xl">
                            <div class="space-y-2">
                                <div class="flex">
                                    <div class="bg-blue-50 px-2 py-1 rounded-md text-blue-600 text-sm">
                                        <span>Science</span>
                                    </div>
                                </div>
                                <h3 class="text-2xl font-bold group-hover:text-blue-600">Keanekaragaman Hayati</h3>
                                <div class="flex items-center gap-5 text-gray-600">
                                    <div class="flex items-center gap-2">
                                        <MessageCircleQuestionMark class="w-4 -h-4" />
                                        <span>5 questions</span>
                                    </div>

                                    <div class="flex items-center gap-2">
                                        <Play class="w-4 -h-4" />
                                        <span>874</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center gap-5 p-5 hover:bg-gray-50 cursor-pointer rounded-xl group">
                            <img src="https://placehold.co/120x120" alt="" class="w-[120px h-[120px] rounded-xl">
                            <div class="space-y-2">
                                <div class="flex">
                                    <div class="bg-blue-50 px-2 py-1 rounded-md text-blue-600 text-sm">
                                        <span>Science</span>
                                    </div>
                                </div>
                                <h3 class="text-2xl font-bold group-hover:text-blue-600">Keanekaragaman Hayati</h3>
                                <div class="flex items-center gap-5 text-gray-600">
                                    <div class="flex items-center gap-2">
                                        <MessageCircleQuestionMark class="w-4 -h-4" />
                                        <span>5 questions</span>
                                    </div>

                                    <div class="flex items-center gap-2">
                                        <Play class="w-4 -h-4" />
                                        <span>874</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="flex items-center gap-5 p-5 hover:bg-gray-50 cursor-pointer rounded-xl group">
                            <img src="https://placehold.co/120x120" alt="" class="w-[120px h-[120px] rounded-xl">
                            <div class="space-y-2">
                                <div class="flex">
                                    <div class="bg-blue-50 px-2 py-1 rounded-md text-blue-600 text-sm">
                                        <span>Science</span>
                                    </div>
                                </div>
                                <h3 class="text-2xl font-bold group-hover:text-blue-600">Keanekaragaman Hayati</h3>
                                <div class="flex items-center gap-5 text-gray-600">
                                    <div class="flex items-center gap-2">
                                        <MessageCircleQuestionMark class="w-4 -h-4" />
                                        <span>5 questions</span>
                                    </div>

                                    <div class="flex items-center gap-2">
                                        <Play class="w-4 -h-4" />
                                        <span>874</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="w-full max-w-[25%] sticky top-20 space-y-6">
                    <h1 class="font-bold text-xl"><span class="text-blue-600">Popular</span> Quiz</h1>


                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { ChevronDown, X, Search, ArrowDownUp, MessageCircleQuestionMark, Play } from "lucide-vue-next";

const openDropdown = ref(null);
const selectedSubject = ref("");
const selectedQuestions = ref("");

const subjects = ["Science", "Math", "History", "English", "Geography"];
const questionRanges = ["1 - 5", "1 - 10", "1 - 15", "1 - 20", "1 - 25"];

const toggleDropdown = (type) => {
    openDropdown.value = openDropdown.value === type ? null : type;
};

const selectOption = (type, value) => {
    if (type === "subject") selectedSubject.value = value;
    if (type === "questions") selectedQuestions.value = value;
    openDropdown.value = null;
};

const activeFilters = computed(() => {
    const filters = [];
    if (selectedSubject.value) filters.push(selectedSubject.value);
    if (selectedQuestions.value) filters.push(selectedQuestions.value);
    return filters;
});

const removeFilter = (filter) => {
    if (selectedSubject.value === filter) selectedSubject.value = "";
    if (selectedQuestions.value === filter) selectedQuestions.value = "";
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
