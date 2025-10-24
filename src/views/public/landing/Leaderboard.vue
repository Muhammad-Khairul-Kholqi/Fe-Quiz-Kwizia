<template>
    <div>
        <TopWinners :loading="loading" :topThree="topThree" />
        <OtherWinners :loading="loading" :otherUsers="otherUsers" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import TopWinners from '../../../components/sections/leaderboard/TopWinners.vue';
import OtherWinners from '../../../components/sections/leaderboard/OtherWinners.vue';
import { getLeaderboard } from '../../../api/leaderboardApi';
import Swal from 'sweetalert2';

const loading = ref(true);
const topThree = ref([]);
const otherUsers = ref([]);

const fetchLeaderboard = async () => {
    try {
        loading.value = true;
        const response = await getLeaderboard(10);
        
        if (response.success && response.data) {
            topThree.value = response.data.slice(0, 3);
            otherUsers.value = response.data.slice(3, 10);
        }
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load leaderboard. Please try again later.',
        });
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    fetchLeaderboard();
});
</script>