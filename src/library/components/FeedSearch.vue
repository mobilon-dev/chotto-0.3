<template>
  <transition>
    <div class="feed-search__container">
      <span style="line-height: 40px;">Поиск</span>
      <input
        ref="refInput"
        class="feed-search__input"
        type="text"
        placeholder="Поиск сообщения"
        @input="update"
      >
      <i class="pi pi-times" @click="clearInput"/>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, unref, onMounted, onUnmounted, watch } from 'vue';
import { t } from '../../locale/useLocale';
import useDebouncedRef from '../../helpers/useDebouncedRef';

const props = defineProps({
  inputLocation: {
    type: String,
    default: 'feed'
  }
})

const emit = defineEmits(['search', 'cancel'])

const refInput = ref<HTMLInputElement>();
const search = useDebouncedRef(false, 500)

const update = () => {
  const el = unref(refInput);
  search.value = el?.value
}

watch(
  () => search.value,
  () => {
    const el = unref(refInput);
    emit('search', el?.value);
  }
)

const clearInput = () => {
  const el = unref(refInput);
  if (el)
    el.value = ''
  update()
  emit('cancel')
}

onMounted(() => {
  const el = unref(refInput);
  el?.focus()
  emit('search', el?.value);
})

onUnmounted(() => {
  emit('search', null)
})
</script>

<style
  scoped
  lang="scss"
>
.feed-search {
  &__container{
    display: flex;
    position: relative;
    margin-top: 15px;
    padding-left: 12px;
    padding-right: 12px;
    
    i{
      position: absolute;
      right: 20px;
      top: 11px
    }

    i:hover{
      cursor: pointer;
    }
  }

  &__input {
    width: 100%;
    background-color: var(--input-background);
    font-weight: 400;
    color: var(--input-color);
    padding: var(--input-padding);
    border: var(--input-border);
    border-radius: var(--input-border-radius);
    font-size: var(--input-font-size);
    transition: border-color var(--input-transition-duration);
    margin-left: 10px;
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

.v-enter-active {
  transition: all 2s ease-out;
}

.v-leave-active {
  transition: all 2s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>
