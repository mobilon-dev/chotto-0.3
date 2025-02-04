<template>
  <div 
    v-if="!getMessage().isRecording"
    class="channels__container"
    :class="{'channels__container-disabled' : state == 'disabled'}"
  >
    <div
      v-if="selectedChannel"
      class="channels__selected"
    >
      <img 
        v-if="selectedChannel.icon"
        :src="selectedChannel.icon"
        class="channels__icon"
      >
      <span class="channels__title">{{ selectedChannel.title }}</span>
    </div>
    <span
      v-else
      class="channels__selected channels__title"
    >
      {{ t('component.ChannelSelector.Placeholder') }}
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
import { ref, inject } from 'vue'
import ButtonContextMenu from './ButtonContextMenu.vue';
import { t } from '../../locale/useLocale';
import { useMessage } from '../../helpers/useMessage';

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

const chatAppId = inject('chatAppId')
const { getMessage } = useMessage(chatAppId)

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
  }

  &__container-disabled{
    color: var(--chat-input-icon-color-disabled);
  }

  &__title {
    font-weight: var(--channel-selector-title-font-weight);
    font-size: var(--channel-selector-title-font-size);
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
    width: var(--channel-selector-img-resolution);
    height: var(--channel-selector-img-resolution);
  }
}
</style>
