<template>
  <div class="chat-input">
    <div class="chat-input__container">
      <Transition>
        <EmojiPicker
          v-if="enabledEmojiPicker"
          class="chat-input__emoji"
          :native="true"
          :theme="changeThemeDialogEmoji"
          picker-type=""
          @select="onSelectEmoji"
        />
      </Transition>
      <FileUploader
        :can-upload-file="canUploadFile"
        @file-uploaded="fileUploaded"
      />

      <input
        ref="refInput"
        v-model="message"
        class="chat-input__input"
        placeholder="Type a message..."
        @keydown.enter="sendMessage"
        @input="sendTyping"
      >

      <button
        class="chat-input__button-template"
        @click="isOpenTemplateSelector = !isOpenTemplateSelector"
      >
        <span class="pi pi-objects-column" />
      </button>

      <transition>
        <TemplateSelector
          v-if="isOpenTemplateSelector"
          :templates="templates.templates"
          @close-template-window="isOpenTemplateSelector = !isOpenTemplateSelector"
          @paste-template="pastedTemplate"
        />
      </transition>

      <ChannelSelector :channels="channels" />

      <button
        class="chat-input__button-emoji"
        @click="toogleDialogEmoji"
      >
        <span class="pi pi-face-smile" />
      </button>

      <button
        class="chat-input__button-send"
        @click="sendMessage"
      >
        <span class="pi pi-send" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, unref } from 'vue';
import { FileUploader } from '.';

// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
import ChannelSelector from './ChannelSelector.vue'
import TemplateSelector from './TemplateSelector.vue'

// Define emits
const emit = defineEmits(['send', 'typing']);

// Define reactive message state
const message = defineModel();
const refInput = ref(null);
const fileLink = ref(null);

const isOpenTemplateSelector = ref(false)

const canUploadFile = computed(() => {
  return !fileLink.value || fileLink.value === '';
})

const enabledEmojiPicker = ref(false) // это типа показывать или нет панель выбора емоджи

const pastedTemplate = (template) => {
  message.value = template
  isOpenTemplateSelector.value = !isOpenTemplateSelector.value
}

const props = defineProps({
  enableEmoji: {
    type: Boolean,
    required: false,
    default: false,
  },
  channels: {
    type: Array,
    required: false,
    default: () => { return [] }
  },

  templates: {
    type: Array,
    required: false,
    default: () => { return [] }
  }

  // fileUploaderComponent: {
  //   type: Object,
  //   default: null,
  // },
})

const fileUploaded = (obj) => {
  console.log('fileUploaded', obj);
  fileLink.value = obj;
}

const sendTyping = (event) => {
  emit('typing', event.target.value);
}

// Define the method to send the message
const sendMessage = () => {
  enabledEmojiPicker.value = false;
  const messageObject = {
    type: null,
    text: null,
  };

  if (fileLink.value) {
    messageObject.type = 'message.' + fileLink.value.type;
    messageObject.url = fileLink.value.url;
    messageObject.filename = fileLink.value.filename;
    messageObject.text = message?.value?.trim();
    messageObject.size = fileLink.value.size;
  } else {
    messageObject.type = 'message.text';
    messageObject.text = message.value.trim();
  }

  emit('send', messageObject);
  fileLink.value = false;
  message.value = '';
  unref(refInput).focus()
};

const toogleDialogEmoji = () => {
  enabledEmojiPicker.value = !enabledEmojiPicker.value;
}

const changeThemeDialogEmoji = computed(() => {
  if (document.documentElement.classList.contains('dark')) {
    return 'dark'
  }
})

const onSelectEmoji = (emoji) => {
  message.value = (message.value ? message.value : '') + emoji.i;
  // console.log('emoji', emoji)
}
</script>

<style
  scoped
  lang="scss"
>
.chat-input {
  &__container {
    position: relative;
    display: flex;
    align-items: center;
    padding-top: 22px;
    border-radius: var(--chat-input-border-radius);
    border-top: var(--chat-input-border);
    background-color: var(--chat-input-background);
  }

  &__button-file {
    input {
      position: absolute;
      z-index: -1;
      opacity: 0;
      display: block;
      width: 0;
      height: 0;
    }

    span {
      display: block;
      cursor: pointer;
      padding: 14px;
      font-size: var(--icon-font-size-medium);
      color: var(--chat-input-icon-color);
    }
  }

  &__input {
    border: none;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    background-color: transparent;
    padding: var(--inputtext-padding);
    width: var(--inputtext-width);
    color: var(--chat-input-color);
    font-size: var(--inputtext-font-size);

    &:focus-visible {
      outline: none;
    }

    &::placeholder {
      color: var(--chat-input-placeholder-color);
    }
  }

  &__button-emoji,
  &__button-send,
  &__button-template {
    background-color: transparent;
    border: none;

    span {
      display: block;
      cursor: pointer;
      padding: 14px;
      font-size: var(--icon-font-size-medium);
      color: var(--chat-input-icon-color);
    }
  }

  &__emoji {
    position: absolute;
    bottom: 80px;
    right: 1%;
  }
}

.v-enter-active {
  transition: all 0.2s ease-out;
}

.v-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
