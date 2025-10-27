<template>
    <div class="w-full lg:max-w-[30%] sticky top-20 mt-10 lg:mt-0">
        <h1 class="font-bold text-xl">
            Related <span class="text-blue-600">Topic</span>
        </h1>

        <div v-if="isLoading" class="space-y-5 mt-3">
            <div v-for="i in 3" :key="i" class="border-b border-gray-200 pb-2">
                <div class="flex items-center gap-3">
                    <LoadingSkeleton type="rect" width="150px" height="90px" rounded="lg" />
                    <div class="flex-1">
                        <LoadingSkeleton type="text" width="100%" height="16px" />
                        <LoadingSkeleton type="text" width="60%" height="14px" class="mt-2" />
                    </div>
                </div>
            </div>
        </div>

        <div v-else-if="relatedBlogs.length > 0" class="space-y-5 mt-3">
            <div v-for="(topic, index) in relatedBlogs" :key="index" class="border-b border-gray-200 pb-2">
                <RouterLink :to="`/detail-blog/${topic.id}/${slugify(topic.title)}`"
                    class="flex items-center gap-3 rounded-lg cursor-pointer group">
                    <div class="relative overflow-hidden rounded-lg border border-gray-200">
                        <img :src="topic.image_url" :alt="topic.title"
                            class="w-[200px] object-cover h-[80px] sm:h-[90px] rounded-lg group-hover:scale-110 duration-300" />
                    </div>

                    <div>
                        <h1 class="font-bold group-hover:text-blue-600 text-sm sm:text-base line-clamp-2">
                            {{ topic.title }}
                        </h1>
                        <p class="mt-1 text-gray-500 text-xs sm:text-sm">
                            {{ formatDate(topic.created_at) }}
                        </p>
                    </div>
                </RouterLink>
            </div>
        </div>

        <div v-else class="mt-3">
            <p class="text-gray-500 text-sm">No related topics available.</p>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import LoadingSkeleton from '../../ui/LoadingSkeleton.vue';

defineProps({
    relatedBlogs: {
        type: Array,
        default: () => []
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

const slugify = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>