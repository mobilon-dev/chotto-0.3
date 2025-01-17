<template>
  <div class="chat-panel">
    <div class="chat-panel__title-container">
      <p
        v-if="title"
        class="chat-panel__title"
      >
        {{ title }}
      </p>

      <button
        class="chat-panel__button-close"
        @click="$emit('close-panel')"
      >
        <span class="pi pi-times" />
      </button>
    </div>

    <div>
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
    default: '',
  }
})

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
    background-color: var(--scrollbar-bg);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--scrollbar-thumb-bg);
  }

  &::-webkit-scrollbar-track {
    border-radius: 10px;
  }

  &__title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: var(--chat-panel-title-font-size);
    font-weight: var(--chat-panel-title-font-weight);
  }

  &__button-close {
    background-color: transparent;
    border: none;
    cursor: pointer;

    span {
      font-size: var(--chat-panel-button-close-font-size);
      color: var(--chat-panel-button-close-color);
    }
  }
}
</style>
