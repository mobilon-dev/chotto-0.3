# Структура валидаторов

Валидаторы организованы по директориям для лучшей структуризации кода.

## 📁 Структура директорий

```
src/apps/validators/
├── chats/                          # Валидация чатов
│   ├── types.ts                    # TypeScript типы для чатов
│   ├── chatValidator.ts            # Логика валидации чатов
│   ├── useChatValidator.ts         # Vue composable для чатов
│   └── index.ts                    # Экспорт компонентов чатов
│
├── messages/                       # Валидация сообщений
│   ├── types.ts                    # TypeScript типы для сообщений
│   ├── messageValidator.ts         # Логика валидации сообщений
│   ├── useMessageValidator.ts      # Vue composable для сообщений
│   └── index.ts                    # Экспорт компонентов сообщений
│
├── examples.ts                     # Примеры использования
├── test.ts                         # Функции для тестирования
├── index.ts                        # Главный экспорт всех валидаторов
├── README.md                       # Документация валидатора чатов
├── MESSAGE_VALIDATOR_README.md     # Документация валидатора сообщений
├── INTEGRATION.md                  # Интеграция в компоненты
└── STRUCTURE.md                    # Этот файл
```

## 📦 Способы импорта

### 1. Импорт из конкретной директории (рекомендуется)

```typescript
// Валидатор чатов
import { useChatValidator, validateChats } from '@/apps/validators/chats';

// Валидатор сообщений
import { useMessageValidator, validateMessages } from '@/apps/validators/messages';
```

**Преимущества:**
- ✅ Ясность - сразу видно, что импортируем
- ✅ Меньше размер бандла (tree-shaking)
- ✅ Быстрее TypeScript intellisense

### 2. Импорт из главного index

```typescript
// Все валидаторы сразу
import { 
  useChatValidator, 
  useMessageValidator,
  validateChats,
  validateMessages 
} from '@/apps/validators';
```

**Преимущества:**
- ✅ Краткость - один импорт
- ✅ Удобно для примеров и тестов

### 3. Смешанный подход

```typescript
// Основные валидаторы из главного index
import { useChatValidator } from '@/apps/validators';

// Типы из конкретной директории
import type { Chat, ChatList } from '@/apps/validators/chats';
```

## 🎯 Рекомендации

### Для production кода

```typescript
// ✅ ХОРОШО - явный импорт
import { useChatValidator } from '@/apps/validators/chats';

// ⚠️ ДОПУСТИМО - если используете несколько валидаторов
import { useChatValidator, useMessageValidator } from '@/apps/validators';

// ❌ ПЛОХО - импорт всего подряд
import * as validators from '@/apps/validators';
```

### Для тестов и примеров

```typescript
// ✅ ХОРОШО - удобно в тестах
import { validateChats, validateMessages } from '@/apps/validators';
```

### Для типов

```typescript
// ✅ ХОРОШО - импорт только типов
import type { Chat, Message } from '@/apps/validators/chats';
import type { MessageValidationResult } from '@/apps/validators/messages';
```

## 🔍 Index файлы

### `/validators/index.ts` (главный)
Экспортирует все валидаторы из поддиректорий.

```typescript
export * from './chats';
export * from './messages';
export * from './examples';
export * from './test';
```

### `/validators/chats/index.ts`
Экспортирует компоненты валидации чатов.

```typescript
export * from './types';
export * from './chatValidator';
export * from './useChatValidator';
```

### `/validators/messages/index.ts`
Экспортирует компоненты валидации сообщений (с явными экспортами для избежания конфликтов).

```typescript
export * from './types';
export { 
  validateMessages, 
  getMessageValidationReport,
  type MessageValidationError,
  type MessageValidationResult 
} from './messageValidator';
export * from './useMessageValidator';
```

## 📚 Документация

- **[README.md](./README.md)** - Документация валидатора чатов (основная)
- **[MESSAGE_VALIDATOR_README.md](./MESSAGE_VALIDATOR_README.md)** - Документация валидатора сообщений
- **[INTEGRATION.md](./INTEGRATION.md)** - Интеграция в компоненты
- **[STRUCTURE.md](./STRUCTURE.md)** - Этот файл (структура)

## 🚀 Добавление нового валидатора

Если нужно добавить новый валидатор (например, для контактов):

1. Создайте директорию:
   ```bash
   mkdir src/apps/validators/contacts
   ```

2. Создайте файлы:
   ```
   contacts/
   ├── types.ts
   ├── contactValidator.ts
   ├── useContactValidator.ts
   └── index.ts
   ```

3. Добавьте экспорт в главный `index.ts`:
   ```typescript
   export * from './contacts';
   ```

4. Создайте документацию:
   ```
   CONTACT_VALIDATOR_README.md
   ```

## 💡 Советы

1. **Именование**: Следуйте паттерну `use<Entity>Validator` для composables
2. **Типы**: Используйте префикс для типов валидации (`MessageValidationResult`)
3. **Экспорты**: Явные экспорты помогают избежать конфликтов имен
4. **Документация**: Каждый валидатор должен иметь свой README

