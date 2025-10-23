<template>
    <div class="w-full lg:max-w-[70%]">
        <div v-if="isLoading">
            <LoadingSkeleton type="rect" width="100%" height="350px" rounded="2xl" />
            <div class="flex justify-between items-center gap-5 mt-5">
                <LoadingSkeleton type="rect" width="120px" height="36px" rounded="full" />
                <div class="flex items-center gap-5">
                    <LoadingSkeleton type="text" width="150px" height="20px" />
                    <LoadingSkeleton type="text" width="120px" height="20px" />
                </div>
            </div>
            <LoadingSkeleton type="text" width="90%" height="32px" class="mt-5" />
            <LoadingSkeleton type="text" width="100%" height="20px" class="mt-3" />
            <LoadingSkeleton type="text" width="100%" height="20px" class="mt-2" />
            <LoadingSkeleton type="text" width="80%" height="20px" class="mt-2" />
        </div>

        <div v-else-if="blog">
            <img :src="blog.image_url" :alt="blog.title"
                class="w-full object-cover h-[250px] sm:h-[300px] lg:h-[350px] rounded-2xl" />

            <div class="flex flex-wrap justify-between items-center gap-5 mt-5 text-sm sm:text-base">
                <div class="bg-orange-50 px-3 py-2 rounded-full text-orange-600 uppercase text-xs font-semibold">
                    {{ blog.category_blog?.name || 'Uncategorized' }}
                </div>

                <div class="flex flex-wrap items-center gap-5">
                    <div class="flex items-center gap-2">
                        <User class="w-5 h-5 text-gray-500" />
                        <span>{{ blog.author_name || blog.users?.username || 'Anonymous' }}</span>
                    </div>

                    <div class="flex items-center gap-2">
                        <Calendar class="w-5 h-5 text-gray-500" />
                        <span>{{ formatDate(blog.created_at) }}</span>
                    </div>
                </div>
            </div>

            <h1 class="font-bold text-2xl sm:text-3xl mt-5">
                {{ blog.title }}
            </h1>

            <div v-html="blog.description" class="mt-3 text-gray-700 text-base sm:text-lg leading-relaxed blog-content">
            </div>
        </div>

        <div v-else class="text-center py-20">
            <p class="text-gray-500 text-lg">Blog not found.</p>
        </div>
    </div>
</template>

<script setup>
import { User, Calendar } from "lucide-vue-next";
import LoadingSkeleton from '../../ui/LoadingSkeleton.vue';

defineProps({
    blog: {
        type: Object,
        default: null
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});

const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};
</script>

<style scoped>
.blog-content :deep(p) {
    margin-bottom: 1rem;
}

.blog-content :deep(b),
.blog-content :deep(strong) {
    font-weight: 700;
}

.blog-content :deep(i),
.blog-content :deep(em) {
    font-style: italic;
}

.blog-content :deep(ul),
.blog-content :deep(ol) {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
}

.blog-content :deep(li) {
    margin-bottom: 0.5rem;
}

.blog-content :deep(a) {
    color: #2563eb;
    text-decoration: underline;
}

.blog-content :deep(a:hover) {
    color: #1d4ed8;
}
</style>