<template>
  <div class="profile">
    <div
      v-if="user"
      class="profile__container"
    >
      <h2 class="profile__name">{{ user.name }}</h2>
      <p class="profile__email">{{ user.email }}</p>
      <p class="profile__phone">{{ user.phone }}</p>
    </div>
  </div>
</template>

<script setup>

// Define props
const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<style
  scoped
  lang="scss"
>
.profile {
  &__name {
    font-size: 20px
  }

  &__email {
    font-size: 16px;
  }

  &__phone {
    font-size: 16px;
  }
}
</style>
