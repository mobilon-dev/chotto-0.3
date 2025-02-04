<template>
  <div
    class="modal__overlay"
    @click="closeModalOutside"
    @keyup.esc="emit('close')"
    :data-theme="getTheme().theme"
  >
    <div class="modal__container">
      <button
        class="modal__close-button"
        @click="emit('close')"
      >
        <span>
          <i class="pi pi-times" />
        </span>
      </button>
      <slot />
    </div>
  </div>
</template>

<script setup>
import { inject } from 'vue';
import { useTheme } from '../../../helpers/useTheme';

const emit = defineEmits(['close']);

const chatAppId = inject('chatAppId')

const { getTheme } = useTheme(chatAppId)

const closeModalOutside = (evt) => {
  if (evt.target.classList.contains('modal__overlay')) {
    emit('close')
  }
}

</script>

<style scoped lang="scss">
.modal {
  &__container{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 101;
    background-color: var(--modal-bg);
    border-radius: var(--modal-border-radius);
    padding: var(--modal-padding);
    max-width: 95%;
    width: fit-content;
    box-shadow: var(--modal-overlay-shadow);
  }
    
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--modal-mask-background);
    z-index: 1000;
  }

  &__close-button {
    display: block;
    background-color: transparent;
    border: none;
    padding: 4px;
    margin: 0 0 14px auto;
    cursor: pointer;

    span {
      color: var(--modal-icon-color);
      font-size: var(--modal-icon-font-size);
    }
  }
}

  
</style>
