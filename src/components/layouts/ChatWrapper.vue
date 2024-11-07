<template>
  <div
    style="display: flex; height: 100%; width: 100%; align-items: stretch;"
  >
    <div
      v-if="isSelectedChat"
      style="height: 100%; width: 100%; display: flex; flex-direction: column; align-items: stretch;"
      >
      <slot name="default"></slot>
    </div>

    <div v-else style="width: 100%">
      <p>
        Выберите контакт для начала общения
      </p>
    </div>
    
    <div 
      v-if="isOpenChatPanel" 
      :style="{ 'flex-basis': isOpenChatPanel ? '40%' : '0%'}">
      <slot name="chatpanel" ></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
