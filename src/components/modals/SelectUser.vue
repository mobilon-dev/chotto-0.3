<script setup lang="ts">
  import {ref} from 'vue';
  import { VueFinalModal } from 'vue-final-modal'

  defineProps<{
    title?: string,
    users: object[],
  }>()

  const emit = defineEmits(['confirm']);

  const selectedUsers = ref([]);

  const onConfirm = () => {
    console.log('confirm', 'eeeee eeeee');
    emit('confirm', selectedUsers.value);
  }
  </script>

  <template>
    <VueFinalModal
      class="confirm-modal"
      content-class="confirm-modal-content"
      overlay-transition="vfm-fade"
      content-transition="vfm-fade"
    >
      <h1>{{ title }}</h1>
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
            >
            <label :for="user.userId">{{ user.name || 'unknown username' }}</label>
          </div> 
        </div>
      <button @click="onConfirm">
        Confirm
      </button>
    </VueFinalModal>
  </template>

  <style>
  .confirm-modal {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .confirm-modal-content {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    background: #fff;
    border-radius: 0.5rem;
  }
  .confirm-modal-content > * + *{
    margin: 0.5rem 0;
  }
  .confirm-modal-content h1 {
    font-size: 1.375rem;
  }
  /*
  .confirm-modal-content button {
    margin: 0.25rem 0 0 auto;
    padding: 0 8px;
    border: 1px solid;
    border-radius: 0.5rem;
  }
  */
  .dark .confirm-modal-content {
    background: #000;
  }
  </style>
