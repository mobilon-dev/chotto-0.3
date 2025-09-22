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

<script setup>
</script>

<style
  scoped
  lang="scss"
>
@use './styles/themes/default.scss';
@use './styles/themes/dark.scss';
@use './styles/themes/green.scss';
@use './styles/themes/mobilon1.scss';

.base-layout {
  &__container {
    height: var(--chotto-baselayout-container-height, inherit);
    width: var(--chotto-baselayout-container-width, 100%);
    display: var(--chotto-baselayout-container-display, grid);
    grid-template-columns: var(--chotto-baselayout-container-grid-template-columns, 1.8fr 3fr);
    transition: var(--chotto-baselayout-container-transition, all 0.3s ease);
    position: var(--chotto-baselayout-container-position, relative);
    border-top: var(--chotto-baselayout-container-border-top, var(--chotto-container-borders, none));
    border-left: var(--chotto-baselayout-container-border-left, var(--chotto-container-borders, none));
  }

  &__first-col {
    position: var(--chotto-baselayout-first-col-position, relative);
    grid-column: var(--chotto-baselayout-first-col-grid-column, 1);
    display: var(--chotto-baselayout-first-col-display, flex);
    flex-direction: var(--chotto-baselayout-first-col-flex-direction, column);
    height: var(--chotto-baselayout-first-col-height, inherit);
    background-color: var(--chotto-baselayout-first-col-background-color, var(--chotto-layout-base-first-col-bg, transparent));
    border-right: var(--chotto-baselayout-first-col-border-right, var(--chotto-container-borders, none));
    border-bottom: var(--chotto-baselayout-first-col-border-bottom, var(--chotto-container-borders, none));
    width: var(--chotto-baselayout-first-col-width, 100%);
  }

  &__second-col {
    position: var(--chotto-baselayout-second-col-position, relative);
    display: var(--chotto-baselayout-second-col-display, flex);
    flex-direction: var(--chotto-baselayout-second-col-flex-direction, column);
    grid-column: var(--chotto-baselayout-second-col-grid-column, 2);
    height: var(--chotto-baselayout-second-col-height, inherit);
    width: var(--chotto-baselayout-second-col-width, 100%);
    background-color: var(--chotto-baselayout-second-col-background-color, var(--chotto-layout-base-second-col-bg, transparent));
    border-right: var(--chotto-baselayout-second-col-border-right, var(--chotto-container-borders, none));
    border-bottom: var(--chotto-baselayout-second-col-border-bottom, var(--chotto-container-borders, none));
  }
}

.v-enter-active,
.v-leave-active {
  transition: var(--chotto-baselayout-transition-enter-active-transition, opacity 0.5s ease);
  opacity: var(--chotto-baselayout-transition-enter-active-opacity, 1);
}

.v-enter-from,
.v-leave-to {
  opacity: var(--chotto-baselayout-transition-enter-from-opacity, 0);
}
</style>
