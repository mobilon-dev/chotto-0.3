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
    default: () => ''
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

  &__container {
    height: 100%;
    background-color: var(--chat-panel-bg);
    border-radius: 12px;
    padding: 30px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
    overflow: auto;

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
  }

  &__title-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-size: 22px;
    font-weight: 500;
  }

  &__button-close {
    background-color: transparent;
    border: none;
    cursor: pointer;

    span {
      font-size: var(--icon-font-size-medium);
      color: var(--neutral-600);
    }
  }
}
</style>
