/**
 * Главный экспорт валидаторов
 * 
 * Структура:
 * - validators/chats - валидация чатов
 * - validators/messages - валидация сообщений
 * 
 * @example
 * // Импорт валидатора чатов
 * import { useChatValidator } from '@/apps/validators/chats';
 * 
 * @example
 * // Импорт валидатора сообщений
 * import { useMessageValidator } from '@/apps/validators/messages';
 * 
 * @example
 * // Импорт всех валидаторов
 * import { useChatValidator, useMessageValidator } from '@/apps/validators';
 */

// Валидаторы чатов
export * from './chats';

// Валидаторы сообщений
export * from './messages';

// Примеры и тесты
export * from './examples';
export * from './test';

