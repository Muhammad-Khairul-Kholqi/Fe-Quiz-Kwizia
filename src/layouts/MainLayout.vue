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
import Header from "../components/global/main/Header.vue";
import Navigation from "../components/global/main/Navigation.vue";
import Footer from "../components/global/molecules/Footer.vue";
</script>
