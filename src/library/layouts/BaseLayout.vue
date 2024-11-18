<template>
  <div class="base-layout__container">
    <div class="base-layout__first-col">
      <slot name="first-col" />
    </div>
    <div class="base-layout__second-col">
      <slot name="second-col" />
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
    // width: '100%';
    display: grid;
    grid-template-columns: 1.25fr 3fr;
    transition: all 0.3s ease;
    background-color: var(--layout-base-bg, transparent);
    position: relative;
  }

  &__first-col {
    position: relative;
    margin-right: 20px;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    /* вычитаем маргины сверху и снизу */
    height: inherit;
  }

  &__second-col {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-column: 2;
    height: inherit;
    border-radius: 12px;
    background-color: var(--layout-base-second-col-bg);
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
