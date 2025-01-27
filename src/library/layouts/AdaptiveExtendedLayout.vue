<template>
  <div class="extend-layout__container"
  ref="refContainer"
  :id="'extern-layout-container-' + chatAppId">
    <div 
      class="extend-layout__first-col" 
      :id="'extend-layout-first-col-' + chatAppId"
    >
      <slot name="first-col" />
    </div>
    <div
      class="extend-layout__second-col"
      :id="'extend-layout-second-col-' + chatAppId"
    >
      <slot name="second-col" />
    </div>
    <div 
      class="extend-layout__third-col"
      :id="'extend-layout-third-col-' + chatAppId"
    >
      <slot name="third-col" />
    </div>
  </div>
</template>

<script setup>
import { provide, inject, watch, onMounted } from 'vue';

const props = defineProps({
  isSecondColVisible:{
    type: Boolean,
    required: true
  },
  isThirdColVisible:{
    type: Boolean,
    required: true
  }
})

watch(
  () => [props.isSecondColVisible, props.isThirdColVisible],
  () => {
    if (props.isSecondColVisible) setSecondColVisible()
    if (props.isThirdColVisible) setThirdColVisible()
  },
  { immediate: true }
)

const chatAppId = inject('chatAppId')

const setThirdColVisible = () => {
  const container = document.getElementById('extern-layout-container-' + chatAppId)

  container.style.setProperty('--second-col-display','none')
  container.style.setProperty('--third-col-display','flex')
  container.style.setProperty('--second-col-width','0%')
  container.style.setProperty('--third-col-width','100%')
}

const setSecondColVisible = () => {
  const container = document.getElementById('extern-layout-container-' + chatAppId)

  container.style.setProperty('--second-col-display','flex')
  container.style.setProperty('--third-col-display','none')
  container.style.setProperty('--second-col-width','100%')
  container.style.setProperty('--third-col-width','0%')
}

provide("setFeedColVisible", setThirdColVisible)
provide("setChatListColVisible", setSecondColVisible)

onMounted(() => {
  const container = document.getElementById('extern-layout-container-' + chatAppId)
  const firstCol = document.getElementById('extend-layout-first-col-' + chatAppId)
  
  container.style.setProperty('--first-col-width',firstCol.offsetWidth + 'px')

})

</script>

<style
  scoped
  lang="scss"
>
.extend-layout {
  &__container {
    --second-col-display: flex;
    --second-col-width: 100%;

    --third-col-display: none;
    --third-col-width: 0%;

    --first-col-width: 0px;
    
    height: inherit;
    display: grid;
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
    width: auto;
  }
}

@container all (width > 920px){
  .extend-layout{
    &__container{
      grid-template-columns: min-content 30% calc(70% - var(--first-col-width));
    }
  }
}

@container all (width < 920px){
  .extend-layout{
    &__container{
      grid-template-columns: min-content calc(var(--second-col-width) - var(--first-col-width)) calc(var(--third-col-width) - var(--first-col-width));
    }
    &__second-col{
      display: var(--second-col-display);
    }
    &__third-col{
      display: var(--third-col-display);
    }
  }
}

@container all (width < 720px){
  .extend-layout{
    &__container{
      grid-template-columns: min-content var(--second-col-width) var(--third-col-width);
    }
    &__first-col{
      display: none;
    }
  }
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
