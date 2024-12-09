<template>
  <div class="base-layout__container">
    <div 
      class="base-layout__first-col resizable-div"
      ref="resizableDiv"
      :style="{ userSelect: isResizing ? 'none' : 'auto', }"
      @mousedown="startResize"
      @mouseup="stopResize"
    >
      <slot name="first-col" />
    </div>
    <div class="base-layout__second-col">
      <slot name="second-col" />
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
    resizableDiv.value.style.width = '400px'
  }
})
</script>

<style
  scoped
  lang="scss"
>
.base-layout {
  &__container {
    height: inherit;
    width: 100%;
    display: grid;
    grid-template-columns: 1.25fr 3fr;
    transition: all 0.3s ease;
    background-color: var(--layout-base-bg, transparent);
    position: relative;
    border-top: var(--layout-base-column-border, none);
    border-left: var(--layout-base-column-border, none);
    
  }

  &__first-col {
    position: relative;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    height: inherit;
    background-color: var(--layout-base-first-col-bg);
    border-right: var(--layout-base-column-border, none);
    border-bottom: var(--layout-base-column-border, none);
    max-width: 30vw;
    min-width: 20vw;
  }

  &__second-col {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-column: 2;
    height: inherit;
    max-width: 100%;
    background-color: var(--layout-base-second-col-bg);
    border-right: var(--layout-base-column-border, none);
    border-bottom: var(--layout-base-column-border, none);
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
