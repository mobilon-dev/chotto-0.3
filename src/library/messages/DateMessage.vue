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
    background-color: var(--date-message-bg, transparent);
    border: var(--date-message-border);
  }

  &__text {
    font-size: 12px;
    font-weight: 500;
    color: var(--date-message-color);
  }
}
</style>
