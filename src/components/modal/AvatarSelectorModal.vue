<template>
    <Teleport to="body">
        <transition name="modal">
            <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-5">
                <div @click="handleClose" class="absolute inset-0 bg-black/50 transition-opacity"></div>

                <div class="relative bg-white rounded-xl max-w-lg w-full p-5">
                    <div class="flex items-center justify-between mb-5">
                        <h2 class="text-2xl font-bold text-gray-800">Choose Your Avatar</h2>
                        <button @click="handleClose"
                            class="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
                            <X :size="24" />
                        </button>
                    </div>

                    <div v-if="isLoading" class="flex justify-center items-center py-20">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    </div>

                    <div v-else-if="avatars.length === 0" class="text-center py-20 text-gray-500">
                        <p class="text-lg">No avatars available</p>
                        <p class="text-sm mt-2">Please contact admin to add avatars</p>
                    </div>

                    <div v-else class="max-h-[60vh] overflow-y-auto">
                        <div class="grid grid-cols-3 gap-2">
                            <div v-for="avatar in avatars" :key="avatar.id" @click="selectAvatar(avatar)" :class="[
                                'relative cursor-pointer rounded-xl overflow-hidden transition-all duration-200 border-4',
                                selectedAvatarId === avatar.id
                                    ? 'border-blue-500 scale-95'
                                    : 'border-transparent'
                            ]">
                                <img :src="avatar.image_url" :alt="avatar.name"
                                    class="w-full aspect-square object-cover" />

                                <div v-if="selectedAvatarId === avatar.id"
                                    class="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                                    <div class="bg-blue-500 rounded-full p-2">
                                        <Check class="w-6 h-6 text-white" />
                                    </div>
                                </div>

                                <div
                                    class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                                    <p class="text-white text-sm font-semibold text-center truncate">{{ avatar.name }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="flex items-center justify-between gap-3 mt-5 pt-5 border-t border-gray-200">
                        <button v-if="currentAvatarId" @click="handleRemoveAvatar"
                            class="px-5 py-2.5 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer">
                            Remove Avatar
                        </button>
                        <div v-else></div>

                        <div class="flex gap-3">
                            <button @click="handleClose"
                                class="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                Cancel
                            </button>
                            <button @click="handleSubmit" :disabled="!selectedAvatarId || isSubmitting"
                                class="px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                                <span v-if="!isSubmitting">Save Avatar</span>
                                <span v-else>Saving...</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue';
import { X, Check } from 'lucide-vue-next';
import { getActiveAvatar } from '../../api/avatarApi';
import { updateUserAvatar, removeUserAvatar } from '../../api/userProfileApi';
import Swal from 'sweetalert2';

const props = defineProps({
    isOpen: {
        type: Boolean,
        default: false
    },
    currentAvatarId: {
        type: [Number, String],
        default: null
    }
});

const emit = defineEmits(['close', 'updated']);

const avatars = ref([]);
const selectedAvatarId = ref(null);
const isLoading = ref(false);
const isSubmitting = ref(false);

watch(() => props.isOpen, async (newVal) => {
    if (newVal) {
        selectedAvatarId.value = props.currentAvatarId;
        await fetchAvatars();
    }
});

const fetchAvatars = async () => {
    try {
        isLoading.value = true;
        const response = await getActiveAvatar();

        if (response.success && response.data) {
            avatars.value = response.data;
        }
    } catch (error) {
        console.error('Error fetching avatars:', error);
    } finally {
        isLoading.value = false;
    }
};

const selectAvatar = (avatar) => {
    selectedAvatarId.value = avatar.id;
};

const handleSubmit = async () => {
    if (!selectedAvatarId.value) return;

    try {
        isSubmitting.value = true;
        await updateUserAvatar(selectedAvatarId.value);
        emit('updated');
        handleClose();
    } catch (error) {
        console.error('Error updating avatar:', error);
    } finally {
        isSubmitting.value = false;
    }
};

const handleRemoveAvatar = async () => {
    const result = await Swal.fire({
        title: 'Remove Avatar?',
        text: 'Are you sure you want to remove your current avatar?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, remove it',
        cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
        try {
            isSubmitting.value = true;
            await removeUserAvatar();
            emit('updated');
            handleClose();
        } catch (error) {
            console.error('Error removing avatar:', error);
        } finally {
            isSubmitting.value = false;
        }
    }
};

const handleClose = () => {
    if (!isSubmitting.value) {
        emit('close');
    }
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

.modal-enter-active .relative,
.modal-leave-active .relative {
    transition: transform 0.3s ease;
}

.modal-enter-from .relative,
.modal-leave-to .relative {
    transform: scale(0.9);
}
</style>