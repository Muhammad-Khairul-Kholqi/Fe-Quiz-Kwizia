<template>
    <div class="flex min-h-screen">
        <div
            class="hidden md:flex md:w-1/2 bg-gradient-to-br from-black to-blue-800 text-white items-center justify-center p-12 relative overflow-hidden">
            <div class="bg-black/40 backdrop-blur p-10 w-full max-w-lg relative">
                <img :src="LogoText" alt="Logo Kwizia" class="w-[150px] mb-8">

                <h1 class="text-4xl font-bold leading-snug mb-4">
                    Signin Now <br /> and Start Your Quiz Journey
                </h1>

                <p class="text-gray-300 text-lg leading-relaxed">
                    Explore exciting quizzes, track your progress, and learn while having fun.
                </p>
            </div>
        </div>

        <div class="flex-1 flex items-center justify-center p-8 bg-white">
            <div class="w-full max-w-md">
                <div class="flex justify-center">
                    <img :src="LogoText" alt="Logo Kwizia" class="w-[120px] mb-10">
                </div>

                <h1 class="text-2xl font-semibold text-center mb-5">Signin to your account</h1>

                <form @submit.prevent="handleLogin">
                    <Input v-model="formData.username" type="text" placeholder="Enter Your Username"
                        container-class="mb-4" :disabled="isLoading" required />

                    <Input v-model="formData.password" type="password" placeholder="Enter Your Password"
                        container-class="mb-4" :disabled="isLoading" required />

                    <button type="submit" :disabled="isLoading"
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md cursor-pointer transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed">
                        {{ isLoading ? 'Loading...' : 'Signin' }}
                    </button>
                </form>

                <div class="text-center text-gray-600 mt-4">
                    <span>Don't have an account? </span>
                    <RouterLink to="/signup" class="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                        Signup
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { RouterLink } from 'vue-router';
import Input from "../../../components/ui/Input.vue";
import LogoText from "../../../assets/logoText.png";
import authApi from '../../../api/authApi';

const router = useRouter();
const isLoading = ref(false);

const formData = ref({
    username: '',
    password: ''
});

const handleLogin = async () => {
    if (!formData.value.username || !formData.value.password) {
        return;
    }

    try {
        isLoading.value = true;

        const response = await authApi.login({
            username: formData.value.username,
            password: formData.value.password
        });

        if (response.data.user.role === 'admin') {
            setTimeout(() => {
                router.push('/private/admin/dashboard');
            }, 1500);
        } else {
            setTimeout(() => {
                router.push('/');
            }, 1500);
        }

    } catch (error) {
        console.error('Login error:', error);
    } finally {
        isLoading.value = false;
    }
};
</script>