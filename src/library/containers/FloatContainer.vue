<template>
  <div
    ref="element"
    class="float-window"
    :style="{
      left: floatWindowPosition.x + 'px',
      top: floatWindowPosition.y + 'px',
      userSelect: dragMode ? 'none' : 'auto',
    }"
  >
    <div class="float-window__container">
      <div
        ref="container"
        class="float-window__controls"
        :style="{ backgroundColor: props.colorTitle ? props.colorTitle : '' }"
        @mousedown="mouseDown"
        @mouseup="turnOffDragMode"
        @mouseleave="turnOffDragMode"
      >
        <img
          v-if="props.avatar"
          class="float-window__avatar"
          :src="props.avatar"
          :alt="props.title"
        >
        <p class="float-window__title">
          {{ props.title }}
        </p>
        <button
          class="float-window__close-button"
          @click="$emit('close-window')"
        >
          <span class="pi pi-times" />
        </button>
      </div>
      <div
        class="float-window__content"
        :style="{ height: contentHeight + 'px' }"
      >
        <slot name="default" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  colorTitle: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  Height: String,
  Width: String,
});
const emit = defineEmits(["close-window", "get-size"]);

const floatWindowPosition = ref({ x: 0, y: 0 });
const element = ref(null);
const container = ref(null);
const dragMode = ref(false);
const initialX = ref(0);
const initialY = ref(0);
const contentHeight = ref(0);

const centerWindow = () => {
  if (element.value) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const elementWidth = element.value.offsetWidth;
    const elementHeight = element.value.offsetHeight;

    floatWindowPosition.value.x = (windowWidth - elementWidth) / 2;
    floatWindowPosition.value.y = (windowHeight - elementHeight) / 2;
  }
};

const mouseDown = (e) => {
  dragMode.value = true;
  // Получение координат левого верхнего угла перемещаемого окна
  initialX.value = e.clientX - element.value.offsetLeft;
  initialY.value = e.clientY - element.value.offsetTop;
};

const turnOffDragMode = () => (dragMode.value = false);

const mouseMove = (e) => {
  if (dragMode.value) {
    // Вычисление позиции плавающего окна
    const positionX = e.clientX - initialX.value;
    const positionY = e.clientY - initialY.value;

    // Ограничение перемещения, границы
    floatWindowPosition.value.x = Math.max(
      0,
      Math.min(positionX, window.innerWidth - element.value.offsetWidth)
    );
    floatWindowPosition.value.y = Math.max(
      0,
      Math.min(positionY, window.innerHeight - element.value.offsetHeight)
    );
  }
};

onMounted(() => {
  //Центрируем окно при монтировании
  centerWindow();

  document.addEventListener("mousemove", mouseMove);

  // Срабатывает, когда изменяется размер окна брузера, не дает выйти за границы плавающему окну. Перерасчет границ.
  window.addEventListener("resize", () => {
    floatWindowPosition.value.x = Math.max(
      0,
      Math.min(
        floatWindowPosition.value.x,
        window.innerWidth - element.value.offsetWidth
      )
    );
    floatWindowPosition.value.y = Math.max(
      0,
      Math.min(
        floatWindowPosition.value.y,
        window.innerHeight - element.value.offsetHeight
      )
    );
  });

  contentHeight.value =
    element.value.offsetHeight - container.value.offsetHeight;
});
</script>

<style
  scoped
  lang="scss"
>
.float-window {
  z-index: 1000;
  width: fit-content;
  position: absolute;

  &__container {
    width: 1200px;
    height: 900px;
    position: relative;
    border-radius: var(--float-window-border-radius);
    background-color: var(--float-window-bg);
    box-shadow: var(--float-window-box-shadow);
  }

  &__controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: grab;
    padding: var(--float-window-padding);
    background-color: var(--float-window-bg-header);
    border-radius: var(--float-window-border-radius-header);
  }

  &__avatar {
    width: var(--avatar-width-small);
    height: var(--avatar-height-small);
    border-radius: 50%;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
    margin-left: 10px;
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
    margin: var(--float-window-content-margin, 0);
    background-color: var(--float-window-content-bg, transparent);
  }
}
</style>
