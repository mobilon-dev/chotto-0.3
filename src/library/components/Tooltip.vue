<template>
  <div 
    class="tooltip-wrapper" 
    ref="container" 
    @mouseover="updatePosition"
    @mouseout="hideTooltip"
  >
    <slot/>
  </div>
  <Teleport v-if="allowTooltip" :to="'#float-windows-' + chatAppId" >
    <span 
      :data-theme="getTheme().theme ? getTheme().theme : null"
      ref="tooltip"
      :class="tooltipClasses" 
    >
      {{ text }}
    </span>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, unref, inject, onMounted } from 'vue';
import { useTheme } from '../../helpers/useTheme';

const chatAppId = inject('chatAppId')
const { getTheme } = useTheme(chatAppId as string)

const container = ref<HTMLElement>() 
const tooltip = ref<HTMLElement>()
const allowTooltip = ref(false)

const props = defineProps({
  text: {
    type: String,
    required: true
  },
  position: {
    type: String,
    default: 'bottom'
  },
})

const tooltipClasses = computed(() => ({
  'tooltip__text': true,
  [`tooltip--${props.position}`]: true
}))

const updatePosition = () => {
  if (container.value && tooltip.value){
    const bounds = container.value.getBoundingClientRect()
    const r = {
      'left'  : {top: bounds.top, left: bounds?.left - 10},
      'right' : {top: bounds.top, left: bounds?.left + 10},
      'bottom': {top: bounds?.bottom + 5, left: bounds?.left},
      'top'   : {top: bounds.top - (bounds.bottom - bounds.top) - 10, left: bounds?.left},
    }
    const t = tooltip.value
    t.style.top = r[props.position].top + 'px'
    t.style.left = r[props.position].left + 'px'
    t.style.opacity = '1'
    t.style.visibility = 'visible'
  }
}

const hideTooltip = () => {
  const t = unref(tooltip)
  if (t){
    t.style.top = '0'
    t.style.left = '0'
    t.style.opacity = '0'
    t.style.visibility = 'hidden'
  }
}

onMounted(() => {
  const container = document.getElementById('float-windows-' + chatAppId)
  if (container) allowTooltip.value = true
})

</script>

<style scoped lang="scss">

.tooltip__text {
  visibility: hidden;
  opacity: 0;
  transition: opacity 1s;
  max-width: 300px;
  color: var(--chotto-tooltip-text-color);
  text-align: center;
  padding: 7px;
  border-radius: 2px;
  background: var(--chotto-tooltip-bg-color);
  top: 0;
  left: 0;
  position: absolute;
  z-index: 99999;
  font-family: var(--chotto-container-font-family);
  font-weight: var(--chotto-container-font-weight);
}

.tooltip-wrapper {
  position: relative;
}

.tooltip--left {
  transform: translateX(-100%) translateY(-25%);
}

.tooltip--right {
  transform: translateX(100%) translateY(-25%);
}

.tooltip__text::after {
  content: " ";
  position: absolute;
  border-width: 5px;
  border-style: solid;
  border-color: var(--chotto-tooltip-bg-color) transparent transparent transparent;
}

.tooltip--left::after {
  inset-block-start: 50%;
  inset-inline-start: 100%;
  border-color: transparent transparent transparent var(--chotto-tooltip-bg-color);
}

.tooltip--right::after {
  inset-block-start: 50%;
  inset-inline-end: 100%;
  border-color: transparent var(--chotto-tooltip-bg-color) transparent transparent;
}

.tooltip--top::after {
  inset-block-start: 100%;
  inset-inline-start: 50%;
  border-color: var(--chotto-tooltip-bg-color) transparent transparent  transparent;
}

.tooltip--bottom::after {
  inset-block-end: 100%;
  inset-inline-start: 50%;
  border-color: transparent transparent var(--chotto-tooltip-bg-color) transparent;
}

</style>