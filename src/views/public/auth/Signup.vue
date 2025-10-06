<template>
    <div class="flex min-h-screen">
        <div class="hidden md:flex md:w-1/2 bg-gradient-to-br from-black to-blue-800
             text-white items-center justify-center p-12 relative overflow-hidden">
            <div class="p-10 w-full max-w-lg relative z-10 bg-black/40 backdrop-blur">
                <img :src="LogoText" alt="Logo Kwizia" class="w-[150px] mb-8">

                <h1 class="text-4xl font-bold leading-snug mb-4">
                    Create Your Account <br /> and Start the Fun
                </h1>
                <p class="text-gray-300 text-lg leading-relaxed mb-6">
                    Join Kwizia today! Access interactive quizzes, challenge friends, and
                    track your learning journey with ease.
                </p>

                <ul class="space-y-3 text-gray-300">
                    <li v-for="(feature, index) in features" :key="index" class="flex items-center gap-2">
                        <span class="w-2 h-2 bg-blue-600 rounded-full"></span>
                        {{ feature }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="flex-1 flex items-center justify-center p-8 bg-white">
            <div class="w-full max-w-md">
                <div class="flex justify-center">
                    <img :src="LogoText" alt="Logo Kwizia" class="w-[120px] mb-10">
                </div>

                <h1 class="text-2xl font-semibold text-center mb-5">Create new account</h1>

                <form action="">
                    <Input v-model="email" type="email" placeholder="Enter Your Email" container-class="mb-4" />

                    <Input v-model="password" type="password" placeholder="Enter Your Password"
                        container-class="mb-4" />

                    <button
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md cursor-pointer transition-colors">
                        Signup
                    </button>
                </form>

                <div class="flex items-center my-6">
                    <div class="flex-1 border-t border-gray-300"></div>
                    <span class="px-4 text-gray-500 text-sm">or</span>
                    <div class="flex-1 border-t border-gray-300"></div>
                </div>

                <button
                    class="w-full border border-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg mb-4 flex items-center justify-center gap-2 hover:bg-gray-50 cursor-pointer transition-colors">
                    <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo"
                        class="w-5 h-5" />
                    <span>Continue With Google</span>
                </button>

                <div class="text-center text-gray-600">
                    <span>Already have an account? </span>
                    <RouterLink to="/signin" class="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                        Signin
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { Eye, EyeOff } from 'lucide-vue-next';
import LogoText from "../../../assets/logoText.png";
import Input from "../../../components/ui/Input.vue";
import { RouterLink } from 'vue-router';

const showPassword = ref(false);
const name = ref('');
const email = ref('');
const password = ref('');

const features = [
    'Fun & interactive quizzes',
    'Compete and share with friends',
    'Track your progress easily',
];
</script>
