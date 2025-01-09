<template>
  <h3 style="padding-left: 12px;">Результаты поиска: {{ objects.length }}</h3>
  <div 
    v-if="!notFound" 
    class="feed-found-objects__items"
    ref="refItems"  
    @scroll="scrollTopCheck"
  >
    <div v-for="object in objects" class="feed-found-objects__item" @click="clickObject(object)">
      <div class="feed-found-objects__avatar-container">
        <img
          v-if="object.avatar"
          :src="object.avatar"
          width="48"
          height="48"
        >
        <span
          v-else
          class="pi pi-user"
        />
      </div>
      <div class="feed-found-objects__item-info">
        <div class="feed-found-objects__item-first-line">
          <p> {{ object.name }}</p>
          <p> {{ object.time }} </p>
        </div>
        <div class="feed-found-objects__item-second-line">
          <p>
            {{ object.text }}
          </p>
        </div>
      </div>      
    </div>
  </div>
  <div v-else-if="notFound" class="feed-found-objects__placeholder">
    <p>{{ notFound }}</p>
  </div>
</template>

<script setup>
import { ref, unref } from 'vue';
import { t } from '../../locale/useLocale';

const emit = defineEmits(['clickedSearch','loadMore']);

const props = defineProps({
  objects: {
    type: Array,
    required: true,
  },
  notFound: {
    type: String,
    required: false,
  }
});

const refItems = ref()

const clickObject = (object) => {
  if (object.messageId)
    emit('clickedSearch', object.messageId)
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
    gap: 10px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-left: 12px;

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
    display: flex;
    position: relative;
    cursor: pointer;
    width: 100%;
    word-wrap: anywhere;
    span{
      width: inherit;
      line-height: 35px;
    }
    
  }

  &__item:hover{
      background-color: lightblue;
    }

  &__item-info{
    width: 80%;
  }  

  &__item-first-line{
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;
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
    margin-right: 10px;
    span {
      font-size: var(--avatar-icon-size-medium);
      color: var(--neutral-500);
      line-height: 24px;
      width: 24px;
    }

    img {
      border-radius: var(--avatar-border-radius);
      object-fit: cover;
    }
  }

}
</style>
