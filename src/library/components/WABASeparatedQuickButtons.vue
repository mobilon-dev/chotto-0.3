<template>
    <div class="menu-container" >
      <div class="settings-first-line">
        <span class="settings-title">Все варианты</span>
        <span
          class="pi pi-times exit-button"
          @click="emit('selectAllVariants')"
        />
      </div>
      <div class="actions-container scrollbar">
        <div
        class="actions"
        v-for="(button, index) in buttons"
        :key="index"
      >
          <div class="action">
            <span class="icon pi pi-arrow-up-left" :class="icons[button.type]"  />
            {{ button.text }}
          </div>
      </div>
      </div>
    </div>
</template>

<script setup lang="ts">
const icons = {
  'URL': 'bi-box-arrow-up-right',
  'PHONE_NUMBER': 'bi-telephone',
  'QUICK_REPLY': 'bi-arrow-90deg-left',
}

const emit = defineEmits(['selectAllVariants'])

interface Button {
  text: string,
  type: string
}

defineProps({
  buttons: {
    type: Array as () => Button[], 
    default: []
  },
});
</script>

<style scoped>
.menu-container {
  width: 100%;
  position: absolute;
  left:0; right:0; bottom:0;
  max-width: var(--quick-reply-max-width);
  min-height: 100px;
  max-height: fit-content;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background:white;
  white-space: pre-wrap;
}

.settings-first-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px;
}

.settings-title {
  font-family: "Roboto", sans-serif;  
  font-size: var(--font-size-midX);
  margin-left: auto;
  margin-right: auto;
  display: flex;
}

.exit-button {
  display: flex;
}

.exit-button:hover{
  cursor: pointer;
}

.actions-container{
  border-top: 1px solid var(--accent-color);
  border-bottom: 1px solid var(--accent-color);
  max-height: 180px;
  overflow-y: auto;
}

.action {
  font-size: var(--font-size-midX);
  font-family: "Roboto", sans-serif;
}

.actions {
  position: relative;
  z-index: 0;
  width: 90%;
  margin-right: auto;
  margin-left: 25px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-bottom: 20px;
}

.icon{
  margin-right: 10px
}


</style>