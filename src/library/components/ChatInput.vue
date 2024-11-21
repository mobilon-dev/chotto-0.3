<template>
  <div class="chat-input">
    <div class="chat-input__container">
      <div class="chat-input__first-line" v-if="fileLink">
        <FilePreview
          :preview-url="fileLink.previewUrl"
          :is-image="fileLink.isImage"
          :is-video="fileLink.isVideo"
          :fileName="fileLink.selectedFile.name"
          :fileSize="fileSize"
          @reset="resetUploadedFile"
        />
      </div>
      <div class="chat-input__second-line">
        <textarea
          ref="refInput"
          class="chat-input__input"
          @keydown.enter="sendMessage"
          @input="sendTyping"
          v-model="message"
          placeholder="Type a message..."
        
        >
        </textarea>
        <button
          class="chat-input__button-send"
          @click="sendMessage"
        >
          <span class="pi pi-send" />
        </button>
      </div>
      <div class="chat-input__third-line">
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
        
        <button
          class="chat-input__button-emoji"
          @click="toogleDialogEmoji"
        >
          <span class="pi pi-face-smile" />
        </button>
        <ChannelSelector :channels="channels" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, unref, watch } from 'vue';
import { FileUploader  } from '.';
import FilePreview from './FilePreview.vue';
// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
import ChannelSelector from './ChannelSelector.vue'

// Define emits
const emit = defineEmits(['send', 'typing']);

// Define reactive message state
const message = defineModel();
const refInput = ref(null);
const fileLink = ref(null);
const fileSize = ref('')

const canUploadFile = computed(() => {
  return !fileLink.value || fileLink.value === '';
})

const enabledEmojiPicker = ref(false) // это типа показывать или нет панель выбора емоджи

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

  // fileUploaderComponent: {
  //   type: Object,
  //   default: null,
  // },
})


watch(
  () => message.value,
  () => {
    refInput.value.style.height = "auto"
    refInput.value.style.height = refInput.value.scrollHeight + 'px'
  }
);

const sizeMeasurement = ['б','Кб',"Мб","Гб"]


const fileUploaded = (obj) => {
  console.log('fileUploaded', obj);
  if (obj){
    let size = obj.selectedFile.size
    let index = 0
    while(size > 1024){
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

// Define the method to send the message
const sendMessage = () => {
  enabledEmojiPicker.value = false;
  const messageObject = {
    type: null,
    text: null,
  };

  if (fileLink.value) {
    messageObject.type = 'message.file';
    messageObject.text = fileLink.value;
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
    display: grid;
    align-items: center;
    padding-top: 22px;
    border-radius: var(--chat-input-border-radius);
    border-top: 1px solid var(--neutral-300);
    background-color: var(--chat-input-background);
  }
  &__first-line{
    display: flex;
  }
  &__second-line{
    display: flex;
  }
  &__third-line{
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
    border: none;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    background-color: transparent;
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
      color: var(--inputtext-placeholder-color);
    }
  }

  &__button-emoji,
  &__button-send {
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
