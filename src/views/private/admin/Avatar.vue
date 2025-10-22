<template>
    <div class="border border-gray-200 rounded-xl p-5">
        <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1 sm:max-w-none border border-gray-200 p-2 rounded-lg flex items-center gap-2">
                <Search class="w-5 h-5 text-gray-500 flex-shrink-0" />
                <input type="text" v-model="searchQuery" class="w-full px-2 outline-none"
                    placeholder="Search Avatar...">
            </div>
            <button @click="openAddModal"
                class="w-full sm:w-auto sm:min-w-[140px] p-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-white cursor-pointer transition-colors duration-200">
                <span>Add Avatar</span>
            </button>
        </div>

        <Table :columns="columns" :data="paginatedAvatars" :isLoading="isLoading" class="mt-5">
            <template #cell-no="{ index }">
                {{ (currentPage - 1) * perPage + index + 1 }}
            </template>

            <template #cell-image="{ row }">
                <img v-if="row.image_url" :src="row.image_url" :alt="row.name"
                    class="w-12 h-12 rounded-full object-cover">
                <div v-else class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span class="text-gray-400 text-xs">No Image</span>
                </div>
            </template>

            <template #cell-actions="{ row }">
                <div class="flex gap-2">
                    <button @click="openEditModal(row)" class="text-blue-600 hover:underline text-sm cursor-pointer">
                        Update
                    </button>
                    <button @click="deleteAvatarItem(row)" class="text-red-600 hover:underline text-sm cursor-pointer">
                        Delete
                    </button>
                </div>
            </template>

            <template #pagination>
                <Pagination v-if="filteredAvatars.length > 0" :currentPage="currentPage"
                    :totalEntries="filteredAvatars.length" :perPage="perPage" @update:currentPage="updatePage" />
            </template>
        </Table>

        <AddEditModal :isOpen="isModalOpen" :mode="modalMode" :title="modalTitle" :fields="modalFields"
            :initialData="selectedItem" :existingImageUrl="existingImageUrl" @close="closeModal"
            @submit="handleSubmit" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Table from '../../../components/ui/Table.vue';
import Pagination from '../../../components/ui/Pagination.vue';
import { Search } from 'lucide-vue-next';
import AddEditModal from '../../../components/modal/AddEditModal.vue';
import { getAvatar, createAvatar, updateAvatar, deleteAvatar } from '../../../api/avatarApi';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const columns = [
    { label: 'No', key: 'no' },
    { label: 'Image', key: 'image' },
    { label: 'Avatar Name', key: 'name' },
    { label: 'Action', key: 'actions' },
];

const avatars = ref([]);
const searchQuery = ref('');
const isModalOpen = ref(false);
const modalMode = ref('add');
const selectedItem = ref({});
const existingImageUrl = ref('');
const isLoading = ref(false);

const currentPage = ref(1);
const perPage = ref(10);

const modalTitle = computed(() => {
    return 'Avatar';
});

const filteredAvatars = computed(() => {
    if (!searchQuery.value) return avatars.value;

    return avatars.value.filter(avatar =>
        avatar.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const paginatedAvatars = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredAvatars.value.slice(start, end);
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
        name: 'image',
        type: 'image',
        label: 'Avatar Image',
        required: false,
        hint: 'Upload avatar image (JPG, PNG, max 2MB). Leave empty to keep current image when editing.'
    },
    {
        name: 'name',
        type: 'text',
        label: 'Avatar Name',
        placeholder: 'Enter Avatar name...',
        required: true
    },
];

const fetchAvatars = async () => {
    try {
        isLoading.value = true;
        const response = await getAvatar();

        if (response.success && response.data) {
            avatars.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching Avatars:', error);
    } finally {
        isLoading.value = false;
    }
};

const openAddModal = () => {
    modalMode.value = 'add';
    selectedItem.value = {};
    existingImageUrl.value = '';
    isModalOpen.value = true;
};

const openEditModal = (row) => {
    modalMode.value = 'edit';
    selectedItem.value = { ...row };
    existingImageUrl.value = row.image_url || '';
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
    selectedItem.value = {};
    existingImageUrl.value = '';
};

const handleSubmit = async ({ mode, data }) => {
    try {
        const formData = new FormData();

        formData.append('name', data.name);

        if (data.image && data.image instanceof File) {
            formData.append('image', data.image);
        }

        if (mode === 'add') {
            if (!data.image) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Avatar image is required'
                });
                return;
            }
            await createAvatar(formData);
        } else {
            await updateAvatar(selectedItem.value.id, formData);
        }

        await fetchAvatars();
        closeModal();
    } catch (error) {
        console.error('Error submitting Avatar:', error);
    }
};

const deleteAvatarItem = async (row) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete "${row.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
        try {
            await deleteAvatar(row.id);
            await fetchAvatars();
        } catch (error) {
            console.error('Error deleting Avatar:', error);
        }
    }
};

onMounted(() => {
    fetchAvatars();
});
</script>