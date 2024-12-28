<template>
  <h3>Результаты поиска</h3>
  <div class="feed-found-objects__items">
    <div v-for="object in objects" class="feed-found-objects__item">
      <span @click="clickObject(object)">
        {{ object.text }}
      </span>
    </div>
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatItem, ChatFilter, ContextMenu } from "./";
import { t } from '../../locale/useLocale';

const emit = defineEmits(['clickedSearch']);

const props = defineProps({
  objects: {
    type: Array,
    required: true,
  }
});

const clickObject = (object) => {
  if (object.messageId)
    emit('clickedSearch', object.messageId)
}

</script>

<style
  scoped
  lang="scss"
>
.feed-found-objects{
  &__item{
    display: flex;
    position: relative;
    padding: 3px;
    margin: 3px;
    cursor: pointer;
  }

  &__items {
    display: block;
    scroll-behavior: smooth;

    overflow-y: auto;
    overflow-x: hidden;
    padding: var(--chat-list-items-padding);

    &::-webkit-scrollbar {
      width: 6px;
      background-color: var(--scrollbar-bg);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--scrollbar-thumb-bg);
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
  }
}
</style>
