<template>
  <div>
    <input type="text" ref="refInput" @input="update" placeholder="Поиск...">
  </div>
</template>

<script setup>
import { ref, unref } from 'vue';

const refInput = ref('');

// Define emits
const emit = defineEmits(['update']);

// Define method
const update = () => {
  const el = unref(refInput);
  emit('update', el.value);
}

</script>
