<template>
    <div class="flex justify-center p-5 pt-20">
        <div class="w-full max-w-[1500px]">
            <div v-motion="motionAnimation.createDelayedAnimation(motionAnimation.scaleIn, 300)"
                class="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden">
                <div class="absolute inset-0 bg-black/10"></div>
                <div class="relative z-10 space-y-6">
                    <h2 class="text-4xl font-bold">
                        Start Your Quiz Journey Today
                    </h2>
                    <p class="text-blue-100 text-lg max-w-[600px] mb-8">
                        From science to technology, dive into quizzes that make every question a chance to learn
                        something new.
                    </p>
                    <RouterLink to="/signin"
                        class="bg-white text-blue-600 px-5 py-3 rounded-full hover:bg-blue-50 transition-colors duration-300">
                        Get Started Now
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import motionAnimation from '../../animation/motionAnimation';
</script>