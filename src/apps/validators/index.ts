/**
 * Главный экспорт валидаторов
 * 
 * Структура:
 * - validators/chats - валидация чатов
 * - validators/messages - валидация сообщений
 * - validators/sidebar - валидация sidebar items
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
 * // Импорт валидатора sidebar
 * import { useSidebarValidator } from '@/apps/validators/sidebar';
 * 
 * @example
 * // Импорт всех валидаторов
 * import { useChatValidator, useMessageValidator, useSidebarValidator } from '@/apps/validators';
 */

// Валидаторы чатов
export * from './chats';

// Валидаторы сообщений
export * from './messages';

// Валидаторы sidebar
export * from './sidebar';

// Примеры и тесты
export * from './examples';
export * from './test';

