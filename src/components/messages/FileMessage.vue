<template>
  <div class="file-message">
    <div class="file-message__container">
      <a class="file-message__link" :href="message.url" download>
        <span class="pi pi-file"></span>
        {{ message.filename }}
      </a>
      <span class="file-message__time">22:02</span>
    </div>
  </div>
</template>

<script setup>

// Define props
const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});
// console.log(props.message)

</script>

<style scoped lang="scss">
.file-message {
  &__container {
    position: relative;
    width: fit-content;
    margin: var(--file-message-margin);
    border-radius: var(--file-message-border-radius);
    background-color: var(--file-message-background-color);
  }

  &__link {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    column-gap: var(--file-message-gap);
    color: var(--file-message-link-color);
    padding: var(--file-message-padding);

    span {
      font-size: var(--icon-font-size-medium);
      color: var(--icon-color);
    }
  }

  &__time {
    font-size: 12px;
    position: absolute;
    bottom: 4px;
    right: 8px;

  }
}

.dark {
  .file-message {
    &__container {
      background-color: var(--d-file-message-background-color);
    }

    &__link {
      color: var(--d-file-message-link-color);

      span {
        color: var(--d-icon-color);
      }
    }
  }
}
</style>
