<template>
  <div class="sidebar">
    <div class="sidebar__container">
      <ul class="sidebar__list">
        <li
          v-for="(item, index) in items.filter(i => !i.isFixedBottom)"
          :key="index"
          class="sidebar__item"
          @click="selectItem(item.itemId)"
        >
          <img
            :src="item.icon"
            :alt="item.name"
            class="sidebar__image"
            :class="{ 'sidebar__image--active': item.selected === true }"
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

      <ul class="sidebar__list-fixed">
        <li
          v-for="(item, index) in items.filter(i => i.isFixedBottom)"
          :key="index"
          class="sidebar__item"
          @click="selectItem(item.itemId)"
        >
          <img
            :src="item.icon"
            :alt="item.name"
            class="sidebar__image"
            :class="{ 'sidebar__image--active': item.selected === true }"
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
import { onMounted, ref, toRef } from 'vue'

const props = defineProps({
  sidebarItems: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const items = toRef(props, 'sidebarItems');

const emit = defineEmits(["selectItem"]);

const selectItem = (itemId) => {
  items.value = items.value.map(u => {
    u.selected = false;
    if(u.itemId === itemId) {u.selected = true}
    return u;
  });
  // item.selected = true;
  emit('selectItem', items.value.find(i => i.itemId === itemId));
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

    box-shadow: var(--sidebar-box-shadow);
  }

  &__list,
  &__list-fixed {
    display: flex;
    flex-direction: column;
    row-gap: 10px
  }

  &__list {
    padding: 18px 8px 8px 8px;
  }

  &__list-fixed {
    padding: 8px 8px 30px 8px;
    border-top: var(--sidebar-border);
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
      font-weight: 500;
      text-align: center;
      line-height: 1;
    }
  }

  &__image {
    border-radius: 50%;
    object-fit: cover;
    width: 49px;
    height: 49px;
    border: 3px solid transparent;
    opacity: 0.8;
    transition: all 0.2s;
  }

  &__image--active {
    border: 3px solid var(--emerald-500);
    opacity: 1;
  }
}
</style>
