<template>
    <div :class="['space-y-6 border-gray-200 lg:border-l lg:pl-5 lg:sticky lg:top-20', customClass]">
        <h1 class="font-bold text-xl"><span class="text-blue-600">Popular</span> Quiz</h1>

        <div v-if="popularQuizzes.length === 0">
            <div class="space-y-3">
                <div v-for="i in 5" :key="i" class="border-b border-gray-200 pb-2">
                    <div class="flex items-center gap-5 p-3 rounded-xl">
                        <LoadingSkeleton type="rect" width="70px" height="70px" rounded="lg" />
                        <div class="flex-1 space-y-2">
                            <LoadingSkeleton type="text" width="30%" height="20px" />
                            <LoadingSkeleton type="text" width="60%" height="25px" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="space-y-5">
            <div v-for="(quiz, index) in popularQuizzes" :key="index" class="border-b border-gray-200 pb-2">
                <div @click="$emit('play-quiz', quiz.id)"
                    class="flex items-center gap-5 p-3 hover:bg-gray-50 cursor-pointer rounded-xl group">
                    <img :src="quiz.image" :alt="quiz.title" class="w-[70px] h-[70px] rounded-lg object-cover" />
                    <div>
                        <div class="flex">
                            <div class="bg-blue-50 px-2 py-1 rounded-md text-blue-600 text-xs">
                                <span>{{ quiz.subject }}</span>
                            </div>
                        </div>
                        <h3 class="text-md font-bold group-hover:text-blue-600 mt-2 line-clamp-2">{{ quiz.title }}</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import LoadingSkeleton from '../../ui/LoadingSkeleton.vue';

defineProps({
    popularQuizzes: {
        type: Array,
        default: () => []
    },
    customClass: {
        type: String,
        default: ""
    },
});

defineEmits(['play-quiz']);
</script>