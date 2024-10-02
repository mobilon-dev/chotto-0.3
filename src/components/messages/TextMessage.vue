<template>
  <div class="text-message">
    <div :class="getClass(message)" :messageId="message.messageId">
      <p>{{ message.text }}</p>
      <!-- <span class="text-message__time">{{ message.time }}</span> -->
      <span class="text-message__time">22:02</span>
    </div>
  </div>
</template>

<script setup>

// Define props
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

function getClass(message) {
  return message.direction === 'incoming' ? 'text-message__left' : 'text-message__right';
}
</script>

<style scoped lang="scss">
.text-message {

  &__time {
    font-size: 12px;
    position: absolute;
    bottom: 4px;
    right: 8px;
  }

  &__left,
  &__right {
    position: relative;
    width: fit-content;
    word-wrap: break-word;
    padding: var(--text-message-padding);
    margin: var(--text-message-margin);
    max-width: var(--text-message-max-width);
    border-radius: var(--text-message-border-radius);
  }

  &__left {
    background-color: var(--text-message-left-background-color);
    color: var(--text-message-text-color);
  }

  &__right {
    margin-left: auto;
    background-color: var(--text-message-right-background-color);
    color: var(--text-message-text-color);
  }
}

.dark {
  .text-message {
    &__left {
      background-color: var(--d-text-message-left-background-color);
      color: var(--d-text-message-text-color);
    }

    &__right {
      background-color: var(--d-text-message-right-background-color);
      color: var(--d-text-message-text-color);
    }
  }
}
</style>
