<template>
  <div class="base-layout__container">
    <div 
      class="base-layout__first-col"
    >
      <slot name="first-col" />
    </div>
    <div class="base-layout__second-col">
      <slot name="second-col" />
    </div>
  </div>
</template>

<script setup>
</script>

<style
  scoped
  lang="scss"
>
.base-layout {
  &__container {
    height: inherit;
    width: 100%;
    display: grid;
    grid-template-columns: 1.25fr 3fr;
    transition: all 0.3s ease;
    background-color: var(--layout-base-bg, transparent);
    position: relative;
    border-top: var(--layout-base-column-border, none);
    border-left: var(--layout-base-column-border, none);
    
  }

  &__first-col {
    position: relative;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    height: inherit;
    background-color: var(--layout-base-first-col-bg);
    border-right: var(--layout-base-column-border, none);
    border-bottom: var(--layout-base-column-border, none);
    width: 100%;
    min-width: 300px;
  }

  &__second-col {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-column: 2;
    height: inherit;
    width: 100%;
    background-color: var(--layout-base-second-col-bg);
    border-right: var(--layout-base-column-border, none);
    border-bottom: var(--layout-base-column-border, none);
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
