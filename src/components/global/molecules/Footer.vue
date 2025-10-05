<template>
    <footer class="flex justify-center border-t border-gray-200 mt-10 px-5 pt-10 pb-5">
        <div class="w-full max-w-[1300px]">
            <div class="flex justify-between items-start gap-10 flex-wrap">
                <div>
                    <img :src="LogoText" alt="Logo Kwizia" class="w-[120px]" />
                    <p class="text-gray-600 mt-2 max-w-[300px]">
                        Kwizia is your go-to platform for engaging and interactive quizzes that make learning fun and
                        exciting.
                    </p>
                </div>

                <div v-for="(section, index) in footerLinks" :key="index">
                    <h3 class="font-semibold mb-2">{{ section.title }}</h3>
                    <ul class="flex flex-col space-y-2 text-gray-600">
                        <RouterLink v-for="(link, idx) in section.links" :key="idx" :to="link.to"
                            class="hover:text-blue-600 transition-colors">
                            {{ link.label }}
                        </RouterLink>
                    </ul>
                </div>
            </div>

            <hr class="my-5 border-gray-100" />

            <div class="text-start text-gray-600">
                &copy; {{ currentYear }} Kwizia. All rights reserved.
            </div>
        </div>
    </footer>
</template>

<script setup>
import LogoText from "../../../assets/logoText.png";
import { RouterLink } from "vue-router";
import { ref } from "vue";

const currentYear = new Date().getFullYear();

const footerLinks = ref([
    {
        title: "Resources",
        links: [
            { label: "Home", to: "/" },
            { label: "Blog", to: "/blog" },
            { label: "Leaderboard", to: "/leaderboard" },
        ],
    },
    {
        title: "Get Help",
        links: [
            { label: "FAQ", to: "/faq" },
            { label: "Contact", to: "/contact-us" },
            { label: "Support", to: "/support" },
        ],
    },
    {
        title: "Contact Us",
        links: [
            { label: "(62) 123 456 789", to: "#" },
            { label: "support@gmail.com", to: "#" },
        ],
    },
]);
</script>
