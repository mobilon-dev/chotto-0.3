<template>
  <div class="chat-info">
    <div class="chat-info__container" v-if="chat">
      <div class="chat-info__avatar-container">
        <img v-if="props.chat.avatar" :src="props.chat.avatar" width="32" height="32">
        <span v-else>
          <i class="pi pi-user"></i>
        </span>
      </div>

      <h2 class="chat-info__title">{{ chat.name }}</h2>
      <p class="chat-info__time">{{ chat['lastActivity.time'] }}</p>
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
</script>

<style scoped lang="scss">
.chat-info {
  &__container {
    padding: 20px 15px 20px 40px;
    display: grid;
    grid-template-columns: min-content auto;
    column-gap: 20px;
    border-bottom: 1px solid var(--neutral-300);
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
    grid-row: 1 / 3;

    span {
      font-size: var(--avatar-icon-size-medium);
      color: var(--avatar-icon-color);
    }
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    grid-column: 2;
  }

  &__time {
    font-size: 14px;
    font-weight: 500;
    color: var(--neutral-400);
    grid-column: 2;
  }
}

.dark {
  .chat-info {
    &__container {
      border-bottom: 1px solid var(--neutral-500);
    }

    &__avatar-container {
      background-color: var(--d-avatar-background-color);

      span {
        color: var(--d-avatar-icon-color);
      }
    }
  }
}
</style>
