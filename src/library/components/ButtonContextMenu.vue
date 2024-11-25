<template>
  <div ref="actionScope" :id="'container-'+props.contextMenuKey" style="position: relative;">
    <button
      class="button"
      :class="{
        'disabled-button' : disabled,
      }"
      @click="toggle"
      @mouseover="hover"
      @mouseout="hoverout"
    >
      <span :class="buttonClass" >
        {{ buttonTitle }}
      </span>
    </button>
      <div 
      :id="'context-menu-' + props.contextMenuKey"
      class="context-menu" 
      ref="contextMenu" 
      @mouseover="hover"
      @mouseout="hoverout"
    >
      <div  class="context-menu__container">
        <ul class="context-menu__list">
          <li
            v-for="(action, index) in props.actions"
            :key="index"
            class="context-menu__item"
            @click="click(index)"
          >
            <img
              v-if="action.icon"
              :src="action.icon"
              width="18"
              height="18"
            >
            <i 
              v-else-if="action.prime"
              :class="'pi pi-' + action.prime" 
            >
            </i>
            <span>{{ action.title }}</span>
          </li>
        </ul>
      </div>
    </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
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
    default:  '',
  },
  buttonTitle: {
    type: String,
    required: false,
    default:  '',
  },
  disabled: {
    type: Boolean,
    default: false,
    required: false,
  },
  menuSide: {
    type: String,
    default: 'top'
  },
  contextMenuKey: {
    type: String,

  }
});

const emit = defineEmits(['click']);

const contextMenu = ref(null)
const actionScope = ref(null)

const click = (index) => {
  const action = props.actions[index];
  contextMenu.value.style.display = 'none'
  emit('click', action);
}

const toggle = () => {
  
  if (props.mode != 'hover'){
    contextMenu.value.style.display = 'inherit'
  }
}

const hover = () => {
  if (props.mode == 'hover'){
    contextMenu.value.style.display = 'inherit'
  }
}

const hoverout = () => {
  if (props.mode == 'hover'){
    contextMenu.value.style.display = 'none'
  }
}

const handleClickOutside = (event) => {
  if (props.mode != 'hover' && actionScope.value && !actionScope.value.contains(event.target)) {
    contextMenu.value.style.display = 'none'
  }
}

onMounted(() => {
  const side = {
    'top' : {
      h: -0.92,
      w: 0.25,
    },
    'bottom' : {
      h: 0.8,
      w: -0.25,
    },
    'left' : {
      h: -0.25,
      w: 0.8,
    },
    'right' : {
      h: -0.25,
      w: 0.8,
    },
  }

  let width, height
  if (props.menuSide == 'top'){
    width =  document.getElementById('container-'+props.contextMenuKey).offsetWidth
    height =  document.getElementById('context-menu-'+props.contextMenuKey).offsetHeight
    contextMenu.value.style.left = side[props.menuSide].w * width + 'px'
    contextMenu.value.style.top = side[props.menuSide].h * height + 'px'
  }
  if (props.menuSide == 'bottom'){
    width =  document.getElementById('context-menu-'+props.contextMenuKey).offsetWidth
    height =  document.getElementById('container-'+props.contextMenuKey).offsetHeight
    contextMenu.value.style.right = side[props.menuSide].w * width + 'px'
    contextMenu.value.style.top = side[props.menuSide].h * height + 'px'
  }
  if (props.menuSide == 'left'){
    width =  document.getElementById('container-'+props.contextMenuKey).offsetWidth
    height =  document.getElementById('context-menu-'+props.contextMenuKey).offsetHeight
    contextMenu.value.style.right = side[props.menuSide].w * width + 'px'
    contextMenu.value.style.top = side[props.menuSide].h * height + 'px'
  }
  if (props.menuSide == 'right'){
    width =  document.getElementById('container-'+props.contextMenuKey).offsetWidth
    height =  document.getElementById('context-menu-'+props.contextMenuKey).offsetHeight
    contextMenu.value.style.left = side[props.menuSide].w * width + 'px'
    contextMenu.value.style.top = side[props.menuSide].h * height + 'px'
  }
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

.button {
    background-color: transparent;
    border: none;

    span {
      display: block;
      cursor: pointer;
      padding: 14px;
      font-size: var(--icon-font-size-medium);
      color: var(--channels-selector-icon-color);
    }
  }

  .disabled-button span {
  color: lightgray;
  cursor: auto;
}
.context-menu {
  z-index: 200;
  position: absolute;
  &__container {
    width: fit-content;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.11);
    border-radius: 8px;
    padding: 12px 0;
    background-color: var(--context-menu-background);
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 6px;
  }

  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    padding: 0 16px;
    width: 100%;
    column-gap: 12px;
  }

  &__item:not(:last-child) {
    padding-bottom: 6px;
    border-bottom: 1px solid var(--neutral-300);
  }
}
</style>
