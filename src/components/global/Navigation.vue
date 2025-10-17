<template>
  <nav
    class="hidden md:flex justify-center py-3 px-5 border-b border-gray-200 bg-white/40 backdrop-blur-md sticky top-0 z-40">
    <div class="w-full max-w-[1500px]">
      <div class="flex items-center justify-between gap-5">
        <div class="flex items-center gap-8">
          <RouterLink to="/">
            <img :src="LogoText" alt="Logo Kwizia" class="w-[100px]">
          </RouterLink>

          <ul class="flex items-center gap-4">
            <RouterLink v-for="link in visibleNavLinks" :key="link.path" :to="link.path"
              class="hover:text-blue-600 transition-colors">
              {{ link.name }}
            </RouterLink>
          </ul>
        </div>

        <div class="flex items-center gap-5">
          <template v-if="!isAuthenticated">
            <RouterLink v-for="button in authButtons" :key="button.path" :to="button.path" :class="button.class"
              class="transition-colors">
              {{ button.name }}
            </RouterLink>
          </template>

          <template v-else>
            <div class="relative">
              <button @click="toggleProfileMenu"
                class="flex items-center gap-3 hover:text-blue-600 transition-colors cursor-pointer">
                <div class="flex items-center gap-1">
                  <User :size="20" />
                  <span>{{ currentUser?.username }}</span>
                </div>
                <ChevronDown :size="16" :class="[
                  'transition-transform duration-200',
                  isProfileMenuOpen ? 'rotate-180' : 'rotate-0'
                ]" />
              </button>


              <div v-if="isProfileMenuOpen"
                class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                <RouterLink to="/app/profile" @click="closeProfileMenu"
                  class="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 transition-colors rounded-t-lg">
                  <User :size="16" />
                  <span>Profile</span>
                </RouterLink>
                <button @click="handleLogout"
                  class="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-b-lg transition-colors text-red-600 cursor-pointer">
                  <LogOut :size="16" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </nav>

  <nav
    class="md:hidden flex justify-center py-3 px-5 border-b border-gray-200 bg-white/40 backdrop-blur-md sticky top-0 z-40">
    <div class="w-full max-w-[1500px]">
      <div class="flex items-center justify-between">
        <RouterLink to="/">
          <img :src="LogoText" alt="Logo Kwizia" class="w-[100px]">
        </RouterLink>

        <div class="flex items-center gap-3">
          <template v-if="!isAuthenticated">
            <RouterLink v-for="button in authButtons" :key="button.path" :to="button.path" :class="button.class"
              class="hidden sm:block transition-colors text-sm">
              {{ button.name }}
            </RouterLink>
          </template>

          <button @click="toggleMenu" class="p-2">
            <Menu v-if="!isMenuOpen" :size="24" />
            <X v-else :size="24" />
          </button>
        </div>
      </div>
    </div>
  </nav>

  <div v-if="isMenuOpen" class="md:hidden fixed inset-0 bg-white z-50 overflow-y-auto flex flex-col">
    <div class="flex justify-center py-3 px-5 border-b border-gray-200">
      <div class="w-full max-w-[1500px]">
        <div class="flex items-center justify-between">
          <RouterLink to="/" @click="closeMenu">
            <img :src="LogoText" alt="Logo Kwizia" class="w-[100px]">
          </RouterLink>

          <button @click="toggleMenu" class="p-2">
            <X :size="24" />
          </button>
        </div>
      </div>
    </div>

    <div class="flex-1 px-5 py-6">
      <ul class="space-y-1">
        <li v-for="link in visibleNavLinks" :key="link.path">
          <RouterLink :to="link.path" @click="closeMenu"
            class="flex items-center justify-between py-4 px-4 hover:bg-gray-50 rounded-lg">
            <span class="text-base">{{ link.name }}</span>
            <ChevronRight :size="20" />
          </RouterLink>
        </li>

        <li v-if="isAuthenticated">
          <button @click="handleLogout"
            class="w-full flex items-center justify-between py-4 px-4 hover:bg-gray-50 rounded-lg text-red-600">
            <span class="text-base">Logout</span>
            <LogOut :size="20" />
          </button>
        </li>
      </ul>
    </div>

    <div v-if="!isAuthenticated" class="sm:hidden px-5 pb-5 pt-3 border-t border-gray-200 space-y-3">
      <RouterLink v-for="button in authButtons" :key="button.path" :to="button.path" @click="closeMenu"
        :class="button.class" class="block text-center py-3 px-4 rounded-lg text-base">
        {{ button.name }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { RouterLink, useRouter } from "vue-router";
import { Menu, X, ChevronRight, User, ChevronDown, LogOut } from 'lucide-vue-next';
import LogoText from "../../assets/logoText.png";
import authApi from '../../api/authApi';

const router = useRouter();
const isMenuOpen = ref(false);
const isProfileMenuOpen = ref(false);
const isAuthenticated = ref(false);
const currentUser = ref(null);

const allNavLinks = [
  { name: 'Home', path: '/', requiresAuth: false },
  { name: 'Quiz', path: '/app/quiz', requiresAuth: true },
  { name: 'Blog', path: '/blog', requiresAuth: false },
  { name: 'Leaderboard', path: '/leaderboard', requiresAuth: false },
  { name: 'Profile', path: '/app/profile', requiresAuth: true },
];

const visibleNavLinks = computed(() => {
  if (isAuthenticated.value) {
    return allNavLinks.filter(link => link.name !== 'Profile');
  } else {
    return allNavLinks.filter(link => !link.requiresAuth);
  }
});

const authButtons = [
  {
    name: 'Sign In',
    path: '/signin',
    class: 'hover:text-blue-600'
  },
  {
    name: 'Sign Up',
    path: '/signup',
    class: 'bg-[#146EF5] hover:bg-blue-600 px-3 py-2 rounded-md text-white border border-[#146EF5]'
  }
];

const checkAuthStatus = () => {
  isAuthenticated.value = authApi.isAuthenticated();
  if (isAuthenticated.value) {
    currentUser.value = authApi.getCurrentUser();
  }
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

const toggleProfileMenu = () => {
  isProfileMenuOpen.value = !isProfileMenuOpen.value;
};

const closeProfileMenu = () => {
  isProfileMenuOpen.value = false;
};

const handleLogout = () => {
  authApi.logout();
  isAuthenticated.value = false;
  currentUser.value = null;
  closeMenu();
  closeProfileMenu();
  router.push('/');
};

const handleClickOutside = (event) => {
  if (isProfileMenuOpen.value && !event.target.closest('.relative')) {
    closeProfileMenu();
  }
};

watch(isMenuOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});

watch(() => router.currentRoute.value, () => {
  checkAuthStatus();
});

onMounted(() => {
  checkAuthStatus();
  document.addEventListener('click', handleClickOutside);
});
</script>