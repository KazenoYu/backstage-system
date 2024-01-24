<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="loading" :class="{ isLoading: false }">
    <v-progress-circular
      indeterminate
      color="primary"
      class="loading__circle"
    ></v-progress-circular>
  </div>
  <RouterView />
</template>

<style lang="scss">
// @import './styles/main.scss';
.loading {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 10;
  .loading__circle {
    z-index: 100;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
.isLoading {
  display: block;
}
</style>
