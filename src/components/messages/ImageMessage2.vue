<template>
  <div class="message-container" :class="{ 'sent': message.isSent, 'received': !message.isSent }">
    <div class="message-content" v-if="!showPreview">
      <img :src="message.url" @click="showPreview = true" alt="Изображение" class="chat-image">
    </div>
    <div v-else class="preview-container">
      <img :src="message.url" alt="Изображение" class="preview-image">
      <button @click="showPreview = false">Закрыть</button>
    </div>
    <div class="message-info">
      <div class="message-status" v-if="message.isSent">
        <span v-if="message.isRead" class="status read">✓</span>
        <span v-else-if="message.isDelivered" class="status delivered">✓</span>
        <span v-else class="status sending">...</span>
      </div>
      <div class="message-time">
        {{ message.time }}
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  props: {
    message: {
      type: Object,
      required: true,
    },
    /*
    imageSrc: {
      type: String,
      required: true,
    },
    isSent: {
      type: Boolean,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      default: false,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    timestamp: {
      type: Number, 
      required: true,
    },
    */
  },
  setup(props) {
    const showPreview = ref(false);
    return {
      showPreview,
    };
  },
};
</script>

<style>
.message-container {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 10px;
}

.message-container.sent {
  background-color: #e0f2f7;
  color: #333;
  margin-left: auto;
}

.message-container.received {
  background-color: #f5f5f5;
  color: #000;
  margin-right: auto;
}

.message-content {
  margin-right: 10px;
}

.chat-image {
  max-width: 200px;
  max-height: 150px;
  cursor: pointer;
}

.preview-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  z-index: 100;
}

.preview-image {
  max-width: 80%;
  max-height: 80vh;
}

.message-info {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.message-status {
  font-size: 12px;
}

.status {
  margin-left: 5px;
}

.status.read {
  color: #34a853;
}

.status.delivered {
  color: #333;
}

.status.sending {
  color: #777;
}


.message-time {
  font-size: 12px;
  color: #777;
  margin-left: 10px;
}
</style>
