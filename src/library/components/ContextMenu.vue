<template>
  <div class="context-menu">
    <div class="context-menu__container">
      <ul class="context-menu__list">
        <li
          v-for="(action, index) in props.actions"
          :key="index"
          class="context-menu__item"
          @click="click(index)"
        >
          <img
            v-if="action.icon"
            :src="action.icon"
            width="18"
            height="18"
          >
          <i 
            v-else-if="action.prime"
            :class="'pi pi-' + action.prime" 
          />
          <span>{{ action.title }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  actions: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['click']);

const click = (index) => {
  const action = props.actions[index];
  // console.log('action', action);
  emit('click', action);
}

</script>

<style
  scoped
  lang="scss"
>
.context-menu {
  z-index: 200;
  position: absolute;
  &__container {
    width: max-content;
    max-width: 250px;
    box-shadow: 0px 2px 10px 1px rgba(0, 0, 0, 0.11);
    border-radius: 8px;
    
    background-color: var(--context-menu-background);
  }

  &__list {
    padding: 12px 0;
    display: grid;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 6px;
    padding-left: 0px;
  }

  &__item {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    padding: 0 16px;
    width: inherit;
    column-gap: 12px;
  }

  &__item:not(:last-child) {
    padding-bottom: 6px;
    border-bottom: 1px solid var(--neutral-300);
  }
}
</style>
