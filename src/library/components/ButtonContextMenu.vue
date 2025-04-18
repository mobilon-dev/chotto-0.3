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
      @mouseenter="updatePosition"
      @mouseleave="hideMenu"
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
        @mouseenter="updatePosition"
        @mouseleave="hideMenu"
        @click="click"
      />
    </Teleport>
    
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, useId, inject} from 'vue';
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

const emit = defineEmits(['click', 'buttonClick']);
const contextMenu = ref(null)
const actionScope = ref(null)
const cmBounds = ref()

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

const updatePosition = () => {
  if (actionScope.value && contextMenu.value){
    const bounds = actionScope.value.getBoundingClientRect()
    
    const r = {
      'left'  : {top: bounds.top - ((cmBounds.value.height - bounds.height) / 2), left: bounds.left - cmBounds.value.width},
      'right' : {top: bounds.top - ((cmBounds.value.height - bounds.height) / 2), left: bounds.left + bounds.width},
      'bottom': {top: bounds?.bottom, left: bounds?.left - ((cmBounds.value.width - bounds.width) / 2)},
      'top'   : {top: bounds.top - cmBounds.value.height, left: bounds?.left - ((cmBounds.value.width - bounds.width) / 2)},
    }
    const t = contextMenu.value.$el
    //console.log(bounds, cmBounds.value, 'top: ', r[props.menuSide].top + 'px', ' left: ', r[props.menuSide].left + 'px')
    t.style.top = r[props.menuSide].top + 'px'
    t.style.left = r[props.menuSide].left + 'px'
    t.style.opacity = '1'
    t.style.display = 'inherit'
  }
}

const hideMenu = () => {
  const t = contextMenu.value.$el
  if (t){
    t.style.top = '0'
    t.style.left = '0'
    t.style.opacity = '0'
    t.style.display = 'none'
  }
}

const handleClickOutside = (event) => {
  if (props.mode == 'click' && actionScope.value && !actionScope.value.contains(event.target)) {
    contextMenu.value.$el.style.display = 'none'
  }
}

onMounted(() => {
  const container = document.getElementById('float-windows-' + chatAppId)
  if (container) {
    const t = contextMenu.value.$el
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

</script>

<style
  scoped
  lang="scss"
>
.button span {
  display: block;
  cursor: pointer;
  padding: 14px;
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
