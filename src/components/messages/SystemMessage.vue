<template>
  <div class="system-message">
    <div class="system-message__container">
      <p class="system-message__text">
        {{ message.text }}
      </p>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
});

</script>

<style
  scoped
  lang="scss"
>
.system-message {
  &__container {
    width: 54%;
    border-radius: 10px;
    padding: 10px;
    margin: 0 auto 18px auto;
    background-color: #ffeecc;
  }

  &__text {
    font-size: 14px;
    line-height: 1.5;
    text-align: center;
    color: var(--neutral-600)
  }
}
</style>
