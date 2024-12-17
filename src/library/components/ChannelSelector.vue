<template>
  <div 
    class="channels__container"
    :class="{'channels__container-disabled' : state == 'disabled'}"
  >
    <div
      v-if="selectedChannel"
      class="channels__selected"
    >
      <span
        v-if="selectedChannel.icon"
        class="channels__icon"
      >
        <img :src="selectedChannel.icon">
      </span>
      <span class="channels__title">{{ selectedChannel.title }}</span>
    </div>
    <span
      v-else
      class="channels__selected channels__title"
    >
      Канал не выбран
    </span>
    <ButtonContextMenu
      :actions="channels"
      :mode="mode"
      :button-class="'pi pi-list'"
      :menu-side="'top'"
      :disabled="state == 'disabled'"
      @click="selectChannel"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ButtonContextMenu from './ButtonContextMenu.vue';

const props = defineProps({
  channels: {
    type: Array,
    required: false,
    default: () => [],
  },
  mode: {
    type: String,
    required: false,
    default: 'hover'
  },
  state:{
    type: String,
    default: 'active',
  },
})

const emit = defineEmits(['selectChannel']);

const getDefaultChannel = () => {
  return props.channels.find(channel => channel.type === 'default');
}
const selectedChannel = ref(getDefaultChannel())

const selectChannel = (channel) => {
  // console.log('channel selected', channel);
  selectedChannel.value = channel;
  emit('selectChannel', selectedChannel.value);
}

</script>

<style
  scoped
  lang="scss"
>
.channels {
  &__container {
    display: flex;
    margin-top: 9px;
  }

  &__container-disabled{
    color: var(--chat-input-icon-color-disabled);
  }

  &__button {
    background-color: transparent;
    border: none;

    span {
      display: block;
      cursor: pointer;
      padding: 14px;
      font-size: var(--icon-font-size-medium);
      color: var(--channels-selector-icon-color);
    }
  }

  &__title {
    font-weight: 500;
    font-size: 14px;
  }

  &__selected {
    display: flex;
    justify-content: flex-start;
    column-gap: 6px;
    align-items: center;
    margin-left: 10px;
  }

  &__icon {
    display: block;
    height: fit-content;
    width: 16px;
    height: 16px;

    img {
      width: 16px;
      height: 16px;
    }
  }
}
</style>
