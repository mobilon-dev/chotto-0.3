<template>
	<div class="new-chat-modal" v-if="showNewChatModal">
		<div class="modal-content">
			<h2>Create New Chat</h2>
			<input v-model="newChatName" placeholder="Enter chat name" />
			<div class="participant-list">
				<div
					v-for="user in availableUsers"
					:key="user._id"
					class="participant-item"
				>
					<input
						type="checkbox"
						:id="user._id"
						v-model="selectedParticipants"
						:value="user._id"
					/>
					<label :for="user._id">{{ user.name || 'unknown username' }}</label>
				</div> 
			</div>
			<div class="modal-actions">
				<button @click="confirmNewChat">Create</button>
				<button @click="cancelNewChat">Cancel</button>
			</div>
		</div>
	</div>
	<button @click="openNewChatModal" class="create-chat-btn">
		+ CREATE NEW CHAT
	</button>
</template>

<script setup>

import { defineProps, ref } from 'vue';
import { useChatsStore } from '../../stores/useChatStore';

// Define props
const props = defineProps({
  dataProvider: {
    type: Object,
    required: true,
  },
	selectChat: {
		type: Function,
		required: true,
	}
});
const chatsStore = useChatsStore()

const showNewChatModal = ref(false)
const newChatName = ref('')
const selectedParticipants = ref([])
const availableUsers = ref([])
	const openNewChatModal = () => {
	showNewChatModal.value = true
	fetchAvailableUsers()
}

const fetchAvailableUsers = async () => {
	availableUsers.value = await props.dataProvider.getAvailableUsers()
	console.log(availableUsers.value, 'availableUsers.value')
}

const confirmNewChat = async () => {
	if (newChatName.value && selectedParticipants.value.length > 0) {
		console.log(selectedParticipants.value, 'selectedParticipants.value')
		const newChat = await props.dataProvider.createChat({
			name: newChatName.value,
			participants: selectedParticipants.value,
		})
		chatsStore.chats.push(newChat)
		showNewChatModal.value = false
		newChatName.value = ''
		selectedParticipants.value = []
		props.selectChat(newChat._id)
	}
}

const cancelNewChat = () => {
	showNewChatModal.value = false
	newChatName.value = ''
	selectedParticipants.value = []
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