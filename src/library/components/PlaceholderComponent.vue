<template>
  <span
    ref="refPlaceholder"
    :id="'placeholder'"
    contenteditable
    :class="{ 'filled': isFilled, 'empty': !isFilled }"
    class="placeholder"
    @keydown.enter="handleEnter"
    @click="prepare"
  >
    {{ v }}
  </span>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';


const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  isFilled: {
    type: Boolean,
    required: true
  },
});

const emit = defineEmits(['edit'])

const v = ref(props.value)
const refPlaceholder = ref()

const prepare = () => {
  if (!props.isFilled) {
    v.value = ''
  }
}

function validate() {
  v.value = refPlaceholder.value.innerText.trim()
  if (v.value != ''){
    emit('edit', v.value)
  }
  else {
    v.value = 'Заполнить'
  }
}

function handleEnter(event) {
  event.target.blur()
  validate()
}

function handleKey(event) {
    if (event.key === "Escape") {
      if (props.value != v.value)validate()
      event.target.blur()
    }
    if (event.key == 'Tab'){
      event.preventDefault()
    }
}

function handleClickOutside(event) {
  if (event.target.id != 'placeholder' && refPlaceholder.value && !refPlaceholder.value.contains(event.target)) {
    if (props.value != v.value)validate()
  }
}

onMounted(() => {
  window.addEventListener("click", handleClickOutside);
  window.addEventListener("keydown", handleKey);
})

onUnmounted(() => {
  window.removeEventListener("click", handleClickOutside);
  window.removeEventListener("keydown", handleKey);
})
</script>

<style scoped>
.placeholder {
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
  line-height: 1.8;
}

.placeholder.filled {
  background-color: var(--variable-placeholder-filled-color);
}

.placeholder.empty {
  background-color: var(--variable-placeholder-empty-color);
}
</style>
