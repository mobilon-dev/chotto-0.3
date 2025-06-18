<template>
  <div
    :id="'chat-wrapper-' + chatAppId"
    class="chat-wrapper"
    :class="applyStyle()"
  >
    <div
      v-if="isSelectedChat"
      class="chat-wrapper__selected-chat"
    >
      <slot name="default" />
    </div>

    <div
      v-else
      style="display: flex; width: 100%;"
    >
      <div style="margin: auto;">
        <slot name="placeholder" />
      </div>
    </div>

    <div
      v-if="isOpenChatPanel"
      class="chat-wrapper__chat-panel"
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
  },
    applyStyle: {
    type: Function,
    default: () => {return null}
  }
})

const chatAppId = inject('chatAppId')

watch(
  () => props.chatPanelWidth,
  () => {
    const container = document.getElementById('chat-wrapper-' + chatAppId)
    if (container){
      container.style.setProperty('--chotto-chat-panel-width', props.chatPanelWidth + '%')
      container.style.setProperty('--chotto-chat-panel-left', (100 - props.chatPanelWidth) + '%')
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

  --chotto-chat-panel-width: 50%;
  --chotto-chat-panel-left: 50%;

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
    background-color: var(--chotto-primary-color);
    border-left: 1px solid var(--chotto-item-border-color, none);
    border-radius: var(--chotto-chat-panel-border-radius);
    position: absolute;
    height: 100%;
    z-index: 100;
    width: var(--chotto-chat-panel-width);
    left: var(--chotto-chat-panel-left);
  }
}
</style>
