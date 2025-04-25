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
        <span class="chat-info__title">
          {{ chat.name }}
        </span>
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
    border-radius: var(--chotto-chat-info-border-radius);
    padding: var(--chotto-chat-info-padding);
    border-bottom: 1px solid  var(--chotto-item-border-color);
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
    background-color: var(--chotto-avatar-background-color);
    width: var(--chotto-avatar-small);
    height: var(--chotto-avatar-small);
    border-radius: var(--chotto-avatar-border-radius);
    background-size: cover;

    span {
      font-size: var(--chotto-avatar-small-icon-size);
      color: var(--chotto-avatar-color);
    }

    img {
      width: var(--chotto-avatar-small);
      height: var(--chotto-avatar-small);
      border-radius: var(--chotto-avatar-border-radius);
      object-fit: cover;
    }
  }

  &__info-container {
    display: flex;
    flex-direction: column;
  }

  &__title {
    grid-column: 2;
    color: var(--chotto-primary-text-color);
    font-size: var(--chotto-title-font-size);
    font-weight: var(--chotto-title-font-weight);
    margin: 0;
  }

  &__time {
    font-size: var(--chotto-text-font-size);
    color: var(--chotto-secondary-text-color);
    grid-column: 2;
    margin: 0;
  }

  &__actions {
    margin-left: auto;
  }

  &__return-button{
    border: 0px;
    background-color: transparent;
    cursor: pointer;
    color: var(--chotto-button-color-active);
  }
}

</style>
