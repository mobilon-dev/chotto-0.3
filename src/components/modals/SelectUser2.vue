<template>
  <div>
      <div class="modal-content">
        <h2> {{ title }}</h2>
        <div class="participant-list">
          <div
            v-for="user in users"
            :key="user.userId"
            class="participant-item"
          >
            <input
              :id="user.userId"
              v-model="selectedUsers"
              type="checkbox"
              :value="user.userId"
              @change="onChange"
            >
            <label :for="user.userId">{{ user.name || 'unknown username' }}</label>
          </div> 
        </div>
      </div>
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
});

const selectedUsers = ref([])

const emit = defineEmits(['change']);

const onChange = () => {
  console.log('check');
  emit('change', {selectedUsers: selectedUsers.value});
}

</script>

<style scoped>
.modal-content {
	background-color: white;
	padding: 20px;
	border-radius: 8px;
	width: 300px;
}

.participant-list {
  margin-top: 10px;
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

</style>
