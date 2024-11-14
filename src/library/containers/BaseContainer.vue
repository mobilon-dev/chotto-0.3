<template>
  <div
    class="base__container"
    :style="{ height, width }"
  >
    <slot name="default" />
  </div>
</template>

<script setup>

import { onMounted } from 'vue';

const props = defineProps({
  height: String,
  width: String,
  theme: String,
})

onMounted(() => {
  if (props.theme) {
    document.documentElement.dataset.theme = props.theme;
  }
})

</script>

<style
  scoped
  lang="scss"
>
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
