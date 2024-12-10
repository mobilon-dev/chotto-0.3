<template>
  <div class="chat-input">
    <div class="chat-input__container">
      <div
        :id="'chat-input-first-line-' + chatAppId"
        class="chat-input__first-line"
      />
      <div class="chat-input__second-line">
        <textarea
          ref="refInput"
          v-model="getMessage().text"
          class="chat-input__input"
          :placeholder="t('component.ChatInput.InputPlaceholder')"
          @keydown.enter="keyEnter"
          @input="sendTyping"
        />
        <button
          class="chat-input__button-send"
          :class="{ 'chat-input__button-send-disabled': getMessage().text == '' && !getMessage().file }"
          @click="sendMessage"
        >
          <span class="pi pi-send" />
        </button>
      </div>
      <div class="chat-input__third-line">
        <slot name="buttons" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, unref, watch, nextTick, inject } from 'vue';
import { useMessage } from '../../helpers/useMessage';
import { t } from '../../locale/useLocale';
import {IInputMessage} from '../../types';



const emit = defineEmits(['send', 'typing']);

const chatAppId = inject('chatAppId')
const { resetMessage, getMessage, setMessageText } = useMessage(chatAppId as string)

const refInput = ref<HTMLElement>();

/*
const props = defineProps({
  templates: {
    type: Array,
    required: false,
    default: () => { return [] }
  },
})
*/

watch(
  () => getMessage().text,
  () => {
    nextTick(function () {
      emit('typing')
      if (refInput.value){
        refInput.value.style.height = 'auto'
        refInput.value.style.height = refInput.value.scrollHeight + 'px'
      }
    })
  }
);

const sendTyping = (event) => {
  // console.log('typing', event.target.value);
  emit('typing', event.target.value);
}

const keyEnter = (event) => {
  if (event.ctrlKey) {
    let caret = event.target.selectionStart;
    event.target.setRangeText("\n", caret, caret, "end");
    setMessageText(event.target.value)
  }
  else {
    event.preventDefault()
    sendMessage()
  }
}

// Define the method to send the message
const sendMessage = () => {
  const Message = ref(getMessage())
  if (Message.value.text != '' || Message.value.file) {
    const messageObject: IInputMessage = {
      type: '',
      text: '',
      url: '',
      filename: '',
      size: '',
    };

    if (Message.value.file) {
      messageObject.type = 'message.' + Message.value.file.type;
      messageObject.url = Message.value.file.url;
      messageObject.filename = Message.value.file.name;
      messageObject.size = Message.value.file.size.toString();
      messageObject.text = Message?.value?.text.trim();
    } else {
      messageObject.type = 'message.text';
      messageObject.text = Message.value.text.trim();
    }
    emit('send', messageObject);
    resetMessage()
    if (refInput.value) refInput.value.focus()
  }
};

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
    font-weight: 400;
    background-color: var(--chat-input-background);
    padding: var(--input-padding);
    width: var(--input-width);
    color: var(--inputtext-color);
    font-size: var(--input-font-size);
    white-space: normal;
    overflow-y: hidden;
    resize: none;
    white-space: pre-wrap;
    max-height: 140px;

    &:focus-visible {
      outline: none;
    }

    &::placeholder {
      color: var(--input-placeholder-color);
    }
  }

  &__button-send {
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

  &__button-send-disabled {
    span {
      cursor: auto;
      color: var(--chat-input-icon-color-disabled);
    }
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
