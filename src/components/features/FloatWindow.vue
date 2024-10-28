<template>
  <div
    ref="element"
    class="float-window"
    :style="{
      left: floatWindowPosition.x + 'px',
      top: floatWindowPosition.y + 'px',
    }"
  >
    <div class="float-window__container">
      <div
        ref="container"
        class="float-window__controls"
        @mousedown="mouseDown"
        @mouseup="mouseUp"
      >
        <button
          class="float-window__close-button"
          @click="$emit('close-window')"
        >
          <span class="pi pi-times" />
        </button>
      </div>
      <div class="float-window__content">
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  updateChatAppSize: {
    type: Function,
    required: true
  }
});

const emit = defineEmits(['close-window', 'get-size']);

const floatWindowPosition = ref({ x: 0, y: 0 });
const element = ref(null)
const container = ref(null);
let initialX = ref(0);
let initialY = ref(0);
let dragMode = false;


const mouseDown = (e) => {
  dragMode = true;
  // Получение координат левого верхнего угла перемещаемого окна
  initialX.value = e.clientX - element.value.offsetLeft;
  initialY.value = e.clientY - element.value.offsetTop;
}

const mouseUp = () => dragMode = false;

const mouseMove = (e) => {
  if (dragMode) {
    // Получаем размер компонента chat-app, чтобы можно было определить границы 
    const { width, height } = props.updateChatAppSize();

    // Вычисление позиции плавающего окна 
    const positionX = e.clientX - initialX.value
    const positionY = e.clientY - initialY.value

    // Определение границ перемещения окна
    floatWindowPosition.value.x = Math.max(0, Math.min(positionX, width - element.value.offsetWidth));
    floatWindowPosition.value.y = Math.max(0, Math.min(positionY, height - element.value.offsetHeight));
  }
}

onMounted(() => {
  document.addEventListener('mousemove', mouseMove);

  // Срабатывает, когда изменяется размер окна брузера, не дает выйти за границы плавающему окну.
  // Перерасчет границ.
  window.addEventListener('resize', () => {
    const { width, height } = props.updateChatAppSize();
    floatWindowPosition.value.x = Math.max(0, Math.min(floatWindowPosition.value.x, width - element.value.offsetWidth));
    floatWindowPosition.value.y = Math.max(0, Math.min(floatWindowPosition.value.y, height - element.value.offsetHeight));
  });

  // Отправлем в ChatApp высоту element и container для того чтобы вычислить высоту для center-bar и right-bar
  emit('get-size', element.value.offsetHeight, container.value.offsetHeight);
})
</script>

<style
  scoped
  lang="scss"
>
.float-window {
  z-index: 1000;
  width: fit-content;

  &__container {
    width: 1200px;
    height: 900px;
    display: flex;
    flex-direction: column;
    align-self: stretch;
    border-radius: var(--float-window-border-radius);
    background-color: var(--float-window-bg);
    box-shadow: var(--float-window-box-shadow);
  }

  &__controls {
    cursor: grab;
    padding: var(--float-window-padding);
    background-color: var(--float-window-bg-header);
    border-radius: var(--float-window-border-radius-header);

  }

  &__close-button {
    display: block;
    background-color: transparent;
    border: none;
    font-size: var(--icon-font-size-large);
    color: var(--icon-color);
    width: fit-content;
    margin-left: auto;
    cursor: pointer;
  }

  &__content {
    display: grid;
    grid-template-columns: min-content 1.25fr 3fr 1.25fr;
    margin: var(--float-window-content-margin, 0);
    background-color: var(--float-window-content-bg, transparent);
  }
}
</style>
