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

let messages = {
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
}

const locale = ref(locales[1]);

 export const i18n = createI18n({
   allowComposition: true,
   locale: locale.value.code,
   messages:messages,
   legacy: false,
});

watch(
    () => locale.value,
    () => {
        i18n.global.locale.value = locale.value.code 
    },
)

export const t = useI18n().t;

export function useI18n() {

  function t(msg) {
    return messages[locale.value.code][msg];
  }

  return {
    t,
    i18n,
    locale,
    locales,
  };
}