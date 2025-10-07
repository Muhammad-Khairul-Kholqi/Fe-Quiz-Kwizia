<template>
    <div :class="['space-y-6 border-gray-200 lg:border-l lg:pl-5 lg:sticky lg:top-20', customClass]">
        <h1 class="font-bold text-xl"><span class="text-blue-600">Popular</span> Quiz</h1>

        <div class="space-y-5">
            <div v-for="(quiz, index) in popularQuizzes" :key="index" class="border-b border-gray-200 pb-2">
                <div class="flex items-center gap-5 p-3 hover:bg-gray-50 cursor-pointer rounded-xl group">
                    <img :src="quiz.image" :alt="quiz.title" class="w-[70px] h-[70px] rounded-lg object-cover" />
                    <div>
                        <div class="flex">
                            <div class="bg-blue-50 px-2 py-1 rounded-md text-blue-600 text-xs">
                                <span>{{ quiz.subject }}</span>
                            </div>
                        </div>
                        <h3 class="text-md font-bold group-hover:text-blue-600 mt-2">{{ quiz.title }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    popularQuizzes: Array,
    customClass: {
        type: String,
        default: ""
    }
});
</script>