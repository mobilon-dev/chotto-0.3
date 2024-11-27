<template>
  <button
    class="button-template"
    @click="isOpenTemplateSelector = !isOpenTemplateSelector"
  >
    <span class="pi pi-objects-column" />
  </button>
  <transition>
    <TemplateSelector
      v-if="isOpenTemplateSelector"
      :templates="templates"
      @close-template-window="isOpenTemplateSelector = !isOpenTemplateSelector"         
    />
  </transition>
</template>

<script setup>
import { ref } from 'vue';
import TemplateSelector from './TemplateSelector.vue';
const props = defineProps({
  templates: {
    type: Array,
    required: false,
    default: () => { return [] }
  }
})

const isOpenTemplateSelector = ref(false)

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
</style>
