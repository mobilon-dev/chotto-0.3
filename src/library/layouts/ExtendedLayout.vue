<template>
  <div class="extend-layout__container">
    <div class="extend-layout__first-col">
      <slot name="first-col" />
    </div>
    <div
      ref="resizableDiv"
      class="extend-layout__second-col resizable-div"
      :style="{ userSelect: isResizing ? 'none' : 'auto', }"
      @mousedown="startResize"
      @mouseup="stopResize"
    >
      <slot name="second-col" />
    </div>
    <div class="extend-layout__third-col">
      <slot name="third-col" />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const resizableDiv = ref(null);
let isResizing = ref(false);
let initialWidth = ref(0);
let initialX = ref(0);
let startX = ref(0);

const startResize = (event) => {
  if (event.offsetX >= resizableDiv.value.offsetWidth - 20) {
    isResizing.value = true;
    initialWidth.value = resizableDiv.value.offsetWidth;
    initialX.value = event.clientX;
    startX.value = event.clientX;
    document.addEventListener('mousemove', resize);
  }
};

const resize = (event) => {
  if (isResizing.value) {
    const newWidth = initialWidth.value + (event.clientX - startX.value);
    resizableDiv.value.style.width = `${Math.max(270, newWidth)}px`;
  }
};

const stopResize = () => {
  isResizing.value = false;
  document.removeEventListener('mousemove', resize);
};

onMounted(() => {
  if (resizableDiv.value) {
    resizableDiv.value.style.width = '350px'
  }
})
</script>

<style
  scoped
  lang="scss"
>
.extend-layout {
  &__container {
    height: inherit;
    display: grid;
    grid-template-columns: min-content min-content 3fr min-content;
    transition: all 0.3s ease;
    background-color: var(--layout-extended-bg, transparent);
    position: relative;

    border-top: var(--layout-extended-column-border, none);
    border-left: var(--layout-extended-column-border, none);
  }

  &__first-col {
    position: relative;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    height: inherit;
    border-right: var(--layout-extended-column-border, none);
    border-bottom: var(--layout-extended-column-border, none);
  }

  &__second-col {
    position: relative;
    grid-column: 2;
    display: flex;
    flex-direction: column;
    height: inherit;
    overflow: hidden;
    border-right: var(--layout-extended-column-border, none);
    border-bottom: var(--layout-extended-column-border, none);
  }

  &__third-col {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-column: 3;
    height: inherit;
    border-right: var(--layout-extended-column-border, none);
    border-bottom: var(--layout-extended-column-border, none);
    background-color: var(--layout-extended-third-col-bg);
  }
}

.resizable-div {
  position: relative;
}

/* Область захвата */
.resizable-div::after {
  content: "";
  position: absolute;
  top: 0;
  right: 6px;
  bottom: 0;
  width: 10px;
  cursor: e-resize;
  background-color: rgba(0, 0, 0, 0);
  z-index: 100;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  opacity: 1;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
