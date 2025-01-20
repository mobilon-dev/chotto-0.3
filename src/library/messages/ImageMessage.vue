<template>
  <div
    class="image-message"
    :class="getClass(message)"
    :messageId="message.messageId"
    @mouseleave="hideMenu"
  >

    <img
      v-if="message.avatar"
      class="image-message__avatar"
      :src="message.avatar"
      height="32"
      width="32"
    >

    <p
      v-if="message.subText"
      class="image-message__subtext"
    >
      {{ message.subText }}
    </p>

    <div class="image-message__content">
      <BaseReplyMessage
        v-if="message.reply"
        style="margin: 10px 10px 4px 16px;"
        :class="message.position"
        :message="message.reply"
        @reply="handleClickReplied"
      />

      <div
        class="image-message__preview-button"
        @click="isOpenModal = true"
        @mouseenter="showMenu"
        @mouseleave="buttonDownloadVisible = !buttonDownloadVisible"
      >
        <img
          class="image-message__preview-image"
          :style="{ borderRadius: imageBorderRadius }"
          :src="message.url"
          :alt="message.alt"
        >

        <transition name="modal-fade">
          <div
            v-if="buttonDownloadVisible"
            class="image-message__info-container"
          >
            <div
              v-if="message.views"
              @click.stop="viewsAction"
              class="image-message__views"
            >
              <span class="pi pi-eye" />
              <p>{{ message.views }}</p>
            </div>

            <span class="image-message__time">{{ message.time }}</span>

            <div
              v-if="getClass(message) === 'image-message__right' && statuses.includes(message.status)"
              class="image-message__status"
              :class="status"
            >
              <span
                v-if="message.status !== 'sent'"
                class="pi pi-check"
              />
              <span class="pi pi-check" />
            </div>
          </div>
        </transition>

        <transition name="modal-fade">
          <a
            v-if="buttonDownloadVisible"
            @click.stop="() => '//Предотвращаем всплытие события клика'"
            class="image-message__download-button"
            :href="message.url"
            download
            target="_blank"
          >
            <span class="pi pi-download" />
          </a>
        </transition>

      </div>

      <transition name="modal-fade">
        <button
          v-if="buttonMenuVisible && message.actions"
          class="image-message__menu-button"
          @click="isOpenMenu = !isOpenMenu"
        >
          <span class="pi pi-ellipsis-h" />
        </button>
      </transition>


      <transition name="context-menu">
        <ContextMenu
          v-if="isOpenMenu && message.actions"
          class="image-message__context-menu"
          :actions="message.actions"
          @click="clickAction"
        />
      </transition>

      <div
        v-if="message.text"
        class="image-message__text-container"
      >
        <p
          v-html="linkedText"
          @click="inNewWindow"
        ></p>
      </div>

      <LinkPreview
        class="image-message__link-preview"
        :class="message.position"
        v-if="message.linkPreview"
        :linkPreview="message.linkPreview"
      />
    </div>


    <Teleport to="body">
      <transition name="modal-fade">
        <div
          v-if="isOpenModal"
          class="image-message__modal-overlay"
          @click="closeModalOutside"
          @keyup.esc="isOpenModal = false"
        >
          <div class="image-message__modal">
            <button
              class="image-message__modal-close-button"
              @click="closeModal"
            >
              <span>
                <i class="pi pi-times" />
              </span>
            </button>
            <img
              class="image-message__modal-image"
              :src="message.url"
              :alt="message.alt"
            >
          </div>
        </div>
      </transition>
    </Teleport>
  </div>


</template>

<script
  setup
  lang="ts"
>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue';
import linkifyStr from "linkify-string";

import { ContextMenu } from '../components'
import { getStatus, statuses } from "../../helpers";
import { IImageMessage } from '../../types';
import BaseReplyMessage from './BaseReplyMessage.vue'
import LinkPreview from './LinkPreview.vue'

const props = defineProps({
  message: {
    type: Object as () => IImageMessage,
    required: true,
  },
});

const emit = defineEmits(['action', 'reply']);

const isOpenModal = ref(false);

const isOpenMenu = ref(false)
const buttonMenuVisible = ref(false);
const buttonDownloadVisible = ref(false)
const linkedText = ref('')

watch(
  () => props.message.text,
  () => {
    if (props.message.text) {
      linkedText.value = linkifyStr(props.message.text)
    }
  },
  { immediate: true }
)

const handleClickReplied = (messageId) => {
  emit('reply', messageId)
}

function inNewWindow(event) {
  event.preventDefault()
  if (event.target.href)
    window.open(event.target.href, '_blank');
}

const viewsAction = () => {
  emit('action', { messageId: props.message.messageId, type: 'views' });
}

const clickAction = () => { }

const showMenu = () => {
  buttonMenuVisible.value = true;
  buttonDownloadVisible.value = true
};

const hideMenu = () => {
  buttonMenuVisible.value = false;
  isOpenMenu.value = false
};

const imageBorderRadius = computed(() => {
  if (props.message.reply && props.message.text) return '0'
  if (props.message.text) return '8px 8px 0 0'
  if (props.message.reply) return '0 0 8px 8px'
  return '8px'
})

const status = computed(() => getStatus(props.message.status))

function getClass(message) {
  return message.position === 'left' ? 'image-message__left' : 'image-message__right';
}

const closeModal = () => isOpenModal.value = false

const closeModalOutside = (evt) => {
  if (evt.target.classList.contains('image-message__modal-overlay')) {
    closeModal()
  }
}

const handleEscKey = (evt) => {
  if (evt.key === 'Escape' && isOpenModal.value) {
    closeModal()
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleEscKey)
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleEscKey);
});
</script>

<style
  scoped
  lang="scss"
>
.image-message {

  &__content {
    position: relative;
    max-width: 60%;
    border-radius: 14px;
  }

  &__avatar {
    grid-row: 1 / -1;
    align-self: end;
    object-fit: cover;
    margin-bottom: 6px;
    min-width: var(--avatar-width-small);
    min-height: var(--avatar-height-small);
    border-radius: var(--avatar-border-radius);
  }

  &__info-container {
    position: absolute;
    right: 8px;
    bottom: 4px;
    display: flex;
    align-items: center;
    column-gap: 4px;
    border-radius: 12px;
    padding: 6px 10px;
    color: var(--image-message-info-color);
    background-color: var(--image-message-info-bg-color);
  }

  &__download-button {
    position: absolute;
    left: 8px;
    bottom: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 12px;
    padding: 6px 6px;
    background-color: var(--image-message-info-bg-color);
    cursor: pointer;

    span {
      color: var(--image-message-info-color);
      font-size: var(--image-message-download-button-font-size);
    }
  }

  &__views {
    display: flex;
    align-items: center;
    column-gap: 4px;
    cursor: pointer;

    span {
      font-size: var(--base-message-views-icon-font-size);
    }

    p {
      font-size: var(--base-message-views-font-size);
    }
  }

  &__time {
    font-size: var(--base-message-time-font-size);
  }

  &__status {
    display: flex;

    span {
      font-size: var(--base-message-status-font-size);
    }
  }

  .status--received {
    span {

      &:first-child {
        margin-right: -8px;
      }
    }
  }

  .status--read {
    span {
      color: var(--base-message-status-color-read);

      &:first-child {
        margin-right: -8px;
      }
    }
  }

  &__subtext {
    font-weight: var(--base-message-subtext-font-weight);
    font-size: var(--base-message-subtext-font-size);
    color: var(--base-message-subtext-color);
  }

  &__preview-button {
    position: relative;
    display: flex;
    flex-direction: column;
    padding: 0;

  }

  &__preview-image {
    width: 100%;
    max-height: 500px;
    cursor: zoom-in;
  }

  &__modal-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    max-height: 80vh;
  }

  &__modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
    background-color: var(--modal-bg);
    border-radius: var(--modal-border-radius);
    padding: var(--modal-padding);
    max-width: 45%;
    box-shadow: var(--modal-overlay-shadow);
  }

  &__modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--modal-mask-background);
    z-index: 1000;
  }

  &__modal-close-button {
    display: block;
    background-color: transparent;
    border: none;
    padding: 4px;
    margin: 0 0 14px auto;
    cursor: pointer;

    span {
      color: var(--modal-icon-color);
      font-size: var(--modal-icon-font-size);
    }
  }

  &__menu-button {
    position: absolute;
    background-color: transparent;
    border: none;
    transform: translateY(-50%);
    cursor: pointer;
    transition: 0.2s;

    span {
      color: var(--neutral-500);
      font-size: 20px;
    }

    &:hover span {
      color: var(--neutral-700);
      transition: 0.2s;
    }
  }

  &__context-menu {
    position: absolute;
  }

  &__text-container {
    padding: 6px 10px 6px 10px;
    border-radius: 0 0 8px 8px;
    word-wrap: break-word;

    p {
      font-size: var(--base-message-text-font-size);
      word-break: break-all;
    }
  }

  &__link-preview {
    margin: 8px;
  }

  &__left,
  &__right {
    display: grid;
    grid-template-rows: min-content 1fr min-content;
    margin: var(--base-message-margin);
  }

  &__left {
    grid-template-columns: min-content 1fr;

    .image-message__avatar {
      grid-column: 1;
      margin-right: 12px;
    }

    .image-message__subtext {
      grid-column: 2;
      grid-row: 1;
      margin: 0 0 2px 10px;
    }

    .image-message__content {
      grid-column: 2;
      background-color: var(--base-message-left-bg);
    }

    .image-message__menu-button {
      top: 50%;
      right: -40px;
    }

    .image-message__context-menu {
      top: 50%;
      left: 100%;
      margin-top: 20px;
    }
  }

  &__right {
    grid-template-columns: 1fr min-content;

    .image-message__avatar {
      grid-column: 2;
      margin-left: 12px;
    }

    .image-message__subtext {
      grid-column: 1;
      grid-row: 1;
      margin: 0 10px 2px auto;
    }

    .image-message__content {
      grid-column: 1;
      margin-left: auto;
      background-color: var(--base-message-right-bg);
    }

    .image-message__text-container {
      margin-left: auto;
    }

    .image-message__menu-button {
      top: 50%;
      left: -40px;
    }

    .image-message__context-menu {
      top: 50%;
      right: 100%;
      margin-top: 20px;
    }
  }
}

.context-menu-enter-active {
  transition: all 0.1s ease-out;
}

.context-menu-leave-active {
  transition: all 0.1s cubic-bezier(1, 0.5, 0.8, 1);
}

.context-menu-enter-from,
.context-menu-leave-to {
  transform: scale(0.9);
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}
</style>
