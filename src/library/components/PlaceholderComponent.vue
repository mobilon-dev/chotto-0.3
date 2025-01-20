<template>
  <span
    :class="{ 'filled': isFilled, 'empty': !isFilled }"
    class="placeholder"
  >
    {{ value }}
  </span>
</template>

<script setup>
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
</script>

<style scoped>
.placeholder {
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
  line-height: 1.8;
}

.placeholder.filled {
  /*var*/background-color: var(--variable-placeholder-filled-color);
}

.placeholder.empty {
  /*var*/background-color: var(--variable-placeholder-empty-color);
}
</style>
