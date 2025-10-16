# Сравнение валидаторов

Быстрая справка по всем валидаторам в системе.

## 📊 Таблица сравнения

| Характеристика | Чаты | Сообщения | Sidebar Items |
|----------------|------|-----------|---------------|
| **Директория** | `validators/chats/` | `validators/messages/` | `validators/sidebar/` |
| **Composable** | `useChatValidator` | `useMessageValidator` | `useSidebarValidator` |
| **Функция** | `validateChats` | `validateMessages` | `validateSidebarItems` |
| **Цвет кнопки** | 🟢 Зеленый | 🔵 Синий | 🟠 Оранжевый |
| **Иконка** | ✓ | ✉ | ☰ |
| **Данные** | `chatsStore.chats` | `messages` (ref) | `sidebarItems` (ref) |

## 🔑 Обязательные поля

### Чаты
```typescript
{
  chatId: number,           // уникальный
  name: string,
  countUnread: number,      // >= 0
  lastMessage: string,
  'lastActivity.timestamp': string
}
```

### Сообщения
```typescript
{
  chatId: number,
  messageId: string | number,  // уникальный в пределах чата(+диалога)
  type: string,
  timestamp: string | number
  // dialogId - опционально!
}
```

### Sidebar Items
```typescript
{
  itemId: string,           // уникальный
  icon: string,
  notificationCount: number, // >= 0
  selected: boolean
}
```

## 🎯 Проверка уникальности

| Валидатор | Поле | Область проверки |
|-----------|------|------------------|
| Чаты | `chatId` | Глобально (весь массив) |
| Сообщения | `messageId` | В пределах `chatId:dialogId` (или только `chatId` если dialogId нет) |
| Sidebar | `itemId` | Глобально (весь массив) |

## 📦 Вложенные структуры

### Чаты
- ✅ `dialogs[]` - массив диалогов
- ✅ `contact.attributes[]` - атрибуты контакта
- ✅ `actions[]` - действия чата

### Сообщения
- ✅ `actions[]` - действия сообщения
- ✅ `reply{}` - ответ на сообщение
- ✅ `embed{}` - вложение (youtube, rutube и т.д.)
- ✅ `linkPreview{}` - превью ссылки
- ✅ `transcript{}` - транскрипт
- ✅ `keyboard[]` - кнопки клавиатуры

### Sidebar Items
- ❌ Нет вложенных структур (плоский объект)

## 🎨 UI-кнопки в MobilonExtendedChatApp

```
┌──────────────────────────────────────────┐
│ Контакт                                  │
│                      [✓] [✉] [☰] [≡]    │
│                       ↓   ↓   ↓          │
│                    Чаты Msg Sidebar      │
└──────────────────────────────────────────┘
```

### Цветовая схема

| Кнопка | Нормальное состояние | При hover | При ошибке |
|--------|---------------------|-----------|------------|
| **Чаты** | 🟢 #4CAF50 | 🟢 #2E7D32 | 🔴 #f44336 |
| **Сообщения** | 🔵 #2196F3 | 🔵 #1565C0 | 🔴 #f44336 |
| **Sidebar** | 🟠 #FF9800 | 🟠 #E65100 | 🔴 #f44336 |

### Анимация

При ошибках все кнопки:
- ⚡ Меняют иконку на `!`
- 🔄 Пульсируют (opacity 1 → 0.6 → 1)
- 🔴 Становятся красными

## 📖 Документация

| Валидатор | Документ | Описание |
|-----------|----------|----------|
| **Чаты** | [README.md](./README.md) | Основная документация |
| **Сообщения** | [MESSAGE_VALIDATOR_README.md](./MESSAGE_VALIDATOR_README.md) | Документация сообщений |
| **Sidebar** | [sidebar/README.md](./sidebar/README.md) | Документация sidebar |
| **Все** | [SUMMARY.md](./SUMMARY.md) | Краткая сводка |
| **Все** | [INTEGRATION.md](./INTEGRATION.md) | Интеграция в компоненты |
| **Все** | [STRUCTURE.md](./STRUCTURE.md) | Структура и импорты |
| **Все** | [COMPARISON.md](./COMPARISON.md) | Этот файл (сравнение) |

## 🚀 Примеры использования

### Все валидаторы одновременно

```vue
<script setup>
import { computed, ref } from 'vue';
import { 
  useChatValidator, 
  useMessageValidator,
  useSidebarValidator 
} from '@/apps/validators';

const chatsData = computed(() => chatsStore.chats);
const messagesData = ref(messages);
const sidebarData = ref(sidebarItems);

const chatsVal = useChatValidator(chatsData, { autoValidate: true, debounce: 300 });
const messagesVal = useMessageValidator(messagesData, { autoValidate: true, debounce: 300 });
const sidebarVal = useSidebarValidator(sidebarData, { autoValidate: true, debounce: 300 });

// Общая валидность
const allValid = computed(() => 
  chatsVal.isValid.value && 
  messagesVal.isValid.value && 
  sidebarVal.isValid.value
);

// Показать все отчеты
function showAllReports() {
  chatsVal.showReport();
  messagesVal.showReport();
  sidebarVal.showReport();
}
</script>

<template>
  <div :class="{ 'has-errors': !allValid }">
    <button @click="showAllReports">
      Показать все отчеты валидации
    </button>
  </div>
</template>
```

### Выборочная валидация

```typescript
// Только нужные валидаторы
import { useChatValidator } from '@/apps/validators/chats';
import { useSidebarValidator } from '@/apps/validators/sidebar';

// Сообщения не валидируем
const chatsVal = useChatValidator(chatsData);
const sidebarVal = useSidebarValidator(sidebarData);
```

## 💡 Когда использовать какой валидатор

| Ситуация | Валидатор |
|----------|-----------|
| Работа со списком контактов/чатов | Чаты |
| Отображение истории сообщений | Сообщения |
| Работа с боковой панелью навигации | Sidebar |
| Загрузка данных с сервера | Все три |
| Перед сохранением данных | Соответствующий |
| При разработке новых фич | Соответствующий |

## 🔧 Производительность

Все валидаторы используют одинаковые оптимизации:

| Оптимизация | Описание |
|-------------|----------|
| **Debounce** | 300мс задержка перед валидацией |
| **Deep watch** | Только для измененных данных |
| **Computed** | Кэшированные вычисления |
| **Lazy** | Валидация только при изменениях |

**Результат:** Минимальное влияние на производительность приложения.

## 🎓 Рекомендации

### В development режиме

```typescript
// ✅ ХОРОШО - Включить все валидаторы
const { showReport } = useChatValidator(data, { 
  autoValidate: true, 
  debounce: 300 
});
```

### В production режиме

```typescript
// ⚠️ ВАРИАНТ 1 - Отключить автовалидацию
const { validate, showReport } = useChatValidator(data, { 
  autoValidate: false 
});

// Валидировать вручную при необходимости
validate();

// ⚠️ ВАРИАНТ 2 - Только в dev
const { showReport } = useChatValidator(data, { 
  autoValidate: import.meta.env.DEV,
  debounce: 300 
});
```

### При импорте данных

```typescript
// ✅ ХОРОШО - Валидировать перед использованием
async function loadData() {
  const data = await api.getChats();
  
  const result = validateChats(data);
  if (!result.isValid) {
    console.error('Невалидные данные с сервера!', result.errors);
    // Обработка ошибок
    return;
  }
  
  chatsStore.chats = data;
}
```

## 📋 Чек-лист интеграции

При добавлении нового валидатора:

- [ ] Создать директорию в `validators/`
- [ ] Создать `types.ts` с TypeScript типами
- [ ] Создать `validator.ts` с логикой валидации
- [ ] Создать `useValidator.ts` с Vue composable
- [ ] Создать `index.ts` с экспортами
- [ ] Создать `README.md` с документацией
- [ ] Добавить экспорт в главный `validators/index.ts`
- [ ] Добавить UI-кнопку в компонент
- [ ] Обновить `SUMMARY.md`
- [ ] Обновить `INTEGRATION.md`
- [ ] Обновить `STRUCTURE.md`
- [ ] Обновить `COMPARISON.md`
- [ ] Проверить линтер
- [ ] Протестировать работу


