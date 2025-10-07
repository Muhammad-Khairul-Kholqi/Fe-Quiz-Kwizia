<template>
    <div class="flex justify-center p-5 py-20">
        <div class="w-full max-w-[1500px]">
            <div class="space-y-2 mb-16">
                <h2 class="text-4xl font-bold"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideLeft, 200)">
                    Play, Compete, <span class="text-blue-600">Win</span>
                </h2>
                <p class="text-gray-600 max-w-[600px]"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideLeft, 400)">
                    Kwizia is your go-to platform for engaging and interactive quizzes
                </p>
            </div>

            <div class="grid lg:grid-cols-2 gap-8">
                <div class="lg:row-span-2 border border-gray-200 rounded-3xl p-10 overflow-hidden"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideLeft, 600)">
                    <div>
                        <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
                            <Trophy class="w-5 h-5 text-white" />
                        </div>
                        <h3 class="text-3xl font-bold mb-4">Climb the Leaderboard</h3>
                        <p class="text-gray-600 mb-6 leading-relaxed">
                            Compete with players worldwide and see your name at the top. Every correct answer brings
                            you closer to glory!
                        </p>
                        <div class="space-y-3">
                            <div v-for="(item, index) in leaderboardFeatures" :key="index"
                                class="flex items-center gap-3 group/item">
                                <div
                                    class="w-2 h-2 bg-blue-600 rounded-full group-hover/item:scale-150 transition-transform duration-300">
                                </div>
                                <span
                                    class="text-gray-700 group-hover/item:text-blue-600 transition-colors">{{item}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="border border-gray-200 rounded-3xl p-8"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 200)">
                    <Zap class="w-8 h-8 text-blue-600 mb-4" />
                    <h3 class="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Instant
                        Challenges</h3>
                    <p class="text-gray-600">Jump into quick quizzes anytime and test your knowledge on the go</p>
                </div>

                <div class="border border-gray-200 rounded-3xl p-8"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 400)">
                    <Target class="w-8 h-8 text-blue-600 mb-4" />
                    <h3 class="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Earn Points</h3>
                    <p class="text-gray-600">Collect points for every correct answer and unlock achievements</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import motionAnimation from '../../animation/motionAnimation';
import {
    Trophy,
    Zap,
    Target,
} from 'lucide-vue-next';

const leaderboardFeatures = [
    'Real-time ranking updates',
    'Weekly and monthly champions',
]

</script>