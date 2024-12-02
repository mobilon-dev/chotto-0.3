import { nextTick } from "process";
import { ref, watch } from "vue";

import { createI18n } from "vue-i18n";

const locales = [
  {
    code: "en",
    name: "English",
    flag: "england",
  },
  {
    code: "ru",
    name: "Pусский",
    flag: "russian",
  },
];

const locale = ref(locales[1]);

export const i18n = createI18n({
  allowComposition: true,
  locale: locale.value.code,
  messages:{
    ru:{
      chatListTitle: 'Чаты',
      chatFilterPlaceholder: 'Поиск диалога',
      noChatSelected: 'Выберите контакт для начала общения',
      typing: 'печатает',
      chatInputPlaceholder: 'Введите сообщение...',
    },
    en:{
      chatListTitle: 'Chats',
      chatFilterPlaceholder: 'Chat search',
      noChatSelected: 'Choose contact to start conversation',
      typing: 'typing',
      chatInputPlaceholder: 'Type a message...',
    }
  },
  legacy: false,
});

watch(
    () => locale.value,
    () => {
      nextTick(
        () => {
          i18n.global.locale.value = locale.value.code 
        }
      )
    },
    {immediate: true}
)

export function useI18n() {

  return {
    i18n,
    locale,
    locales,
  };
}