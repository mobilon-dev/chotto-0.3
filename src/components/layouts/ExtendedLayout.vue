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
  </div>
</template>

<script setup></script>

<style
  scoped
  lang="scss"
>
.extend-layout {
  &__container {
    height: inherit;
    display: grid;
    grid-template-columns: min-content 1.25fr 3fr min-content;
    transition: all 0.3s ease;
    background-color: var(--app-container-bg, transparent);
    margin: var(--app-margin, 0);
    position: relative;

    border-top: var(--layout-extended-column-border);
    border-left: var(--layout-extended-column-border);
  }

  &__first-col {
    position: relative;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    height: inherit;
    margin: var(--left-bar-margin);
    border-right: var(--layout-extended-column-border);
    border-bottom: var(--layout-extended-column-border);
  }

  &__second-col {
    position: relative;
    grid-column: 2;
    display: flex;
    flex-direction: column;
    height: inherit;
    border-right: var(--layout-extended-column-border);
    border-bottom: var(--layout-extended-column-border);
  }

  &__third-col {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-column: 3;
    height: inherit;
    border-right: var(--layout-extended-column-border);
    border-bottom: var(--layout-extended-column-border);
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
