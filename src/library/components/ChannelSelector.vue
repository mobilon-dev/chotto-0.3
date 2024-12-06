<template>
  <div
    ref="customDiv"
    class="channels"
  >
    <div class="channels__container">
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
      >Канал не выбран</span>
      <ButtonContextMenu
        :actions="channels"
        :mode="mode"
        :button-class="'pi pi-list'"
        :menu-side="'top'"
        @click="selectChannel"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ButtonContextMenu from './ButtonContextMenu.vue';

const customDiv = ref(null)

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
  }
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

  &__popover {
    position: absolute;
    width: fit-content;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.11);
    top: -54px;
    right: 78px;
    padding: 18px;
    border-radius: 10px;
    background-color: var(--channels-selector-popover-background-color);
  }

  &__popover-list {
    display: flex;
    flex-direction: column;
    row-gap: 6px;
  }

  &__popover-item {
    cursor: pointer;
  }
}

.v-enter-active {
  transition: all 0.2s ease-out;
}

.v-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
