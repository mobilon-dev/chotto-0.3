<template>
  <div>
    <p>ready?</p>
    <input
      v-model="nameRef"
      type="text"
      @input="handleInput()"
    >
  </div>
</template>

<script setup>
import {toRef} from 'vue'

const emit = defineEmits(['change'])

const props = defineProps({
    name: {
        type: Object,
        default: null,
    },
})

const nameRef = toRef(props, 'name')

const handleInput = () => {
    emit('change', {name: nameRef.value})
}
</script>

