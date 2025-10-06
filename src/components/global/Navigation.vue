<template>
  <nav
    class="hidden md:flex justify-center py-3 px-5 border-b border-gray-200 bg-white/40 backdrop-blur-md sticky top-0 z-40">
    <div class="w-full max-w-[1300px]">
      <div class="flex items-center justify-between gap-5">
        <div class="flex items-center gap-8">
          <RouterLink to="/">
            <img :src="LogoText" alt="Logo Kwizia" class="w-[100px]">
          </RouterLink>

          <ul class="flex items-center gap-4">
            <RouterLink v-for="link in navLinks" :key="link.path" :to="link.path"
              class="hover:text-blue-600 transition-colors">
              {{ link.name }}
            </RouterLink>
          </ul>
        </div>

        <div class="flex items-center gap-5">
          <RouterLink v-for="button in authButtons" :key="button.path" :to="button.path" :class="button.class"
            class="transition-colors">
            {{ button.name }}
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>

  <nav
    class="md:hidden flex justify-center py-3 px-5 border-b border-gray-200 bg-white/40 backdrop-blur-md sticky top-0 z-40">
    <div class="w-full max-w-[1300px]">
      <div class="flex items-center justify-between">
        <RouterLink to="/">
          <img :src="LogoText" alt="Logo Kwizia" class="w-[100px]">
        </RouterLink>

        <div class="flex items-center gap-3">
          <RouterLink v-for="button in authButtons" :key="button.path" :to="button.path" :class="button.class"
            class="hidden sm:block transition-colors text-sm">
            {{ button.name }}
          </RouterLink>

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
      <div class="w-full max-w-[1300px]">
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
        <li v-for="link in navLinks" :key="link.path">
          <RouterLink :to="link.path" @click="closeMenu"
            class="flex items-center justify-between py-4 px-4 hover:bg-gray-50 rounded-lg">
            <span class="text-base">{{ link.name }}</span>
            <ChevronRight :size="20" />
          </RouterLink>
        </li>
      </ul>
    </div>

    <div class="sm:hidden px-5 pb-5 pt-3 border-t border-gray-200 space-y-3">
      <RouterLink v-for="button in authButtons" :key="button.path" :to="button.path" @click="closeMenu"
        :class="button.class" class="block text-center py-3 px-4 rounded-lg text-base">
        {{ button.name }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { RouterLink } from "vue-router";
import { Menu, X, ChevronRight } from 'lucide-vue-next';
import LogoText from "../../assets/logoText.png";

const isMenuOpen = ref(false);

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Blog', path: '/blog' },
  { name: 'Leaderboard', path: '/leaderboard' },
  { name: 'Quiz', path: '/quiz' },
  { name: 'History', path: '/history' },
];

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

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
};

watch(isMenuOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
});
</script>