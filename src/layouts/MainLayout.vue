<template>
  <div>
    <Header />
    <Navigation />
    <main>
      <Home />
    </main>
  </div>
</template>

<script setup>
import Header from "../components/global/main/Header.vue";
import Navigation from "../components/global/main/Navigation.vue";
import Home from "../views/Home.vue";
</script>