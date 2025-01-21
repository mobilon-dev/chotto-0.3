<template>
  <div class="base-layout__container">
    <div class="base-layout__first-col">
      <slot name="default" />
    </div>
  </div>
</template>

<script setup></script>

<style
  scoped
  lang="scss"
>
.base-layout {
  &__container {
    height: inherit;
    display: grid;
    grid-template-columns: 1fr;
    transition: all 0.3s ease;
    background-color: var(--layout-feed-bg, transparent);
    position: relative;
  }

  &__first-col {
    position: relative;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    height: inherit;
    background-color: var(--layout-feed-bg);
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
