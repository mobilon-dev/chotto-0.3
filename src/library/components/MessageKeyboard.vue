<template>
  <div class="keyboard__container">
    <div 
      v-for="key in keyboard"
      class="keyboard__key"
      @click="handleClickKey(key)"
    >
      <p>{{ key.text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject } from "vue";
import { useMessage } from "../../helpers/useMessage";
import { IKeyBoard } from "../../types";

const props = defineProps({
  keyboard: {
    type: Array<IKeyBoard>,
    required: true,
  }
});

const chatAppId = inject('chatAppId')
const { setMessageText, setForceSendMessage } = useMessage(chatAppId as string)

const handleClickKey = (key : IKeyBoard) => {
  setMessageText(key.text)
  setForceSendMessage(true)
}

</script>

<style scoped lang="scss">
  .keyboard{
    &__container{
      display: flex;
      gap: 5px;
      justify-content: right;
    }
    &__key{
      background: var(--chat-input-container-bg);
      border: 1px solid var(--chat-input-border);
      border-radius: 3px;
      /*white-space: nowrap;*/
      word-wrap: break-word;
      box-shadow: 0px 0px 10px 5px #EAEAEA;
      max-width: 100%;
      p{
        font-size: var(--base-message-font-size-text);
        padding: 5px;
        /*overflow: hidden;
        text-overflow: ellipsis;*/
      }
      p:hover{
        cursor: pointer;
      }
    }
  }

</style>
