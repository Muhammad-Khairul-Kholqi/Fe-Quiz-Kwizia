<template>
    <div class="border border-gray-200 rounded-xl p-5">
        <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1 sm:max-w-none border border-gray-200 p-2 rounded-lg flex items-center gap-2">
                <Search class="w-5 h-5 text-gray-500 flex-shrink-0" />
                <input type="text" v-model="searchQuery" class="w-full px-2 outline-none"
                    placeholder="Search Category...">
            </div>
            <button @click="openAddModal"
                class="w-full sm:w-auto sm:min-w-[140px] p-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white cursor-pointer transition-colors duration-200">
                <span>Add Category</span>
            </button>
        </div>

        <Table :columns="columns" :data="paginatedCategoryBlog" :isLoading="isLoading" class="mt-5">
            <template #cell-no="{ index }">
                {{ (currentPage - 1) * perPage + index + 1 }}
            </template>

            <template #cell-actions="{ row }">
                <div class="flex gap-2">
                    <button @click="openEditModal(row)" class="text-blue-600 hover:underline text-sm cursor-pointer">
                        Update
                    </button>
                    <button @click="deleteCategoryBlogItem(row)" class="text-red-600 hover:underline text-sm cursor-pointer">
                        Delete
                    </button>
                </div>
            </template>

            <template #pagination>
                <Pagination v-if="filteredCategoriesBlog.length > 0" :currentPage="currentPage"
                    :totalEntries="filteredCategoriesBlog.length" :perPage="perPage" @update:currentPage="updatePage" />
            </template>
        </Table>

        <AddEditModal :isOpen="isModalOpen" :mode="modalMode" :title="modalTitle" :fields="modalFields"
            :initialData="selectedItem" @close="closeModal" @submit="handleSubmit" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Table from '../../../components/ui/Table.vue';
import Pagination from '../../../components/ui/Pagination.vue';
import { Search } from 'lucide-vue-next';
import AddEditModal from '../../../components/modal/AddEditModal.vue';
import { getCategoryBlog, createCategoryBlog, updateCategoryBlog, deleteCategoryBlog } from '../../../api/categoryBlogApi';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const columns = [
    { label: 'No', key: 'no' },
    { label: 'Category Name', key: 'name' },
    { label: 'Action', key: 'actions' },
];

const categoriesBlog = ref([]);
const searchQuery = ref('');
const isModalOpen = ref(false);
const modalMode = ref('add');
const selectedItem = ref({});
const isLoading = ref(false);

const currentPage = ref(1);
const perPage = ref(10);

const modalTitle = computed(() => {
    return 'Category Blog';
});

const filteredCategoriesBlog = computed(() => {
    if (!searchQuery.value) return categoriesBlog.value;

    return categoriesBlog.value.filter(categoryBlog =>
        categoryBlog.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const paginatedCategoryBlog = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredCategoriesBlog.value.slice(start, end);
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

const modalFields = [
    {
        name: 'name',
        type: 'text',
        label: 'Category Name',
        placeholder: 'Enter Category name...',
        required: true
    },
];

const fetchCategoriesBlog = async () => {
    try {
        isLoading.value = true;
        const response = await getCategoryBlog();

        if (response.success && response.data) {
            categoriesBlog.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching Category Blog:', error);
    } finally {
        isLoading.value = false;
    }
};

const openAddModal = () => {
    modalMode.value = 'add';
    selectedItem.value = {};
    isModalOpen.value = true;
};

const openEditModal = (row) => {
    modalMode.value = 'edit';
    selectedItem.value = { ...row };
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    selectedItem.value = {};
};

const handleSubmit = async ({ mode, data }) => {
    try {
        if (mode === 'add') {
            await createCategoryBlog(data);
        } else {
            await updateCategoryBlog(selectedItem.value.id, data);
        }

        await fetchCategoriesBlog();
        closeModal();
    } catch (error) {
        console.error('Error submitting Category Blog:', error);
    }
};

const deleteCategoryBlogItem = async (row) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete "${row.question}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
        try {
            await deleteCategoryBlog(row.id);
            await fetchCategoriesBlog();
        } catch (error) {
            console.error('Error deleting Category Blog:', error);
        }
    }
};

onMounted(() => {
    fetchCategoriesBlog();
});
</script>