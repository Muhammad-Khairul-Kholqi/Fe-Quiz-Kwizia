<template>
  <RouterLink v-if="!isAuthenticated" to="/signup" class="flex justify-center px-5 py-3 bg-[#146EF5] hover:bg-blue-600">
    <div class="w-full max-w-[1500px]">
      <div class="flex justify-center">
        <p class="text-white text-center text-sm sm:text-base">
          <span class="font-bold">Kwizia:</span>
          Test your knowledge with thousands of fun quizzes - Register now
        </p>
      </div>
    </div>
  </RouterLink>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import authApi from '../../../api/authApi';

const router = useRouter();
const isAuthenticated = ref(false);

const checkAuthStatus = () => {
  isAuthenticated.value = authApi.isAuthenticated();
};

watch(() => router.currentRoute.value, () => {
  checkAuthStatus();
});

onMounted(() => {
  checkAuthStatus();
});
</script>