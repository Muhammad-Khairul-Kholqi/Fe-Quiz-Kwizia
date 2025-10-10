<template>
    <aside :class="[
        'fixed inset-y-0 left-0 z-[50] w-60 bg-white border-r border-gray-200 transform transition-transform duration-200',
        open ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:static md:shadow-none'
    ]">
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <div class="flex items-center justify-center gap-2">
                <img :src="SingleLogo" alt="Logo Kwizia" class="w-[31px]" />
                <span class="font-semibold tracking-wide">Kwizia</span>
            </div>
            <button class="md:hidden text-gray-600" @click="$emit('close')">
                <X class="w-6 h-6" />
            </button>
        </div>

        <nav class="p-4 space-y-2 border-b border-gray-200 overflow-y-auto scrollbar-hide">
            <div v-for="(item, index) in menuItems" :key="index">
                <div v-if="item.children">
                    <button @click="toggleDropdown(item.name)"
                        class="flex items-center justify-between w-full px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 cursor-pointer">
                        <div class="flex items-center gap-3">
                            <component :is="item.icon" class="w-5 h-5" />
                            <span class="font-medium">{{ item.name }}</span>
                        </div>
                        <ChevronRight :class="[
                            'w-4 h-4 transition-transform duration-200',
                            openDropdowns[item.name] ? 'rotate-90' : ''
                        ]" />
                    </button>

                    <transition name="dropdown">
                        <div v-if="openDropdowns[item.name]"
                            class="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-3">
                            <RouterLink v-for="sub in item.children" :key="sub.to" :to="sub.to" custom
                                v-slot="{ href, navigate, isActive }">
                                <a :href="href" @click="handleNavigation(navigate)" :class="[
                                    'flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                                    isActive
                                        ? 'bg-purple-500 text-white font-medium'
                                        : 'text-gray-600 hover:bg-gray-100'
                                ]">
                                    <span>{{ sub.name }}</span>
                                </a>
                            </RouterLink>
                        </div>
                    </transition>
                </div>

                <RouterLink v-else :to="item.to" custom v-slot="{ href, navigate, isActive }">
                    <a :href="href" @click="handleNavigation(navigate)" :class="[
                        'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                        isActive
                            ? 'bg-purple-500 text-white font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                    ]">
                        <component :is="item.icon" class="w-5 h-5" />
                        <span class="font-medium">{{ item.name }}</span>
                    </a>
                </RouterLink>
            </div>
        </nav>

        <div class="p-4">
            <button
                class="flex w-full items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 text-red-600 cursor-pointer">
                <LogOut class="w-4 h-4" />
                <span>Log Out</span>
            </button>
        </div>
    </aside>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import {
    X,
    LayoutDashboard,
    Newspaper,
    Layers2,
    LogOut,
    Users,
    HelpCircle,
    ChevronRight,
} from "lucide-vue-next";
import SingleLogo from "../../../assets/singleLogo.png";

const props = defineProps({
    open: { type: Boolean, required: true },
});

const emit = defineEmits(['close']);

const openDropdowns = ref({});

const toggleDropdown = (name) => {
    openDropdowns.value[name] = !openDropdowns.value[name];
};

const handleNavigation = (navigate) => {
    navigate();
    if (window.innerWidth < 768) {
        emit('close');
    }
};

const menuItems = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        to: "/private/page/admin/dashboard"
    },
    {
        name: "Users",
        icon: Users,
        to: "/private/page/admin/users"
    },
    {
        name: "Blog",
        icon: Newspaper,
        children: [
            { name: "Articles", to: "/private/page/admin/articles" },
            { name: "Category", to: "/private/page/admin/category-blog" },
        ],
    },
    {
        name: "Quiz",
        icon: Layers2,
        children: [
            { name: "All Quizzes", to: "/private/page/admin/quizzes" },
            { name: "Category", to: "/private/page/admin/categories" },
        ],
    },
    {
        name: "Help",
        icon: HelpCircle,
        children: [
            { name: "FAQ", to: "/private/page/admin/quizzes" },
            { name: "Contact", to: "/private/page/admin/categories" },
        ],
    },
];
</script>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
    opacity: 0;
    max-height: 0;
    overflow: hidden;
}

.dropdown-enter-to,
.dropdown-leave-from {
    opacity: 1;
    max-height: 200px;
}
</style>
