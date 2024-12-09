<template>
  <div class="base" :id="chatAppId">
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
  height: String,
  width: String,
  defaultTheme: {
    type: String,
    default: 'green',
    required: false,
  },
})

const chatAppId = useId()
provide('chatAppId', chatAppId)

const themes = [
  {
    code: "light",
    name: "Light",
  },
  {
    code: "dark",
    name: "Dark",
  },
  {
    code: "green",
    name: "Green",
  },
  {
    code: "diamond",
    name: "Diamond",
  },
];

onMounted(() => {
  const code = themes.find(t => t.code === props.defaultTheme).code;
  console.log(code)
  document.getElementById(chatAppId).dataset.theme = code;
})

</script>

<style lang="scss">
.base {
  &__container {
    transition: all 0.3s ease;
    font-weight: 400;
    background-color: var(--base-container-bg, transparent);
    color: var(--container-color);
    font-family: var(--container-font-family);
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
