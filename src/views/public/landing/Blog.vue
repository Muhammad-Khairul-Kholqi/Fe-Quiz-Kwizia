<template>
    <div class="flex justify-center p-5">
        <div class="w-full max-w-[1500px]">
            <div class="mt-5 text-center">
                <h1 class="text-4xl font-bold">Kwizia Quiz Blog</h1>
                <p class="mt-2 text-gray-600 text-lg">Stay updated with the latest news, tips, and insights from Kwizia
                </p>
            </div>

            <div class="flex justify-center mt-5 px-4">
                <div class="w-full max-w-[600px] border border-gray-300 rounded-full p-2 flex items-center gap-2">
                    <input type="text" v-model="searchQuery" @input="handleSearch"
                        class="flex-1 outline-none px-4 py-3 min-w-0" placeholder="Search articles...">
                    <button @click="handleSearch"
                        class="bg-blue-600 hover:bg-blue-700 cursor-pointer px-6 py-3 text-white rounded-full whitespace-nowrap transition-colors flex-shrink-0">
                        Search
                    </button>
                </div>
            </div>

            <div class="scrollbar-hide flex items-center gap-7 w-full overflow-auto mt-20 pb-3 text-lg">
                <div @click="filterByCategory(null)" :class="[
                    'cursor-pointer transition-colors whitespace-nowrap',
                    selectedCategory === null ? 'text-blue-600' : 'hover:text-blue-600'
                ]">
                    All
                </div>
                <div v-for="category in categories" :key="category.id" @click="filterByCategory(category.id)" :class="[
                    'cursor-pointer transition-colors whitespace-nowrap',
                    selectedCategory === category.id ? 'text-blue-600' : 'hover:text-blue-600'
                ]">
                    {{ category.name }}
                </div>
            </div>

            <div v-if="isLoading" class="mt-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 items-center gap-6">
                <div v-for="i in 6" :key="i" class="group cursor-pointer">
                    <LoadingSkeleton type="rect" width="100%" height="200px" rounded="lg" />
                    <LoadingSkeleton type="text" width="90%" height="24px" class="mt-3" />
                    <LoadingSkeleton type="text" width="70%" height="18px" class="mt-2" />
                    <LoadingSkeleton type="text" width="40%" height="16px" class="mt-2" />
                </div>
            </div>

            <div v-else-if="paginatedBlogs.length > 0"
                class="mt-5 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 items-start gap-6">
                <RouterLink v-for="(blog, index) in paginatedBlogs" :key="blog.id"
                    :to="`/detail-blog/${blog.id}/${slugify(blog.title)}`"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 200 + index * 200)"
                    class="group cursor-pointer">
                    <div class="relative overflow-hidden rounded-lg border border-gray-200">
                        <img :src="blog.image_url" :alt="blog.title"
                            class="w-full h-[200px] object-cover rounded-lg group-hover:scale-110 duration-300">
                    </div>
                    <h2 class="text-2xl font-semibold mt-3 group-hover:text-blue-700 line-clamp-2">
                        {{ blog.title }}
                    </h2>
                    <div v-html="blog.description" class="text-gray-700 text-lg mt-1 line-clamp-2"></div>
                    <div class="text-gray-600 mt-2">{{ formatDate(blog.created_at) }}</div>
                </RouterLink>
            </div>

            <div v-else class="text-center py-20">
                <p class="text-gray-500 text-lg">No blog posts found.</p>
            </div>

            <Pagination v-if="filteredBlogs.length > perPage && !isLoading" :currentPage="currentPage"
                :totalEntries="filteredBlogs.length" :perPage="perPage" @update:currentPage="updatePage" class="mt-8" />
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import * as motionAnimation from "../../../components/animation/motionAnimation";
import { getBlogs } from '../../../api/blogApi';
import { getCategoryBlog } from '../../../api/categoryBlogApi';
import Pagination from '../../../components/ui/Pagination.vue';
import LoadingSkeleton from '../../../components/ui/LoadingSkeleton.vue';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const blogs = ref([]);
const categories = ref([]);
const searchQuery = ref('');
const selectedCategory = ref(null);
const isLoading = ref(false);
const currentPage = ref(1);
const perPage = ref(10);

const fetchBlogs = async () => {
    try {
        isLoading.value = true;
        const response = await getBlogs();

        if (response.success && response.data) {
            blogs.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching blogs:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load blogs. Please try again later.',
        });
    } finally {
        isLoading.value = false;
    }
};

const fetchCategories = async () => {
    try {
        const response = await getCategoryBlog();

        if (response.success && response.data) {
            categories.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
    }
};

const filteredBlogs = computed(() => {
    let result = blogs.value;

    if (selectedCategory.value) {
        result = result.filter(blog => blog.category_id === selectedCategory.value);
    }

    if (searchQuery.value.trim()) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(blog =>
            blog.title.toLowerCase().includes(query)
        );
    }

    return result;
});

const paginatedBlogs = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredBlogs.value.slice(start, end);
});

const filterByCategory = (categoryId) => {
    selectedCategory.value = categoryId;
    resetPage();
};

const handleSearch = () => {
    resetPage();
};

const updatePage = (page) => {
    currentPage.value = page;
    router.push({
        query: {
            ...route.query,
            page: page
        }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const resetPage = () => {
    updatePage(1);
};

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

watch([searchQuery, selectedCategory], () => {
    resetPage();
});

watch(() => route.query.page, (newPage) => {
    const page = parseInt(newPage) || 1;
    currentPage.value = page;
}, { immediate: true });

onMounted(() => {
    fetchBlogs();
    fetchCategories();
});
</script>

<style scoped>
.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>