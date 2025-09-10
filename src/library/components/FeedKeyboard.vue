<template>
  <div
    class="feed-keyboard__container"
    :class="[
      `feed-keyboard__container--${align}`
    ]"
  >
    <div
      v-for="button in sortedButtons"
      :key="button.key"
      class="feed-keyboard__button"
      :style="{
        'box-shadow': button['shadow-color'] && button['shadow-color'] !== 'none'
          ? `0px 4px 4px ${button['shadow-color']}, 0px 1px 2px ${button['shadow-color']}`
          : 'none',
        'color': button['text-color'] || 'inherit'
      }"
      @click="handleClick(button)"
    >
      <p>{{ button.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { IFeedKeyboard } from '../../types/IFeedKeyboard';

const props = defineProps({
  buttons: {
    type: Array as () => IFeedKeyboard[],
    required: true,
    default: () => []
  },
  align: {
    type: String as () => 'left' | 'center' | 'right',
    default: 'right',
    validator: (value: string) => ['left', 'center', 'right'].includes(value)
  }
});

const emit = defineEmits(['action']);

const sortedButtons = computed(() => {
  return [...props.buttons].sort((a, b) => a.order - b.order);
});

const handleClick = (button: IFeedKeyboard) => {
  if (typeof button.action === 'function') {
    button.action();
  } else if (button.action != null) {
    emit('action', button.action);
  }
};
</script>

<style scoped lang="scss">
.feed-keyboard {
  &__container {
    display: flex;
    margin-top: var(--chotto-feedkeyboard-margin-top, 10px);
    margin-bottom: var(--chotto-feedkeyboard-margin-bottom, 10px);
    flex-wrap: wrap;
    max-width: 100%;
    gap: 10px;
  }

  &__container--left {
    justify-content: flex-start;
    margin-left: 0;
    margin-right: auto;
  }

  &__container--center {
    justify-content: center;
    margin-left: auto;
    margin-right: auto;
  }

  &__container--right {
    justify-content: flex-end;
    margin-left: auto;
    margin-right: 0;
  }

  &__button {
    background: var(--chotto-feedkeyboard-bg-color);
    word-wrap: break-word;
    max-width: 100%;
    cursor: pointer;
    padding: var(--chotto-feedkeyboard-padding, 3px 16px);
    border: var(--chotto-feedkeyboard-border, 1px solid #6C757D);
    border-radius: 15px;
    // box-shadow: 
    //   0px 4px 4px rgba(0, 0, 0, 0.2),
    //   0px 1px 2px rgba(0, 0, 0, 0.2);

    p {
      font-size: var(--chotto-text-font-size);
      margin: 0;
      font-weight: bold;
    }
  }
}
</style>