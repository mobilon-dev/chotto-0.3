<template>
  <!-- <div class="channels" ref="customDiv">
    <div @click="toggle">
      <span v-if="channels.length > 0">
        <div class="popover">
          <span v-if="!selectedChannel">select channel</span>
          <span v-if="selectedChannel">
            <span v-if="selectedChannel.icon">
              <img :src="selectedChannel.icon" height="16" width="16">&nbsp;
            </span>
            <span>{{ selectedChannel.title }}</span>
          </span>
        </div>
      </span>
      <span v-if="!(channels.length > 0)">no channels</span>
    </div>
    <div v-if="showPopup" @click.stop>
      <div class="popover-content">
        <ul>
          <li v-for="channel in channels" :key="channel.channelId" @click="selectChannel(channel)">{{ channel.title }}
          </li>
        </ul>
      </div>
    </div>
  </div> -->

  <div class="channels" ref="customDiv">
    <div class="channels__container">
      <button class="channels__button" @click="toggle">
        <span class="pi pi-list"></span>
      </button>

      <div class="channels__title-container">
        <div class="channels__selected" v-if="selectedChannel">
          <span class="channels__icon" v-if="selectedChannel.icon">
            <img :src="selectedChannel.icon">
          </span>
          <span class="channels__title">{{ selectedChannel.title }}</span>
        </div>
        <span class="channels__title" v-else>Чат не выбран</span>
      </div>

      <Transition>
        <div class="channels__popover" v-if="showPopup" @click.stop>
          <div class="channels__popover-container">
            <ul class="channels__popover-list">
              <li class="channels__popover-item" v-for="channel in channels" :key="channel.channelId"
                @click="selectChannel(channel)">
                {{ channel.title }}
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const showPopup = ref(true)
const customDiv = ref(null)

const props = defineProps({
  channels: {
    type: Array,
    required: false,
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
  toggle();
  emit('selectChannel', selectedChannel.value);
}

const toggle = () => {
  showPopup.value = !showPopup.value
}

const handleClickOutside = (event) => {
  if (customDiv.value && !customDiv.value.contains(event.target)) {
    showPopup.value = false
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
})
</script>

<style scoped lang="scss">
.channels {

  &__button {
    background-color: transparent;
    border: none;

    span {
      display: block;
      cursor: pointer;
      padding: var(--chat-input-button-padding);
      font-size: var(--icon-font-size-medium);
      color: var(--icon-color);
    }
  }

  &__title-container {
    position: absolute;
    top: 4px;
    right: 10px;
  }

  &__title {
    font-weight: 500;
    font-size: var(--channels-title-font-size);
  }

  &__selected {
    display: flex;
    justify-content: flex-start;
    align-items: var(--channels-selected-align-items);
    column-gap: var(--channels-selected-gap);
  }

  &__icon {
    display: block;
    height: fit-content;
    width: var(--channels-selected-icon-width);
    height: var(--channels-selected-icon-height);

    img {
      width: var(--channels-selected-icon-width);
      height: var(--channels-selected-icon-height);
    }
  }

  &__popover {
    position: absolute;
    width: fit-content;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.11);
    top: var(--channels-popover-position-top);
    right: var(--channels-popover-position-right);
    background-color: var(--channels-popover-background-color);
    padding: var(--channels-popover-padding);
    border-radius: var(--channels-popover-border-radius);
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

.dark {
  .channels {
    &__button {
      span {
        color: var(--d-icon-color);
      }
    }

    &__popover {
      background-color: var(--d-channels-popover-background-color);
    }
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

/* .popover {
  margin: 0;
  font-size: 14px;
  text-transform: uppercase;
  background: #fff;
  color: #3794ff;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.popover:hover {
  background: #2b2b2b;
  color: #fff;
}

.popover-content {
  position: absolute;
  background: #fff;
  border-radius: 6px;
  margin-top: 4px;
  padding: 16px;
  color: #333;
  min-width: 200px;
  text-align: left;
}*/
</style>
