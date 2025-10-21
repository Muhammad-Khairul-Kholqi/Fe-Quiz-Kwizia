<template>
    <div class="border border-gray-200 rounded-xl p-5">
        <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1 sm:max-w-none border border-gray-200 p-2 rounded-lg flex items-center gap-2">
                <Search class="w-5 h-5 text-gray-500 flex-shrink-0" />
                <input type="text" v-model="searchQuery" class="w-full px-2 outline-none" placeholder="Search FAQ...">
            </div>
            <button @click="openAddModal"
                class="w-full sm:w-auto sm:min-w-[140px] p-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white cursor-pointer transition-colors duration-200">
                <span>Add FAQ</span>
            </button>
        </div>

        <Table :columns="columns" :data="paginatedFaqs" :isLoading="isLoading" class="mt-5">
            <template #cell-no="{ index }">
                {{ (currentPage - 1) * perPage + index + 1 }}
            </template>

            <template #cell-actions="{ row }">
                <div class="flex gap-2">
                    <button @click="openEditModal(row)" class="text-blue-600 hover:underline text-sm cursor-pointer">
                        Update
                    </button>
                    <button @click="deleteFaqItem(row)" class="text-red-600 hover:underline text-sm cursor-pointer">
                        Delete
                    </button>
                </div>
            </template>

            <template #pagination>
                <Pagination v-if="filteredFaqs.length > 0" :currentPage="currentPage"
                    :totalEntries="filteredFaqs.length" :perPage="perPage" @update:currentPage="updatePage" />
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
import { getFaq, createFaq, updateFaq, deleteFaq } from '../../../api/FAQApi';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const columns = [
    { label: 'No', key: 'no' },
    { label: 'Question', key: 'question' },
    { label: 'Answer', key: 'answer' },
    { label: 'Action', key: 'actions' },
];

const faqs = ref([]);
const searchQuery = ref('');
const isModalOpen = ref(false);
const modalMode = ref('add');
const selectedItem = ref({});
const isLoading = ref(false);

const currentPage = ref(1);
const perPage = ref(10); 

const modalTitle = computed(() => {
    return 'FAQ';
});

const filteredFaqs = computed(() => {
    if (!searchQuery.value) return faqs.value;

    return faqs.value.filter(faq =>
        faq.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const paginatedFaqs = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredFaqs.value.slice(start, end);
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
        name: 'question',
        type: 'text',
        label: 'Question',
        placeholder: 'Enter FAQ question...',
        required: true
    },
    {
        name: 'answer',
        type: 'text',
        label: 'Answer',
        placeholder: 'Enter FAQ answer...',
        required: true
    },
];

const fetchFaqs = async () => {
    try {
        isLoading.value = true;
        const response = await getFaq();

        if (response.success && response.data) {
            faqs.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching FAQs:', error);
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
            await createFaq(data);
        } else {
            await updateFaq(selectedItem.value.id, data);
        }

        await fetchFaqs();
        closeModal();
    } catch (error) {
        console.error('Error submitting FAQ:', error);
    }
};

const deleteFaqItem = async (row) => {
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
            await deleteFaq(row.id);
            await fetchFaqs();
        } catch (error) {
            console.error('Error deleting FAQ:', error);
        }
    }
};

onMounted(() => {
    fetchFaqs();
});
</script>