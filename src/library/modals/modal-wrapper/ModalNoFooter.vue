<script setup>
const emit = defineEmits(['close'])

const props = defineProps({
  theme: {
    type: String,
    required: false,
    default: 'light'
  }
})

const closeModalOutside = (evt) => {
  if (evt.target.classList.contains('modal-backdrop')) {
    emit('close')
  }
}

</script>

<template>
  <transition name="modal-fade">
    <div 
      :data-theme="theme"
      class="modal-backdrop"
      @click="closeModalOutside"
    >
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <slot name="default" />
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;  
    align-items: center;
    z-index:1000;
}

.modal {
    background: var(--chotto-modal-bg);
    color: var(--chotto-primary-text-color);
    font-family: var(--chotto-container-font-family);
    overflow-x: auto;
    display: flex; 
    flex-direction: column;
    position: relative;
    padding: 20px 10px;
}

.buttons {
  display: block;
  margin: 10px 10px 10px 10px;
}

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.5s ease;
}
</style>
