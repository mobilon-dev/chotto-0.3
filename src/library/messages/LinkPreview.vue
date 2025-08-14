<template>
  <div class="link-preview">
    <div class="link-preview__container">
      <a
        class="link-preview__link-container"
        :href="linkPreview.url"
        target="_blank"
      >
        <p class="link-preview__title">{{ linkPreview.title }}</p>
        <p class="link-preview__description">{{ linkPreview.description }}</p>
        <img
          class="link-preview__image"
          :src="linkPreview.imageUrl"
          :alt="linkPreview.title"
        >
      </a>
    </div>
  </div>
</template>

<script
  setup
  lang="ts"
>
import { ILinkPreview } from '../../types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const props = defineProps({
  linkPreview: {
    type: Object as () => ILinkPreview,
    required: true,
  },
});
</script>

<style
  scoped
  lang="scss"
>
.link-preview {
  border-radius: 10px;
  position: relative;
  margin: 10px 0 4px 0;
  padding: 8px 8px 8px 12px;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background-color: var(--chotto-message-accent-line-color);
  }


  &__link-container {
    display: flex;
    flex-direction: column;
    color: var(--chotto-primary-text-color);
    font-size: var(--chotto-text-font-size);
  }

  &__title {
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__description {
    margin-bottom: 6px;
  }

  &__image {
    object-fit: cover;
    width: 100%;
    max-height: 300px;
    border-radius: 8px;
  }

  .left {
    background-color: var(--chotto-message-left-secondary-bg);
  }

  .right {
    background-color: var(--chotto-message-right-secondary-bg);
  }
}
</style>
