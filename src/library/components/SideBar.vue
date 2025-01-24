<template>
  <div 
    class="sidebar__container" 
    :id="'sidebar-container-' + chatAppId"
  >
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
</template>

<script setup>
import { toRef, inject, onMounted, unref, ref } from 'vue'

const props = defineProps({
  sidebarItems: {
    type: Array,
    required: true,
    default: [],
  },
});

const chatAppId = inject('chatAppId')
const refContainer = inject('refContainer')

const sidebarContainer = ref()
const onResizeDestination = ref()
const onMountDestination = ref()

const items = toRef(props, 'sidebarItems');

const emit = defineEmits(["selectItem"]);

const resizeObserver = new ResizeObserver((entries) => {
  const containerWidth = entries[0].target.clientWidth

  const sc = unref(sidebarContainer)
  const ord = unref(onResizeDestination)
  const omd = unref(onMountDestination)

  if (containerWidth < 720){
    ord.prepend(sc)
  }
  if (containerWidth > 720){
    omd.prepend(sc)
  }
});

const selectItem = (itemId) => {
  /*
  items.value = items.value.map(u => {
    u.selected = false;
    if(u.itemId === itemId) {u.selected = true}
    return u;
  });
  */
  // item.selected = true;
  const item = items.value.find(i => i.itemId === itemId);
  emit('selectItem', item);
};

const getName = (name) => {
  const parts = name.split(' ');
  return parts.length > 2 ? parts.slice(0, 2).join(' ') : name;
}

onMounted(() => {
  sidebarContainer.value = document.getElementById('sidebar-container-' + chatAppId)
  onResizeDestination.value = document.getElementById('chat-list-sidebar-items-' + chatAppId)
  onMountDestination.value = document.getElementById('sidebar-container-' + chatAppId).parentNode
  if (unref(refContainer)){
    resizeObserver.observe(unref(refContainer))
  }
})

</script>

<style
  scoped
  lang="scss"
>
.sidebar {

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
    padding: 0;
  }

  &__list-fixed {
    padding-top: 10px;
    border-top: var(--sidebar-list-fixed-border-top);
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
      font-size: var(--sidebar-unread-font-size);
      font-weight: var(--sidebar-unread-font-weight);
      color: var(--sidebar-unread-color);
    }

    p {
      font-size: var(--sidebar-name-font-size);
      font-weight: var(--sidebar-name-font-weight);
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
    border: var(--sidebar-image-active-border);
    opacity: 1;
  }
}

@container all (width < 720px) {
  .sidebar{
    &__container{
      display: flex;
      flex-direction: row;
      height: fit-content;
      padding-top: 0px;
      padding-bottom: 5px;
      border-right: 0px;
      background-color: transparent;
    }
    &__list{
      flex-direction: row;
      gap: var(--sidebar-row-gap-list);
    }
    &__item{
      display: block;
      max-width: 70px;
      text-align: center;
      span{
        width: 24px;
        height: 24px;
        left: 45px;
      }
      p{
        font-size: 14px;
      }
    }
    &__list-fixed{
      padding-left: 10px;
      border-left: var(--sidebar-list-fixed-border-top);
      padding-top: 0;
      border-top: 0px;
      margin-right: 10px;
    }
    &__image{
      width: calc(var(--sidebar-image-width) * 1.2);
      height: calc(var(--sidebar-image-height) * 1.2);
    }
  }
}
</style>
