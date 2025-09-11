<template>
  <div class="date-message-sticky__container">
    <p class="date-message-sticky__text">
      {{ text }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

<style scoped lang="scss">
.date-message-sticky {
  &__container {
    position: sticky;
    top: 10px;
    height: 0;
    overflow: visible;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 200;
    pointer-events: none;
  }

  &__text {
    font-size: var(--chotto-additional-text-font-size);
    color: var(--chotto-primary-text-color);
    background-color: var(--chotto-chat-list-fixed-background-color);
    padding: var(--chotto-chat-date-message-padding, 4px 11px);
    border-radius: var(--chotto-chat-date-message-border-radius, 4px);
    box-shadow: 0 2px 6px rgba(0,0,0,0.08);
  }
}
</style>