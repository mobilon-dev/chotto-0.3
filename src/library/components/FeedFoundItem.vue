<template>
  <div 
    class="feed-found-item__container"
    :class="{'feed-found-item__selected-container' : selected}"
  >
    <div class="feed-found-item__avatar-container">
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
    <div class="feed-found-item__info">
      <div class="feed-found-item__first-line">
        <p class="feed-found-item__name">
          {{ object.subtext }}
        </p>
        <p class="feed-found-item__time">
          {{ object.time }}
        </p>
      </div>
      <div class="feed-found-item__second-line">
        <img
          v-if="object.type == 'message.image'"
          :src="object.url"
          style="margin-right: 3px;"
          width="24"
          height="24"
        >
        <span
          v-if="typePreview"
          :class="typePreview"
          style="
            margin-right: 3px;
            font-size: 20px;
          "
        />
        <p> {{ object.text }} </p>
      </div>
    </div>   
  </div>   
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IFeedObject } from '../../types';
const props = defineProps({
  object: {
    type: Object as () => IFeedObject,
    required: true,
  },
  selected: {
    type: Boolean,
    default: false,
  }
});

const typePreview = computed(() => {
  const r = {
    'message.file': 'pi pi-file',
    'message.audio': 'pi pi-volume-up',
    'message.video': 'pi pi-video',
    'message.call': 'pi pi-phone',
  };
  if (r[props.object.type])
    return r[props.object.type]
  else 
    return null
})

</script>

<style
  scoped
  lang="scss"
>
.feed-found-item{

  &__container{
    padding: var(--feed-found-item-padding-container);
    display: flex;
    position: relative;
    cursor: pointer;
    width: 100%;
    word-wrap: anywhere;
    background-color: var(--feed-found-item-color);
    border-radius: var(--feed-found-item-border-radius);
  }
  
  &__container:hover{
    background-color: var(--feed-found-item-hovered-color);
  }

  &__selected-container{
    background-color: var(--feed-found-item-selected-color);
  }

  &__info{
    width: 80%;
  }  

  &__first-line{
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
  }  

  &__name{
    font-weight: var(--feed-found-item-name-font-weight);
    margin: 0;
      padding: 0;
  }

  &__time{
    color: var(--feed-found-item-time-color);
    font-weight: var(--feed-found-item-time-font-weight);
    font-size: var(--feed-found-item-time-font-size);
    margin: 0;
    padding: 0;
  }

  &__second-line{
    display: flex;
    word-break: break-word;
    p {
      margin: 0;
      padding: 0;
      font-size: var(--feed-found-item-message-font-size);
      color: var(--feed-found-item-message-color);
      font-weight: var(--feed-found-item-message-font-weight);
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  &__avatar-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--avatar-background-color);
    width: var(--avatar-width-medium);
    height: var(--avatar-height-medium);
    border-radius: var(--avatar-border-radius);
    background-size: cover;
    margin-right: 10px;
    span {
      font-size: var(--avatar-icon-size-medium);
      color: var(--avatar-color);
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
