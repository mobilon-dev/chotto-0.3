<template>
  <div class="modal-overlay">
    <div class="modal-content">
      <h3>File Preview</h3>
      <div v-if="props.isImage">
        <img
          :src="previewUrl"
          alt="Image Preview"
          class="preview-image"
        >
      </div>
      <div v-else-if="props.isVideo">
        <video
          :src="previewUrl"
          controls
          class="preview-video"
        />
      </div>
      <div v-else>
        <p>Selected file: {{ fileName }}</p>
      </div>

      <!-- Action Buttons -->
      <div class="modal-actions">
        <ChatInput2
          @send="handleSend"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChatInput2 from './ChatInput2.vue';

const props = defineProps({
  previewUrl: {
    type: String,
    required: true,
  },
  isImage: {
    type: Boolean,
    default: false,
  },
  isVideo: {
    type: Boolean,
    default: false,
  },
  fileName: {
    type: String,
    default: '',
  },
	handleSendEventFunction: {
    type: Function,
    required: true,
  },
});

const isModalOpen = ref(false);

const emit = defineEmits(['close', 'upload']);


const handleSend = () => {
	props.handleSendEventFunction();
  isModalOpen.value = false; // Close the modal
};

</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}
.preview-image,
.preview-video {
  max-width: 100%;
  margin-top: 10px;
}
.modal-actions {
  margin-top: 20px;
  text-align: right;
}
.modal-actions button {
  margin-left: 10px;
}
</style>
