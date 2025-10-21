<template>
    <div class="flex h-screen relative">
        <Sidebar :open="sidebarOpen" @close="sidebarOpen = false" />

        <transition name="backdrop">
            <div v-if="sidebarOpen" 
                class="fixed inset-0 bg-black/50 z-30 md:hidden"
                @click="sidebarOpen = false">
            </div>
        </transition>

        <div class="flex-1 flex flex-col min-w-0 relative z-10">
            <Header @toggleSidebar="sidebarOpen = true" />
            <main class="overflow-auto">
                <div class="p-6">
                    <main class="mx-auto">
                        <router-view />
                    </main>
                </div>
            </main>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import Sidebar from "../components/global/admin/Sidebar.vue"
import Header from "../components/global/admin/Header.vue"

const sidebarOpen = ref(false)
</script>

<style scoped>
.backdrop-enter-active,
.backdrop-leave-active {
    transition: opacity 0.2s ease;
}

.backdrop-enter-from,
.backdrop-leave-to {
    opacity: 0;
}

.backdrop-enter-to,
.backdrop-leave-from {
    opacity: 1;
}
</style>