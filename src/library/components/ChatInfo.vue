<template>
  <div
    v-if="chat"
    class="chat-info__container"
  >
    <div class="chat-info__base-line">
      <span 
        v-if="showReturnButton"
        class="pi pi-arrow-left chat-info__return-button"
        @click="emit('returnToChats')"
      />
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
          v-if="chatDescription"
          class="chat-info__time"
        >
          {{ chatDescription }}
        </p>
      </div>
      <div class="chat-info__actions">
        <slot name="actions" />
      </div>
    </div>
    
    
    <div 
      :id="'chat-info-search-panel-' + chatAppId"
      class="chat-info__search-panel"  
    >
      <slot name="search" />
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue';
// Define props
const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
  showReturnButton: {
    type: Boolean,
    required: false,
    default: false,
  },
  description: {
    type: String,
    required: false,
  },
  defaultLastActivityTime: {
    type: Boolean,
    required: false,
    default: false,
  }
});

const emit = defineEmits(['returnToChats']);

const chatAppId = inject('chatAppId')

const chatDescription = computed(() => {
  if (props.description) return props.description
  if (!props.description && props.defaultLastActivityTime) return props.chat['lastActivity.time']
  return undefined
})

</script>

<style
  scoped
  lang="scss"
>
.chat-info {
  &__container {
    border-radius: var(--chat-info-border-radius);
    padding: var(--chat-info-padding);
    border-bottom: var(--chat-info-border);
  }

  &__base-line{
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--avatar-background-color);
    width: var(--avatar-width-medium);
    height: var(--avatar-height-medium);
    border-radius: var(--avatar-border-radius);
    background-size: cover;

    span {
      font-size: var(--avatar-icon-size-medium);
      color: var(--avatar-color);
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
    font-weight: var(--chat-info-font-weight-title);
    font-size: var(--chat-info-font-size-title);
    margin: 0;
  }

  &__time {
    font-size: var(--chat-info-time-font-size);
    font-weight: var(--chat-info-font-weight-time);
    color: var(--chat-info-time-color);
    grid-column: 2;
    margin: 0;
  }

  &__actions {
    margin-left: auto;
    background-color: transparent;
    border: none;
    grid-column: 3;
    grid-row: 1 / 3;
    cursor: pointer;

    span {
      font-size: var(--chat-info-actions-font-size);
      color: var(--chat-info-actions-color);
    }
  }

  &__return-button{
    border: 0px;
    background-color: transparent;
    cursor: pointer;
  }
}

</style>
