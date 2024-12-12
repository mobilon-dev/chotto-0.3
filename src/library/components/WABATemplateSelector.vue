<template>
  <div class="template-selector">
    <div class="template-selector__container">
      <button class="template-selector__button-close">
        <span
          class="pi pi-times"
          @click="closeTemplateWindow"
        />
      </button>

      <ul class="template-selector__list-groups">
        <li
          v-for="(item, index) in groupTemplates"
          :key="index"
          class="template-selector__item-group"
          :class="{ 'template-selector__item-selected': selectedGroup === item }"
          @click="clearSelectedTemplate"
        >
          <label class="template-selector__label-group">
            <img
              v-if="item.iconUrl"
              class="template-selector__item-group-icon"
              :src="item.iconUrl"
              :alt="item.title"
            >
            <input
              :id="index"
              v-model="selectedGroup"
              :value="item"
              class="template-selector__input-group"
              type="radio"
            >
            <span>{{ item.title }}</span>
          </label>
        </li>
      </ul>

      <div class="template-selector__searching-container">
        <input
          v-model="searchQuery"
          class="template-selector__searching-input"
          type="text"
          placeholder="Поиск шаблона"
        >
      </div>

      <div class="template-selector__templates">
        <ul
          v-if="searchedTemplate.length !== 0"
          class="template-selector__list-templates"
        >
          <li
            v-for="(item, index) in searchedTemplate"
            :key="index"
            class="template-selector__item-template"
            :class="{ 'template-selector__item-selected': item.isSelected }"
            @click="selectTemplate(item)"
          >
            <div class="template-selector__item-template-info">
              <p class="template-selector__item-title">
                {{ item.title }}
              </p>
              <p class="template-selector__item-text">
                {{ item.template }}
              </p>
            </div>
          </li>
        </ul>

        <p
          v-else
          class="template-selector__plug"
        >
          Шаблоны отсутствуют
        </p>
      </div>


      <div class="template-selector__preview-container">
        <div
          v-if="templateParts.length > 0"
          class="template-selector__preview"
        >
          <div class="template-selector__preview-wrapper">
            <WABAAttachmentSection 
              v-if="selectedTemplate.type != 'TEXT'"
              :type="selectedTemplate.type"
              :templateId="selectedTemplate.templateId"
              @file-selected="handleFileSelected"
            />
            <div class="template-selector__preview-text-container">
              <template
                v-for="(item, index) in templateParts"
                :key="index"
              >
                <span v-if="typeof item === 'string'">{{ item }}</span>
                <PlaceholderComponent
                  v-else-if="typeof item === 'object'"
                  :index="item.index"
                  :value="wabaValues[item.index] || 'Заполнить'"
                  :is-filled="!!wabaValues[item.index]"
                  @click="openModal(item.index)"
                />
              </template>
            </div>
            <p class="template-selector__preview-time">
              22:22
            </p>
            <WABAQuickReplyButtons
              v-if="selectedTemplate.buttons"
              :buttons="selectedTemplate.buttons"

            />
          </div>
        </div>

        <p
          v-else
          class="template-selector__plug"
        >
          Предпросмотр шаблона
        </p>
      </div>

      <transition name="modal-fade">
        <div
          v-if="isModalVisible"
          class="template-selector__modal"
        >
          <input
            ref="inputRef"
            v-model="newValue"
            type="text"
            placeholder="Введите значение"
            :autofocus="isModalVisible"
          >
          <button
            class="template-selector__modal-button-add"
            @click="updateValue"
          >
            Добавить
          </button>
          <button
            class="template-selector__modal-button-cancel"
            @click="closeModal"
          >
            Отменить
          </button>
        </div>
      </transition>


      <button
        class="template-selector__button-paste"
        :disabled="allFieldsUnFilled"
        @click="handlePutMessage"
      >
        Отправить
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive, inject, watch, nextTick } from 'vue'
import { useMessage } from '../../helpers/useMessage';

import PlaceholderComponent from './PlaceholderComponent.vue'
import WABAAttachmentSection from './WABAAttachmentSection.vue';
import WABAQuickReplyButtons from './WABAQuickReplyButtons.vue';
const props = defineProps({
  wabaTemplates: {
    type: Array,
    required: false,
    default: () => { return [] }
  },

  groupTemplates: {
    type: Array,
    required: false,
    default: () => { return [] }
  }
})



const emit = defineEmits(['closeTemplateWindow', 'pasteTemplate', 'sendWabaValues'])

const closeTemplateWindow = () => {
  emit('closeTemplateWindow')
  resetValues()
}

const handlePutMessage = () => {
  emit('closeTemplateWindow')
  if (selectedFile.value){
    emit('sendWabaValues', 
    { 
      templateId: selectedTemplate.value.templateId, 
      values: enteredValues.value, 
      file: selectedFile.value 
    })
  }
  else {
    emit('sendWabaValues', 
    { 
      templateId: selectedTemplate.value.templateId, 
      values: enteredValues.value 
    })
  }
  resetValues()
}

const handleFileSelected = (file) => {
  selectedFile.value = file
}

const selectedGroup = ref(null)
const selectedTemplate = ref(null);
const selectedFile = ref(null)
const searchQuery = ref('');

const selectTemplate = (item) => {
  props.wabaTemplates.forEach(с => с.isSelected = false);
  item.isSelected = true;
  selectedTemplate.value = item;
};

const clearSelectedTemplate = () => {
  props.wabaTemplates.forEach(template => template.isSelected = false);
};

const filteredTemplates = computed(() => {
  if (!selectedGroup.value) {
    return props.wabaTemplates
  }
  return props.wabaTemplates.filter(item => item.groupId === selectedGroup.value.groupId)
})

const searchedTemplate = computed(() => {
  const lowerQuery = searchQuery.value.trim().toLowerCase();
  return filteredTemplates.value.filter((item) => {

    return item.title.toLowerCase().includes(lowerQuery) || item.template.toLowerCase().includes(lowerQuery);
  });
});

// код для подмены переменных

const wabaValues = reactive({});
const isModalVisible = ref(false);
const inputRef = ref(null);
const selectedIndex = ref(null);
const newValue = ref('');

const openModal = (index) => {
  selectedIndex.value = index;
  newValue.value = wabaValues[index] || '';
  isModalVisible.value = true;
};

const closeModal = () => {
  isModalVisible.value = false;
  selectedIndex.value = null;
  newValue.value = '';
};

const updateValue = () => {
  updateWabaValue(selectedIndex.value, newValue.value);
  closeModal();
};

const updateWabaValue = (index, value) => {
  wabaValues[index] = value;
};


const templateParts = computed(() => {
  const template = selectedTemplate.value?.template;
  if (!template) return [];

  const matches = [...template.matchAll(/{{\d+}}/g)];
  const parts = [];
  let lastIndex = 0;

  matches.forEach(match => {
    if (match.index > lastIndex) {
      parts.push(template.substring(lastIndex, match.index));
    }
    parts.push({ index: parseInt(match[0].slice(2, -2)) });
    lastIndex = match.index + match[0].length;
  });

  if (lastIndex < template.length) {
    parts.push(template.substring(lastIndex));
  }

  return parts;
});

// Проверяем что все поля заполнены.
// Сравниваем длину объекта, в котором хранятся значения и количество исходных переменных в шаблоне
const allFieldsUnFilled = computed(() => {
  if (!selectedTemplate.value)
  return true
  const containsVariables = Object.keys(wabaValues).length !== selectedTemplate.value?.template.match(/{{\d+}}/gi).length
  if (selectedTemplate.value.type === 'TEXT')
    return containsVariables
  else if (selectedTemplate.value.type !== 'TEXT')
    return containsVariables || !selectedFile.value
  });

// Сброс значений
const resetValues = () => {
  Object.keys(wabaValues).forEach(key => {
    wabaValues[key] = '';
  });
}

// Свойство получения всего текста
const fullText = computed(() => {
  return templateParts.value.map(item => {
    if (typeof item === 'string') {
      return item;
    } else {
      return wabaValues[item.index];
    }
  }).join('');
});

// Свойство получения введенных значений
const enteredValues = computed(() => {
  const values = [];
  for (const key in wabaValues) {
    if (wabaValues[key] !== '' && wabaValues[key] !== 'Заполнить') {
      values.push(wabaValues[key]);
    }
  }
  return values;
});

// Фокус при открывании модалки
watch(isModalVisible, (newVal) => {
  if (newVal) {
    nextTick(() => {
      inputRef.value.focus();
    });
  }
});
</script>

<style
  scoped
  lang="scss"
>
.template-selector {
  position: absolute;
  bottom: 100%;
  left: 0;
  right: 0;
  z-index: 100;


  &__container {
    position: relative;
    display: grid;
    grid-template-columns: 0.5fr 1.3fr 1fr;
    grid-template-rows: min-content auto 1fr min-content;
    column-gap: 14px;
    width: 100%;
    height: 500px;
    padding: 16px 20px 10px 20px;
    background-color: var(--template-selector-bg);
    border: 1px solid var(--neutral-200);
    box-sizing: border-box;
  }

  &__button-close {
    grid-column: 3;
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

  &__list-groups {
    grid-column: 1;
    grid-row: 2 / 5;
    overflow-y: auto;
    border: 1px solid var(--neutral-200);
    padding: 0;
    margin: 0;

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

  &__list-templates{
    padding: 0;
    margin: 0;
  }

  &__templates {
    grid-column: 2;
    grid-row: 3 / 5;
    border: 1px solid var(--neutral-200);
    overflow-y: auto;

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

  &__item-template,
  &__item-group {
    transition: 0.2s;

    &:hover {
      background-color: var(--template-selector-item-hover);
    }

    &:not(:last-child) {
      border-bottom: var(--template-selector-border);
    }
  }

  &__item-group {
    display: flex;
    align-items: center;
  }

  &__item-selected {
    background-color: var(--template-selector-item-selected);

    &:hover {
      background-color: var(--template-selector-item-selected);
    }
  }

  &__item-template {
    cursor: pointer;
    padding: 10px 12px;
  }

  &__label-group {
    padding: 10px 12px;
    display: flex;
    align-items: center;
    column-gap: 10px;
    width: 100%;
    height: 100%;
    cursor: pointer;

    img {
      width: 30px;
      height: 30px;
    }

    input {
      display: none;
    }

    span {
      line-height: 1;
    }
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

  &__searching-container {
    grid-column: 2;
    grid-row: 2;
    width: 100%;
    margin-bottom: 16px;
    margin-right: 10px;
  }

  &__searching-input {
    background-color: transparent;
    width: var(--input-width);
    padding: var(--input-padding);
    border-radius: var(--input-border-radius);
    font-size: var(--input-font-size);
    color: var(--input-color);
    border: var(--input-border);
    transition: border-color var(--input-transition-duration);
    box-sizing: border-box;

    &::placeholder {
      color: var(--input-placeholder-color);
    }

    &:hover {
      border-color: var(--input-hover-border-color);
    }

    &:focus-visible {
      border-color: var(--input-focus-border-color);
      outline: none;
    }
  }

  &__preview-container {
    grid-row: 2 / 5;
    grid-column: 3;
    border: 1px solid var(--neutral-200);
    max-height: 375px;
    overflow-y: auto;
    background-color: var(--template-selector-preview-bg);
    background-image: url('../../../public/chat-background.svg');

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

  &__preview {
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
  }

  &__preview-wrapper {
    padding: 10px 10px 4px 16px;
    background-color: var(--base-message-left-bg);
    border-radius: 14px;
    max-width: 70%;
    margin-bottom: 15px;
  }

  &__plug {
    width: 100%;
    height: 100%;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
  }

  &__preview-text {
    font-size: 14px;
    word-break: break-word;
  }

  &__preview-time {
    width: fit-content;
    font-size: 10px;
    color: var(--base-message-color-time);
    margin-left: auto;
  }

  &__button-paste {
    grid-column: 3;
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

    &:disabled {
      opacity: 0.6;
      cursor: default;
    }
  }

  &__modal {
    position: absolute;
    top: 50%;
    left: 40%;
    transform: translate(-50%, -50%);
    width: 34%;
    padding: 20px 30px;
    display: grid;
    column-gap: 12px;
    box-shadow: 0px 9px 15px 3px rgba(0, 0, 0, 0.2);
    background-color: var(--default-white);
    border-radius: 5px;
    grid-template-columns: repeat(2, 1fr);

    input {
      grid-column: 1 / 3;
      margin-bottom: 10px;
      padding: var(--input-padding);
      border-radius: var(--input-border-radius);
      font-size: var(--input-font-size);
      color: var(--input-color);
      border: var(--input-border);
      transition: border-color var(--input-transition-duration);

      &::placeholder {
        color: var(--input-placeholder-color);
      }

      &:hover {
        border-color: var(--input-hover-border-color);
      }

      &:focus-visible {
        border-color: var(--input-focus-border-color);
        outline: none;
      }
    }
  }

  &__modal-button-add {
    grid-column: 1;
    border: none;
    background-color: var(--p-red-200);
    padding: 6px 14px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  &__modal-button-cancel {
    grid-column: 2;
    border: none;
    background-color: var(--neutral-200);
    padding: 6px 14px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  &__value-blank {
    background-color: red;
    cursor: pointer;
  }

  &__value-filled {
    background-color: green;
    cursor: pointer;
  }
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-to,
.modal-fade-leave-from {
  opacity: 1;
}
</style>
