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

                <form action="">
                    <div class="mb-4">
                        <input type="text" placeholder="Enter Your Email" v-model="email"
                            class="w-full border border-gray-300 outline-none text-gray-700 py-3 px-4 placeholder:text-sm rounded-lg transition-colors" />
                    </div>

                    <div class="mb-4 relative">
                        <input :type="showPassword ? 'text' : 'password'" placeholder="Enter Your Password"
                            v-model="password"
                            class="w-full border border-gray-300 outline-none text-gray-700 py-3 px-4 pr-12 placeholder:text-sm rounded-lg transition-colors" />
                        <button type="button" @click="showPassword = !showPassword"
                            class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-600 cursor-pointer transition-colors">
                            <EyeOff v-if="showPassword" :size="20" />
                            <Eye v-else :size="20" />
                        </button>
                    </div>

                    <button
                        class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md cursor-pointer transition-colors">
                        Signin
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
import { Eye, EyeOff, Lock } from 'lucide-vue-next';
import LogoText from "../../../assets/logoText.png";
import { RouterLink } from 'vue-router';

const showPassword = ref(false);
const email = ref('');
const password = ref('');
</script>