<template>
  <div class="chat-panel">
    <div class="chat-panel__header">
      <button
        class="chat-panel__button-close"
        @click="$emit('close-panel')"
      >
        <span class="chat-panel__button-close-cross">
          <CloseButtonIcon />
        </span>
      </button>
    
      <div
        v-if="titleEnabled" 
        class="chat-panel__title-container"
      >
        <span
          v-if="title"
          class="chat-panel__title"
        >
          {{ title }}
        </span>
      </div>
    </div>

    <div>
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
import CloseButtonIcon from '../icons/CloseButtonIcon.vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  title: {
    type: String,
    default: '',
  }, 
  titleEnabled: {
    type: Boolean,
    default: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const emit = defineEmits(['close-panel']);
</script>

<style
  scoped
  lang="scss"
>
.chat-panel {
  display: flex;
  align-items: stretch;
  flex-direction: column;
  height: 100%;

  &::-webkit-scrollbar {
    width: 6px;
    background-color: var(--chotto-scrollbar-bg);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--chotto-scrollbar-thumb-bg);
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &__header {
    display: flex;
    gap: 6px;
  }

  &__title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: var(--chotto-header-font-size);
    font-weight: var(--chotto-header-font-weight);
    font-family: var(--chotto-header-font);
    color: var(--chotto-secondary-text-color);
    letter-spacing: 0.5px;
  }

  &__button-close {
    background-color: transparent;
    border: none;
    cursor: pointer;

    span {
      font-size: var(--chotto-button-icon-size);
      color: var(--chotto-button-color-active);
    }
  }
}
</style>
