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
    <Teleport :to="'#float-windows-' + chatAppId">
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
import { useTemplateRef, ref, onMounted, onUnmounted, useId, inject} from 'vue';
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
    default: 'top'
  },
});

const buttonContextMenuId = useId()

const emit = defineEmits(['click', 'buttonClick', 'menuMouseEnter', 'menuMouseLeave']);
const contextMenu = useTemplateRef('contextMenu')
const actionScope = useTemplateRef('actionScope')
const cmBounds = ref()

const click = (action) => {
  hideMenu()
  emit('click', action);
}

const toggle = () => {
  if (!props.disabled) {
    if (props.mode == 'click') {
      updatePosition()
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
    const bounds = actionScope.value.getBoundingClientRect()
    
    const r = {
      'left'  : {top: bounds.top - ((cmBounds.value.height - bounds.height) / 2), left: bounds.left - cmBounds.value.width},
      'right' : {top: bounds.top - ((cmBounds.value.height - bounds.height) / 2), left: bounds.left + bounds.width},
      'bottom': {top: bounds?.bottom, left: bounds?.left - ((cmBounds.value.width - bounds.width) / 2)},
      'top'   : {top: bounds.top - cmBounds.value.height, left: bounds?.left - ((cmBounds.value.width - bounds.width) / 2)},
    }
    const t = contextMenu.value.contextMenu
    //console.log(bounds, cmBounds.value, 'top: ', r[props.menuSide].top + 'px', ' left: ', r[props.menuSide].left + 'px')
    t.style.top = r[props.menuSide].top + 'px'
    t.style.left = r[props.menuSide].left + 'px'
    t.style.opacity = '1'
    t.style.display = 'inherit'
  }
}

const hideMenu = () => {
  if (contextMenu.value){
    const t = contextMenu.value.contextMenu
    if (t){
      t.style.top = '0'
      t.style.left = '0'
      t.style.opacity = '0'
      t.style.display = 'none'
    }
  }
}

const handleClickOutside = (event) => {
  if (props.mode == 'click' && actionScope.value && !actionScope.value.contains(event.target)) {
    contextMenu.value.contextMenu.style.display = 'none'
  }
}

onMounted(() => {
  const container = document.getElementById('float-windows-' + chatAppId)
  console.log(container, contextMenu.value.contextMenu)
  if (container && contextMenu.value) {
    const t = contextMenu.value.contextMenu
    cmBounds.value = t.getBoundingClientRect()
    t.style.top = '0'
    t.style.left = '0'
    t.style.display = 'none'
    document.addEventListener("click", handleClickOutside)
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
