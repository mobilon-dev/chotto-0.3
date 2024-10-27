<template>
  <div class="chat-panel">
    <div class="chat-panel__container">
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

      
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
  }
})

const emit = defineEmits(['close-panel']);
</script>

<style
  scoped
  lang="scss"
>
.chat-panel {
  &__container {
    height: 100%;
    background-color: var(--chat-panel-bg);
    border-radius: 12px;
    padding: 30px 20px 20px 20px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
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

  &__a,
  &__b,
  &__c {
    background-color: var(--chat-pannel-widget-bg);
    border-radius: 10px;
    padding: 10px;
  }

}
</style>
