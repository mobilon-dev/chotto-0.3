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

// watch(
//   () => props.chatPanelWidth,
//   () => {
//     const container = document.getElementById('chat-wrapper-' + chatAppId)
//     if (container){
//       container.style.setProperty('--chotto-chat-panel-width', props.chatPanelWidth + '%')
//       container.style.setProperty('--chotto-chat-panel-left', (100 - props.chatPanelWidth) + '%')
//     }
//   },
//   {immediate: true}
// )
</script>


<style
  scoped
  lang="scss"
>
@use './styles/themes/default.scss';
@use './styles/themes/dark.scss';
@use './styles/themes/green.scss';
@use './styles/themes/mobilon1.scss';

.chat-wrapper {
  /* --chotto-chat-panel-width: 60%;
  --chotto-chat-panel-left: 50%; */

  display: var(--chotto-chatwrapper-display, flex);
  height: var(--chotto-chatwrapper-height, 100%);
  width: var(--chotto-chatwrapper-width, 100%);
  align-items: var(--chotto-chatwrapper-align-items, stretch);

  &__selected-chat {
    height: var(--chotto-chatwrapper-selected-chat-height, 100%);
    width: var(--chotto-chatwrapper-selected-chat-width, 100%);
    display: var(--chotto-chatwrapper-selected-chat-display, flex);
    flex-direction: var(--chotto-chatwrapper-selected-chat-flex-direction, column);
    align-items: var(--chotto-chatwrapper-selected-chat-align-items, stretch);
  }

  &__chat-panel {
    background-color: var(--chotto-chatwrapper-chat-panel-background-color, var(--chotto-primary-color));
    border-left: var(--chotto-chatwrapper-chat-panel-border-left, 1px solid var(--chotto-item-chat-panel-border-color, none));
    border-right: var(--chotto-chatwrapper-chat-panel-border-right, 1px solid var(--chotto-item-chat-panel-border-color, none));
    border-radius: var(--chotto-chatwrapper-chat-panel-border-radius, var(--chotto-chat-panel-border-radius));
    position: var(--chotto-chatwrapper-chat-panel-position, absolute);
    height: var(--chotto-chatwrapper-chat-panel-height, 100%);
    z-index: var(--chotto-chatwrapper-chat-panel-z-index, 100);
    width: var(--chotto-chatwrapper-chat-panel-width, var(--chotto-chat-panel-width, 50%));
    left: var(--chotto-chatwrapper-chat-panel-left, var(--chotto-chat-panel-left, 50%));
    padding: var(--chotto-chatwrapper-chat-panel-padding, var(--chotto-chat-panel-padding, 12px));
  }
}
</style>
