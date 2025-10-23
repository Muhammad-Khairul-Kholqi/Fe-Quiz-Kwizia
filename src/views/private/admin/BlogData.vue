<template>
    <div class="border border-gray-200 rounded-xl p-5">
        <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1 sm:max-w-none border border-gray-200 p-2 rounded-lg flex items-center gap-2">
                <Search class="w-5 h-5 text-gray-500 flex-shrink-0" />
                <input type="text" v-model="searchQuery" class="w-full px-2 outline-none" placeholder="Search Blog...">
            </div>
            <button @click="openAddModal"
                class="w-full sm:w-auto sm:min-w-[140px] p-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white cursor-pointer transition-colors duration-200">
                <span>Add Blog</span>
            </button>
        </div>

        <Table :columns="columns" :data="paginatedBlogs" :isLoading="isLoading" class="mt-5">
            <template #cell-no="{ index }">
                {{ (currentPage - 1) * perPage + index + 1 }}
            </template>

            <template #cell-image="{ row }">
                <img v-if="row.image_url" :src="row.image_url" :alt="row.title"
                    class="w-20 h-20 object-cover rounded-lg shadow-sm">
                <div v-else class="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <ImageIcon class="w-8 h-8 text-gray-400" />
                </div>
            </template>

            <template #cell-title="{ row }">
                <div class="max-w-xs">
                    <p class="font-semibold text-gray-900 truncate">{{ row.title }}</p>
                </div>
            </template>

            <template #cell-category="{ row }">
                <span class="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {{ row.category_blog?.name || 'No Category' }}
                </span>
            </template>

            <template #cell-actions="{ row }">
                <div class="flex gap-2">
                    <button @click="openDetailModal(row)"
                        class="text-green-600 hover:underline text-sm cursor-pointer font-medium">
                        Detail
                    </button>
                    <button @click="openEditModal(row)"
                        class="text-blue-600 hover:underline text-sm cursor-pointer font-medium">
                        Update
                    </button>
                    <button @click="deleteBlogItem(row)"
                        class="text-red-600 hover:underline text-sm cursor-pointer font-medium">
                        Delete
                    </button>
                </div>
            </template>

            <template #pagination>
                <Pagination v-if="filteredBlogs.length > 0" :currentPage="currentPage"
                    :totalEntries="filteredBlogs.length" :perPage="perPage" @update:currentPage="updatePage" />
            </template>
        </Table>

        <AddEditModal :isOpen="isModalOpen" :mode="modalMode" :title="modalTitle" :fields="modalFields"
            :initialData="selectedItem" @close="closeModal" @submit="handleSubmit" />

        <DetailModal :isOpen="isDetailModalOpen" :title="detailModalTitle" :fields="detailFields"
            @close="closeDetailModal" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Table from '../../../components/ui/Table.vue';
import Pagination from '../../../components/ui/Pagination.vue';
import { Search, ImageIcon } from 'lucide-vue-next';
import AddEditModal from '../../../components/modal/AddEditModal.vue';
import DetailModal from '../../../components/modal/DetailModal.vue';
import { getBlogs, createBlog, updateBlog, deleteBlog } from '../../../api/blogApi';
import { getCategoryBlog } from '../../../api/categoryBlogApi';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const columns = [
    { label: 'No', key: 'no' },
    { label: 'Image', key: 'image' },
    { label: 'Title', key: 'title' },
    { label: 'Category', key: 'category' },
    { label: 'Action', key: 'actions' },
];

const blogs = ref([]);
const categories = ref([]);
const searchQuery = ref('');
const isModalOpen = ref(false);
const isDetailModalOpen = ref(false);
const modalMode = ref('add');
const selectedItem = ref({});
const selectedDetailItem = ref({});
const isLoading = ref(false);

const currentPage = ref(1);
const perPage = ref(10);

const modalTitle = computed(() => {
    return 'Blog';
});

const detailModalTitle = computed(() => {
    return selectedDetailItem.value?.title || 'Blog Details';
});

const categoryOptions = computed(() => {
    return categories.value.map(cat => ({
        label: cat.name,
        value: cat.id
    }));
});

const filteredBlogs = computed(() => {
    if (!searchQuery.value) return blogs.value;

    return blogs.value.filter(blog =>
        blog.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        blog.author_name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        blog.description.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        blog.category_blog?.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const paginatedBlogs = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredBlogs.value.slice(start, end);
});

const detailFields = computed(() => {
    if (!selectedDetailItem.value) return [];

    return [
        {
            key: 'image',
            label: 'Blog Image',
            value: selectedDetailItem.value.image_url,
            type: 'image'
        },
        {
            key: 'title',
            label: 'Title',
            value: selectedDetailItem.value.title,
            type: 'text'
        },
        {
            key: 'category',
            label: 'Category',
            value: selectedDetailItem.value.category_blog?.name,
            type: 'badge',
            badgeClass: 'bg-blue-100 text-blue-700'
        },
        {
            key: 'author',
            label: 'Author Name',
            value: selectedDetailItem.value.author_name,
            type: 'text'
        },
        {
            key: 'created_by',
            label: 'Created By',
            value: selectedDetailItem.value.users?.username,
            type: 'text'
        },
        {
            key: 'description',
            label: 'Description',
            value: selectedDetailItem.value.description,
            type: 'html'
        },
        {
            key: 'created_at',
            label: 'Created At',
            value: selectedDetailItem.value.created_at,
            type: 'date'
        }
    ];
});

const updatePage = (page) => {
    currentPage.value = page;
    router.push({
        query: {
            ...route.query,
            page: page
        }
    });
};

const resetPage = () => {
    updatePage(1);
};

watch(searchQuery, () => {
    resetPage();
});

watch(() => route.query.page, (newPage) => {
    const page = parseInt(newPage) || 1;
    currentPage.value = page;
}, { immediate: true });

const modalFields = computed(() => [
    {
        name: 'image',
        type: 'image',
        label: 'Blog Image',
        required: false
    },
    {
        name: 'category_id',
        type: 'dropdown',
        label: 'Category',
        placeholder: 'Select category...',
        required: true,
        options: categoryOptions.value,
        optionLabel: 'label',
        optionValue: 'value',
        searchable: true
    },
    {
        name: 'title',
        type: 'text',
        label: 'Title',
        placeholder: 'Enter blog title...',
        required: true
    },
    {
        name: 'author_name',
        type: 'text',
        label: 'Author Name',
        placeholder: 'Enter author name...',
        required: true
    },
    {
        name: 'description',
        type: 'editor',
        label: 'Description',
        placeholder: 'Enter blog description...',
        required: true
    }
]);

const fetchBlogs = async () => {
    try {
        isLoading.value = true;
        const response = await getBlogs();

        if (response.success && response.data) {
            blogs.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching Blogs:', error);
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
        console.error('Error fetching Categories:', error);
    }
};

const openAddModal = () => {
    modalMode.value = 'add';
    selectedItem.value = {};
    isModalOpen.value = true;
};

const openEditModal = (row) => {
    modalMode.value = 'edit';
    selectedItem.value = {
        ...row,
        category_id: row.category_blog?.id,
        existingImage: row.image_url
    };
    isModalOpen.value = true;
};

const openDetailModal = (row) => {
    selectedDetailItem.value = row;
    isDetailModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    selectedItem.value = {};
};

const closeDetailModal = () => {
    isDetailModalOpen.value = false;
    selectedDetailItem.value = {};
};

const handleSubmit = async ({ mode, data }) => {
    try {
        const formData = new FormData();

        formData.append('category_id', data.category_id);
        formData.append('title', data.title);
        formData.append('author_name', data.author_name);
        formData.append('description', data.description);

        if (data.image instanceof File) {
            formData.append('image', data.image);
        }

        if (mode === 'add') {
            await createBlog(formData);
        } else {
            await updateBlog(selectedItem.value.id, formData);
        }

        await fetchBlogs();
        closeModal();
    } catch (error) {
        console.error('Error submitting Blog:', error);
    }
};

const deleteBlogItem = async (row) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete "${row.title}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
        try {
            await deleteBlog(row.id);
            await fetchBlogs();
        } catch (error) {
            console.error('Error deleting Blog:', error);
        }
    }
};

onMounted(() => {
    fetchCategories();
    fetchBlogs();
});
</script>