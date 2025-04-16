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
    position: relative;
  }

  &__first-col {
    position: relative;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    height: inherit;
    background-color: var(--chotto-layout-feed-bg, transparent);
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
