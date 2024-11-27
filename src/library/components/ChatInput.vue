<template>
  <div class="chat-input">
    <div class="chat-input__container">
      <div
        v-if="fileLink"
        class="chat-input__first-line"
      >
        <FilePreview
          :preview-url="fileLink.previewUrl"
          :is-image="fileLink.isImage"
          :is-video="fileLink.isVideo"
          :is-audio="fileLink.isAudio"
          :file-name="fileLink.selectedFile.name"
          :file-size="fileSize"
          @reset="resetUploadedFile"
        />
      </div>
      <div class="chat-input__second-line">
        <textarea
          ref="refInput"
          v-model="message"
          class="chat-input__input"
          placeholder="Type a message..."
          @keydown.enter="sendMessage"
          @input="sendTyping"
        />
        <button
          class="chat-input__button-send"
          @click="sendMessage"
        >
          <span class="pi pi-send" />
        </button>
      </div>
      <div class="chat-input__third-line">
        <FileUploader
          style="margin-top: 9px;"
          :filebump-url="filebumpUrl"
          :can-upload-file="canUploadFile"
          @file-uploaded="fileUploaded"
        />

        <button
          class="chat-input__button-emoji"
          @click="toogleDialogEmoji"
        >
          <span class="pi pi-face-smile" />
        </button>
        <Transition>
          <EmojiPicker
            class="chat-input__emoji"
            :native="true"
            :theme="changeThemeDialogEmoji"
            picker-type=""
            @select="onSelectEmoji"
          />
        </Transition>
        <slot name="buttons"></slot>
        

        <ChannelSelector
          style="margin-top: 9px;"
          :channels="channels"
          @select-channel="onSelectChannel"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, unref, watch } from 'vue';
import { FileUploader } from '.';
import FilePreview from './FilePreview.vue';
// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
import ChannelSelector from './ChannelSelector.vue'
import TemplateSelector from './TemplateSelector.vue'
import { useMessage } from '../../helpers/useMessage';
// Define emits
const emit = defineEmits(['send', 'typing', 'selectChannel']);

// Define reactive message state
const message = useMessage()
const refInput = ref(null);
const fileLink = ref(null);
const fileSize = ref('')

const canUploadFile = computed(() => {
  return !fileLink.value || fileLink.value === '';
})

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
  },
  filebumpUrl: {
    type: String,
  }
})


watch(
  () => message.value,
  () => {
    refInput.value.style.height = "auto"
    refInput.value.style.height = refInput.value.scrollHeight + 'px'
  }
);

const sizeMeasurement = ['б', 'Кб', "Мб", "Гб"]


const fileUploaded = (obj) => {
  console.log('fileUploaded', obj);
  if (obj) {
    let size = obj.selectedFile.size
    let index = 0
    while (size > 1024) {
      size = size / 1024
      index++
    }
    size = size.toFixed(2) + sizeMeasurement[index]
    fileSize.value = size
  }
  fileLink.value = obj;
}

const resetUploadedFile = () => {
  console.log('reset uploaded file')
  fileLink.value = null
}

const sendTyping = (event) => {
  // console.log('typing', event.target.value);
  emit('typing', event.target.value);
}

const onSelectChannel = (channel) => {
  emit('selectChannel', channel);
}

// Define the method to send the message
const sendMessage = () => {
  const messageObject = {
    type: null,
    text: null,
  };

  if (fileLink.value) {
    messageObject.type = 'message.' + fileLink.value.type;
    messageObject.url = fileLink.value.url;
    messageObject.filename = fileLink.value.filename;
    messageObject.size = fileLink.value.size;
    messageObject.text = message?.value?.trim();
  } else {
    messageObject.type = 'message.text';
    messageObject.text = message.value.trim();
  }

  emit('send', messageObject);
  fileLink.value = false;
  message.value = null;
  unref(refInput).focus()
};


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
    display: grid;
    align-items: center;
    border-radius: var(--chat-input-border-radius);
    border-top: var(--chat-input-border);
    background-color: var(--chat-input-container-bg);
    padding: 5px;
    grid-gap: 5px;
  }

  &__first-line {
    display: flex;
  }

  &__second-line {
    display: flex;
    grid-gap: 5px;
  }

  &__third-line {
    display: flex;
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
    border: 1px solid var(--neutral-300);
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    background-color: var(--chat-input-background);
    padding: var(--inputtext-padding);
    width: var(--inputtext-width);
    color: var(--inputtext-color);
    font-size: var(--inputtext-font-size);
    white-space: normal;
    overflow-y: hidden;
    resize: none;

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
    border: 0px solid var(--neutral-300);
    ;

    span {
      display: block;
      cursor: pointer;
      padding: 14px;
      font-size: var(--icon-font-size-medium);
      color: var(--chat-input-icon-color);
    }
  }

  &__button-emoji:hover+&__emoji {
    display: inherit;
  }

  &__emoji {
    display: none;
    position: absolute;
    bottom: 50px;
  }

  &__emoji:hover {
    display: inherit;
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
