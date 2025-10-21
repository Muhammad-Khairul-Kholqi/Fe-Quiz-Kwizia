<template>
    <aside :class="[
        'fixed inset-y-0 left-0 z-40 w-60 bg-white border-r border-gray-200 transform transition-transform duration-200',
        open ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0 md:static md:shadow-none'
    ]">
        <div class="flex items-center justify-between p-4 border-b border-gray-200">
            <div class="flex items-center justify-center gap-2">
                <img :src="SingleLogo" alt="Logo Kwizia" class="w-[32px]" />
                <span class="font-semibold tracking-wide">Kwizia</span>
            </div>
            <button class="md:hidden text-gray-600" @click="$emit('close')">
                <X class="w-6 h-6" />
            </button>
        </div>

        <nav class="p-4 space-y-2 border-b border-gray-200 overflow-y-auto scrollbar-hide">
            <div v-for="(item, index) in menuItems" :key="index">
                <div v-if="item.children">
                    <button @click="toggleDropdown(item.name)" :class="[
                        'flex items-center justify-between w-full px-3 py-2 rounded-lg transition-colors cursor-pointer',
                        isParentActive(item)
                            ? 'text-blue-600'
                            : 'text-gray-700 hover:bg-gray-100'
                    ]">
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
                                        ? 'bg-blue-500 text-white font-medium'
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
                            ? 'bg-blue-500 text-white font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                    ]">
                        <component :is="item.icon" class="w-5 h-5" />
                        <span class="font-medium">{{ item.name }}</span>
                    </a>
                </RouterLink>
            </div>
        </nav>

        <div class="p-4">
            <button @click="handleLogout"
                class="flex w-full items-center gap-3 px-3 py-2 rounded-lg transition-colors hover:bg-gray-100 text-red-600 cursor-pointer">
                <LogOut class="w-4 h-4" />
                <span>Log Out</span>
            </button>
        </div>
    </aside>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import authApi from "../../../api/authApi";
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
const emit = defineEmits(["close"]);

const router = useRouter();
const openDropdowns = ref({});
const isAuthenticated = ref(false);
const currentUser = ref(null);

const toggleDropdown = (name) => {
    openDropdowns.value[name] = !openDropdowns.value[name];
};

const isParentActive = (item) => {
    if (!item.children) return false;
    const currentPath = router.currentRoute.value.path;
    return item.children.some(child => currentPath.startsWith(child.to));
};

const handleNavigation = (navigate) => {
    navigate();
    if (window.innerWidth < 768) {
        emit("close");
    }
};

const checkAuthStatus = () => {
    isAuthenticated.value = authApi.isAuthenticated();
    if (isAuthenticated.value) {
        currentUser.value = authApi.getCurrentUser();
    }
};

const handleLogout = () => {
    authApi.logout();
    isAuthenticated.value = false;
    currentUser.value = null;
    emit("close");
    router.push("/");
};

watch(
    () => router.currentRoute.value,
    () => {
        checkAuthStatus();
        menuItems.forEach(item => {
            if (item.children && isParentActive(item)) {
                openDropdowns.value[item.name] = true;
            }
        });
    }
);

onMounted(() => {
    checkAuthStatus();
    menuItems.forEach(item => {
        if (item.children && isParentActive(item)) {
            openDropdowns.value[item.name] = true;
        }
    });
});

const menuItems = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        to: "/private/admin/dashboard",
    },
    {
        name: "Users",
        icon: Users,
        to: "/private/admin/users",
    },
    {
        name: "Blog",
        icon: Newspaper,
        children: [
            { name: "Articles", to: "/private/admin/articles" },
            { name: "Category", to: "/private/admin/category-blog" },
        ],
    },
    {
        name: "Quiz",
        icon: Layers2,
        children: [
            { name: "All Quizzes", to: "/private/admin/quizzes" },
            { name: "Category", to: "/private/admin/categories" },
        ],
    },
    {
        name: "Help",
        icon: HelpCircle,
        children: [
            { name: "FAQ", to: "/private/admin/faq" },
            { name: "Contact", to: "/private/admin/contact" },
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