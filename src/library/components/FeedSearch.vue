<template>
  <button @click="openSearchPanel = !openSearchPanel">
    <span class="pi pi-search" />
  </button>
  <teleport
    v-if="openSearchPanel"
    :to="'#chat-info-search-panel-'+chatAppId"
  >
    <transition>
      <div class="feed-search__container">
        <span>Поиск</span>
        <input
          ref="refInput"
          class="feed-search__input"
          type="text"
          placeholder="Введите для поиска сообщения"
          @input="update"
        >
      </div>
    </transition>
  </teleport> 
</template>

<script setup>
import { ref, unref, inject, watch } from 'vue';
import { t } from '../../locale/useLocale';

const props = defineProps({

})

const emit = defineEmits(['search'])

const chatAppId = inject('chatAppId')
const openSearchPanel = ref(false)
const refInput = ref('');

const update = () => {
  const el = unref(refInput);
  emit('search', el.value);
}

watch(() => openSearchPanel.value,
  () => {
    if (!openSearchPanel.value) emit('search','')
  })
</script>

<style
  scoped
  lang="scss"
>
.feed-search {
  &__container{
    
  }

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
