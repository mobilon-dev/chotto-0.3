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
import { provide, inject, ref } from 'vue';

const chatAppId = inject('chatAppId')

const refContainer = ref()

const setThirdColVisible = () => {
  const container = document.getElementById('extern-layout-container-' + chatAppId)
  container.style.setProperty('--second-col-display','none')
  container.style.setProperty('--third-col-display','flex')
}

const setSecondColVisible = () => {
  const container = document.getElementById('extern-layout-container-' + chatAppId)
  container.style.setProperty('--second-col-display','flex')
  container.style.setProperty('--third-col-display','none')
}

provide("setFeedColVisible", setThirdColVisible)
provide("setChatListColVisible", setSecondColVisible)
provide("refContainer", refContainer)

</script>

<style
  scoped
  lang="scss"
>
.extend-layout {
  &__container {


    --second-col-display: none;
    --third-col-display: flex;

    height: inherit;
    display: grid;
    grid-template-columns: min-content auto;
    transition: all 0.3s ease;
    background-color: var(--layout-extended-bg, transparent);
    position: relative;
    border-top: var(--layout-extended-column-border, none);
    border-left: var(--layout-extended-column-border, none);

    container: extend / inline-size;
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

@container extend (width < 920px){
  .extend-layout{
    &__container{
      grid-template-columns: min-content;
    }
    &__second-col{
      display: var(--second-col-display);
    }
    &__third-col{
      display: var(--third-col-display);
    }
  }
}

@container extend (width < 720px){
  .extend-layout{
    &__container{
      grid-template-columns: min-content;
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
