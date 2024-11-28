<template>
  <button
    class="button"
    @click="toogleDialogEmoji"
  >
    <span class="pi pi-face-smile" />
  </button>
  <Transition>
    <EmojiPicker
      class="emoji"
      :native="true"
      :theme="changeThemeDialogEmoji"
      picker-type=""
      @select="onSelectEmoji"
    />
  </Transition>
</template>

<script setup>
// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker';
import 'vue3-emoji-picker/css';
import {computed} from 'vue'
import { useMessage } from '../../helpers/useMessage';

const {message} = useMessage()

const changeThemeDialogEmoji = computed(() => {
  if (document.documentElement.classList.contains('dark')) {
    return 'dark'
  }
})

const onSelectEmoji = (emoji) => {
  message.value.text = (message.value.text ? message.value.text : '') + emoji.i;
  // console.log('emoji', emoji)
}

</script>

<style
  scoped
  lang="scss"
>
  .button {
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

  .button:hover + .emoji {
    display: inherit;
  }

  .emoji {
    display: none;
    position: absolute;
    bottom: 50px;
  }

  .emoji:hover {
    display: inherit;
  }
</style>
