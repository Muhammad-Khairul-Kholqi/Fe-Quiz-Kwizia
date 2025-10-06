<template>
  <div class="min-h-screen flex flex-col">
    <Header />
    <Navigation />

    <main class="flex-grow">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from "../components/global/landing/Header.vue";
import Navigation from "../components/global/Navigation.vue";
import Footer from "../components/global/landing/Footer.vue";
</script>
