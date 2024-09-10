<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div>
      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
.bebas-neue-regular {
  font-family: "Bebas Neue", sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
