<template>
  <div class="extend-layout__container">
    <div class="extend-layout__first-col">
      <slot name="first-col" />
    </div>
    <div class="extend-layout__second-col">
      <slot name="second-col" />
    </div>
    <div class="extend-layout__third-col">
      <slot name="third-col" />
    </div>
    <div class="extend-layout__fourth-col">
      <slot name="fourth-col" />
    </div>
  </div>
</template>

<script setup></script>

<style scoped lang="scss">
.extend-layout {
  &__container {
    height: inherit;
    display: grid;
    grid-template-columns: min-content 1.25fr 3fr min-content;
    transition: all 0.3s ease;
    background-color: var(--app-container-bg, transparent);
    margin: var(--app-margin, 0);
    position: relative;
  }
  &__first-col {
    position: relative;
    margin-right: 20px;
    grid-column: 1;
    border-right: 1px solid var(--sidebar-border-color);
    display: flex;
    flex-direction: column;
    /* вычитаем маргины сверху и снизу */
    height: inherit;
    // width: 200px;
  }
  &__second-col {
    position: relative;
    margin-right: 20px;
    grid-column: 2;
    border-right: 1px solid var(--sidebar-border-color);
    display: flex;
    flex-direction: column;
    /* вычитаем маргины сверху и снизу */
    height: inherit;
  }
  &__third-col {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-column: 3;
    height: inherit;
    border-radius: 12px;
    background-color: var(--rigth-bar-bg);
  }
  &__fourth-col {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-column: 4;
    height: inherit;
    border-radius: 12px;
    background-color: var(--rigth-bar-bg);
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
