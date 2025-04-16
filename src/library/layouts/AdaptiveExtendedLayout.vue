<template>
  <div
    :id="'extern-layout-container-' + chatAppId"
    ref="refContainer"
    class="extend-layout__container"
  >
    <div 
      :id="'extend-layout-first-col-' + chatAppId" 
      class="extend-layout__first-col"
    >
      <slot name="first-col" />
    </div>
    <div
      :id="'extend-layout-second-col-' + chatAppId"
      class="extend-layout__second-col"
    >
      <slot name="second-col" />
    </div>
    <div 
      :id="'extend-layout-third-col-' + chatAppId"
      class="extend-layout__third-col"
    >
      <slot name="third-col" />
    </div>
  </div>
</template>

<script setup>
import { inject, watch, onMounted } from 'vue';

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

  container.style.setProperty('--chotto-adaptive-extended-layout-second-col-display','none')
  container.style.setProperty('--chotto-adaptive-extended-layout-third-col-display','flex')
  container.style.setProperty('--chotto-adaptive-extended-layout-second-col-width','0%')
  container.style.setProperty('--chotto-adaptive-extended-layout-third-col-width','100%')
}

const setSecondColVisible = () => {
  const container = document.getElementById('extern-layout-container-' + chatAppId)

  container.style.setProperty('--chotto-adaptive-extended-layout-second-col-display','flex')
  container.style.setProperty('--chotto-adaptive-extended-layout-third-col-display','none')
  container.style.setProperty('--chotto-adaptive-extended-layout-second-col-width','100%')
  container.style.setProperty('--chotto-adaptive-extended-layout-third-col-width','0%')
}

onMounted(() => {
  const container = document.getElementById('extern-layout-container-' + chatAppId)
  const firstCol = document.getElementById('extend-layout-first-col-' + chatAppId)
  
  container.style.setProperty('--chotto-adaptive-extended-layout-first-col-width',firstCol.offsetWidth + 'px')
})

</script>

<style
  scoped
  lang="scss"
>
.extend-layout {
  &__container {
    --chotto-adaptive-extended-layout-second-col-display: flex;
    --chotto-adaptive-extended-layout-second-col-width: 100%;

    --chotto-adaptive-extended-layout-third-col-display: none;
    --chotto-adaptive-extended-layout-third-col-width: 0%;

    --chotto-adaptive-extended-layout-first-col-width: 0px;
    
    height: inherit;
    display: grid;
    transition: all 0.3s ease;
    position: relative;
    border-top: var(--chotto-container-borders, none);
    border-left: var(--chotto-container-borders, none);
  }

  &__first-col {
    position: relative;
    grid-column: 1;
    display: flex;
    flex-direction: column;
    height: inherit;
    border-right: var(--chotto-container-borders, none);
    border-bottom: var(--chotto-container-borders, none);
    background-color: var(--chotto-layout-extended-first-col-bg, transparent);
  }

  &__second-col {
    position: relative;
    grid-column: 2;
    display: flex;
    flex-direction: column;
    height: inherit;
    overflow: hidden;
    border-right: var(--chotto-container-borders, none);
    border-bottom: var(--chotto-container-borders, none);
    background-color: var(--chotto-layout-extended-second-col-bg, transparent);
  }

  &__third-col {
    position: relative;
    display: flex;
    flex-direction: column;
    grid-column: 3;
    height: inherit;
    border-right: var(--chotto-container-borders, none);
    border-bottom: var(--chotto-container-borders, none);
    background-color: var(--chotto-layout-extended-third-col-bg, transparent);
    width: auto;
  }
}

@container all (width > 920px){
  .extend-layout{
    &__container{
      grid-template-columns: min-content 30% calc(70% - var(--chotto-adaptive-extended-layout-first-col-width));
    }
  }
}

@container all (width < 920px){
  .extend-layout{
    &__container{
      grid-template-columns: min-content calc(var(--chotto-adaptive-extended-layout-second-col-width) - var(--chotto-adaptive-extended-layout-first-col-width)) calc(var(--chotto-adaptive-extended-layout-third-col-width) - var(--chotto-adaptive-extended-layout-first-col-width));
    }
    &__second-col{
      display: var(--chotto-adaptive-extended-layout-second-col-display);
    }
    &__third-col{
      display: var(--chotto-adaptive-extended-layout-third-col-display);
    }
  }
}

@container all (width < 720px){
  .extend-layout{
    &__container{
      grid-template-columns: min-content var(--chotto-adaptive-extended-layout-second-col-width) var(--chotto-adaptive-extended-layout-third-col-width);
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
