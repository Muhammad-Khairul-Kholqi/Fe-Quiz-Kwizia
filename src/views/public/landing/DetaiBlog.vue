<template>
    <div class="flex justify-center p-5">
        <div class="w-full max-w-[1500px] flex flex-col lg:flex-row items-start gap-5">
            <BlogContent :blog="blog" :isLoading="isLoading" />
            <RelatedTopics :relatedBlogs="relatedBlogs" :isLoading="isLoading" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import BlogContent from '../../../components/sections/detailBlog/BlogContent.vue';
import RelatedTopics from '../../../components/sections/detailBlog/RelatedTopics.vue';
import { getBlogById, getBlogs } from '../../../api/blogApi';
import Swal from 'sweetalert2';

const route = useRoute();
const blog = ref(null);
const relatedBlogs = ref([]);
const isLoading = ref(false);

const fetchBlogDetail = async (id) => {
    try {
        isLoading.value = true;
        const response = await getBlogById(id);

        if (response.success && response.data) {
            blog.value = response.data;

            document.title = `${blog.value.title} | Kwizia`;

            fetchRelatedBlogs(blog.value.category_id, id);
        }
    } catch (error) {
        console.error('Error fetching blog detail:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load blog detail. Please try again later.',
        });
    } finally {
        isLoading.value = false;
    }
};

const fetchRelatedBlogs = async (categoryId, currentBlogId) => {
    try {
        const response = await getBlogs();

        if (response.success && response.data) {
            relatedBlogs.value = response.data
                .filter(b => b.category_id === categoryId && b.id !== currentBlogId)
                .slice(0, 3);
        }
    } catch (error) {
        console.error('Error fetching related blogs:', error);
    }
};

watch(() => route.params.id, (newId) => {
    if (newId) {
        fetchBlogDetail(newId);
    }
}, { immediate: true });

onMounted(() => {
    const blogId = route.params.id;
    if (blogId) {
        fetchBlogDetail(blogId);
    }
});
</script>