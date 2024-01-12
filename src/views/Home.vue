<template>
  <div class="home">
    <i18nExample />
    <div class="error">Error</div>
    <button class="btn">Hi</button>
    <div class="popup">成功</div>
  </div>
</template>

<script setup>
import i18nExample from '@/components/i18nExample.vue';
</script>

<style lang="scss" scoped>
// @import '@/styles/mixin.scss';
.home{
  @include flex-center;
}
  .error{
  // color:$alert-danger-color;
}
</style>

