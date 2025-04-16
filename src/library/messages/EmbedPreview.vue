<template>
  <div class="embed-preview">
    <iframe
      v-if="embed.type == 'youtube'"
      class="embed-preview__player"
      :src="embed.url"
      title="YouTube video player"
      frameborder="0" allowfullscreen
    />
    <iframe
      v-else-if="embed.type == 'rutube'"
      class="embed-preview__player"
      :src="embed.url"
      title="YouTube video player"
      frameborder="0" allow="clipboard-write; autoplay" webkitAllowFullScreen mozallowfullscreen allowFullScreen
    />
    <iframe 
      v-else
      class="embed-preview__player"
      :src="embed.url"
    />
  </div>
</template>

<script
  setup
  lang="ts"
>

const props = defineProps({
  embed: {
    type: Object,
    required: true,
  },
});
</script>

<style
  scoped
  lang="scss"
>
.embed-preview {
  border-radius: 10px;
  position: relative;
  margin: 10px 0 4px 0;
  padding: 8px 8px 8px 12px;
  overflow: hidden;

  &__player {
    object-fit: cover;
    width: 100%;
    max-height: 300px;
    border-radius: 8px;
    border: none;
  }

  .left {
    background-color: var(--chotto-message-left-secondary-bg);
  }

  .right {
    background-color: var(--chotto-message-right-secondary-bg);
  }
}
</style>
