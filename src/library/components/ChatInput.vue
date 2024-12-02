<template>
  <div class="chat-input">
    <div class="chat-input__container">
      <div
        
        id="chat-input-first-line"
        class="chat-input__first-line"
      />
      <div class="chat-input__second-line">
        <textarea
          ref="refInput"
          v-model="message.text"
          class="chat-input__input"
          :placeholder="$t('chatInputPlaceholder')"
          @keydown.enter="keyEnter"
          @input="sendTyping"
        />
        <button
          class="chat-input__button-send"
          :class="{'chat-input__button-send-disabled' : message.text == ''  && message.fileUrl == '' }"
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

<script setup>
import { ref, unref, watch, nextTick } from 'vue';
import { useMessage } from '../../helpers/useMessage';
// Define emits
const emit = defineEmits(['send', 'typing', 'selectChannel']);
//
// Define reactive message state
const {message, resetMessage} = useMessage()
const refInput = ref(null);

const props = defineProps({
  templates: {
    type: Array,
    required: false,
    default: () => { return [] }
  },
})

watch(
  () => message.value.text,
  () => {
    nextTick(function () {
      refInput.value.style.height = 'auto'
      refInput.value.style.scrollHeight = "auto"
      refInput.value.style.height = refInput.value.scrollHeight + 'px'
    })
  }
);

const sendTyping = (event) => {
  // console.log('typing', event.target.value);
  emit('typing', event.target.value);
}

const keyEnter = (event) => {
  if (event.ctrlKey){
    let caret = event.target.selectionStart;
    event.target.setRangeText("\n", caret, caret, "end");
    message.value.text = event.target.value
  }
  else {
    event.preventDefault()
    sendMessage()
  }
}

// Define the method to send the message
const sendMessage = () => {
  console.log(message.value)
  if (message.value.text != '' || message.value.fileUrl != '' ){
    const messageObject = {
    type: null,
    text: null,
    url: null,
    filename: null,
    size: null,
  };

  if (message.value.fileUrl) {
    messageObject.type = 'message.' + message.value.fileType;
    messageObject.url = message.value.fileUrl;
    messageObject.filename = message.value.fileName;
    messageObject.size = message.value.fileSize;
    messageObject.text = message?.value?.text.trim();
  } else {
    messageObject.type = 'message.text';
    messageObject.text = message.value.text.trim();
  }
  emit('send', messageObject);
  resetMessage()
  unref(refInput).focus()
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
    white-space: pre-wrap;
    max-height: 140px;
    &:focus-visible {
      outline: none;
    }

    &::placeholder {
      color: var(--chat-input-placeholder-color);
    }
  }

  &__button-send{
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
  &__button-send-disabled{
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
