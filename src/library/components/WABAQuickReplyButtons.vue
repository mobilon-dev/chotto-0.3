<template>
  <div
    class="preview-actions"
    :class="{ 
      'last-element': index === buttons.length - 1 || (index == 2 && buttons.length > 3), 
      'middle-element' : (buttons.length - 1 > index  && index > 0)
     }"
    v-for="(button, index) in buttons.slice(0, 3)"
    :key="index"
    @click="handleQuickReplyClick(index)"
  >
  <hr class="separator">
    <div 
      class="preview-action" 
    >
      
      <span class="icon pi pi-arrow-up-left" 
        :class="index == 2 && buttons.length > 3 ? 'pi-list' : icons[button.type]"
      />
      {{index == 2 && buttons.length > 3 ? 'Смотреть все варианты' : button.text }}
    </div>
  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['selectAllVariants'])

interface Button {
  text: string,
  type: string
}

const props = defineProps({
  buttons: {
    type: Array as () => Button[], 
    default: []
  },
});

const icons = {
  'URL': 'pi-arrow-up-right',
  'PHONE_NUMBER': 'pi-phone',
  'QUICK_REPLY': 'pi-arrow-up-left',
}

const handleQuickReplyClick = (index : Number) => {
  if (index == 2 && props.buttons.length > 3){
    emit('selectAllVariants')
  }
  
}
</script>

<style scoped>
.preview-actions {
  position: relative;
  z-index: 0;
  font-size: 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: var(--button-preview-action);
  gap: 15px;
}
.middle-element {
  padding-top: 15px;
}
.preview-action {
  color: var(--action-color);
  text-align: center;
}
.preview-action:hover {
  cursor: pointer;
}

.last-element {
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}

.icon {
  width: 12px;
  height: 12px;
  fill: black;
  margin-right: 5px;
}

.separator{
  height: 1px;
  width: 100%;
}
</style>
