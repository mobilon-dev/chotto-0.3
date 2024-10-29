<template>
  <div class="sidebar">
    <div class="sidebar__container">
      <ul class="sidebar__list">
        <!-- :style="{ backgroundColor: item === selectedItem ? 'var(--neutral-300)' : 'transparent' }"
        @click="selectItem(item)" -->
        <li
          v-for="(item, index) in props.sidebarItems.filter(i => !i.isFixedBottom)"
          :key="index"
          class="sidebar__item"
          @click="selectItem(item)"
        >
          <img
            :src="item.icon"
            :alt="item.name"
          >
          <span
            v-if="item.notificationCount"
            :style="{ backgroundColor: item.notificationColor }"
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
          >
          <span
            v-if="item.notificationCount"
            :style="{ backgroundColor: item.notificationColor }"
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
    padding: 18px 8px 30px 8px;
    box-shadow: var(--sidebar-box-shadow);
  }

  &__list,
  &__list-fixed {
    display: flex;
    flex-direction: column;
    row-gap: 10px
  }

  &__item {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 4px;
    align-items: center;
    background-color: transparent;
    border-radius: 50%;

    img {
      border-radius: 50%;
      object-fit: cover;
      width: 46px;
      height: 46px;
    }

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
}
</style>
