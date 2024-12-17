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
    font-weight: 400;
    color: var(--input-color);
    padding: var(--input-padding);
    border: var(--input-border);
    border-radius: var(--input-border-radius);
    font-size: var(--input-font-size);
    transition: border-color var(--input-transition-duration);

    &::placeholder {
      color: var(--input-placeholder-color);
    }

    &:hover {
      border-color: var(--input-hover-border-color);
    }

    &:focus-visible {
      border-color: var(--input-focus-border-color);
      outline: none;
    }
  }
}
</style>
