<template>
  <div class="sidebar">
    <div class="sidebar__container">
      <ul class="sidebar__list">
        <li
          v-for="(item, index) in props.sidebarItems.filter(i => !i.isFixedBottom)"
          :key="index"
          class="sidebar__item"
          @click="selectItem(item)"
        >
          <!-- :style="{ backgroundColor: item === selectedItem ? 'var(--neutral-300)' : 'transparent' }" -->
          <img
            :src="item.icon"
            :alt="item.name"
            class="sidebar__image"
            :class="{ 'sidebar__image--active': item === selectedItem }"
          >
          <span
            v-if="item.notificationCount"
            :style="{ backgroundColor: item.notificationColor ? item.notificationColor : 'red' }"
          >{{ item.notificationCount > 99 ? '99+' :
            item.notificationCount }}</span>

          <p v-if="item.name">
            {{ getName(item.name) }}
          </p>
        </li>
      </ul>

      <!-- :style="{ backgroundColor: item === selectedItem ? 'var(--neutral-300)' : 'transparent' }"
      @click="selectItem(item)" -->
      <ul class="sidebar__list-fixed">
        <li
          v-for="(item, index) in props.sidebarItems.filter(i => i.isFixedBottom)"
          :key="index"
          class="sidebar__item"
          @click="selectItem(item)"
        >
          <img
            :src="item.icon"
            :alt="item.name"
            class="sidebar__image"
            :class="{ 'sidebar__image--active': item === selectedItem }"
          >
          <span
            v-if="item.notificationCount"
            :style="{ backgroundColor: item.notificationColor ? item.notificationColor : 'red' }"
          >{{ item.notificationCount > 99 ? '99+' :
            item.notificationCount }}</span>

          <p v-if="item.name">
            {{ getName(item.name) }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  sidebarItems: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["selectItem"]);

const selectedItem = ref(null);

const selectItem = (item) => {
  selectedItem.value = item;
  emit('selectItem', item);
};

const getName = (name) => {
  const parts = name.split(' ');
  return parts.length > 2 ? parts.slice(0, 2).join(' ') : name;
}
</script>

<style
  scoped
  lang="scss"
>
.sidebar {
  height: 100%;

  &__container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: var(--sidebar-padding-container);
    box-shadow: var(--sidebar-box-shadow);
    background-color: var(--sidebar-bg-container, transparent);
    border-right: var(--sidebar-border);
  }

  &__list,
  &__list-fixed {
    display: flex;
    flex-direction: column;
    row-gap: var(--sidebar-row-gap-list);
  }

  &__list-fixed {
    padding-top: 10px;
    border-top: 2px solid var(--neutral-300);
  }

  &__item {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 2px;
    align-items: center;
    background-color: transparent;
    border-radius: 50%;

    span {
      position: absolute;
      top: 2px;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 18px;
      height: 18px;
      border-radius: 50%;
      font-size: 10px;
      font-weight: 500;
      color: var(--default-white);
    }

    p {
      font-size: 10px;
      font-weight: var(--sidebar-font-weight-name);
      text-align: center;
      line-height: 1;
    }
  }

  &__image {
    border-radius: 50%;
    object-fit: cover;
    border: 3px solid transparent;
    opacity: 0.8;
    transition: all 0.2s;
    width: var(--sidebar-image-width);
    height: var(--sidebar-image-height);
  }

  &__image--active {
    border: 3px solid var(--emerald-500);
    opacity: 1;
  }
}
</style>
