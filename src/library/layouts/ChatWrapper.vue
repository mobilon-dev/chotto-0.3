<template>
  <div
    :id="'chat-wrapper-' + chatAppId"
    class="chat-wrapper"
  >
    <div
      v-if="isSelectedChat"
      class="chat-wrapper__selected-chat"
    >
      <slot name="default" />
    </div>

    <div
      v-else
      style="width: 100%"
    >
      <p>
        {{ t('layout.ChatWrapper.noSelectedChat') }}
      </p>
    </div>

    <div
      v-if="isOpenChatPanel"
      class="chat-wrapper__chat-panel"
      :style="{ 'flex-basis': isOpenChatPanel ? '40%' : '0%' }"
    >
      <slot name="chatpanel" />
    </div>
  </div>
</template>

<script
  lang="ts"
  setup
>
import { watch, inject } from 'vue';
import { t } from '../../locale/useLocale';

const props = defineProps({
  isOpenChatPanel: {
    type: Boolean,
    default: false,
  },
  isSelectedChat: {
    type: Boolean,
    default: false,
  },
  chatPanelWidth: {
    type: Number,
    required: false,
    default: 50,
  }
})

const chatAppId = inject('chatAppId')

watch(
  () => props.chatPanelWidth,
  () => {
    const container = document.getElementById('chat-wrapper-' + chatAppId)
    if (container){
      container.style.setProperty('--chat-panel-width', props.chatPanelWidth + '%')
      container.style.setProperty('--chat-panel-left', (100 - props.chatPanelWidth) + '%')
    }
  },
  {immediate: true}
)
</script>


<style
  scoped
  lang="scss"
>
.chat-wrapper {

  --chat-panel-width: 50%;
  --chat-panel-left: 50%;

  display: flex;
  height: 100%;
  width: 100%;
  align-items: stretch;

  &__selected-chat {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  &__chat-panel {
    padding: 10px 10px 10px 10px;
    margin: var(--chat-panel-margin);
    background-color: var(--chat-panel-bg);
    border-left: var(--chat-panel-border, none);
    border-radius: var(--chat-panel-border-radius);
    position: absolute;
    height: 100%;
    z-index: 100;
    width: var(--chat-panel-width);
    left: var(--chat-panel-left);
  }
}
</style>
