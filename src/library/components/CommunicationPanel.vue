<template>
  <div class="communication-panel" ref="panelRef">
    <!-- Панель с кнопками каналов -->
    <div class="channels-panel" ref="channelsPanelRef">
      <button
        v-for="channel in channelsTypes"
        :key="channel.type"
        :class="['channel-btn', { 
          active: activeChannelType === channel.type,
          hover: hoveredChannel === channel.type && activeChannelType !== channel.type
        }]"
        @click="toggleMenu(channel.type)"
        @mouseenter="hoveredChannel = channel.type"
        @mouseleave="hoveredChannel = null"
      >
        <span class="channel-icon" v-html="channel.icon"></span>
        <span v-if="activeChannelType === channel.type" class="active-indicator"></span>
      </button>
    </div>

    <!-- Меню контактов -->
    <div
      v-if="showMenu && activeChannelType"
      class="attributes-menu"
      :style="{ width: menuWidth }"
    >
      <!-- Заголовок для списка контактов -->
      <div class="menu-header">
        {{ activeChannelType === 'phone' ? 'Телефон' : 'Недавний' }}
      </div>

      <!-- Недавний контакт -->
      <div
        v-if="showRecentAttribute"
        :class="['recent-attribute', { 
          'frozen-hover': isRecentAttributeHovered 
        }]"
        @mouseenter="handleRecentAttributeMouseEnter"
        @mouseleave="handleRecentAttributeMouseLeave"
        @mouseover="resetRegularAttributeHover"
        @click="handleRecentAttributeClick()"
      >
        <div class="attribute-info">
          <span class="attribute-value">{{ recentAttribute?.value }}</span>
        </div>
        <span class="channel-icon-small" v-html="getChannelIcon(activeChannelType)"></span>
      </div>

      <div 
        class="menu-divider" 
        v-if="showRecentAttribute && organizedContactAttributes[activeChannelType]?.length && activeChannelType !== 'phone'"
      ></div>

      <!-- Все контакты -->
      <div
        v-for="attribute in organizedContactAttributes[activeChannelType]"
        :key="attribute.attributeId"
        :class="['attribute-item', { 
          'frozen-hover': isAttributeFrozen(attribute) 
        }]"
        @mouseenter="handleAttributeMouseEnter(attribute)"
        @mouseleave="handleAttributeMouseLeave"
        @click="handleAttributeClick(attribute)"
      >
        <div class="attribute-info">
          <span class="attribute-value">{{ attribute.value }}</span>
        </div>
        <span class="menu-icon">
          <span v-if="hasMultipleChannels(activeChannelType)">></span>
          <span v-else class="channel-icon-small" v-html="getSingleChannelIcon(activeChannelType)"></span>
        </span>
      </div>

      <!-- Второй уровень меню -->
      <div
        v-if="showSubMenu && shouldShowSubMenu"
        class="sub-menu left"
        @mouseenter="keepSubMenuOpen"
        @mouseleave="closeSubMenu"
      >
        <div class="sub-menu-header">
          Канал связи
        </div>
        
        <div
          v-for="channel in availableChannels"
          :key="channel.channelId"
          class="sub-menu-item"
          @click="selectChannel(channel.channelId)"
        >
          <span class="sub-menu-title">{{ channel.title || channel.channelId }}</span>
          <span class="sub-menu-icon" v-html="getChannelIconForChannelId(channel.channelId)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted, computed } from 'vue';
import { buttonIconsData } from './communicationPannelButtons.ts';

const props = defineProps({
  contactAttributes: {
    type: Array,
    required: true,
    default: () => [],
  },
  channels: {
    type: Array,
    required: true,
    default: () => [],
  },
  recentAttributeChannels: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const emit = defineEmits(['select-attribute-channel', 'phone-call']);

// Refs
const panelRef = ref(null);
const channelsPanelRef = ref(null);
const activeChannelType = ref(null);
const hoveredChannel = ref(null);
const showMenu = ref(false);
const showSubMenu = ref(false);
const hoveredAttribute = ref(null);
const menuWidth = ref('0px');
const frozenAttribute = ref(null);
const isRecentAttributeHovered = ref(false);

// Constants
const CHANNEL_TYPES = ['phone', 'whatsapp', 'telegram', 'max', 'sms'];

const channelsTypes = computed(() => 
  CHANNEL_TYPES.map(type => ({
    type,
    icon: buttonIconsData[type] || ''
  }))
);

// Computed properties
const organizedContactAttributes = ref(
  Object.fromEntries(CHANNEL_TYPES.map(type => [type, []]))
);

const recentAttribute = computed(() => 
  activeChannelType.value ? getRecentAttributeByType(activeChannelType.value) : null
);

const showRecentAttribute = computed(() =>
  activeChannelType.value !== 'phone' &&
  recentAttribute.value &&
  props.recentAttributeChannels[activeChannelType.value]?.channelId
);

const availableChannels = computed(() =>
  activeChannelType.value ? getAvailableChannels(activeChannelType.value) : []
);

const shouldShowSubMenu = computed(() =>
  showSubMenu.value &&
  hoveredAttribute.value &&
  availableChannels.value.length > 0 &&
  activeChannelType.value !== 'phone' &&
  hasMultipleChannels(activeChannelType.value)
);

// Methods
const getChannelTypeFromId = (channelId) => {
  if (!channelId) return null;
  
  const [type] = channelId.split('.');
  
  if (type.includes('waba')) return 'whatsapp';
  if (type.includes('telegrambot')) return 'telegram';
  
  return type;
};

const hasMultipleChannels = (channelType) => {
  return props.channels.filter(channel => 
    getChannelTypeFromId(channel.channelId) === channelType
  ).length > 1;
};

const getSingleChannelForType = (channelType) => {
  const channelsForType = props.channels.filter(channel => 
    getChannelTypeFromId(channel.channelId) === channelType
  );
  return channelsForType.length === 1 ? channelsForType[0] : null;
};

const getSingleChannelIcon = (channelType) => {
  const singleChannel = getSingleChannelForType(channelType);
  return singleChannel ? getChannelIconForChannelId(singleChannel.channelId) : getChannelIcon(channelType);
};

const getChannelIconForChannelId = (channelId) => {
  const channelType = getChannelTypeFromId(channelId);
  return getChannelIcon(channelType);
};

const getChannelIcon = (channelType) => {
  return buttonIconsData[channelType] || '';
};

const organizeContactAttributes = () => {
  const organized = Object.fromEntries(CHANNEL_TYPES.map(type => [type, []]));
  
  props.contactAttributes.forEach(attr => {
    if (attr.type === 'telegram') {
      organized.telegram.push(attr);
    } else if (attr.type === 'phone') {
      ['whatsapp', 'max', 'sms', 'phone'].forEach(type => {
        organized[type].push(attr);
      });
    }
  });
  
  organizedContactAttributes.value = organized;
};

const getAvailableChannels = (channelType) => {
  return props.channels.filter(channel => 
    getChannelTypeFromId(channel.channelId) === channelType
  );
};

const getRecentAttributeByType = (channelType) => {
  const recentAttributeId = props.recentAttributeChannels[channelType]?.attributeId;
  return props.contactAttributes.find(attr => attr.id === recentAttributeId);
};

const isAttributeFrozen = (attribute) => {
  return frozenAttribute.value?.id === attribute.id;
};

const toggleMenu = (channelType) => {
  if (activeChannelType.value === channelType) {
    closeMenu();
  } else {
    activeChannelType.value = channelType;
    showMenu.value = true;
    showSubMenu.value = false;
    frozenAttribute.value = null;
    isRecentAttributeHovered.value = false;
    updateMenuWidth();
  }
};

const closeMenu = () => {
  showMenu.value = false;
  activeChannelType.value = null;
  frozenAttribute.value = null;
  isRecentAttributeHovered.value = false;
  showSubMenu.value = false;
};

const handleRecentAttributeClick = () => {
  if (activeChannelType.value === 'phone') {
    handlePhoneCall(recentAttribute.value);
  } else if (!hasMultipleChannels(activeChannelType.value)) {
    const singleChannel = getSingleChannelForType(activeChannelType.value);
    if (recentAttribute.value && singleChannel) {
      selectSingleChannel(recentAttribute.value, singleChannel.channelId);
    }
  } else {
    const recentChannelId = props.recentAttributeChannels[activeChannelType.value]?.channelId;
    if (recentAttribute.value && recentChannelId) {
      selectChannelForRecentAttribute(recentChannelId);
    }
  }
};

const handleAttributeClick = (attribute) => {
  if (activeChannelType.value === 'phone') {
    handlePhoneCall(attribute);
  } else if (!hasMultipleChannels(activeChannelType.value)) {
    const singleChannel = getSingleChannelForType(activeChannelType.value);
    if (singleChannel) {
      selectSingleChannel(attribute, singleChannel.channelId);
    }
  }
};

const handlePhoneCall = (attribute) => {
  if (!attribute) return;
  emit('phone-call', {
    attributeId: attribute.id,
    phoneNumber: attribute.data
  });
  closeMenu();
};

const selectSingleChannel = (attribute, channelId) => {
  emit('select-attribute-channel', {
    attributeId: attribute.id,
    channelId: channelId,
  });
  closeMenu();
};

const selectChannelForRecentAttribute = (channelId) => {
  if (recentAttribute.value) {
    emit('select-attribute-channel', {
      attributeId: recentAttribute.value.id,
      channelId: channelId,
    });
  }
  closeMenu();
};

const handleRecentAttributeMouseEnter = () => {
  if (hasMultipleChannels(activeChannelType.value)) {
    resetRegularAttributeHover();
    isRecentAttributeHovered.value = true;
    showSubMenu.value = true;
  }
};

const handleRecentAttributeMouseLeave = () => {
  if (!showSubMenu.value) {
    isRecentAttributeHovered.value = false;
  }
};

const handleAttributeMouseEnter = (attribute) => {
  if (hasMultipleChannels(activeChannelType.value)) {
    isRecentAttributeHovered.value = false;
    hoveredAttribute.value = attribute;
    showSubMenu.value = true;
    frozenAttribute.value = attribute;
  }
};

const handleAttributeMouseLeave = () => {
  if (!showSubMenu.value) {
    frozenAttribute.value = null;
  }
};

const resetRegularAttributeHover = () => {
  showSubMenu.value = false;
  frozenAttribute.value = null;
  hoveredAttribute.value = null;
};

const keepSubMenuOpen = () => {
  showSubMenu.value = true;
};

const closeSubMenu = () => {
  showSubMenu.value = false;
  frozenAttribute.value = null;
  isRecentAttributeHovered.value = false;
};

const selectChannel = (channelId) => {
  if (isRecentAttributeHovered.value) {
    selectChannelForRecentAttribute(channelId);
  } else if (hoveredAttribute.value) {
    emit('select-attribute-channel', {
      attributeId: hoveredAttribute.value.id,
      channelId: channelId,
    });
  }
  closeMenu();
};

const updateMenuWidth = () => {
  if (channelsPanelRef.value) {
    menuWidth.value = `${channelsPanelRef.value.offsetWidth}px`;
  }
};

const handleClickOutside = (event) => {
  if (panelRef.value && !panelRef.value.contains(event.target)) {
    closeMenu();
  }
};

// Watchers
watch(() => props.contactAttributes, organizeContactAttributes, { deep: true });

// Lifecycle
onMounted(() => {
  updateMenuWidth();
  window.addEventListener('resize', updateMenuWidth);
  document.addEventListener('click', handleClickOutside);
  organizeContactAttributes();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateMenuWidth);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style scoped>
/* Стили остаются без изменений */
.communication-panel {
  position: relative;
  display: inline-block;
}

.channels-panel {
  display: flex;
  background: white;
  border: 0.01rem solid;
  border-radius: 8px;
  border-color: #cdcdcd;
  padding: 0px;
  gap: 0;
  position: relative;
}

.channel-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
  border: none;
  background: transparent;
  border-radius: 0;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  width: 44px;
  height: 44px;
}

.channel-btn:not(:last-child)::after {
  content: '';
  position: absolute;
  right: 0;
  top: 25%;
  bottom: 25%;
  width: 1px;
  background-color: #f8f7f7;
}

.channel-btn:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.channel-btn:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.channel-btn.hover {
  background: #f8f7f7;
}

.channel-btn.active {
  background: #f8f7f7;
  color: #1976d2;
}

.active-indicator {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: #1976d2;
  border-radius: 1px 1px 0 0;
}

.channel-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.attributes-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  border: 1px solid #e9e7e7;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  z-index: 1000;
  max-height: 300px;
}

.menu-header {
  padding: 8px 16px 4px;
  font-size: 12px;
  color: #666;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.recent-attribute,
.attribute-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.recent-attribute:hover,
.attribute-item:hover {
  background: #f8f7f7;
}

.attribute-info {
  display: flex;
  flex-direction: column;
}

.attribute-value {
  font-weight: 500;
  color: #333;
}

.channel-icon-small {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-left: 8px;
}

.menu-icon {
  color: #999;
  font-weight: bold;
  margin-left: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.menu-divider {
  height: 1px;
  background: #e0e0e0;
  margin: 4px 0;
}

.attribute-item.frozen-hover,
.recent-attribute.frozen-hover {
  background: #f8f7f7;
}

.sub-menu {
  position: absolute;
  top: 0;
  right: 100%;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  min-width: 250px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sub-menu-header {
  padding: 8px 12px 4px;
  font-size: 12px;
  color: #666;
  font-weight: 500;
  letter-spacing: 0.5px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 4px;
}

.sub-menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s ease;
  border-radius: 4px;
  gap: 12px;
}

.sub-menu-item:hover {
  background: #f5f5f5;
}

.sub-menu-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  margin-left: auto;
}

.sub-menu-title {
  font-size: 14px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
}
</style>