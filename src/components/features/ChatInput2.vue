<template>
  <div class="chat-input">
    <input 
      v-model="message"
      ref="refInput" 
      @keydown.enter="sendMessage" 
      placeholder="Type a message..." 
    />

    <span v-if="enableEmoji">
      <button @click="toogleDialogEmoji">😃</button> 
      <EmojiPicker :native="true" @select="onSelectEmoji" v-if="enabledEmojiPicker" 
        pickerType=""
      />
    </span>

    <span v-if="channels">
      <Channels :channels="channels"></Channels>
    </span>
    <button @click="sendMessage">Send</button>
  </div>
</template>

<script setup>
import { ref, unref } from 'vue';
// import picker compopnent
import EmojiPicker from 'vue3-emoji-picker'
import Channels from '../base/Channels2.vue'

// import css
import 'vue3-emoji-picker/css'

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
    default: [],
  }
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

const onSelectEmoji = (emoji) => {
  message.value = (message.value ? message.value : '' ) + emoji.i;
  // console.log('emoji', emoji)
}
</script>

<style scoped>
.chat-input {
  padding: 10px;
}
.chat-input input {
  flex: 1;
  width: 500px;
  padding: 10px;
  border: 1px solid #ece5dd;
  border-radius: 20px;
}
.chat-input button {
  padding: 10px;
  margin-left: 10px;
  border: none;
  background-color: #25d366;
  color: white;
  border-radius: 20px;
  cursor: pointer;
}
.chat-input button:hover {
  background-color: #128c7e;
}
</style>
