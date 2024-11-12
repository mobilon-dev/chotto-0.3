<template>
  <div style="display: flex; height: 100%; width: 100%; align-items: stretch;">
    <div
      v-if="isSelectedChat"
      style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: stretch;"
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
      :style="{ 'flex-basis': isOpenChatPanel ? '40%' : '0%' }"
      class="chatpanel"
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
.chatpanel {
  padding: 10px 10px 10px 10px;
  margin: var(--chat-panel-margin);
  background-color: var(--chat-input-background);
  border-left: var(--chat-panel-border, none);
  border-radius: var(--chat-panel-border-radius);
}
</style>
