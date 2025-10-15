# Валидатор данных чатов

Реактивная система валидации для данных чатов с поддержкой TypeScript и Vue 3.

## 📋 Содержание

- [Установка](#установка)
- [Быстрый старт](#быстрый-старт)
- [Интеграция в компоненты](#интеграция-в-компоненты)
- [API](#api)
- [Примеры использования](#примеры-использования)
- [Типы данных](#типы-данных)

## 🔗 Дополнительная документация

- [INTEGRATION.md](./INTEGRATION.md) - Подробная документация по интеграции валидатора в компоненты
- [examples.ts](./examples.ts) - Примеры использования кода
- [test.ts](./test.ts) - Функции для тестирования

## Установка

Все необходимые файлы уже находятся в проекте:

```
src/apps/validators/
├── types.ts                    # TypeScript типы для чатов
├── chatValidator.ts            # Основная логика валидации
├── useChatValidator.ts         # Vue composable для реактивной валидации
├── examples.ts                 # Примеры использования
├── index.ts                    # Экспорт всех валидаторов
└── README.md                   # Этот файл
```

## Интеграция в компоненты

Валидатор уже интегрирован в `MobilonExtendedChatApp` с UI-кнопкой. Подробная документация: [INTEGRATION.md](./INTEGRATION.md)

**В MobilonExtendedChatApp:**
- 🟢 Зеленая кнопка с галочкой (✓) - данные валидны
- 🔴 Красная кнопка с восклицательным знаком (!) - есть ошибки
- При клике - детальный отчет в консоли

**Пример быстрой интеграции:**

```vue
<script setup>
import { computed } from 'vue';
import { useChatValidator } from '@/apps/validators';
import { useChatsStore } from '@/apps/stores/useChatStore';

const chatsStore = useChatsStore();
const chatsData = computed(() => chatsStore.chats);

// Получаем метод для показа отчета и статус валидации
const { isValid, errorCount, showReport } = useChatValidator(chatsData, {
  autoValidate: true,
  debounce: 300
});

// Использовать в UI
// isValid.value - boolean, валидны ли данные
// errorCount.value - количество ошибок
// showReport() - показать отчет в консоли
</script>

<template>
  <!-- Пример кнопки -->
  <button @click="showReport" :class="{ error: !isValid }">
    {{ isValid ? '✓' : '!' }} Валидация ({{ errorCount }})
  </button>
</template>
```

## Быстрый старт

### 1. Простая валидация (без реактивности)

```typescript
import { validateChats, getValidationReport } from '@/apps/validators/chatValidator';
import { chats } from '@/apps/data/chats';

// Валидация данных
const result = validateChats(chats);

// Получение отчета
const report = getValidationReport(result);
console.log(report);

// Проверка результата
if (result.isValid) {
  console.log('✅ Данные валидны!');
} else {
  console.log('❌ Найдены ошибки:', result.errors);
}
```

### 2. Реактивная валидация в Vue компоненте

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { chats } from '@/apps/data/chats';
import { useChatValidator } from '@/apps/validators/useChatValidator';

const chatsData = ref(chats);

const {
  isValid,
  errors,
  warnings,
  errorCount,
  warningCount,
  report,
  validate
} = useChatValidator(chatsData, {
  autoValidate: true,  // Автоматическая валидация при изменениях
  debounce: 300        // Задержка перед валидацией (мс)
});
</script>

<template>
  <div>
    <div v-if="!isValid" class="error">
      <h3>Ошибки валидации: {{ errorCount }}</h3>
      <pre>{{ report }}</pre>
    </div>
    
    <div v-else class="success">
      ✅ Данные валидны!
    </div>
    
    <button @click="validate()">Проверить данные</button>
  </div>
</template>
```

## API

### validateChats(chats: any): ValidationResult

Основная функция валидации данных чатов.

**Параметры:**
- `chats` - массив данных чатов для валидации

**Возвращает:** `ValidationResult`
```typescript
{
  isValid: boolean;        // true если нет ошибок
  errors: ValidationError[];    // массив ошибок
  warnings: ValidationError[];  // массив предупреждений
}
```

**ValidationError:**
```typescript
{
  path: string;      // путь к полю с ошибкой (например, "chats[0].name")
  message: string;   // описание ошибки
  value?: any;       // неверное значение (опционально)
}
```

### getValidationReport(result: ValidationResult): string

Генерирует читаемый текстовый отчет о результатах валидации.

**Параметры:**
- `result` - результат валидации

**Возвращает:** форматированная строка с отчетом

### useChatValidator(chatsData, options): UseChatValidatorReturn

Vue composable для реактивной валидации.

**Параметры:**
- `chatsData: Ref<any>` - реактивная ссылка на данные чатов
- `options?: UseChatValidatorOptions` - опции валидатора
  - `autoValidate?: boolean` - автоматическая валидация при изменении данных (по умолчанию `true`)
  - `debounce?: number` - задержка перед валидацией в мс (по умолчанию `0`)

**Возвращает:** `UseChatValidatorReturn`
```typescript
{
  validationResult: Ref<ValidationResult | null>;  // полный результат валидации
  isValid: Ref<boolean>;                           // валидны ли данные
  errors: Ref<ValidationError[]>;                  // массив ошибок
  warnings: Ref<ValidationError[]>;                // массив предупреждений
  errorCount: Ref<number>;                         // количество ошибок
  warningCount: Ref<number>;                       // количество предупреждений
  report: Ref<string>;                             // текстовый отчет
  validate: () => ValidationResult;                // функция для ручной валидации
  reset: () => void;                               // сброс результатов
  showReport: () => void;                          // показать отчет в консоли
}
```

## Примеры использования

### Пример 1: Валидация при загрузке приложения

```typescript
import { validateChats, getValidationReport } from '@/apps/validators/chatValidator';
import { chats } from '@/apps/data/chats';

export function initApp() {
  // Проверяем данные при старте приложения
  const result = validateChats(chats);
  
  if (!result.isValid) {
    console.error('⚠️ Обнаружены проблемы в данных чатов!');
    console.error(getValidationReport(result));
    
    // Можно показать уведомление пользователю
    // или отправить ошибку в систему логирования
  }
}
```

### Пример 2: Валидация перед отправкой на сервер

```typescript
import { validateChats } from '@/apps/validators/chatValidator';

async function saveChats(chats) {
  // Валидируем перед сохранением
  const result = validateChats(chats);
  
  if (!result.isValid) {
    throw new Error(
      `Невозможно сохранить: найдено ${result.errors.length} ошибок`
    );
  }
  
  // Отправляем на сервер
  await api.saveChats(chats);
}
```

### Пример 3: Реактивная валидация с debounce

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useChatValidator } from '@/apps/validators/useChatValidator';

const chatsData = ref([]);

// Валидация с задержкой 500мс - полезно при вводе данных
const { isValid, errors, validate } = useChatValidator(chatsData, {
  autoValidate: true,
  debounce: 500
});

function addChat() {
  chatsData.value.push({
    chatId: Date.now(),
    name: 'Новый чат',
    countUnread: 0,
    lastMessage: '',
    'lastActivity.timestamp': String(Date.now())
  });
  // Валидация запустится автоматически через 500мс
}
</script>
```

### Пример 4: Ручная валидация по требованию

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useChatValidator } from '@/apps/validators/useChatValidator';
import { chats } from '@/apps/data/chats';

const chatsData = ref(chats);

// БЕЗ автоматической валидации
const { isValid, errorCount, validate, report } = useChatValidator(chatsData, {
  autoValidate: false
});

function saveData() {
  // Валидируем только при сохранении
  const result = validate();
  
  if (result.isValid) {
    // Сохраняем данные
    console.log('Сохранение...');
  } else {
    alert(`Невозможно сохранить. Ошибок: ${errorCount.value}`);
    console.log(report.value);
  }
}
</script>
```

### Пример 5: Показ ошибок в UI

```vue
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useChatValidator } from '@/apps/validators/useChatValidator';
import { chats } from '@/apps/data/chats';

const chatsData = ref(chats);
const { isValid, errors, warnings, validate } = useChatValidator(chatsData);

// Группировка ошибок по чатам
const errorsByChat = computed(() => {
  const grouped = new Map();
  
  errors.value.forEach(error => {
    const match = error.path.match(/chats\[(\d+)\]/);
    if (match) {
      const chatIndex = parseInt(match[1]);
      if (!grouped.has(chatIndex)) {
        grouped.set(chatIndex, []);
      }
      grouped.get(chatIndex).push(error);
    }
  });
  
  return grouped;
});
</script>

<template>
  <div class="validation-panel">
    <!-- Общий статус -->
    <div class="status" :class="{ valid: isValid, invalid: !isValid }">
      <span v-if="isValid">✅ Все чаты валидны</span>
      <span v-else>❌ Найдены ошибки в {{ errorsByChat.size }} чатах</span>
    </div>
    
    <!-- Список ошибок по чатам -->
    <div v-for="[chatIndex, chatErrors] in errorsByChat" :key="chatIndex" class="chat-errors">
      <h4>Чат #{{ chatsData[chatIndex]?.name || chatIndex }}</h4>
      <ul>
        <li v-for="(error, i) in chatErrors" :key="i">
          {{ error.message }}
          <code>{{ error.path }}</code>
        </li>
      </ul>
    </div>
    
    <!-- Предупреждения -->
    <div v-if="warnings.length > 0" class="warnings">
      <h4>⚠️ Предупреждения</h4>
      <ul>
        <li v-for="(warning, i) in warnings" :key="i">
          {{ warning.message }}
        </li>
      </ul>
    </div>
    
    <button @click="validate()">Обновить валидацию</button>
  </div>
</template>

<style scoped>
.status.valid {
  color: green;
}

.status.invalid {
  color: red;
}

.chat-errors {
  border-left: 3px solid red;
  padding-left: 1rem;
  margin: 1rem 0;
}

.warnings {
  border-left: 3px solid orange;
  padding-left: 1rem;
  margin: 1rem 0;
}

code {
  background: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: monospace;
}
</style>
```

## Типы данных

### Chat

```typescript
interface Chat {
  // Обязательные поля
  chatId: number;
  name: string;
  countUnread: number;
  lastMessage: string;
  'lastActivity.timestamp': string;
  
  // Опциональные поля
  avatar?: string;
  'lastActivity.time'?: string;
  'lastMessage.status'?: 'read' | 'sent' | 'received';
  isFixedTop?: boolean;
  isFixedBottom?: boolean;
  isFixed?: boolean;
  status?: string;
  statusMessage?: string;
  colorUnread?: string;
  typing?: boolean;
  metadata?: string;
  dialogsExpanded?: boolean;
  
  // Вложенные структуры
  actions?: ChatAction[];
  dialogs?: Dialog[];
  contact?: Contact;
  commands?: Command[];
}
```

### Dialog

```typescript
interface Dialog {
  // Обязательные поля
  dialogId: string;
  name: string;
  'lastActivity.timestamp': number;
  isSelected: boolean;
  
  // Опциональные поля
  branchId?: string;
  attributeId?: string;
  channelId?: string;
  icon?: string;
  fullname?: string;
  countUnread?: number;
  'lastActivity.time'?: string;
}
```

### Contact

```typescript
interface Contact {
  attributes: ContactAttribute[];
}

interface ContactAttribute {
  id: string;
  value: string;
  type?: string;
  data?: string | {
    id: string;
    nickname: string;
    phone: string;
  };
}
```

## Правила валидации

### Обязательные поля чата:
- `chatId` (number) - должен быть уникальным
- `name` (string)
- `countUnread` (number) - не может быть отрицательным
- `lastMessage` (string)
- `lastActivity.timestamp` (string)

### Валидация статусов:
- `lastMessage.status` может быть только: `'read'`, `'sent'`, `'received'`

### Валидация вложенных структур:
- `dialogs` - если указан, каждый диалог должен иметь `dialogId`, `name`, `lastActivity.timestamp`, `isSelected`
- `contact.attributes` - каждый атрибут должен иметь `id` и `value`
- `actions` - каждое действие должно иметь `action` и `title`

## Производительность

- ✅ Легковесный: только чистые функции валидации
- ✅ Поддержка debounce для реактивной валидации
- ✅ Не блокирует UI
- ✅ Можно использовать в Web Workers (функция `validateChats`)

## Расширение

Чтобы добавить свои правила валидации:

1. Откройте `chatValidator.ts`
2. Добавьте новые проверки в функцию `validateChat` или создайте новую функцию-валидатор
3. При необходимости обновите типы в `types.ts`

Пример:

```typescript
// В src/apps/validators/chatValidator.ts
function validateChat(chat: any, index: number): ValidationError[] {
  const errors: ValidationError[] = [];
  const path = `chats[${index}]`;
  
  // ... существующие проверки ...
  
  // Ваша новая проверка
  if (chat.customField && typeof chat.customField !== 'string') {
    errors.push({ 
      path: `${path}.customField`, 
      message: 'customField должно быть строкой',
      value: chat.customField 
    });
  }
  
  return errors;
}
```

## Поддержка

Для вопросов и предложений создавайте issue в репозитории проекта.

