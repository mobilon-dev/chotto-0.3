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

console.log(props.keyboard)

</script>

<style scoped lang="scss">
  .keyboard{
    &__container{
      display: flex;
      gap: 5px;
      margin-bottom: 5px;
      justify-content: right;
    }
    &__key{
      background: white;
      border: 1px solid;
      border-radius: 3px;
      
      p{
        padding: 5px;
      }
      p:hover{
        cursor: pointer;
      }
    }
  }

</style>
