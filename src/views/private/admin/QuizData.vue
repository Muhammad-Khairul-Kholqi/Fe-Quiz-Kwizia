<template>
    <div class="border border-gray-200 rounded-xl p-5">
        <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1 sm:max-w-none border border-gray-200 p-2 rounded-lg flex items-center gap-2">
                <Search class="w-5 h-5 text-gray-500 flex-shrink-0" />
                <input type="text" v-model="searchQuery" class="w-full px-2 outline-none" placeholder="Search Quiz...">
            </div>
            <DropDown v-model="selectedCategory" placeholder="Filter by Category" :options="categoryFilterOptions"
                optionLabel="label" optionValue="value" :searchable="false" class="w-full sm:w-48" />
            <button @click="openAddModal"
                class="w-full sm:w-auto sm:min-w-[140px] p-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white cursor-pointer transition-colors duration-200">
                <span>Add Quiz</span>
            </button>
        </div>

        <Table :columns="columns" :data="paginatedQuizzes" :isLoading="isLoading" class="mt-5">
            <template #cell-no="{ index }">
                {{ (currentPage - 1) * perPage + index + 1 }}
            </template>

            <template #cell-image="{ row }">
                <img v-if="row.image_cover" :src="row.image_cover" :alt="row.title"
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
                    {{ row.category_quiz?.name || 'No Category' }}
                </span>
            </template>

            <template #cell-total_questions="{ row }">
                <span class="font-semibold text-gray-900">{{ row.total_questions }}</span>
            </template>

            <template #cell-time_limit="{ row }">
                <span class="text-gray-700">{{ row.time_limit }} min</span>
            </template>

            <template #cell-total_players="{ row }">
                <span class="font-semibold text-gray-900">{{ row.total_players || 0 }}</span>
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
                    <button @click="deleteQuizItem(row)"
                        class="text-red-600 hover:underline text-sm cursor-pointer font-medium">
                        Delete
                    </button>
                </div>
            </template>

            <template #pagination>
                <Pagination v-if="filteredQuizzes.length > 0" :currentPage="currentPage"
                    :totalEntries="filteredQuizzes.length" :perPage="perPage" @update:currentPage="updatePage" />
            </template>
        </Table>

        <AddEditModalQuiz :isOpen="isModalOpen" :mode="modalMode" :categoryOptions="categoryOptions"
            :initialData="selectedItem" :existingImageUrl="selectedItem?.image_cover" @close="closeModal"
            @submit="handleSubmit" />

        <DetailModalQuiz :isOpen="isDetailModalOpen" :quizData="selectedDetailItem" @close="closeDetailModal" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Table from '../../../components/ui/Table.vue';
import Pagination from '../../../components/ui/Pagination.vue';
import DropDown from '../../../components/ui/DropDown.vue';
import { Search, ImageIcon } from 'lucide-vue-next';
import AddEditModalQuiz from '../../../components/modal/AddEditModalQuiz.vue';
import DetailModalQuiz from '../../../components/modal/DetailModalQuiz.vue';
import { getAllQuizzes, createQuiz, updateQuiz, deleteQuiz } from '../../../api/quizApi';
import { getCategoryQuiz } from '../../../api/categoryQuizApi';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const columns = [
    { label: 'No', key: 'no' },
    { label: 'Image', key: 'image' },
    { label: 'Title', key: 'title' },
    { label: 'Category', key: 'category' },
    { label: 'Questions', key: 'total_questions' },
    { label: 'Time Limit', key: 'time_limit' },
    { label: 'Total Players', key: 'total_players' },
    { label: 'Action', key: 'actions' },
];

const quizzes = ref([]);
const categories = ref([]);
const searchQuery = ref('');
const selectedCategory = ref(null);
const isModalOpen = ref(false);
const isDetailModalOpen = ref(false);
const modalMode = ref('add');
const selectedItem = ref({});
const selectedDetailItem = ref(null);
const isLoading = ref(false);

const currentPage = ref(1);
const perPage = ref(10);

const categoryOptions = computed(() => {
    return categories.value.map(cat => ({
        label: cat.name,
        value: cat.id
    }));
});

const categoryFilterOptions = computed(() => {
    return [
        { label: 'All Categories', value: null },
        ...categories.value.map(cat => ({
            label: cat.name,
            value: cat.id
        }))
    ];
});

const filteredQuizzes = computed(() => {
    let result = quizzes.value;

    if (selectedCategory.value) {
        result = result.filter(quiz => quiz.category_id === selectedCategory.value);
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        result = result.filter(quiz =>
            quiz.title.toLowerCase().includes(query) ||
            quiz.category_quiz?.name.toLowerCase().includes(query)
        );
    }

    return result;
});

const paginatedQuizzes = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredQuizzes.value.slice(start, end);
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

watch([searchQuery, selectedCategory], () => {
    resetPage();
});

watch(() => route.query.page, (newPage) => {
    const page = parseInt(newPage) || 1;
    currentPage.value = page;
}, { immediate: true });

const fetchQuizzes = async () => {
    try {
        isLoading.value = true;
        const response = await getAllQuizzes();

        if (response.success && response.data) {
            quizzes.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching quizzes:', error);
    } finally {
        isLoading.value = false;
    }
};

const fetchCategories = async () => {
    try {
        const response = await getCategoryQuiz();

        if (response.success && response.data) {
            categories.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching categories:', error);
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
        category_id: row.category_quiz?.id
    };
    isModalOpen.value = true;
};

const openDetailModal = async (row) => {
    try {
        isLoading.value = true;
        const { getQuizById } = await import('../../../api/quizApi');
        const response = await getQuizById(row.id);

        if (response.success && response.data) {
            selectedDetailItem.value = response.data;
            isDetailModalOpen.value = true;
        }
    } catch (error) {
        console.error('Error fetching quiz details:', error);
    } finally {
        isLoading.value = false;
    }
};

const closeModal = () => {
    isModalOpen.value = false;
    selectedItem.value = {};
};

const closeDetailModal = () => {
    isDetailModalOpen.value = false;
    selectedDetailItem.value = null;
};

const handleSubmit = async ({ mode, data }) => {
    try {
        const formData = new FormData();

        formData.append('category_id', data.category_id);
        formData.append('title', data.title);
        formData.append('time_limit', data.time_limit);
        formData.append('questions', JSON.stringify(data.questions));

        if (data.image_cover instanceof File) {
            formData.append('image_cover', data.image_cover);
        }

        if (mode === 'add') {
            await createQuiz(formData);
        } else {
            await updateQuiz(selectedItem.value.id, formData);
        }

        await fetchQuizzes();
        closeModal();
    } catch (error) {
        console.error('Error submitting quiz:', error);
    }
};

const deleteQuizItem = async (row) => {
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
            await deleteQuiz(row.id);
            await fetchQuizzes();
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    }
};

onMounted(() => {
    fetchCategories();
    fetchQuizzes();
});
</script>