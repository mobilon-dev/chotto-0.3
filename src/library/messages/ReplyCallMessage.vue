<template>
  <div>
    <span
      class="call-message__icon pi pi-phone"
      :class="{'call-message__icon-missed': message.isMissedCall}"
    />
  </div>

  <div class="call-message__text-container">
    <p v-if="message.header">
      {{ message.header }}
    </p>
    <div class="call-message__reply-description">
      <span
        v-if="!message.isMissedCall"
        class="call-message__title"
      >
        Аудиозвонок
      </span>
      <span
        v-else
        class="call-message__title"
      >
        Пропущенный аудиозвонок
      </span>
    </div>
    <p
      v-if="message.callDuration"
    >
      {{ message.callDuration }}
    </p>
  </div>
</template>

<script
  setup
  lang="ts"
>

import { ICallMessage } from '../../types';

// Define props
const props = defineProps({
  message: {
    type: Object as () => ICallMessage,
    required: true,
  },
});

console.log(props.message)

</script>

<style
  scoped
  lang="scss"
>
.call-message {

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
    background-color: var(--chotto-message-type-icon-bg-color);
    color: var(--chotto-message-type-icon-color);
    font-size: var(--chotto-button-icon-size);
  }

  &__text-container {
    align-content: center;
    word-break: break-word;
    p {
      margin: 0;
      font-size: var(--chotto-additional-text-font-size);
      color: var(--chotto-secondary-text-color);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 5;
      line-clamp: 5;
      -webkit-box-orient: vertical;
    }
  }

  &__reply-description {
    display: flex;
    align-items: center;
    column-gap: 6px;
    margin-bottom: 4px;

    span {
      color: var(--chotto-secondary-text-color);
    }
  }
}

</style>
