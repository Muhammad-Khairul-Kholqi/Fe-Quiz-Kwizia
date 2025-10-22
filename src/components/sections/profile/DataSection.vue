<template>
    <div class="flex justify-center p-5 bg-[#F8F9FD]/70">
        <div class="w-full max-w-[1500px]">
            <span class="text-gray-600 text-sm font-bold">PROFILE</span>

            <div v-if="isLoading"
                class="flex flex-col md:flex-row justify-center items-center gap-5 mt-5 text-center md:text-left">
                <loading-skeleton :width="'250px'" :height="'250px'" class="rounded-xl" />
                <div class="w-full max-w-lg space-y-3 flex flex-col items-center md:items-start">
                    <loading-skeleton :width="'100px'" :height="'25px'" class="rounded-lg" />
                    <loading-skeleton :width="'150px'" :height="'30px'" class="rounded-lg" />
                    <loading-skeleton :width="'200px'" :height="'20px'" class="rounded-lg" />

                    <div class="flex flex-wrap justify-center md:justify-start gap-3 mt-5">
                        <loading-skeleton v-for="n in 3" :key="n" :width="'150px'" :height="'50px'"
                            class="rounded-full" />
                    </div>
                </div>
            </div>

            <div v-else class="flex flex-col md:flex-row items-center gap-5 mt-5">
                <div class="relative group">
                    <img :src="profileData.avatars?.image_url || 'https://placehold.co/250x250'" alt="Profile Picture"
                        class="w-[250px] h-[250px] rounded-xl object-cover cursor-pointer transition-all duration-200 group-hover:brightness-75"
                        @click="openAvatarModal" />

                    <div @click="openAvatarModal"
                        class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer rounded-xl">
                        <div class="bg-black/50 p-3 rounded-full">
                            <Pencil class="w-6 h-6 text-white" />
                        </div>
                    </div>
                </div>

                <div class="text-center md:text-left">

                    <p class="font-bold text-blue-600"># {{ profileData.rank || 'Unranked' }}</p>

                    <div class="flex items-center justify-center md:justify-start gap-2">
                        <h1 class="font-bold text-3xl mt-2">{{ profileData.username || 'User' }}</h1>
                    </div>

                    <p class="mt-3 text-gray-600">{{ formatDate(profileData.created_at) }}</p>

                    <div class="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-5">
                        <div v-for="(stat, index) in stats" :key="index"
                            class="flex items-center gap-3 border border-gray-200 py-2 px-4 rounded-full">
                            <div :class="`bg-gradient-to-br ${stat.gradient} p-2 rounded-full`">
                                <component :is="stat.icon" class="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h3 class="font-bold text-sm">{{ stat.title }}</h3>
                                <h4 :class="`text-sm font-bold ${stat.color} text-start`">{{ stat.value }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <AvatarSelectorModal :isOpen="isAvatarModalOpen" :currentAvatarId="profileData.avatars?.id"
            @close="closeAvatarModal" @updated="handleAvatarUpdated" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { Coins, CircleQuestionMark, LaptopMinimalCheck, Pencil } from 'lucide-vue-next';
import AvatarSelectorModal from '../../../components/modal/AvatarSelectorModal.vue';
import { getMyProfile } from '../../../api/userProfileApi';
import loadingSkeleton from '../../../components/ui/LoadingSkeleton.vue';

const profileData = ref({});
const isLoading = ref(false);
const isAvatarModalOpen = ref(false);

const stats = computed(() => [
    {
        title: "TOTAL POINTS EARNED",
        value: profileData.value.total_points || "0",
        color: "text-green-500",
        gradient: "from-green-700 to-green-500",
        icon: Coins,
    },
    {
        title: "QUIZZES COMPLETED",
        value: profileData.value.total_quiz_completed || "0",
        color: "text-purple-500",
        gradient: "from-purple-700 to-purple-500",
        icon: CircleQuestionMark,
    },
    {
        title: "SUCCESSFUL ATTEMPTS",
        value: profileData.value.total_perfect_attempts || "0",
        color: "text-pink-500",
        gradient: "from-pink-700 to-pink-500",
        icon: LaptopMinimalCheck,
    },
]);

const fetchProfile = async () => {
    try {
        isLoading.value = true;
        const response = await getMyProfile();

        if (response.success && response.data) {
            profileData.value = response.data;
            console.log('Profile with rank:', profileData.value); 
        }
    } catch (error) {
        console.error('Error fetching profile:', error);
    } finally {
        isLoading.value = false;
    }
};

const formatDate = (dateString) => {
    if (!dateString) return 'No date';

    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

const openAvatarModal = () => {
    isAvatarModalOpen.value = true;
};

const closeAvatarModal = () => {
    isAvatarModalOpen.value = false;
};

const handleAvatarUpdated = async () => {
    await fetchProfile();
};

onMounted(() => {
    fetchProfile();
});
</script>