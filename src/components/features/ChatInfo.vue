<template>  
  <div
    v-if="chat"
    class="chat-info__container"
  >
    <div class="chat-info__avatar-container">
      <img
        v-if="props.chat.avatar"
        :src="props.chat.avatar"
        width="48"
        height="48"
      >
      <span
        v-else
        class="pi pi-user"
      />
    </div>
    <div class="chat-info__info-container">
      <h2 class="chat-info__title">
        {{ chat.name }}
      </h2>
      <p
        v-if="chat['lastActivity.time']"
        class="chat-info__time"
      >
        {{ chat['lastActivity.time'] }}
      </p>
    </div>
    <div
      class="chat-info__actions"
    >
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup>

// Define props
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['open-panel']);
</script>

<style
  scoped
  lang="scss"
>
.chat-info {
  &__container {
    padding: var(--chat-info-padding);
    display: flex;
    gap: 10px;
    border-bottom: 1px solid var(--neutral-200);
  }

  &__avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--neutral-300);
    width: var(--avatar-width-medium);
    height: var(--avatar-height-medium);
    border-radius: var(--avatar-border-radius);
    background-size: cover;


    span {
      font-size: var(--avatar-icon-size-medium);
      color: var(--avatar-icon-color);
    }

    img {
      border-radius: var(--avatar-border-radius);
      object-fit: cover;
    }
  }

  &__info-container { 
    display: flex;
    flex-direction: column;
  }

  &__title {
    grid-column: 2;
    align-self: center;
    font-weight: 500;
    font-size: var(--chat-info-font-size-title);
  }

  &__time {
    font-size: 14px;
    font-weight: var(--chat-info-font-weight-time);
    color: var(--neutral-400);
    grid-column: 2;
  }

  &__actions {
    flex-grow: 1;
  }
}
</style>
