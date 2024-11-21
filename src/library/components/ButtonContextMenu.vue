<template>
  <div ref="actionScope">
    <button
      class="button"
      :class="{
        'disabled-button' : disabled,
      }"
      @click="toggle"
      @mouseover="hover"
      @mouseout="hoverout"
    >
      <span :class="buttonClass">
        {{ buttonTitle }}
      </span>
    </button>
    <div 
      ref="contextMenu" 
      class="context-menu" 
      @mouseover="hover"
      @mouseout="hoverout"
    >
      <div class="context-menu__container">
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
            />
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
  display: none;
  position: absolute;
  bottom: 40%;
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
