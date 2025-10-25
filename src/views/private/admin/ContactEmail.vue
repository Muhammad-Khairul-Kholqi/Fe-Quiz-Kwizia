<template>
    <div class="border border-gray-200 rounded-xl p-5">
        <div class="flex flex-col sm:flex-row gap-3 mb-5">
            <div class="flex-1 sm:max-w-none border border-gray-200 p-2 rounded-lg flex items-center gap-2">
                <Search class="w-5 h-5 text-gray-500 flex-shrink-0" />
                <input type="text" v-model="searchQuery" class="w-full px-2 outline-none"
                    placeholder="Search by name, email, or message...">
            </div>
            <div class="flex gap-2">
                <button @click="filterStatus = 'all'"
                    :class="['px-4 py-2 rounded-lg transition-colors cursor-pointer', filterStatus === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">
                    All ({{ contacts.length }})
                </button>
                <button @click="filterStatus = 'unread'"
                    :class="['px-4 py-2 rounded-lg transition-colors cursor-pointer', filterStatus === 'unread' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">
                    Unread ({{ unreadCount }})
                </button>
                <button @click="filterStatus = 'read'"
                    :class="['px-4 py-2 rounded-lg transition-colors cursor-pointer', filterStatus === 'read' ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200']">
                    Read
                </button>
            </div>
        </div>

        <Table :columns="columns" :data="paginatedContacts" :isLoading="isLoading" class="mt-5">
            <template #cell-no="{ index }">
                {{ (currentPage - 1) * perPage + index + 1 }}
            </template>

            <template #cell-name="{ row }">
                <div class="flex items-center gap-2">
                    <span>{{ row.name }}</span>
                    <span v-if="!row.is_read" class="w-2 h-2 bg-blue-500 rounded-full"></span>
                </div>
            </template>

            <template #cell-email="{ row }">
                <a :href="`mailto:${row.email}`" class="text-blue-600 hover:underline">
                    {{ row.email }}
                </a>
            </template>

            <template #cell-status="{ row }">
                <span :class="[
                    'px-3 py-1 rounded-full text-xs font-medium',
                    row.is_read ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-600'
                ]">
                    {{ row.is_read ? 'Read' : 'Unread' }}
                </span>
            </template>

            <template #cell-actions="{ row }">
                <div class="flex gap-2">
                    <button @click="openDetailModal(row)"
                        class="text-green-600 hover:underline text-sm cursor-pointer font-medium">
                        View
                    </button>
                    <button @click="toggleReadStatus(row)"
                        class="text-blue-600 hover:underline text-sm cursor-pointer font-medium">
                        {{ row.is_read ? 'Mark Unread' : 'Mark Read' }}
                    </button>
                    <button @click="deleteContactMessage(row)"
                        class="text-red-600 hover:underline text-sm cursor-pointer font-medium">
                        Delete
                    </button>
                </div>
            </template>

            <template #pagination>
                <Pagination v-if="filteredContacts.length > 0" :currentPage="currentPage"
                    :totalEntries="filteredContacts.length" :perPage="perPage" @update:currentPage="updatePage" />
            </template>
        </Table>

        <DetailModal :isOpen="isDetailModalOpen" :title="detailModalTitle" :fields="detailFields"
            @close="closeDetailModal" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Table from '../../../components/ui/Table.vue';
import Pagination from '../../../components/ui/Pagination.vue';
import DetailModal from '../../../components/modal/DetailModal.vue';
import { Search } from 'lucide-vue-next';
import {
    getAllContacts,
    getUnreadCount,
    markAsRead,
    markAsUnread,
    deleteContact
} from '../../../api/contactApi';
import Swal from 'sweetalert2';

const route = useRoute();
const router = useRouter();

const columns = [
    { label: 'No', key: 'no' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Status', key: 'status' },
    { label: 'Action', key: 'actions' },
];

const contacts = ref([]);
const searchQuery = ref('');
const filterStatus = ref('all');
const isLoading = ref(false);
const unreadCount = ref(0);

const currentPage = ref(1);
const perPage = ref(10);

const isDetailModalOpen = ref(false);
const selectedContact = ref(null);

const detailModalTitle = computed(() => {
    return `Message from ${selectedContact.value?.name || 'Contact'}`;
});

const detailFields = computed(() => {
    if (!selectedContact.value) return [];

    return [
        {
            key: 'name',
            label: 'Name',
            value: selectedContact.value.name,
            type: 'text'
        },
        {
            key: 'email',
            label: 'Email',
            value: selectedContact.value.email,
            type: 'link'
        },
        {
            key: 'status',
            label: 'Status',
            value: selectedContact.value.is_read ? 'Read' : 'Unread',
            type: 'badge',
            badgeClass: selectedContact.value.is_read ? 'bg-gray-100 text-gray-600' : 'bg-blue-100 text-blue-600'
        },
        {
            key: 'created_at',
            label: 'Date',
            value: selectedContact.value.created_at,
            type: 'date'
        },
        {
            key: 'message',
            label: 'Message',
            value: selectedContact.value.message,
            type: 'text'
        }
    ];
});

const filteredContacts = computed(() => {
    let filtered = contacts.value;

    if (filterStatus.value === 'read') {
        filtered = filtered.filter(contact => contact.is_read);
    } else if (filterStatus.value === 'unread') {
        filtered = filtered.filter(contact => !contact.is_read);
    }

    if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase();
        filtered = filtered.filter(contact =>
            contact.name.toLowerCase().includes(query) ||
            contact.email.toLowerCase().includes(query) ||
            contact.message.toLowerCase().includes(query)
        );
    }

    return filtered;
});

const paginatedContacts = computed(() => {
    const start = (currentPage.value - 1) * perPage.value;
    const end = start + perPage.value;
    return filteredContacts.value.slice(start, end);
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

watch([searchQuery, filterStatus], () => {
    resetPage();
});

watch(() => route.query.page, (newPage) => {
    const page = parseInt(newPage) || 1;
    currentPage.value = page;
}, { immediate: true });

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

const fetchContacts = async () => {
    try {
        isLoading.value = true;
        const response = await getAllContacts();

        if (response.success && response.data) {
            contacts.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching contacts:', error);
    } finally {
        isLoading.value = false;
    }
};

const fetchUnreadCount = async () => {
    try {
        const response = await getUnreadCount();
        if (response.success && response.data) {
            unreadCount.value = response.data.unread_count;
        }
    } catch (error) {
        console.error('Error fetching unread count:', error);
    }
};

const openDetailModal = async (row) => {
    selectedContact.value = { ...row };
    isDetailModalOpen.value = true;

    if (!row.is_read) {
        try {
            await markAsRead(row.id);
            await fetchContacts();
            await fetchUnreadCount();
            selectedContact.value.is_read = true;
        } catch (error) {
            console.error('Error marking as read:', error);
        }
    }
};

const closeDetailModal = () => {
    isDetailModalOpen.value = false;
    selectedContact.value = null;
};

const toggleReadStatus = async (row) => {
    try {
        if (row.is_read) {
            await markAsUnread(row.id);
        } else {
            await markAsRead(row.id);
        }

        await fetchContacts();
        await fetchUnreadCount();

        if (isDetailModalOpen.value && selectedContact.value?.id === row.id) {
            selectedContact.value.is_read = !row.is_read;
        }
    } catch (error) {
        console.error('Error toggling read status:', error);
    }
};

const deleteContactMessage = async (row) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: `Do you want to delete message from "${row.name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3b82f6',
        cancelButtonColor: '#ef4444',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
        try {
            await deleteContact(row.id);
            await fetchContacts();
            await fetchUnreadCount();

            if (isDetailModalOpen.value) {
                closeDetailModal();
            }
        } catch (error) {
            console.error('Error deleting contact:', error);
        }
    }
};

onMounted(() => {
    fetchContacts();
    fetchUnreadCount();
});
</script>