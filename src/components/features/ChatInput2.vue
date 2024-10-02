<template>
  <div class="chat-input">
    <div class="chat-input__container">
      <EmojiPicker 
        class="chat-input__emoji" 
        :native="true" 
        :theme="changeThemeDialogEmoji"
        @select="onSelectEmoji"
        v-if="enabledEmojiPicker" 
        pickerType="" 
      />
      <label class="chat-input__button-file">
        <input type="file" />
        <span>
          <i class="pi pi-file-arrow-up"></i>
        </span>
      </label>
      <input class="chat-input__input" v-model="message" ref="refInput" @keydown.enter="sendMessage"
        placeholder="Type a message..." />
      <button class="chat-input__button-emoji" @click="toogleDialogEmoji">
        <span class="pi pi-face-smile"></span>
      </button>
      <button class="chat-input__button-send" @click="sendMessage">
        <span class="pi pi-send"></span>
      </button>

      <!-- <span v-if="channels">
        <Channels :channels="channels"></Channels>
      </span> -->

    </div>

  </div>
</template>

<script setup>
import { computed, ref, unref } from 'vue';

// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';

// Define emits
const emit = defineEmits(['send']);

// Define reactive message state
const message = defineModel();
const refInput = ref(null);
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
    default: () => {return []}
  },
  fileUploaderComponent: {
    type: Object,
    default: null,
  },
})

// Define the method to send the message
const sendMessage = () => {
  enabledEmojiPicker.value = false;
  if (message.value.trim()) {
    emit('send', message.value);
    message.value = '';
    unref(refInput).focus()
  }
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

<style scoped lang="scss">
.chat-input {
  &__container {
    display: flex;
    align-items: center;
    border-radius: 0 0 12px 12px;
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
      font-size: var(--icon-font-size-medium);
      color: var(--icon-color);
      cursor: pointer;
      padding: var(--chat-input-button-padding);
    }
  }

  &__input {
    border: none;
    font-family: 'Montserrat', sans-serif;
    font-weight: 400;
    color: var(--inputtext-color);
    font-size: var(--inputtext-font-size);
    background-color: var(--inputtext-background);
    padding: var(--inputtext-padding);
    width: var(--inputtext-width);

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
      font-size: var(--icon-font-size-medium);
      color: var(--icon-color);
      cursor: pointer;
      padding: var(--chat-input-button-padding);
    }
  }

  &__emoji {
    position: absolute;
    bottom: 7%;
    right: 1%;
  }
}

.dark {
  .chat-input {
    &__container {
      background-color: var(--d-chat-input-background);
    }

    &__button-file {
      span {
        color: var(--d-icon-color);
      }
    }

    &__input {
      color: var(--d-inputtext-color);
      background-color: var(--d-inputtext-background);

      &::placeholder {
        color: var(--d-inputtext-placeholder-color);
      }
    }

    &__button-emoji,
    &__button-send {

      span {
        color: var(--d-icon-color);
      }
    }
  }
}
</style>
