<template>
  <div
    class="base__container"
    :style="{ height: contentHeight + 'px' }"
  >
    <slot name="default" />
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.base {
  &__container {
    transition: all 0.3s ease;
    background-color: var(--app-container-bg, transparent);
    margin: var(--app-margin, 0);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  opacity: 1;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
