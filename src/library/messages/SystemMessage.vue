<template>
    <div class="system-message__container">
      <p class="system-message__text">
        {{ message.text }}
      </p>
    </div>
</template>

<script setup lang="ts">

import { ISystemMessage } from '../../types';

const props = defineProps({
  message: {
    type: Object as () => ISystemMessage,
    required: true,
  },
});

</script>

<style
  scoped
  lang="scss"
>
.system-message {
  &__container {
    width: 54%;
    border-radius: 10px;
    padding: 10px;
    margin: 0 auto 18px auto;
    background-color: var(--system-message-bg-color);
  }

  &__text {
    font-size: var(--system-message-font-size);
    line-height: 1.5;
    text-align: center;
    color: var(--system-message-color);
  }
}
</style>
