<template>
  <button
    ref="templateButton"
    class="button-template"
    :class="{ 'button-template-disabled': state == 'disabled' }"
    @click="toggle"
    @mouseover="hover"
    @mouseout="hoverout"
  >
    <span class="pi pi-code" />
  </button>

  <div
    ref="template"
    @mouseover="hover"
    @mouseout="hoverout"
  >
    <WABATemplateSelector
      :waba-templates="wabaTemplates"
      :group-templates="groupTemplates"
      @close-template-window="close"
      @send-waba-values="sendWabaValues"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';
import WABATemplateSelector from './WABATemplateSelector.vue';
const props = defineProps({
  wabaTemplates: {
    type: Array,
    required: false,
    default: () => { return [] }
  },
  groupTemplates: {
    type: Array,
    required: false,
    default: () => { return [] }
  },
  mode: {
    type: String,
    required: false,
    default: 'click'
  },
  state: {
    type: String,
    default: 'active',
  },
  filebumpUrl: {
    type: String,
  },
})

provide('filebumpUrl', props.filebumpUrl)

const templateButton = ref(null)
const template = ref(null)
const emit = defineEmits(['sendWabaValues']);

const toggle = () => {
  if (props.mode == 'click' && props.state == 'active') {
    if (template.value.style.display == 'none') {
      template.value.style.display = 'inherit'
    }
    else if (template.value.style.display == 'inherit') {
      template.value.style.display = 'none'
    }
  }
}

const hover = () => {
  if (props.mode == 'hover' && props.state == 'active') {
    template.value.style.display = 'inherit'
  }
}

const hoverout = () => {
  if (props.mode == 'hover' && props.state == 'active') {
    template.value.style.display = 'none'
  }
}

const close = () => {
  template.value.style.display = 'none'
}

onMounted(() => {
  template.value.style.display = 'none'
})

const sendWabaValues = (obj) => {
  emit('sendWabaValues', obj);
}

</script>

<style
  scoped
  lang="scss"
>
.button-template {
  background-color: transparent;
  border: 0px solid var(--neutral-300);
  ;

  span {
    display: block;
    cursor: pointer;
    padding: 14px;
    font-size: var(--icon-font-size-medium);
    color: var(--chat-input-icon-color);
  }
}

.button-template-disabled {
  span {
    cursor: auto;
    color: var(--chat-input-icon-color-disabled);
  }
}
</style>
