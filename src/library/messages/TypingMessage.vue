<template>
  <div class="typing-message">
    <div class="typing-message__container">
      <img
        v-if="message.avatar"
        class="typing-message__avatar"
        :src="message.avatar"
        height="32"
        width="32"
        :style="{ gridRow: message.subText ? '2' : '1' }"
      >
      <p
        v-if="message.subText"
        class="typing-message__subtext"
      >
        {{ message.subText }}
      </p>

      <div class="typing-message__loader-container">
        <div class="typing-message__loader" />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});
</script>

<style
  scoped
  lang="scss"
>
.typing-message {
  &__container {
    display: grid;
    grid-template-columns: min-content 1fr;
    position: relative;
    margin: var(--base-message-margin);
  }

  &__subtext {
    grid-column: 2;
    grid-row: 1;
    margin: 0 0 2px 10px;
    font-size: 12px;
    font-weight: 500;
    color: var(--base-message-subtext-color);
  }

  &__avatar {
    align-self: center;
    object-fit: cover;
    min-width: var(--avatar-width-small);
    min-height: var(--avatar-height-small);
    border-radius: var(--avatar-border-radius);
    grid-column: 1;
    grid-row: 2;
    margin-right: 12px;
  }

  &__loader-container {
    min-height: 40px;
    grid-column: 2;
    border-radius: 10px;
    padding: 6px 6px 6px 6px;
    max-width: 10%;
    background-color: var(--base-message-left-bg);
  }

  &__loader {
    width: 8px;
    height: 8px;
    position: absolute;
    top: 50%;
    border-radius: 50%;
    position: relative;
    animation: typing-message__loader 0.8s 0.25s ease alternate infinite;
    margin: -20px auto 0;

    &::after,
    &::before {
      content: '';
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      animation: typing-message__loader 0.8s ease alternate infinite;
    }

    &::before {
      left: -20px;
      animation-delay: 0.1s;
    }

    &::after {
      right: -20px;
      animation-delay: 0.4s;
    }
  }

  @keyframes typing-message__loader {
    0% {
      box-shadow: 0 15px 0 -15px var(--neutral-500);
    }

    100% {
      box-shadow: 0 15px 0 var(--neutral-500);
    }
  }
}
</style>
