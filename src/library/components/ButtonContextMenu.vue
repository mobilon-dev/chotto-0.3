<template>
  <div
    :id="'container-' + buttonContextMenuId"
    ref="actionScope"
    style="
      position: relative;
      width: fit-content;
    "
  >
    <div
      class="button"
      :class="{
        'disabled-button': disabled,
      }"
      @click="toggle"
      @mouseover="hover"
      @mouseout="hoverout"
    >
      <span :class="buttonClass">
        {{ buttonTitle }}
      </span>
    </div>
    <ContextMenu
      :id="'context-menu-' + buttonContextMenuId"
      ref="contextMenu"
      :actions="actions"
      @mouseover="hover"
      @mouseout="hoverout"
      @click="click"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, useId } from 'vue';
import { ContextMenu } from '.';

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

const emit = defineEmits(['click', 'buttonClick']);
const contextMenu = ref(null)
const actionScope = ref(null)

const click = (action) => {
  contextMenu.value.$el.style.display = 'none'
  emit('click', action);
}

const toggle = () => {
  if (!props.disabled) {
    if (props.mode == 'click') {
      contextMenu.value.$el.style.display = 'inherit'
    }
    emit('buttonClick')
  }
}

const hover = () => {
  if (props.mode == 'hover' && !props.disabled) {
    contextMenu.value.$el.style.display = 'inherit'
  }
}

const hoverout = () => {
  if (props.mode == 'hover') {
    contextMenu.value.$el.style.display = 'none'
  }
}

const handleClickOutside = (event) => {
  if (props.mode == 'click' && actionScope.value && !actionScope.value.contains(event.target)) {
    contextMenu.value.$el.style.display = 'none'
  }
}

onMounted(() => {
  const side = {
    'top': {
      h: -1,
      w: -0.25,
    },
    'bottom': {
      h: 1,
      w: -0.25,
    },
    'left': {
      h: -0.25,
      w: 1,
    },
    'right': {
      h: -0.25,
      w: 1,
    },
  }

  let width, height
  if (props.menuSide == 'top') {
    width = document.getElementById('container-' + buttonContextMenuId)?.offsetWidth
    height = document.getElementById('context-menu-' + buttonContextMenuId)?.offsetHeight
    contextMenu.value.$el.style.left = side[props.menuSide].w * width + 'px'
  }
  if (props.menuSide == 'bottom') {
    width = document.getElementById('context-menu-' + buttonContextMenuId).offsetWidth
    height = document.getElementById('container-' + buttonContextMenuId).offsetHeight
    contextMenu.value.$el.style.right = side[props.menuSide].w * width + 'px'
  }
  if (props.menuSide == 'left') {
    width = document.getElementById('container-' + buttonContextMenuId).offsetWidth
    height = document.getElementById('context-menu-' + buttonContextMenuId).offsetHeight
    contextMenu.value.$el.style.right = side[props.menuSide].w * width + 'px'
  }
  if (props.menuSide == 'right') {
    width = document.getElementById('container-' + buttonContextMenuId).offsetWidth
    height = document.getElementById('context-menu-' + buttonContextMenuId).offsetHeight
    contextMenu.value.$el.style.left = side[props.menuSide].w * width + 'px'

  }
  contextMenu.value.$el.style.top = side[props.menuSide].h * height + 'px'
  contextMenu.value.$el.style.display = 'none'
  document.addEventListener("click", handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside)
})

</script>

<style
  scoped
  lang="scss"
>
.button span {
  display: block;
  cursor: pointer;
  padding: 5px 14px;
  font-size: var(--icon-font-size-medium);
  color: var(--channels-selector-icon-color);
}


.disabled-button span {
  color: lightgray;
  cursor: auto;
}
</style>
