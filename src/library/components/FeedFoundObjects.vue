<template>
  <h3 style="padding-left: 12px;">Результаты поиска: {{ objects.length }}</h3>
  <div 
    v-if="!notFound" 
    class="feed-found-objects__items"
    ref="refItems"  
    @scroll="scrollTopCheck"
  >
    <div 
      v-for="object in objects" 
      class="feed-found-objects__item"
      :class="{'feed-found-objects__selected-item' : object == selectedItem }"  
      @click="clickObject(object)"
    >
      <FeedFoundItem  :object="object"/>
    </div>
  </div>
  <div v-else-if="notFound" class="feed-found-objects__placeholder">
    <p>{{ notFound }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, unref } from 'vue';
import { t } from '../../locale/useLocale';
import FeedFoundItem from './FeedFoundItem.vue';
import { IFeedObject } from '../../types';

const emit = defineEmits(['clickedSearch','loadMore']);

const props = defineProps({
  objects: {
    type: Array<IFeedObject>,
    required: true,
  },
  notFound: {
    type: String,
    required: false,
  }
});

const refItems = ref()
const selectedItem = ref(null)

const clickObject = (object) => {
  if (object.messageId){
    emit('clickedSearch', object.messageId)
    selectedItem.value = object
  }
}

const scrollTopCheck = () => {
  const element = unref(refItems);
  console.log(props.objects)
  const scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;

  if (scrollBottom <= 0){
    emit('loadMore')
  }
};

</script>

<style
  scoped
  lang="scss"
>
.feed-found-objects{

  &__items {
    display: flex;
    flex-direction: column;
    scroll-behavior: smooth;
    overflow-y: auto;
    overflow-x: hidden;

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

  &__placeholder{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    p{
      text-align: center;
    }
  }
   
  &__item{
    padding: var(--feed-found-item-padding-container);
    display: flex;
    position: relative;
    cursor: pointer;
    width: 100%;
    word-wrap: anywhere;
    background-color: var(--feed-found-item-color);
    border-radius: var(--feed-found-item-border-radius);
  }

  &__item:hover{
    background-color: var(--feed-found-item-hovered-color);
  }

  &__selected-item{
    background-color: var(--feed-found-item-selected-color);
  }

}
</style>
