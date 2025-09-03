<template>
  <div class="contact-info">
    <div class="contact-info__phone-list">
      <div
        v-for="(attr, index) in contact?.attributes || []"
        :key="attr.id"
        class="contact-info__phone-item"
        :class="{ 'contact-info__phone-item--current-chat': isCurrentChat(attr) }"
      >
        <input
          :id="`phone-${index}`"
          v-model="localSelectedPhone"
          type="radio"
          :value="attr.id"
          @change="onPhoneSelected(attr)"
        >

        <label :for="`phone-${index}`">
          <span class="contact-info__custom-radio">
            <span class="contact-info__radio-inner">
              <CheckIcon
                v-if="localSelectedPhone === attr.id"
              />
            </span>
          </span>

          {{ formatValue(attr.value) }}
          <span
            v-if="isCurrentChat(attr)"
            class="contact-info__badge"
          >
            Текущий чат
          </span>
        </label>
      </div>
    </div>

    <div class="contact-info__channel-section">
      <label class="contact-info__channel-label">Канал связи</label>
      <div class="contact-info__custom-select">
        <div
          class="contact-info__select-trigger"
          @click="isOpen = !isOpen"
        >
          <div class="contact-info__icon">
            <img
              v-if="currentChannel?.icon"
              :src="currentChannel.icon"
              :alt="currentChannel.title"
              width="22"
              height="22"
            >
            <component
              :is="getChannelComponent(currentChannel?.channelId)"
              v-else
              class="contact-info__icon-component"
            />
          </div>
          <span>{{ currentChannel?.title }}</span>
          <div
            class="contact-info__arrow"
            :class="{ 'contact-info__arrow--open': isOpen }"
          />
        </div>

        <div
          v-if="isOpen"
          class="contact-info__select-options"
        >
          <div
            v-for="channel in availableChannels"
            :key="channel.channelId"
            class="contact-info__select-option"
            @click="selectChannel(channel)"
          >
            <div class="contact-info__icon">
              <img
                v-if="channel.icon"
                :src="channel.icon"
                :alt="channel.title"
                width="22"
                height="22"
              >
              <component
                :is="getChannelComponent(channel.channelId)"
                v-else
                class="contact-info__icon-component"
              />
            </div>
            <span>{{ channel.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="contact-info__divider" />

    <div class="contact-info__crm-button">
      <button
        class="contact-info__button"
        @click="$emit('open-crm')"
      >
        <ContactCRMIcon />
        Открыть контакт в CRM
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import ContactCRMIcon from '../icons/ContactCRMIcon.vue';
import CheckIcon from '../icons/CheckIcon.vue';
import WhatsAppIcon from '../icons/WhatsAppIcon.vue';
import TelegramIcon from '../icons/TelegramIcon.vue';

const props = defineProps({
  contact: {
    type: Object,
    required: true,
  },
  currentDialogName: {
    type: String,
    default: '',
  },
  channels: {
    type: Array,
    required: true,
  }
});

const emit = defineEmits(['close', 'open-crm', 'select-phone']);

const localSelectedPhone = ref('');
const localSelectedChannel = ref(null);
const isOpen = ref(false);

const selectChannel = (channel) => {
  localSelectedChannel.value = channel;
  isOpen.value = false;
  console.log(`Выбран канал связи: ${channel.title}`);
};

const extractPhone = (value) => value?.replace(/\D/g, '') || '';

const selectedAttribute = computed(() => {
  return props.contact.attributes?.find(attr => attr.id === localSelectedPhone.value);
});

const currentChannel = computed(() => {
  if (localSelectedChannel.value) {
    return localSelectedChannel.value;
  }

  if (!selectedAttribute.value) return props.channels[0] || null;
  const phone = extractPhone(selectedAttribute.value.value);
  if (!phone) return props.channels[0] || null;

  const found = props.channels.find(ch => {
    const channelTitle = ch.title?.toLowerCase() || '';
    const channelValue = ch.channelId?.toLowerCase() || '';
    const hasPhone = channelTitle.includes(phone);
    const isRelevant = ['whatsapp', 'waba', 'telegram'].some(type => channelValue.includes(type));
    return hasPhone && isRelevant;
  });

  return found || props.channels[0] || { title: 'default', channelId: 'fallback' };
});

const availableChannels = computed(() => {
  return props.channels;
});

const getChannelComponent = (channelId) => {
  if (!channelId) return null;
  if (channelId.includes('whatsapp') || channelId.includes('waba')) return WhatsAppIcon;
  if (channelId.includes('telegram')) return TelegramIcon;
  return null;
};

const formatValue = (value) => {
  const isWhatsapp = value.includes('whatsapp');
  const isTelegram = value.includes('telegram');

  const cleaned = value.replace(/[^0-9X]/gi, '').toUpperCase();

  if (cleaned.length >= 11 || cleaned.includes('X')) {
    const digits = cleaned.slice(-11);
    const countryCode = digits[0] === '8' ? '7' : digits[0];
    const part1 = digits.slice(1, 4) || 'XXX';
    const part2 = digits.slice(4, 7) || 'XXX';
    const part3 = digits.slice(7, 9) || 'XX';
    const part4 = digits.slice(9, 11) || 'XX';

    const formatted = `+${countryCode} ${part1} ${part2}-${part3}-${part4}`;

    return isWhatsapp ? formatted : formatted;
  }

  if (isTelegram) {
    const match = value.match(/@(\S+)/i);
    const username = match ? match[1] : 'неизвестный';
    return `@${username}`;
  }

  return value.trim();
};

const isCurrentChat = (attr) => {
  if (!props.currentDialogName) return false;
  const phone = attr.value.replace(/whatsapp\s+/, '').trim();
  return props.currentDialogName.includes(phone);
};

const onPhoneSelected = (attr) => {
  emit('select-phone', attr);
};

watch(
  () => props.contact,
  () => {
    if (props.contact?.attributes?.length && !localSelectedPhone.value) {
    localSelectedPhone.value = props.contact.attributes[0].id;
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.contact-info {
  margin-top: 28px;
  min-width: 300px;
  font-size: var(--chotto-title-font-size, 16px);

  &__phone-list {
    padding-bottom: 15px;
    margin-left: 6px;
  }

  &__phone-item {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    input[type="radio"] {
      opacity: 0;
      position: absolute;
      width: 0;
      height: 0;
    }

    label {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin: 0;
    }

    &--current-chat {
      .contact-info__badge {
        margin-left: 8px;
        font-size: var(--chotto-text-font-size, 14px);
        color: var(--chotto-secondary-text-color);
      }
    }
  }

  &__custom-radio {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border: 1px solid var(--chotto-secondary-text-color);
    border-radius: 50%;
    margin-right: 11px;
    flex-shrink: 0;
    transition: border-color 0.2s ease;
  }

  &__radio-inner {
    position: relative;
    width: 14px;
    height: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.2s ease;
  }

  &__phone-item label:hover &__custom-radio {
    border-color: var(--chotto-input-focus-border-color);
  }

  &__channel-section {
    margin-bottom: 20px;
  }

  &__channel-label {
    display: block;
    font-size: var(--chotto-text-font-size, 14px);
    color: var(--chotto-secondary-text-color);
    margin: 1px 0 7px 3px;
  }

  &__custom-select {
    position: relative;
    width: 100%;
  }

  &__select-trigger {
    display: flex;
    align-items: center;
    padding: 8px 13px;
    border: var(--chotto-input-border, 1px solid #d0d0d0);
    border-radius: 1px;
    background: var(--chotto-primary-color);
    cursor: pointer;
    font-size: var(--chotto-title-font-size, 16px);
    color: var(--chotto-primary-text-color);
    user-select: none;
    margin-left: 3px;
  }

  &__icon {
    width: 22px;
    height: 22px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  &__arrow {
    margin-left: auto;
    transition: transform 0.2s ease;

    &--open {
      transform: rotate(180deg);
    }
  }

  &__select-options {
    position: absolute;
    top: 100%;
    left: 3px;
    right: 0;
    background: var(--chotto-primary-color);
    border: var(--chotto-input-border, 1px solid #d0d0d0);
    border-top: none;
    border-radius: 0 0 4px 4px;
    max-height: 200px;
    overflow-y: auto;
    z-index: 10;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &__select-option {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;
    font-size: var(--chotto-title-font-size, 16px);
    color: var(--chotto-primary-text-color);
    user-select: none;

    &:hover {
      background-color: var(--chotto-item-background-color-hover, #F6F6F6);
    }
  }

  &__divider {
    width: 368px;
    height: 1px;
    background-color: var(--chotto-item-background-color-focus, #F3F3F3);
    margin-bottom: 13px;
    margin-left: 3px;
  }

  &__button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 6px;
    width: 100%;
    border: none;
    background: transparent;
    cursor: pointer;
    color: var(--chotto-primary-text-color, #1E1E1E);
    font-size: 16px;
    text-align: left;
    border-radius: 4px;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: var(--chotto-item-background-color-hover, #F6F6F6);
    }

    svg, img {
      width: 22px;
      height: 22px;
    }
  }
}
</style>