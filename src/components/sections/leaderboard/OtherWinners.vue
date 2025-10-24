<template>
    <div class="flex justify-center p-5 mt-10">
        <div class="w-full max-w-[1500px]">
            <div class="scrollbar-hide w-full overflow-x-auto">
                <div class="flex justify-between items-center font-semibold p-3 min-w-[700px]">
                    <div class="flex items-center gap-5">
                        <span class="text-gray-600 w-12">Rank</span>
                        <span class="text-gray-600 w-40">Name</span>
                    </div>

                    <div class="flex items-center text-center divide-x divide-gray-300">
                        <span class="w-24 text-sm tracking-wide">Points</span>
                        <span class="w-24 text-sm tracking-wide">Quizzes</span>
                        <span class="w-24 text-sm tracking-wide">Success</span>
                    </div>
                </div>

                <div v-if="loading" class="space-y-2">
                    <div v-for="i in 7" :key="i"
                        class="flex justify-between items-center p-3 border-b border-gray-200 min-w-[700px]">
                        <div class="flex items-center gap-5">
                            <LoadingSkeleton type="text" width="40px" height="16px" />
                            <div class="flex items-center gap-2">
                                <LoadingSkeleton type="circle" size="40px" />
                                <LoadingSkeleton type="text" width="150px" height="16px" />
                            </div>
                        </div>

                        <div class="flex items-center divide-x divide-gray-200 text-center gap-4">
                            <LoadingSkeleton type="text" width="60px" height="16px" />
                            <LoadingSkeleton type="text" width="60px" height="16px" />
                            <LoadingSkeleton type="text" width="60px" height="16px" />
                        </div>
                    </div>
                </div>

                <div v-else-if="otherUsers.length > 0">
                    <div v-for="(user, index) in otherUsers" :key="user.id"
                        v-motion="motionAnimation.createDelayedAnimation(motionAnimation.slideLeft, 200 + index * 200)"
                        class="flex justify-between items-center p-3 border-b border-gray-200 min-w-[700px] hover:bg-gray-50 transition-colors">
                        <div class="flex items-center gap-5">
                            <span class="text-gray-600 w-12">{{ user.rank }}</span>
                            <div class="flex items-center gap-2">
                                <img :src="user.avatars?.image_url || 'https://placehold.co/40x40'" :alt="user.username"
                                    class="w-10 h-10 rounded-full object-cover">
                                <span class="text-gray-600 w-40">{{ user.username }}</span>
                            </div>
                        </div>

                        <div class="flex items-center divide-x divide-gray-200 text-center">
                            <span class="w-24 text-gray-700">{{ user.total_points }}</span>
                            <span class="w-24 text-gray-700">{{ user.total_quiz_completed }}</span>
                            <span class="w-24 text-gray-700">{{ user.total_perfect_attempts }}</span>
                        </div>
                    </div>
                </div>

                <div v-else class="text-center py-10">
                    <p class="text-gray-500">No other users in the leaderboard yet.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import * as motionAnimation from "../../animation/motionAnimation";
import LoadingSkeleton from '../../ui/LoadingSkeleton.vue';

defineProps({
    loading: {
        type: Boolean,
        required: true
    },
    otherUsers: {
        type: Array,
        default: () => []
    }
});
</script>