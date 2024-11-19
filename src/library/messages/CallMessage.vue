<template>
  <div class="call-message">
    <div
      :class="getClass(message)"
      :messageId="message.messageId"
    >
      <img
        v-if="message.avatar"
        class="call-message__avatar"
        :src="message.avatar"
        height="32"
        width="32"
        :style="{ gridRow: message.subText ? '2' : '1' }"
      >


      <p
        v-if="message.subText"
        class="call-message__subtext"
      >
        {{ message.subText }}
      </p>

      <div class="call-message__content">
        <span
          class="call-message__icon pi pi-phone"
          :style="{ color: message.isMissedCall ? 'var(--p-red-500)' : 'var(--neutral-100)' }"
        />

        <span
          v-if="!message.isMissedCall"
          class="call-message__title"
        >Аудиозвонок</span>
        <span
          v-else
          class="call-message__title"
        >Пропущенный аудиозвонок</span>

        <span
          v-if="message.callDuration"
          class="call-message__duration"
        >{{ message.callDuration }}</span>
        <span
          v-else-if="!message.callDuration && message.isMissedCall"
          class="call-message__duration"
        >Нажмите, чтобы
          перезвонить</span>
        <span
          v-else
          class="call-message__duration"
        >Нет ответа</span>

        <div class="call-message__info-container">
          <span class="call-message__time">{{ message.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Define props
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});


function getClass(message) {
  return message.position === 'left' ? 'call-message__left' : 'call-message__right';
}

</script>

<style
  scoped
  lang="scss"
>
.call-message {

  &__content {
    position: relative;
    word-wrap: break-word;
    width: fit-content;
    display: grid;
    grid-template-columns: min-content 1fr;
    border-radius: 14px;
    column-gap: 12px;
    max-width: 51%;
    min-width: 30%;
    padding: 10px 16px 4px 16px;

  }

  &__info-container {
    grid-column: 1 / 3;
    margin-left: auto;
    display: flex;
    align-items: center;
    column-gap: 6px;
  }

  &__title {
    font-size: var(--call-message-font-size-title);
    font-weight: 500;
    margin-bottom: 2px;
  }

  &__icon {
    grid-column: 1;
    grid-row: 1 / 3;
    align-self: center;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    height: 38px;
    width: 38px;
    background-color: var(--neutral-400);
    color: var(--p-red-500);
    font-size: var(--avatar-icon-size-small);
  }

  &__duration {
    color: var(--call-message-color-duration);
    font-size: 14px;
  }

  &__time {
    font-size: var(--base-message-font-size-time);
    color: var(--base-message-color-time);
  }

  &__status {
    display: flex;

    span {
      font-weight: 400;
      color: var(--base-message-status-color-received);
      font-size: var(--base-message-status-font-size);
    }
  }

  &__status--received {
    span {
      color: var(--base-message-status-color-received);

      &:first-child {
        margin-right: -8px;
      }
    }
  }

  &__status--read {
    span {
      color: var(--base-message-status-color-read);

      &:first-child {
        margin-right: -8px;
      }
    }
  }

  &__subtext {
    font-weight: 500;
    font-size: 12px;
    color: var(--base-message-subtext-color);
  }

  &__avatar {
    align-self: center;
    object-fit: cover;
    min-width: var(--avatar-width-small);
    min-height: var(--avatar-height-small);
    border-radius: var(--avatar-border-radius);
  }

  &__menu-button {
    position: absolute;
    background-color: transparent;
    border: none;
    transform: translateY(-50%);
    cursor: pointer;
    transition: 0.2s;

    span {
      color: var(--neutral-500);
      font-size: 20px;
    }

    &:hover span {
      color: var(--neutral-700);
      transition: 0.2s;
    }
  }

  &__context-menu {
    position: absolute;
  }

  &__left,
  &__right {
    display: grid;
    margin: var(--base-message-margin);
  }

  &__left {
    grid-template-columns: min-content 1fr;

    .call-message__avatar {
      grid-column: 1;
      grid-row: 2;
      margin-right: 12px;
    }

    .call-message__subtext {
      grid-column: 2;
      grid-row: 1;
      margin: 0 0 2px 10px;
    }

    .call-message__content {
      grid-column: 2;
      background-color: var(--base-message-left-bg);
      color: var(--text-message-text-color);
    }
  }

  &__right {
    grid-template-columns: 1fr min-content;

    .call-message__avatar {
      grid-column: 2;
      grid-row: 2;
      margin-left: 12px;
    }

    .call-message__subtext {
      grid-column: 1;
      grid-row: 1;
      margin: 0 10px 2px auto;
    }

    .call-message__content {
      grid-column: 1;
      margin-left: auto;
      background-color: var(--base-message-right-bg);
      color: var(--text-message-text-color);
    }
  }
}
</style>
