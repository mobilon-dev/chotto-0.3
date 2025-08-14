<template>
  <div
    :id="chatAppId"
    class="base"
  >
    <div
      class="base__container"
      :style="{ height, width }"
    >
      <slot name="default" />
    </div>
  </div>
</template>

<script setup>
import { useId, provide, onMounted } from 'vue'

const props = defineProps({
  height: {
    type: String,
    default: '100%'
  },
  width: {
    type: String,
    default: '100%'
  },
  extChatAppId: {
    type: String,
    default: ''
  }
})

const chatAppId = useId()
provide('chatAppId', chatAppId)
provide('extChatAppId', props.extChatAppId ? props.extChatAppId : '')

</script>

<style lang="scss">
.base {
  &__container {
    transition: all 0.3s ease;
    font-weight: var(--chotto-container-font-weight);
    color: var(--chotto-primary-text-color);
    font-family: var(--chotto-container-font-family);
    container: all / inline-size;
    min-width: 480px;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  input,
  button {
    font-family: var(--chotto-container-font-family);
  }

  p,
  h1,
  h2 {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
  opacity: 1;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
