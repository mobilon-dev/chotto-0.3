<template>
  <input
    ref="refInput"
    class="chat-filter__input"
    type="text"
    :placeholder="t('component.ChatFilter.InputPlaceholder')"
    @input="update"
  >
</template>

<script setup>
import { ref, unref } from 'vue';
import { t } from '../../locale/useLocale';
const refInput = ref('');

// Define emits
const emit = defineEmits(['update']);

// Define method
const update = () => {
  const el = unref(refInput);
  emit('update', el.value);
}

</script>

<style
  scoped
  lang="scss"
>
.chat-filter {
  &__input {
    background-color: transparent;
    font-weight: var(--chotto-input-font-weight);
    color: var(--chotto-input-text-color);
    padding: var(--chotto-input-padding);
    border: var(--chotto-input-border);
    border-radius: var(--chotto-input-border-radius);
    font-size: var(--chotto-input-font-size);
    transition: border-color var(--chotto-input-transition-duration);
    background-color: var(--chotto-input-background);

    &::placeholder {
      color: var(--chotto-input-placeholder-color);
    }

    &:hover {
      border-color: var(--chotto-input-hover-border-color);
    }

    &:focus-visible {
      border-color: var(--chotto-input-focus-border-color);
      outline: none;
    }
  }
}
</style>
