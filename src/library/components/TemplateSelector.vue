<template>
  <div class="template-selector">
    <div class="template-selector__container">
      <button class="template-selector__button-close">
        <span
          class="pi pi-times"
          @click="$emit('closeTemplateWindow')"
        />
      </button>

      <ul class="template-selector__list">
        <li
          v-for="(item, index) in templates"
          :key="index"
          class="template-selector__item"
          :class="{ 'template-selector__item-selected': item.isSelected }"
          @click="selectTemplate(item)"
        >
          <p class="template-selector__item-group">
            {{ item.groupId }}
          </p>

          <div class="template-selector__item-template">
            <p class="template-selector__item-title">
              {{ item.title }}
            </p>
            <p class="template-selector__item-text">
              {{ item.template }}
            </p>
          </div>
        </li>
      </ul>

      <div class="template-selector__preview-container">
        <div
          v-if="selectedTemplate"
          class="template-selector__preview"
        >
          <div class="template-selector__preview-wrapper">
            <p class="template-selector__preview-text">
              {{ selectedTemplate.template }}
            </p>
            <p class="template-selector__preview-time">
              22:22
            </p>
          </div>
        </div>

        <p
          v-else
          class="template-selector__preview-title"
        >
          Предпросмотр шаблона
        </p>
      </div>

      <button
        class="template-selector__button-paste"
        @click="$emit('pasteTemplate', selectedTemplate.template)"
      >
        Вставить
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  templates: {
    type: Array,
    required: false,
    default: () => { return [] }
  }
})

const emit = defineEmits(['closeTemplateWindow', 'pasteTemplate'])

const selectTemplate = (item) => {
  props.templates.forEach(c => c.isSelected = false);
  const c = props.templates.find(c => c.templateId === item.templateId);
  c.isSelected = true;
};

const selectedTemplate = computed(() => props.templates.find(item => item.isSelected))
</script>

<style
  scoped
  lang="scss"
>
.template-selector {
  position: absolute;
  bottom: 124px;
  left: 0;
  right: 0;
  z-index: 100;


  &__container {
    display: grid;
    grid-template-columns: 1.3fr 1fr;
    grid-template-rows: min-content 1fr min-content;
    column-gap: 14px;
    width: 100%;
    height: 500px;
    padding: 16px 20px 10px 20px;
    background-color: var(--template-selector-bg);
    border: 1px solid var(--neutral-200);
  }

  &__button-close {
    grid-column: 2;
    align-self: flex-start;
    display: block;
    background-color: transparent;
    border: none;
    width: fit-content;
    cursor: pointer;
    margin: 0 16px 20px auto;

    span {
      font-size: var(--icon-font-size-medium);
      color: var(--template-selector-icon-color);
    }
  }

  &__list {
    grid-row: 2 / 5;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    border: 1px solid var(--neutral-200);

    &::-webkit-scrollbar {
      width: 6px;
      background-color: var(--scrollbar-bg);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: var(--scrollbar-thumb-bg);
    }

    &::-webkit-scrollbar-track {
      border-radius: 10px;
    }
  }

  &__item {
    display: grid;
    grid-template-columns: min-content 1fr;
    gap: 20px;
    cursor: pointer;
    transition: 0.2s;
    padding: 10px 12px;

    &:hover {
      background-color: var(--template-selector-item-hover);
    }
  }

  &__item:not(:last-child) {
    border-bottom: var(--template-selector-border);
  }

  &__item-selected {
    background-color: var(--template-selector-item-selected);

    &:hover {
      background-color: var(--template-selector-item-selected);
    }
  }

  &__item-group {
    align-self: center;

  }

  &__item-title {
    margin-bottom: 8px;
    font-weight: 600;
  }

  &__item-text {
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  &__preview-container {
    border: 1px solid var(--neutral-200);
  }

  &__preview {
    height: 100%;
    background-color: var(--template-selector-preview-bg);
    padding: 20px;
    background-image: url('../../../public/chat-background.svg');
  }

  &__preview-wrapper {
    padding: 10px 10px 4px 16px;
    background-color: var(--base-message-left-bg);
    border-radius: 14px;
    max-width: 70%;
  }

  &__preview-title {
    width: 100%;
    height: 100%;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__preview-text {
    font-size: 14px;
  }

  &__preview-time {
    width: fit-content;
    font-size: 10px;
    color: var(--base-message-color-time);
    margin-left: auto;
  }

  &__button-paste {
    grid-column: 2;
    grid-row: 4;
    display: block;
    width: fit-content;
    justify-self: flex-end;
    margin: 16px 0 0 0;
    font-size: 17px;
    background-color: var(--template-selector-button-paste-bg);
    color: var(--template-selector-button-paste-color);
    border: none;
    padding: 8px 16px;
    border-radius: 10px;
    cursor: pointer;
  }
}
</style>
