<template>
  <div
    :id="'container-' + buttonContextMenuId"
    ref="actionScope"
    style="
      position: relative;
      width: fit-content;
    "
    @mouseenter="hover"
    @mouseleave="hoverOut"
  >
    <div
      class="button"
      :class="{
        'disabled-button': disabled,
      }"
      @click="toggle"
      
    >
      <span :class="buttonClass">
        {{ buttonTitle }}
      </span>
    </div>
    <Teleport v-if="allowTeleport" :to="'#float-windows-' + chatAppId">
      <ContextMenu
        :id="'context-menu-' + buttonContextMenuId"
        ref="contextMenu"
        :actions="actions"
        @mouseenter="hoverCM"
        @mouseleave="hoverOutCM"
        @click="click"
      />
    </Teleport>
    
  </div>
</template>

<script setup>
import { useTemplateRef, ref, onMounted, onUnmounted, useId, inject, nextTick} from 'vue';
import { ContextMenu } from '.';

const chatAppId = inject('chatAppId')

const props = defineProps({
  actions: {
    type: Array,
    required: true,
  },
  mode: {
    type: String,
    required: false,
    default: 'hover',
  },
  buttonClass: {
    type: String,
    required: false,
    default: '',
  },
  buttonTitle: {
    type: String,
    required: false,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  menuSide: {
    type: String,
    required: false,
    default: 'left'
  },
});

const buttonContextMenuId = useId()

const emit = defineEmits(['click', 'buttonClick', 'menuMouseEnter', 'menuMouseLeave']);

const allowTeleport = ref(false)
const contextMenu = ref()
const actionScope = useTemplateRef('actionScope')
const isOpened = ref(false)

const click = (action) => {
  hideMenu()
  emit('click', action);
}

const toggle = () => {
  if (!props.disabled) {
    if (props.mode == 'click' && !isOpened.value) {
      updatePosition()
    }
    else if (props.mode == 'click' && isOpened.value) {
      hideMenu()
    }
    emit('buttonClick')
  }
}

const hover = () => {
  if (!props.disabled) {
    if (props.mode == 'hover') {
      updatePosition()
    }
  }
}

const hoverOut = () => {
  if (!props.disabled) {
    if (props.mode == 'hover') {
      hideMenu()
    }
  }
}

const hoverCM = () => {
  emit('menuMouseEnter')
  if (!props.disabled) {
    if (props.mode == 'hover') {
      updatePosition()
    }
  }
}

const hoverOutCM = () => {
  emit('menuMouseLeave')
  if (!props.disabled) {
    if (props.mode == 'hover') {
      hideMenu()
    }
  }
}

const updatePosition = () => {
  if (actionScope.value && contextMenu.value){
    const t = contextMenu.value
    const bounds = actionScope.value.getBoundingClientRect()
    t.style.display = 'inherit'
    const cmBounds = contextMenu.value.getBoundingClientRect()
    t.style.display = 'none'
    nextTick(() => {
      const r = {
        'left'  : {top: bounds.top - ((cmBounds.height - bounds.height) / 2) - cmBounds.top, left: bounds.left - cmBounds.width - cmBounds.left},
        'right' : {top: bounds.top - ((cmBounds.height - bounds.height) / 2) - cmBounds.top, left: bounds.left + bounds.width - cmBounds.left},
        'bottom': {top: bounds?.bottom - cmBounds.top, left: bounds?.left - ((cmBounds.width - bounds.width) / 2) - cmBounds.left},
        'top'   : {top: bounds.top - cmBounds.height - cmBounds.top, left: bounds?.left - ((cmBounds.width - bounds.width) / 2) - cmBounds.left},
      }
      //console.log(bounds, cmBounds, 'top: ', r[props.menuSide].top + 'px', ' left: ', r[props.menuSide].left + 'px')
      t.style.top = r[props.menuSide].top + 'px'
      t.style.left = r[props.menuSide].left + 'px'
      t.style.opacity = '1'
      t.style.display = 'inherit'
      isOpened.value = true
    })
  }
}

const hideMenu = () => {
  if (contextMenu.value){
    const t = contextMenu.value
    if (t){
      t.style.top = '0'
      t.style.left = '0'
      t.style.opacity = '0'
      t.style.display = 'none'
      isOpened.value = false
    }
  }
}

const handleClickOutside = (event) => {
  if (props.mode == 'click' && actionScope.value && !actionScope.value.contains(event.target)) {
    hideMenu()
  }
}

onMounted(() => {
  let container
  while(container == undefined || container == null){
    container = document.getElementById('float-windows-' + chatAppId)
    if (container){
      allowTeleport.value = true
      nextTick(() => {
        contextMenu.value = document.getElementById('context-menu-' + buttonContextMenuId)
        //console.log(container, contextMenu.value)
        if (contextMenu.value) {
          hideMenu()
          document.addEventListener("click", handleClickOutside)
        }
      })
    }
  }
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
})

defineExpose({
  updatePosition,
  hideMenu,
})

</script>

<style
  scoped
  lang="scss"
>
.button span {
  display: block;
  cursor: pointer;
  font-size: var(--chotto-button-icon-size);
  color: var(--chotto-button-color-active);
}

.button:hover span {
  color: var(--chotto-button-color-hover);
}

.disabled-button span {
  color: var(--chotto-button-color-disabled);
  cursor: auto;
}
</style>
