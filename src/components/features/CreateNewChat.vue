<template>
  <div>
    <div
      v-if="showNewChatModal"
      class="new-chat-modal"
    >
      <div class="modal-content">
        <h2>Создать чат</h2>
        <input
          v-if="isChatName"
          v-model="newChatName"
          placeholder="название чата"
        >
        <div class="participant-list">
          <div
            v-for="user in availableUsers"
            :key="user.userId"
            class="participant-item"
          >
            <input
              :id="user.userId"
              v-model="selectedParticipants"
              type="checkbox"
              :value="user.userId"
            >
            <label :for="user.userId">{{ user.name || 'unknown username' }}</label>
          </div> 
        </div>
        <div class="modal-actions">
          <button @click="confirmNewChat">
            Создать
          </button>
          <button @click="cancelNewChat">
            Отмена
          </button>
        </div>
      </div>
    </div>
    <button
      class="create-chat-btn"
      @click="openNewChatModal"
    >
      {{ title }}
    </button>
  </div>
</template>

<script setup>

import { ref } from 'vue';

// Define props
const props = defineProps({
  users: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isChatName: {
    type: Boolean,
    required: false,
    default: false
  }
});


const showNewChatModal = ref(false)
const newChatName = ref('')
const selectedParticipants = ref([])
const availableUsers = ref(props.users)

const emit = defineEmits(['createNewChat'])

const openNewChatModal = () => {
	showNewChatModal.value = true
}

const confirmNewChat = async () => {
	if (selectedParticipants.value.length > 0) {
    if ((newChatName.value && props.isChatName) || !props.isChatName) {
      emit('createNewChat', {
        chatName: newChatName.value,
        users: selectedParticipants.value,
      });
      closeModal();
      resetValues();
    }
	}
}

const closeModal = () => {
  showNewChatModal.value = false;
}

const resetValues = () => {
	newChatName.value = ''
	selectedParticipants.value = []
}

const cancelNewChat = () => {
  closeModal();
	resetValues();
}
</script>

<style scoped>
.new-chat-modal {
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
	border-radius: 8px;
	width: 300px;
}

.participant-list {
	max-height: 200px;
}
.participant-item {
	display: flex;
	align-items: center;
	margin-bottom: 10px;
}

.participant-item input[type='checkbox'] {
	margin-right: 10px;
}

.modal-actions {
	display: flex;
	justify-content: flex-end;
	margin-top: 20px;
}

.modal-actions button {
	margin-left: 10px;
}

.create-chat-btn {
	position: fixed;
	bottom: 20px;
	right: 20px;
	padding: 10px 20px;
	background-color: #007bff;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

.create-chat-btn:hover {
	background-color: #0056b3;
}
</style>
