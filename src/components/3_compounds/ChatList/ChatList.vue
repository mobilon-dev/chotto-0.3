<template>
  <div class="chat-list">
    <div
      class="chat-list__title-container"
    >
      <h2
        v-if="titleEnabled"
        class="chat-list__title"
      >
        {{ t('component.ChatList.Title') }}
      </h2>

      <slot name="actions" />
    </div>


    <!--  ???? не понятно зачем этот слот  -->
    <slot name="sidebar" />

    <ChatFilter
      v-if="filterEnabled"
      class="chat-list__filter"
      @update="getFilter"
    />

    <ChatTabs
      v-if="dialogTabs && dialogTabs.length > 0"
      :tabs="dialogTabs"
      @tab-click="handleTabClick"
    />

    <!-- Индикатор поиска -->
    <div 
      v-if="isSearching || searchQuery"
      class="chat-list__search-indicator"
    >
      <div class="chat-list__search-content">
        <div class="chat-list__search-text">
          <span
            v-if="isSearching"
            class="chat-list__search-progress"
          >
            {{ searchProgress || 'Поиск...' }}
          </span>
          <span
            v-else
            class="chat-list__search-query"
          >
            Поиск "{{ searchQuery }}" завершён
            <span
              v-if="searchStats.loaded > 0"
              class="chat-list__search-stats"
            >
              ({{ searchStats.loaded }} {{ searchStats.total !== '?' ? `из ${searchStats.total}` : '' }})
            </span>
          </span>
        </div>
        <button 
          v-if="searchQuery"
          class="chat-list__search-clear"
          title="Очистить поиск"
          @click="emit('clear-search')"
        >
          <i class="pi pi-times" />
        </button>
      </div>
    </div>

    <div 
      ref="refChatList"
      class="chat-list__items"
      @scroll="scrollCheck"
      @mousedown="startScrollWatch"
      @mouseup="stopScrollWatch"
    >
      <div class="chat-list__fixed-items-top">
        <ChatItem
          v-for="chat in getSortedAndFilteredChats().filter(c => c.isFixedTop)"
          :key="chat.chatId"
          class="chat-list__item"
          :chat="chat"
          @select="selectChat"
          @expand="expandChat"
          @action="action"
        />
      </div>

      <div class="chat-list__scrollable-items">
        <ChatItem
          v-for="chat in getSortedAndFilteredChats().filter(c => !c.isFixedBottom && !c.isFixedTop)"
          :key="chat.chatId"
          class="chat-list__item"
          :chat="chat"
          @select="selectChat"
          @expand="expandChat"
          @action="action"
        />
      </div>

      <div class="chat-list__fixed-items-bottom">
        <ChatItem
          v-for="chat in getSortedAndFilteredChats().filter(c => c.isFixedBottom)"
          :key="chat.chatId"
          class="chat-list__item"
          :chat="chat"
          @select="selectChat"
          @expand="expandChat"
          @action="action"
        />
      </div>
    </div>
    <transition>
      <button
        v-if="isShowButton"
        class="chat-list__button-up"
        @click="scrollToTopForce"
      >
        <span class="pi pi-angle-up chat-list__icon-down" />
      </button>
    </transition>
  </div>
</template>

<script setup>
import { ref, unref, watch, nextTick } from 'vue';
import { ChatItem, ChatFilter, ChatTabs } from "@/components";
import { t } from '../../../locale/useLocale';

// Define props
const props = defineProps({
  chats: {
    type: Array,
    required: true,
  },
  filterEnabled: {
    type: Boolean,
    required: true,
  },
  titleEnabled: {
    type: Boolean,
    default: true,
  },
  filterQuery: {
    type: String,
    default: null
  },
  dialogTabs: {
    type: Array,
    default: () => [],
  },
  activeTabId: {
    type: String,
    default: 'all',
  },
  // Props для поиска
  searchQuery: {
    type: String,
    default: '',
  },
  isSearching: {
    type: Boolean,
    default: false,
  },
  searchProgress: {
    type: String,
    default: '',
  },
  searchStats: {
    type: Object,
    default: () => ({ loaded: 0, total: '?' }),
  },
});

// Define emits
const emit = defineEmits(['select', 'action', 'loadMoreChats', 'expand', 'tab-click', 'search', 'clear-search']);

const filter = ref('');
const refChatList = ref()

const allowLoadMore = ref(false)
const isShowButton = ref(false)
const isScrollByMouseButton = ref(false)


function scrollToTopForce() {
  nextTick(function () {
    const element = unref(refChatList);
    element.scrollTop = 0;
  })
}

const scrollCheck = () => {
  const element = unref(refChatList);
  const scrollBottom = element.scrollHeight - element.scrollTop - element.clientHeight;
  if (element.scrollTop > 500){
    isShowButton.value = true
  }
  if (element.scrollTop <= 500){
    isShowButton.value = false
  }

  if (isScrollByMouseButton.value){
    if (scrollBottom < 300){    
      allowLoadMore.value = true  
    }
  }
  else{
    if (scrollBottom < 300){
      allowLoadMore.value = true
    }
    if (scrollBottom >= 300){
      allowLoadMore.value = false
    }
  }
};

watch(
  () => allowLoadMore.value,
  () => {
    if (allowLoadMore.value)
      emit('loadMoreChats')
  }
)

watch(
  () => props.chats,
  () => {
    allowLoadMore.value = false
    if (isScrollByMouseButton.value){
      const element = unref(refChatList);
      element.scrollTop = element.scrollHeight
    }
  }
)

const startScrollWatch = (event) => {
  const element = unref(refChatList);
  const isScrollbar = event.offsetX > element.clientWidth || event.offsetY > element.clientHeight;
  if (isScrollbar) {
    isScrollByMouseButton.value = true
  }
}

const stopScrollWatch = () => {
  isScrollByMouseButton.value = false
}

const expandChat = (args) => {
  emit('expand', args)
}

// Define method
const selectChat = (args) => {
  props.chats.forEach(c => {
    c.isSelected = false
    if (c.dialogs) 
      c.dialogs.forEach(d => {
        d.isSelected = false
      })
  });
  if (args.dialog) {
    selectDialog(args.dialog)
  }
  const c = props.chats.find(c => c.chatId === args.chat.chatId);
  c.isSelected = true;
  emit('select', args);
};

const selectDialog = (dialog) => {
  props.chats.forEach(c => {
    c.isSelected = false
    if (c.dialogs) 
      c.dialogs.forEach(d => {
        d.isSelected = false
        if (d.dialogId == dialog.dialogId)
        d.isSelected = true
      })
  });
}

const getSortedAndFilteredChats = () => {
  console.log('🔍 ChatList filtering:', {
    totalChats: props.chats.length,
    searchQuery: props.searchQuery,
    activeTabId: props.activeTabId,
    filterValue: filter.value,
    chatsStoreLength: props.chats?.length || 0
  });
  
  // Проверяем, есть ли чаты в props
  if (!props.chats || props.chats.length === 0) {
    console.log('⚠️ ChatList: No chats in props!');
    return [];
  }
  
  const result = props.chats
    .toSorted((a, b) => {
      if (Number(a['lastActivity.timestamp']) > Number(b['lastActivity.timestamp'])) return -1;
      if (Number(a['lastActivity.timestamp']) < Number(b['lastActivity.timestamp'])) return 1;
      if (Number(a['lastActivity.timestamp']) == Number(b['lastActivity.timestamp'])) return 0;
    })
    .toSorted((a, b) => {   // immutable sort
      if (a.countUnread > b.countUnread) return -1;
      if (a.countUnread < b.countUnread) return 1;
      if (a.countUnread == b.countUnread) return 0;
    })
    .filter(c => {
      // Универсальная фильтрация по табам
      if (props.activeTabId === 'all') {
        // Показываем все чаты
      } else if (props.activeTabId === 'countUnread') {
        // Показываем только чаты с непрочитанными сообщениями
        if (c.countUnread <= 0) return false;
      } else if (props.activeTabId.startsWith('tag_')) {
        // Показываем чаты с определенным тегом
        if (!c.contact?.tags || !c.contact.tags.some(tag => tag.tagId === props.activeTabId)) {
          return false;
        }
      }
      
      // Фильтрация по тексту (только если не в режиме поиска)
      if (props.searchQuery && props.searchQuery.trim() !== '') {
        // В режиме поиска показываем все чаты из store (они уже отфильтрованы API)
        return true;
      } else {
        // Обычная локальная фильтрация
        if (!props.filterQuery)
          return c.name.includes(filter.value) ||
            c.metadata.includes(filter.value);
        else 
          return c.name.includes(props.filterQuery) ||
            c.metadata.includes(props.filterQuery);
      }
    });
  
  console.log('📊 ChatList filtering result:', {
    filteredChats: result.length,
    firstFewChats: result.slice(0, 3).map(c => ({ id: c.chatId, name: c.name }))
  });
  
  return result;
}

const getFilter = (value) => {
  filter.value = value;
  // Если есть поисковый запрос, эмитим событие поиска
  if (value.trim() !== '') {
    emit('search', value);
  } else {
    // Если поле поиска очищено, эмитим событие очистки поиска
    emit('clear-search');
  }
}

const action = (data) => emit('action', data);


const handleTabClick = (tabId) => {
  emit('tab-click', tabId);
};

// Добавляем watcher для отслеживания изменений в props (после всех объявлений)
watch(() => props.chats, (newChats, oldChats) => {
  console.log('🔄 ChatList props.chats changed:', {
    oldLength: oldChats?.length || 0,
    newLength: newChats?.length || 0,
    searchQuery: props.searchQuery
  });
}, { deep: true });

watch(() => props.searchQuery, (newQuery, oldQuery) => {
  console.log('🔄 ChatList props.searchQuery changed:', {
    oldQuery,
    newQuery
  });
});
</script>

<style scoped lang="scss">
@use './styles/ChatList.scss';
</style>
