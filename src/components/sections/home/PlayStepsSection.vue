<template>
    <div class="flex justify-center p-5 py-20 bg-gray-50">
        <div class="w-full max-w-[1400px]">
            <div class="text-center space-y-3 mb-16">
                <h2 class="text-4xl font-bold mb-4">
                    How to <span class="text-blue-600">Play</span>
                </h2>
                <p class="text-gray-600 text-lg">
                    Getting started is simple. Follow these steps and you'll be competing in no time!
                </p>
            </div>
            <div class="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 gap-8 lg:gap-6">
                <div v-for="(step, index) in steps" :key="index" class="text-center space-y-4 relative"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTopDelayed, 200 + index * 200)">
                    <div class="flex justify-center">
                        <div
                            class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold relative z-10">
                            {{ index + 1 }}
                        </div>
                    </div>
                    <h3 class="text-2xl font-bold">{{ step.title }}</h3>
                    <p class="text-gray-600 max-w-[280px] mx-auto">{{ step.description }}</p>

                    <div v-if="index < steps.length - 1"
                        class="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-0.5 border-t-2 border-dashed border-gray-300 z-0">
                    </div>

                    <div v-if="index % 2 === 0 && index < steps.length - 1"
                        class="hidden md:block lg:hidden absolute top-10 left-[calc(50%+40px)] w-[calc(100%+2rem)] h-0.5 border-t-2 border-dashed border-gray-300 z-0">
                    </div>

                    <div v-if="index < steps.length - 1"
                        class="md:hidden absolute left-1/2 -translate-x-1/2 -bottom-8 w-0.5 h-8 border-l-2 border-dashed border-gray-300 z-0">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import motionAnimation from '../../animation/motionAnimation';
const steps = [
    {
        title: 'Create Your Account',
        description: 'Sign up for free and set up your profile in seconds'
    },
    {
        title: 'Pick a Quiz',
        description: 'Choose from hundreds of quizzes across different categories'
    },
    {
        title: 'Answer Questions',
        description: 'Test your knowledge and compete against the clock'
    },
    {
        title: 'Earn Your Rank',
        description: 'Climb the leaderboard and become a top player'
    }
]
</script>