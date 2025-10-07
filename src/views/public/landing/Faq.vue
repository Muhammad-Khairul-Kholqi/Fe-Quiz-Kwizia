<template>
    <div class="flex justify-center px-5 py-10 bg-gradient-to-b from-blue-50 to-white">
        <div class="w-full max-w-[1500px]">
            <h1 class="text-4xl text-center">How can we help you?</h1>
            <div class="flex justify-center mt-7 px-4">
                <div
                    class="w-full max-w-[600px] border border-gray-200 bg-white rounded-full p-2 flex items-center gap-2">
                    <input type="text" class="flex-1 outline-none px-4 py-3 min-w-0 text-gray-700"
                        placeholder="Search faq..." />
                    <button
                        class="bg-blue-600 hover:bg-blue-700 cursor-pointer px-6 py-3 text-white rounded-full whitespace-nowrap transition-colors flex-shrink-0">
                        Search
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div class="flex justify-center p-5">
        <div class="w-full max-w-[1500px]">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div v-for="(item, index) in helpCards" :key="index"
                    v-motion="motionAnimation.createDelayedAnimation(motionAnimation.scaleIn, 200 + index * 200)"
                    class="bg-white border border-gray-200 shadow-md rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <component :is="item.icon" :class="['w-7 h-7 mb-3', item.color]" />
                    <h3 class="text-lg font-semibold">{{ item.title }}</h3>
                    <p class="text-gray-600 text-sm mt-2">{{ item.description }}</p>
                </div>
            </div>

            <div class="mt-12">
                <div class="space-y-4">
                    <div v-for="(faq, index) in faqs" :key="index"
                        v-motion="motionAnimation.createDelayedAnimation(motionAnimation.bottomToTop, 200 + index * 200)"
                        class="bg-white border-b border-gray-200 overflow-hidden">
                        <button @click="toggleFaq(index)"
                            class="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors cursor-pointer">
                            <h3 class="text-lg pr-4">
                                {{ faq.question }}
                            </h3>
                            <ChevronDown :class="[
                                'w-6 h-6 text-gray-600 flex-shrink-0 transition-transform duration-300',
                                { 'rotate-180': faq.isOpen }
                            ]" />
                        </button>
                        <div
                            :class="[ 'overflow-hidden transition-all duration-300', faq.isOpen ? 'max-h-96' : 'max-h-0']">
                            <div class="px-5 pb-5 pt-2 text-gray-600 border-t border-gray-100">
                                {{ faq.answer }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { User, HelpCircle, Trophy, MessageCircle, ChevronDown } from "lucide-vue-next";
import * as motionAnimation from "../../../components/animation/motionAnimation"

const helpCards = [
    {
        icon: User,
        color: "text-blue-600",
        title: "Account & Profile",
        description:
            "Learn how to create, manage, and secure your Kwizia account easily.",
    },
    {
        icon: HelpCircle,
        color: "text-green-500",
        title: "Quizzes & Gameplay",
        description:
            "Understand how quizzes work, how to join challenges, and earn points.",
    },
    {
        icon: Trophy,
        color: "text-yellow-500",
        title: "Leaderboard",
        description:
            "Discover how the leaderboard works and how to climb to the top.",
    },
    {
        icon: MessageCircle,
        color: "text-purple-500",
        title: "Support & Feedback",
        description:
            "Need help or have suggestions? Contact our team to improve your Kwizia experience.",
    },
];

const faqs = ref([
    {
        question: "How do I create an account on Kwizia?",
        answer: "Creating an account is simple! Click on the 'Sign Up' button, enter your email address, create a strong password, and verify your email. You'll be ready to start taking quizzes in minutes.",
        isOpen: false
    },
    {
        question: "How does the point system work?",
        answer: "You earn points by answering quiz questions correctly. The faster you answer, the more points you get! Bonus points are awarded for streaks and completing challenges. Points contribute to your position on the leaderboard.",
        isOpen: false
    },
    {
        question: "Can I play quizzes with my friends?",
        answer: "Yes! You can create private quiz rooms and invite your friends using a unique code. You can also challenge friends directly from their profile or join public multiplayer quizzes.",
        isOpen: false
    },
    {
        question: "How is the leaderboard calculated?",
        answer: "The leaderboard ranks players based on their total points, win rate, and quiz completion. It updates in real-time and resets weekly for the weekly rankings, while the all-time leaderboard tracks your overall performance.",
        isOpen: false
    },
    {
        question: "What should I do if I encounter a technical issue?",
        answer: "If you experience any technical problems, please contact our support team through the 'Support & Feedback' section. Include details about the issue, screenshots if possible, and our team will assist you within 24 hours.",
        isOpen: false
    }
]);

const toggleFaq = (index) => {
    faqs.value[index].isOpen = !faqs.value[index].isOpen;
};
</script>