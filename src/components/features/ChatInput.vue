<template>
  <div class="chat-input">
    <input
      ref="refInput"
      v-model="message"
      placeholder="Type a message..."
      @keydown.enter="sendMessage"
    >
    <button @click="sendMessage">
      Send
    </button>
  </div>
</template>

<script setup>
import { ref, unref } from 'vue';

// Define emits
const emit = defineEmits(['send']);

// Define reactive message state
const message = ref('');
const refInput = ref(null);


// Define the method to send the message
const sendMessage = () => {
  if (message.value.trim()) {
    emit('send', message.value);
    message.value = '';
    unref(refInput).focus()
    
  }
};
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
