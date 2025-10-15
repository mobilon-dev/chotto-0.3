# Валидатор сообщений

Реактивная система валидации для данных сообщений с поддержкой TypeScript и Vue 3.

## Быстрый старт

### Простая валидация

```typescript
import { validateMessages, getMessageValidationReport } from '@/apps/validators/messages';
import { messages } from '@/apps/data/messages';

const result = validateMessages(messages);
const report = getMessageValidationReport(result);

console.log(report);

if (!result.isValid) {
  console.log('Ошибок:', result.errors.length);
}
```

### Реактивная валидация в Vue

```vue
<script setup>
import { computed } from 'vue';
import { useMessageValidator } from '@/apps/validators/messages';

// Предполагается что у вас есть store с messages
const messagesData = computed(() => messagesStore.messages);

const { isValid, errorCount, showReport } = useMessageValidator(messagesData, {
  autoValidate: true,
  debounce: 300
});

// Вызвать отчет в консоли
// showReport();
</script>

<template>
  <button @click="showReport">
    Валидация сообщений: {{ isValid ? '✓' : `Ошибок: ${errorCount}` }}
  </button>
</template>
```

## API

### validateMessages(messages: any): MessageValidationResult

Основная функция валидации данных сообщений.

**Возвращает:**
```typescript
{
  isValid: boolean;
  errors: MessageValidationError[];
  warnings: MessageValidationError[];
}
```

### useMessageValidator(messagesData, options)

Vue composable для реактивной валидации.

**Опции:**
- `autoValidate?: boolean` - автоматическая валидация (по умолчанию `true`)
- `debounce?: number` - задержка перед валидацией в мс (по умолчанию `0`)

**Возвращает:**
```typescript
{
  isValid: Ref<boolean>;              // валидны ли данные
  errorCount: Ref<number>;            // количество ошибок
  showReport: () => void;             // показать отчет в консоли
  validate: () => MessageValidationResult;
  reset: () => void;
  // ... и другие
}
```

## Правила валидации

### Обязательные поля сообщения:
- `chatId` (number)
- `messageId` (string | number) - должен быть уникальным в пределах чата/диалога (если dialogId указан)
- `type` (string) - тип сообщения
- `timestamp` (string | number)

### Опциональные поля:
- `dialogId` (string) - идентификатор диалога
- `direction` - может быть только: `'incoming'`, `'outgoing'`
- `status` - может быть только: `'read'`, `'sent'`, `'received'`
- `text`, `header`, `subText`, `avatar`, `url`, `filename` - строки
- `views` - число
- `actions` - массив действий
- `reply` - объект ответа на сообщение
- `embed` - объект вложения
- `linkPreview` - объект превью ссылки

### Вложенные структуры:

**MessageAction:**
- `action` (string) - обязательно
- `title` (string) - обязательно
- `icon` (string) - опционально

**MessageReply:**
- `messageId` (string | number) - обязательно
- `type` (string) - обязательно
- `text`, `url`, `filename` - опционально

## Примеры вывода

```
📋 Детальный отчет валидации сообщений
=== РЕЗУЛЬТАТ ВАЛИДАЦИИ СООБЩЕНИЙ ===

✅ Данные валидны!

========================================
```

Или при ошибках:

```
📋 Детальный отчет валидации сообщений
=== РЕЗУЛЬТАТ ВАЛИДАЦИИ СООБЩЕНИЙ ===

❌ Обнаружены ошибки!

🔴 ОШИБКИ (2):
  1. [messages[0].chatId] Поле chatId обязательно и должно быть числом
  2. [messages[1].type] Поле type обязательно и должно быть строкой

========================================

📊 Детали ошибок:

🔴 Сообщение [0] - ошибок: 1

1. messages[0].chatId
   Сообщение: Поле chatId обязательно и должно быть числом
   Значение поля: undefined

📦 Полный объект сообщения:
{
  chatId: undefined,
  dialogId: "dlg_123",  // опционально
  messageId: "msg_1",
  type: "message.text",
  text: "Hello",
  timestamp: "1727027959"
}

Примечание: Поле dialogId опционально и может отсутствовать
```

## Интеграция в MobilonExtendedChatApp

Валидатор сообщений уже интегрирован в `MobilonExtendedChatApp.vue`.

**Реализация:**

```typescript
const { 
  isValid: isMessagesValid, 
  errorCount: messageErrorCount, 
  showReport: showMessagesReport 
} = useMessageValidator(messages, {
  autoValidate: true,
  debounce: 300
});
```

**UI-кнопка:**

```vue
<button
  class="chat-info__button-panel chat-info__button-validation chat-info__button-validation--messages"
  :class="{ 'validation-error': !isMessagesValid }"
  :title="isMessagesValid ? 'Сообщения валидны ✓' : `Ошибок в сообщениях: ${messageErrorCount}`"
  @click="showMessagesReport"
>
  <span class="validation-icon validation-icon--messages">{{ isMessagesValid ? '✉' : '!' }}</span>
</button>
```

**Особенности:**
- ✉️ Синий конверт когда валидно
- ❌ Красный восклицательный знак при ошибках
- 🔵 Синий фон при hover
- При клике - детальный отчет в консоль

## Отличия от валидатора чатов

1. **Другие обязательные поля**: chatId, messageId, type, timestamp (dialogId опционально!)
2. **Проверка уникальности messageId** в пределах чата (или чата+диалога, если dialogId указан)
3. **Разные типы данных**: messages вместо chats
4. **Свои типы**: `MessageValidationResult`, `MessageValidationError`
5. **Гибкость dialogId**: Работает как с диалогами, так и без них

