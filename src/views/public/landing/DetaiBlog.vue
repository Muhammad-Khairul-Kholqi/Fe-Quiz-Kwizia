<template>
    <div class="flex justify-center p-5">
        <div class="w-full max-w-[1500px] flex flex-col lg:flex-row items-start gap-5">
            <BlogContent />
            <RelatedTopics />
        </div>
    </div>
</template>

<script setup>
import BlogContent from '../../../components/sections/detailBlog/BlogContent.vue';
import RelatedTopics from '../../../components/sections/detailBlog/RelatedTopics.vue';
</script>
