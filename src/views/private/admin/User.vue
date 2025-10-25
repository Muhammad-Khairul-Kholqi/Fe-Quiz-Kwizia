<template>
    <div class="border border-gray-200 rounded-xl p-5">
        <div class="flex flex-col sm:flex-row gap-3">
            <div class="flex-1 sm:max-w-none border border-gray-200 p-2 rounded-lg flex items-center gap-2">
                <Search class="w-5 h-5 text-gray-500 flex-shrink-0" />
                <input type="text" v-model="searchQuery" class="w-full px-2 outline-none" placeholder="Search User...">
            </div>

            <div class="relative w-full sm:w-auto sm:min-w-[140px]" ref="dropdownRef">
                <button @click="toggleDropdown"
                    class="w-full p-2 border border-gray-200 rounded-lg flex items-center justify-between gap-2 bg-white hover:border-gray-300 transition-colors cursor-pointer">
                    <span class="text-gray-700">{{ selectedRoleLabel }}</span>
                    <svg class="w-4 h-4 text-gray-500 transition-transform" :class="{ 'rotate-180': isDropdownOpen }"
                        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                <div v-if="isDropdownOpen"
                    class="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                    <button v-for="option in roleOptions" :key="option.value" @click="selectRole(option.value)"
                        class="w-full px-4 py-2.5 text-left hover:bg-gray-50 transition-colors cursor-pointer"
                        :class="{ 'bg-blue-50 text-blue-700 font-medium': roleFilter === option.value }">
                        <span>{{ option.label }}</span>
                    </button>
                </div>
            </div>
        </div>

        <Table :columns="columns" :data="paginatedUsers" :isLoading="isLoading" class="mt-5">
            <template #cell-no="{ index }">
                {{ (currentPage - 1) * perPage + index + 1 }}
            </template>

            <template #cell-username="{ row }">
                <p class="font-semibold text-gray-900">{{ row.username }}</p>
            </template>

            <template #cell-role="{ row }">
                <span :class="[
                    'px-3 py-1.5 rounded-full text-sm font-medium',
                    row.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                ]">
                    {{ row.role.charAt(0).toUpperCase() + row.role.slice(1) }}
                </span>
            </template>

            <template #cell-stats="{ row }">
                <div class="space-y-1">
                    <p class="text-sm text-gray-600">Points: <span class="font-semibold text-gray-900">{{
                        row.total_points || 0 }}</span></p>
                    <p class="text-sm text-gray-600">Quizzes: <span class="font-semibold text-gray-900">{{
                        row.total_quiz_completed || 0 }}</span></p>
                    <p class="text-sm text-gray-600">Perfect: <span class="font-semibold text-gray-900">{{
                        row.total_perfect_attempts || 0 }}</span></p>
                </div>
            </template>

            <template #cell-actions="{ row }">
                <div class="flex gap-2">
                    <button @click="openDetailModal(row)"
                        class="text-green-600 hover:underline text-sm cursor-pointer font-medium">
                        Detail
                    </button>
                    <button @click="openEditModal(row)"
                        class="text-blue-600 hover:underline text-sm cursor-pointer font-medium">
                        Edit Role
                    </button>
                    <button @click="deleteUserItem(row)"
                        class="text-red-600 hover:underline text-sm cursor-pointer font-medium">
                        Delete
                    </button>
                </div>
            </template>

            <template #pagination>
                <Pagination v-if="filteredUsers.length > 0" :currentPage="currentPage"
                    :totalEntries="filteredUsers.length" :perPage="perPage" @update:currentPage="updatePage" />
            </template>
        </Table>

        <AddEditModal :isOpen="isModalOpen" :mode="modalMode" :title="modalTitle" :fields="modalFields"
            :initialData="selectedItem" @close="closeModal" @submit="handleSubmit" />

        <DetailModal :isOpen="isDetailModalOpen" :title="detailModalTitle" :fields="detailFields"
            @close="closeDetailModal" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Table from '../../../components/ui/Table.vue';
import Pagination from '../../../components/ui/Pagination.vue';
import { Search } from 'lucide-vue-next';
import AddEditModal from '../../../components/modal/AddEditModal.vue';
import DetailModal from '../../../components/modal/DetailModal.vue';
import { getAllUsers, deleteUser, updateUserRole } from '../../../api/adminUserApi';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const columns = [
    { label: 'No', key: 'no' },
    { label: 'Username', key: 'username' },
    { label: 'Role', key: 'role' },
    { label: 'Statistics', key: 'stats' },
    { label: 'Action', key: 'actions' },
];

const users = ref([]);
const searchQuery = ref('');
const roleFilter = ref('');
const isModalOpen = ref(false);
const isDetailModalOpen = ref(false);
const modalMode = ref('edit');
const selectedItem = ref({});
const selectedDetailItem = ref({});
const isLoading = ref(false);
const isDropdownOpen = ref(false);
const dropdownRef = ref(null);

const currentPage = ref(1);
const perPage = ref(10);

const roleOptions = [
    { label: 'All Roles', value: '' },
    { label: 'User', value: 'user' },
    { label: 'Admin', value: 'admin' }
];

const selectedRoleLabel = computed(() => {
    const selected = roleOptions.find(opt => opt.value === roleFilter.value);
    return selected ? selected.label : 'All Roles';
});

const toggleDropdown = () => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const selectRole = (value) => {
    roleFilter.value = value;
    isDropdownOpen.value = false;
};

const handleClickOutside = (event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
        isDropdownOpen.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
    fetchUsers();
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});

const modalTitle = computed(() => {
    return 'User Role';
});

const detailModalTitle = computed(() => {
    return selectedDetailItem.value?.username || 'User Details';
});

const filteredUsers = computed(() => {
    let filtered = users.value;

    if (roleFilter.value) {
        filtered = filtered.filter(user => user.role === roleFilter.value);
    }

    if (searchQuery.value) {
        filtered = filtered.filter(user =>
            user.username.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
            user.id.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }

    return filtered;
});

const paginatedUsers = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredUsers.value.slice(start, end);
});

const detailFields = computed(() => {
    if (!selectedDetailItem.value) return [];

    return [
        {
            key: 'id',
            label: 'User ID',
            value: selectedDetailItem.value.id,
            type: 'text'
        },
        {
            key: 'username',
            label: 'Username',
            value: selectedDetailItem.value.username,
            type: 'text'
        },
        {
            key: 'role',
            label: 'Role',
            value: selectedDetailItem.value.role?.charAt(0).toUpperCase() + selectedDetailItem.value.role?.slice(1),
            type: 'badge',
            badgeClass: selectedDetailItem.value.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
        },
        {
            key: 'total_points',
            label: 'Total Points',
            value: selectedDetailItem.value.total_points || 0,
            type: 'text'
        },
        {
            key: 'total_quiz_completed',
            label: 'Total Quiz Completed',
            value: selectedDetailItem.value.total_quiz_completed || 0,
            type: 'text'
        },
        {
            key: 'total_perfect_attempts',
            label: 'Total Perfect Attempts',
            value: selectedDetailItem.value.total_perfect_attempts || 0,
            type: 'text'
        },
    ];
});

const modalFields = computed(() => [
    {
        name: 'role',
        type: 'dropdown',
        label: 'User Role',
        placeholder: 'Select role...',
        required: true,
        options: [
            { label: 'User', value: 'user' },
            { label: 'Admin', value: 'admin' }
        ],
        optionLabel: 'label',
        optionValue: 'value',
        searchable: false
    }
]);

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

watch(roleFilter, () => {
    resetPage();
});

watch(() => route.query.page, (newPage) => {
    const page = parseInt(newPage) || 1;
    currentPage.value = page;
}, { immediate: true });

const fetchUsers = async () => {
    try {
        isLoading.value = true;
        const params = {};

        if (roleFilter.value) {
            params.role = roleFilter.value;
        }

        if (searchQuery.value) {
            params.search = searchQuery.value;
        }

        const response = await getAllUsers(params);

        if (response.success && response.data) {
            users.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching Users:', error);
    } finally {
        isLoading.value = false;
    }
};

const openEditModal = (row) => {
    modalMode.value = 'edit';
    selectedItem.value = {
        ...row,
        role: row.role
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

const handleSubmit = async ({ data }) => {
    try {
        await updateUserRole(selectedItem.value.id, data.role);
        await fetchUsers();
        closeModal();
    } catch (error) {
        console.error('Error updating User Role:', error);
    }
};

const deleteUserItem = async (row) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        html: `Do you want to delete user <strong>"${row.username}"</strong>?<br><br>
               <span class="text-sm text-gray-600">This action cannot be undone.</span>`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
        try {
            await deleteUser(row.id);
            await fetchUsers();
        } catch (error) {
            console.error('Error deleting User:', error);
        }
    }
};
</script>