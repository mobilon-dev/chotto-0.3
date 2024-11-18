<template>
  <div class="chat-wrapper">
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
        Выберите контакт для начала общения
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
const props = defineProps({
  isOpenChatPanel: {
    type: Boolean,
    default: false,
  },
  isSelectedChat: {
    type: Boolean,
    default: false,
  },
})
</script>


<style
  scoped
  lang="scss"
>
.chat-wrapper {
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
  }
}
</style>
