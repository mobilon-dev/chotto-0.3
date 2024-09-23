<script setup>
const props = defineProps({
  message: {
    type: Object,
  }
});
</script>

<template>
  <div class="dateMessage">
    <p class="dateMessage__text">{{ message.message }}</p>
  </div>
</template>

<style scoped lang="scss">
.dateMessage {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0 auto;
  padding: 15px 0;
  width: 150px;
  height: 40px;

  &__text {
    width: 100%;
    padding: 10px 15px;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    -webkit-box-shadow:
      0 2px 5px 0 rgba(193, 193, 193, 0.26),
      0 2px 10px 0 rgba(193, 193, 193, 0.16);
    -moz-box-shadow:
      0 2px 5px 0 rgba(193, 193, 193, 0.26),
      0 2px 10px 0 rgba(193, 193, 193, 0.16);
    box-shadow:
      0 2px 5px 0 rgba(193, 193, 193, 0.26),
      0 2px 10px 0 rgba(193, 193, 193, 0.16);
    font-size: 16px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.7);
    text-align: center;
  }
}
</style>
