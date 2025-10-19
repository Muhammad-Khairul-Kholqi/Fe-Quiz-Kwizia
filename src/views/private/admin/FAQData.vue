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

        <Table :columns="columns" :data="filteredUsers" class="mt-5">
            <template #cell-no="{ index }">
                {{ index + 1 }}
            </template>

            <template #cell-actions="{ row }">
                <div class="flex gap-2">
                    <button @click="openEditModal(row)" class="text-blue-600 hover:underline text-sm">
                        Update
                    </button>
                    <button @click="deleteUser(row)" class="text-red-600 hover:underline text-sm">
                        Delete
                    </button>
                </div>
            </template>
        </Table>

        <AddEditModal :isOpen="isModalOpen" :mode="modalMode" :title="modalTitle" :fields="modalFields"
            :initialData="selectedItem" @close="closeModal" @submit="handleSubmit" />
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import Table from '../../../components/ui/Table.vue';
import { Search } from 'lucide-vue-next';

import AddEditModal from '../../../components/modal/AddEditModal.vue';

const columns = [
    { label: 'No', key: 'no' },
    { label: 'Question', key: 'question' },
    { label: 'Answer', key: 'answer' },
    { label: 'Category', key: 'category' },
    { label: 'Action', key: 'actions' },
];

const users = ref([
    { id: 1, question: 'Bagaimana cara mendaftar?', answer: 'Klik tombol daftar di pojok kanan atas', category: 'General' },
    { id: 2, question: 'Apa itu Vue 3?', answer: 'Vue 3 adalah framework JavaScript progresif', category: 'Technical' },
    { id: 3, question: 'Bagaimana cara membayar?', answer: 'Anda bisa membayar melalui transfer bank atau e-wallet', category: 'Billing' },
]);

const searchQuery = ref('');
const isModalOpen = ref(false);
const modalMode = ref('add');
const selectedItem = ref({});

const modalTitle = computed(() => {
    return 'FAQ';
});

const filteredUsers = computed(() => {
    if (!searchQuery.value) return users.value;

    return users.value.filter(user =>
        user.question.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.answer.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        user.category.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const modalFields = [
    {
        name: 'image',
        type: 'image',
        label: 'FAQ Image',
        required: false
    },
    {
        name: 'question',
        type: 'text',
        label: 'Question',
        placeholder: 'Enter FAQ question...',
        required: true
    },
    {
        name: 'answer',
        type: 'textarea',
        label: 'Short Answer',
        placeholder: 'Enter brief answer...',
        rows: 3,
        required: true,
        maxLength: 200,
        hint: 'Maximum 200 characters'
    },
    {
        name: 'detailedAnswer',
        type: 'editor',
        label: 'Detailed Answer',
        placeholder: 'Enter detailed answer with formatting...',
        required: false
    },
    {
        name: 'category',
        type: 'text',
        label: 'Category',
        placeholder: 'e.g., General, Technical, Billing...',
        required: true
    }
];

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

const handleSubmit = ({ mode, data }) => {
    if (mode === 'add') {
        const newItem = {
            id: users.value.length + 1,
            ...data
        };
        users.value.push(newItem);
        console.log('Added:', newItem);
    } else {
        const index = users.value.findIndex(u => u.id === selectedItem.value.id);
        if (index !== -1) {
            users.value[index] = {
                ...users.value[index],
                ...data
            };
            console.log('Updated:', users.value[index]);
        }
    }

    closeModal();
};

const deleteUser = (row) => {
    if (confirm(`Are you sure you want to delete "${row.question}"?`)) {
        const index = users.value.findIndex(u => u.id === row.id);
        if (index !== -1) {
            users.value.splice(index, 1);
            console.log('Deleted:', row);
        }
    }
};
</script>