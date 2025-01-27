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

<script setup>

</script>

<style
  scoped
  lang="scss"
>
.extend-layout {
  &__container {
    height: inherit;
    display: grid;
    grid-template-columns: min-content min-content 3fr min-content;
    transition: all 0.3s ease;
    background-color: var(--layout-extended-bg, transparent);
    position: relative;

    border-top: var(--layout-extended-column-border, none);
    border-left: var(--layout-extended-column-border, none);
  }

  &__first-col {
    position: relative;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    height: inherit;
    border-right: var(--layout-extended-column-border, none);
    border-bottom: var(--layout-extended-column-border, none);
  }

  &__second-col {
    position: relative;
    grid-column: 2;
    display: flex;
    flex-direction: column;
    height: inherit;
    overflow: hidden;
    border-right: var(--layout-extended-column-border, none);
    border-bottom: var(--layout-extended-column-border, none);
    width: 350px;
  }

  &__third-col {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-column: 3;
    height: inherit;
    border-right: var(--layout-extended-column-border, none);
    border-bottom: var(--layout-extended-column-border, none);
    background-color: var(--layout-extended-third-col-bg);
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
