<template>
  <div class="date-message__container">
    <p class="date-message__text">
      {{ message.text }}
    </p>
  </div>
</template>

<script setup lang="ts">

import { IDateMessage } from '../../types';

const props = defineProps({
  message: {
    type: Object as () => IDateMessage,
    required: true,
    default: () => { }
  }
});
</script>

<style
  scoped
  lang="scss"
>
.date-message {

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    padding: 6px 18px;
    margin-bottom: 18px;
    width: fit-content;
    background-color: var(--chotto-secondary-color, transparent);
    border: 1px solid var(--chotto-item-border-color);
  }

  &__text {
    font-size: var(--chotto-additional-text-font-size);
    color: var(--chotto-secondary-text-color);
  }
}
</style>
