<template>
    <div>
        <!-- Hero Section -->
        <div class="flex justify-center p-5">
            <div class="w-full max-w-[1300px]">
                <div class="text-center space-y-2 mt-5">
                    <h1 v-motion="motionAnimation.bottomToTop"
                        class="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-bold">
                        Make Learning<br> Fun With <span class="text-blue-600">Quizzes</span>
                    </h1>
                    <div v-motion="motionAnimation.bottomToTopDelayed" class="flex justify-center">
                        <p class="w-full max-w-[600px] text-gray-600">
                            Answer interesting questions, discover new insights, and see how much your knowledge grows
                            every day.
                        </p>
                    </div>
                </div>
                <div class="mt-10 flex flex-wrap gap-5 justify-center items-center">
                    <RouterLink v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideLeft, 1000)"
                        to="/signin"
                        class="group flex justify-center items-center gap-2 border border-gray-200 px-3 py-2 rounded-full">
                        <span>Get Started</span>
                        <div class="bg-blue-600 p-1 rounded-full relative overflow-hidden">
                            <ArrowUpRight
                                class="w-5 h-5 text-white relative z-10 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 translate-x-[-150%] translate-y-[150%]" />
                            <ArrowUpRight
                                class="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:translate-x-[150%] group-hover:translate-y-[-150%]" />
                        </div>
                    </RouterLink>
                    <RouterLink v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideRight, 1000)"
                        to="/blog" class="border border-gray-200 px-3 py-2.5 rounded-full hover:bg-gray-50">
                        <span>See Today's Article</span>
                    </RouterLink>
                </div>
                <div class="mt-10 flex justify-center">
                    <div class="w-full max-w-[800px]">
                        <div class="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 items-center gap-10">
                            <div v-for="(data, index) in staticsData" :key="index"
                                v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 1200 + index * 200)"
                                class="text-center space-y-1">
                                <h2 class="text-4xl font-bold">{{ data.number }}</h2>
                                <p class="text-gray-500 text-sm">{{ data.label }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-10 flex justify-center">
                    <div v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 1800)"
                        class="w-[25px] h-[40px] rounded-full border border-gray-400 flex justify-center items-start pt-2.5">
                        <div class="w-1.5 h-3 border-2 border-gray-400 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Interactive Quiz Features -->
        <div class="flex justify-center p-5 py-20">
            <div class="w-full max-w-[1300px]">
                <div v-motion="motionAnimation.slideUp" class="space-y-2 mb-16">
                    <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold">
                        Play, Compete, <span class="text-blue-600">Win</span>
                    </h2>
                    <p class="text-gray-600 max-w-[600px]">
                        Kwizia is your go-to platform for engaging and interactive quizzes
                    </p>
                </div>

                <div class="grid lg:grid-cols-2 gap-8">
                    <!-- Large Feature Card -->
                    <div v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideLeft, 300)"
                        class="lg:row-span-2 border border-gray-200 rounded-3xl p-10 bg-gradient-to-br from-blue-50 to-white hover:shadow-xl transition-all duration-500 relative overflow-hidden group">
                        <div
                            class="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 group-hover:opacity-70 transition-opacity duration-500">
                        </div>
                        <div class="relative z-10">
                            <div
                                class="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                                <Trophy class="w-8 h-8 text-white" />
                            </div>
                            <h3 class="text-3xl font-bold mb-4">Climb the Leaderboard</h3>
                            <p class="text-gray-600 mb-6 leading-relaxed">
                                Compete with players worldwide and see your name at the top. Every correct answer brings
                                you closer to glory!
                            </p>
                            <div class="space-y-3">
                                <div v-for="(item, index) in leaderboardFeatures" :key="index"
                                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideRight, 600 + index * 150)"
                                    class="flex items-center gap-3 group/item">
                                    <div
                                        class="w-2 h-2 bg-blue-600 rounded-full group-hover/item:scale-150 transition-transform duration-300">
                                    </div>
                                    <span class="text-gray-700 group-hover/item:text-blue-600 transition-colors">{{
                                        item }}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Small Feature Cards -->
                    <div v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideRight, 450)"
                        class="border border-gray-200 rounded-3xl p-8 hover:border-blue-600 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
                        <Zap
                            class="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                        <h3 class="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Instant
                            Challenges</h3>
                        <p class="text-gray-600">Jump into quick quizzes anytime and test your knowledge on the go</p>
                    </div>

                    <div v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideRight, 600)"
                        class="border border-gray-200 rounded-3xl p-8 hover:border-blue-600 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
                        <Target
                            class="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
                        <h3 class="text-2xl font-bold mb-3 group-hover:text-blue-600 transition-colors">Earn Points</h3>
                        <p class="text-gray-600">Collect points for every correct answer and unlock achievements</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- How to Play Section -->
        <div class="flex justify-center p-5 py-20 bg-gray-50">
            <div class="w-full max-w-[1300px]">
                <div class="grid lg:grid-cols-2 gap-16 items-center">
                    <div class="space-y-8">
                        <div v-motion="motionAnimation.slideLeft">
                            <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
                                How to <span class="text-blue-600">Play</span>
                            </h2>
                            <p class="text-gray-600 text-lg">
                                Getting started is simple. Follow these steps and you'll be competing in no time!
                            </p>
                        </div>

                        <div class="space-y-6">
                            <div v-for="(step, index) in playSteps" :key="index"
                                v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideLeft, 300 + index * 150)"
                                class="flex gap-4 group cursor-pointer hover:translate-x-2 transition-transform duration-300">
                                <div
                                    class="flex-shrink-0 w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                                    {{ index + 1 }}
                                </div>
                                <div>
                                    <h3 class="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                                        {{ step.title }}
                                    </h3>
                                    <p class="text-gray-600">{{ step.description }}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideRight, 500)"
                        class="relative">
                        <div
                            class="border-2 border-gray-200 rounded-3xl p-8 bg-white shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            <div class="flex items-center justify-between mb-6">
                                <span class="text-sm font-semibold text-gray-500">QUESTION 5/10</span>
                                <span class="text-sm font-semibold text-blue-600 animate-pulse">⏱️ 00:45</span>
                            </div>
                            <h3 class="text-2xl font-bold mb-8">What is the capital city of France?</h3>
                            <div class="space-y-3">
                                <div v-for="(option, idx) in quizOptions" :key="idx"
                                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideUp, 700 + idx * 100)"
                                    :class="[
                                        'rounded-xl p-4 cursor-pointer transition-all duration-300',
                                        option.selected
                                            ? 'border-2 border-blue-600 bg-blue-50 scale-105'
                                            : 'border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 hover:scale-105'
                                    ]">
                                    <span class="font-semibold">{{ option.label }}</span> {{ option.text }}
                                </div>
                            </div>
                        </div>
                        <div
                            class="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-full opacity-10 blur-2xl animate-pulse">
                        </div>
                        <div
                            class="absolute -top-6 -left-6 w-32 h-32 bg-blue-400 rounded-full opacity-10 blur-2xl animate-pulse">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features Grid Section -->
        <div class="flex justify-center p-5 py-20">
            <div class="w-full max-w-[1300px]">
                <div v-motion="motionAnimation.slideUp" class="space-y-2 mb-16">
                    <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold">
                        Everything You <span class="text-blue-600">Need</span>
                    </h2>
                    <p class="text-gray-600 max-w-[600px]">
                        From account management to gameplay, we've got you covered
                    </p>
                </div>

                <div class="grid lg:grid-cols-2 gap-6">
                    <div v-for="(feature, index) in features" :key="index"
                        v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideUp, 200 + index * 150)"
                        class="group border border-gray-200 rounded-3xl p-8 hover:bg-gradient-to-br hover:from-blue-50 hover:to-white hover:border-blue-600 hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                        <div class="flex items-start gap-4">
                            <div
                                class="flex-shrink-0 w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-md">
                                <component :is="feature.icon"
                                    class="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                            </div>
                            <div>
                                <h3
                                    class="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors duration-300">
                                    {{ feature.title }}
                                </h3>
                                <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Stats Bar Section -->
        <div class="flex justify-center p-5 py-16 bg-gradient-to-r from-blue-600 to-blue-700">
            <div class="w-full max-w-[1300px]">
                <div class="grid lg:grid-cols-4 md:grid-cols-2 gap-8 text-white text-center">
                    <div v-for="(stat, index) in statsBar" :key="index"
                        v-motion="motionAnimation.createDelayedAnimation(motionAnimation.scaleIn, 200 + index * 150)"
                        class="space-y-2 hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <component :is="stat.icon" class="w-10 h-10 mx-auto mb-3 opacity-90" />
                        <h3 class="text-4xl font-bold">{{ stat.value }}</h3>
                        <p class="text-blue-100 text-sm uppercase tracking-wide">{{ stat.label }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA Section -->
        <div class="flex justify-center p-5 py-20">
            <div class="w-full max-w-[1300px]">
                <div v-motion="motionAnimation.createDelayedAnimation(motionAnimation.scaleIn, 300)"
                    class="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 md:p-16 text-white relative overflow-hidden group">
                    <div
                        class="absolute top-0 right-0 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-700">
                    </div>
                    <div
                        class="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full opacity-5 blur-3xl group-hover:opacity-10 transition-opacity duration-700">
                    </div>

                    <div class="relative z-10 max-w-[700px]">
                        <h2 v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideLeft, 500)"
                            class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                            Ready to Challenge Yourself?
                        </h2>
                        <p v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideLeft, 650)"
                            class="text-blue-100 text-lg mb-8 leading-relaxed">
                            Join thousands of quiz enthusiasts competing daily. Create your account and start playing
                            now!
                        </p>
                        <div v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideLeft, 800)"
                            class="flex flex-wrap gap-4">
                            <RouterLink to="/signin"
                                class="group/btn flex items-center gap-2 bg-white text-blue-600 px-8 py-3.5 rounded-full font-semibold hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg">
                                <span>Start Playing</span>
                                <ArrowUpRight
                                    class="w-5 h-5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                            </RouterLink>
                            <RouterLink to="/about"
                                class="border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 hover:scale-105 transition-all duration-300">
                                Learn More
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import {
    ArrowUpRight,
    Trophy,
    Zap,
    Target,
    User,
    Gamepad2,
    BarChart3,
    MessageCircle,
    Users,
    Brain,
    Star,
    Award
} from 'lucide-vue-next';
import * as motionAnimation from "../../animation/motionAnimation"

const staticsData = [
    { number: '100K+', label: 'USERS WORLDWIDE' },
    { number: '200', label: 'FUN QUIZZES' },
    { number: '150', label: 'CATEGORIES QUIZZES' },
]

const leaderboardFeatures = [
    'Real-time ranking updates',
    'Weekly and monthly champions',
    'Exclusive rewards for top players'
]

const playSteps = [
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

const quizOptions = [
    { label: 'A.', text: 'London', selected: false },
    { label: 'B.', text: 'Paris', selected: true },
    { label: 'C.', text: 'Berlin', selected: false },
    { label: 'D.', text: 'Madrid', selected: false }
]

const features = [
    {
        icon: User,
        title: 'Account & Profile',
        description: 'Create and manage your Kwizia account easily. Customize your profile and track your quiz history.'
    },
    {
        icon: Gamepad2,
        title: 'Quizzes & Gameplay',
        description: 'Jump into quizzes, join challenges, and earn points. Understand the rules and master the game.'
    },
    {
        icon: BarChart3,
        title: 'Leaderboard',
        description: 'See how you rank against other players. Compete weekly and monthly to reach the top position.'
    },
    {
        icon: MessageCircle,
        title: 'Support & Feedback',
        description: 'Need help or have suggestions? Contact our team to improve your Kwizia experience anytime.'
    }
]

const statsBar = [
    { icon: Users, value: '100K+', label: 'Active Players' },
    { icon: Brain, value: '50K+', label: 'Quizzes Played Daily' },
    { icon: Star, value: '4.8', label: 'Average Rating' },
    { icon: Award, value: '1M+', label: 'Badges Earned' }
]
</script>

































<template>
    <div>
        <!-- Hero Section -->
        <div class="flex justify-center p-5">
            <div class="w-full max-w-[1300px]">
                <div class="text-center space-y-2 mt-5">
                    <h1 v-motion="motionAnimation.bottomToTop"
                        class="text-4xl sm:text-6xl md:text-7xl lg:text-7xl font-bold">
                        Make Learning<br> Fun With <span class="text-blue-600">Quizzes</span>
                    </h1>
                    <div v-motion="motionAnimation.bottomToTopDelayed" class="flex justify-center">
                        <p class="w-full max-w-[600px] text-gray-600">
                            Answer interesting questions, discover new insights, and see how much your knowledge grows
                            every
                            day.
                        </p>
                    </div>
                </div>
                <div class="mt-10 flex flex-wrap gap-5 justify-center items-center">
                    <RouterLink v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideLeft, 1000)"
                        to="/signin"
                        class="group flex justify-center items-center gap-2 border border-gray-200 px-3 py-2 rounded-full">
                        <span>Get Started</span>
                        <div class="bg-blue-600 p-1 rounded-full relative overflow-hidden">
                            <ArrowUpRight
                                class="w-5 h-5 text-white relative z-10 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 translate-x-[-150%] translate-y-[150%]" />
                            <ArrowUpRight
                                class="w-5 h-5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500 group-hover:translate-x-[150%] group-hover:translate-y-[-150%]" />
                        </div>
                    </RouterLink>
                    <RouterLink v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideRight, 1000)"
                        to="/blog" class="border border-gray-200 px-3 py-2.5 rounded-full hover:bg-gray-50">
                        <span>See Today's Article</span>
                    </RouterLink>
                </div>
                <div class="mt-10 flex justify-center">
                    <div class="w-full max-w-[800px]">
                        <div class="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 items-center gap-10">
                            <div v-for="(data, index) in staticsData" :key="index"
                                v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 1200 + index * 200)"
                                class="text-center space-y-1">
                                <h2 class="text-4xl font-bold">{{ data.number }}</h2>
                                <p class="text-gray-500 text-sm">{{ data.label }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mt-10 flex justify-center">
                    <div v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 1800)"
                        class="w-[25px] h-[40px] rounded-full border border-gray-400 flex justify-center items-start pt-2.5">
                        <div class="w-1.5 h-3 border-2 border-gray-400 rounded-full animate-bounce"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Features Section -->
        <div class="flex justify-center p-5 py-20">
            <div class="w-full max-w-[1300px]">
                <div class="text-center space-y-3 mb-16">
                    <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold">
                        Why Choose <span class="text-blue-600">Kwizia</span>?
                    </h2>
                    <p class="text-gray-600 max-w-[600px] mx-auto">
                        Experience the perfect blend of education and entertainment with our interactive quiz platform
                    </p>
                </div>

                <div class="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8">
                    <div v-for="(feature, index) in features" :key="index"
                        class="border border-gray-200 rounded-3xl p-8 hover:border-blue-600 hover:shadow-lg transition-all duration-300 group">
                        <div
                            class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors duration-300">
                            <component :is="feature.icon"
                                class="w-7 h-7 text-blue-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 class="text-xl font-bold mb-3">{{ feature.title }}</h3>
                        <p class="text-gray-600 leading-relaxed">{{ feature.description }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- How It Works Section -->
        <div class="flex justify-center p-5 py-20 bg-gray-50">
            <div class="w-full max-w-[1300px]">
                <div class="text-center space-y-3 mb-16">
                    <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold">
                        How It <span class="text-blue-600">Works</span>
                    </h2>
                    <p class="text-gray-600 max-w-[600px] mx-auto">
                        Start your learning journey in three simple steps
                    </p>
                </div>
                <div class="grid lg:grid-cols-3 md:grid-cols-1 gap-12 lg:gap-8">
                    <div v-for="(step, index) in steps" :key="index" class="text-center space-y-4 relative">
                        <div class="flex justify-center">
                            <div
                                class="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg relative z-10">
                                {{ index + 1 }}
                            </div>
                        </div>
                        <h3 class="text-2xl font-bold">{{ step.title }}</h3>
                        <p class="text-gray-600 max-w-[300px] mx-auto">{{ step.description }}</p>

                        <!-- Garis horizontal untuk desktop (lg ke atas) -->
                        <div v-if="index < steps.length - 1"
                            class="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-0.5 border-t-2 border-dashed border-gray-300 z-0">
                        </div>

                        <!-- Garis vertikal untuk mobile/tablet -->
                        <div v-if="index < steps.length - 1"
                            class="lg:hidden absolute left-1/2 -translate-x-1/2 -bottom-12 w-0.5 h-12 border-l-2 border-dashed border-gray-300 z-0">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Categories Section -->
        <div class="flex justify-center p-5 py-20">
            <div class="w-full max-w-[1300px]">
                <div class="text-center space-y-3 mb-16">
                    <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold">
                        Explore <span class="text-blue-600">Categories</span>
                    </h2>
                    <p class="text-gray-600 max-w-[600px] mx-auto">
                        Choose from a wide range of topics that interest you
                    </p>
                </div>

                <div class="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-5">
                    <div v-for="(category, index) in categories" :key="index"
                        class="border border-gray-200 rounded-2xl p-6 text-center hover:border-blue-600 hover:shadow-lg hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
                        <div
                            class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                            <component :is="category.icon"
                                class="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                        </div>
                        <h3 class="text-lg font-bold mb-2">{{ category.name }}</h3>
                        <p class="text-sm text-gray-500">{{ category.quizCount }} Quizzes</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- CTA Section -->
        <div class="flex justify-center p-5 py-20">
            <div class="w-full max-w-[1300px]">
                <div
                    class="bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-12 md:p-16 text-center text-white relative overflow-hidden">
                    <div class="absolute inset-0 bg-black/10"></div>
                    <div class="relative z-10 space-y-6">
                        <h2 class="text-4xl sm:text-5xl md:text-6xl font-bold">
                            Ready to Start Learning?
                        </h2>
                        <p class="text-blue-100 text-lg max-w-[600px] mx-auto">
                            Join thousands of learners who are already improving their knowledge every day
                        </p>
                        <div class="flex flex-wrap gap-4 justify-center mt-8">
                            <RouterLink to="/signin"
                                class="bg-white text-blue-600 px-8 py-3.5 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300">
                                Get Started Now
                            </RouterLink>
                            <RouterLink to="/about"
                                class="border-2 border-white text-white px-8 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300">
                                Learn More
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import {
    ArrowUpRight,
    Brain,
    Trophy,
    Zap,
    BookOpen,
    Target,
    Users,
    Code,
    Globe,
    Music,
    Palette,
    Film,
    Lightbulb,
    FlaskConical
} from 'lucide-vue-next';
import * as motionAnimation from "../../animation/motionAnimation"

const staticsData = [
    { number: '100K+', label: 'USERS WORLDWIDE' },
    { number: '200', label: 'FUN QUIZZES' },
    { number: '150', label: 'CATEGORIES QUIZZES' },
]

const features = [
    {
        icon: Brain,
        title: 'Smart Learning',
        description: 'Adaptive quizzes that match your learning pace and help you grow at your own speed.'
    },
    {
        icon: Trophy,
        title: 'Track Progress',
        description: 'Monitor your achievements and see how much you\'ve learned with detailed statistics.'
    },
    {
        icon: Zap,
        title: 'Instant Feedback',
        description: 'Get immediate results and explanations to understand your mistakes and improve faster.'
    },
    {
        icon: BookOpen,
        title: 'Diverse Topics',
        description: 'Access hundreds of quizzes across various subjects from science to pop culture.'
    },
    {
        icon: Target,
        title: 'Goal Oriented',
        description: 'Set learning goals and challenge yourself to achieve new milestones every day.'
    },
    {
        icon: Users,
        title: 'Community',
        description: 'Join a vibrant community of learners and compete on global leaderboards.'
    }
]

const steps = [
    {
        title: 'Create Account',
        description: 'Sign up for free in seconds and start your learning journey with us'
    },
    {
        title: 'Choose Quiz',
        description: 'Browse through categories and pick quizzes that match your interests'
    },
    {
        title: 'Start Learning',
        description: 'Answer questions, track your progress, and improve your knowledge'
    }
]

const categories = [
    { name: 'Science', icon: FlaskConical, quizCount: 45 },
    { name: 'Technology', icon: Code, quizCount: 38 },
    { name: 'History', icon: Globe, quizCount: 42 },
    { name: 'Music', icon: Music, quizCount: 25 },
    { name: 'Art', icon: Palette, quizCount: 30 },
    { name: 'Movies', icon: Film, quizCount: 35 },
    { name: 'General', icon: Lightbulb, quizCount: 50 },
    { name: 'Literature', icon: BookOpen, quizCount: 28 }
]
</script>