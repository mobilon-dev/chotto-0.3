/**
 * Простой тестовый файл для проверки валидатора
 * 
 * Использование:
 * 
 * В вашем компоненте или приложении:
 * ```ts
 * import { testChatsValidation } from '@/apps/validators/test';
 * testChatsValidation();
 * ```
 */

import { chats } from '../data/chats';
import { validateChats, getValidationReport } from './chats/chatValidator';

/**
 * Запустить валидацию текущих данных чатов и вывести результат в консоль
 */
export function testChatsValidation() {
  console.log('🔍 Запуск валидации данных чатов...\n');

  // Валидация текущих данных
  const result = validateChats(chats);
  const report = getValidationReport(result);

  console.log(report);

  // Дополнительная статистика
  console.log('\n📊 Статистика:');
  console.log(`Всего чатов: ${chats.length}`);
  console.log(`Валидация пройдена: ${result.isValid ? '✅ ДА' : '❌ НЕТ'}`);
  console.log(`Количество ошибок: ${result.errors.length}`);
  console.log(`Количество предупреждений: ${result.warnings.length}`);

  if (result.errors.length > 0) {
    console.log('\n🔴 Детали ошибок:');
    result.errors.forEach((error, index) => {
      console.log(`\n${index + 1}. Путь: ${error.path}`);
      console.log(`   Сообщение: ${error.message}`);
      if (error.value !== undefined) {
        console.log(`   Значение: ${JSON.stringify(error.value, null, 2)}`);
      }
    });
  }

  if (result.warnings.length > 0) {
    console.log('\n⚠️  Предупреждения:');
    result.warnings.forEach((warning, index) => {
      console.log(`${index + 1}. [${warning.path}] ${warning.message}`);
    });
  }

  return result;
}

/**
 * Валидация произвольных данных чатов
 */
export function testCustomChats(customChats: any[]) {
  const result = validateChats(customChats);
  console.log(getValidationReport(result));
  return result;
}

/**
 * Пример валидации с ошибками (для тестирования)
 */
export function testWithErrors() {
  const invalidChats = [
    {
      // Отсутствует chatId
      name: 'Тест',
      countUnread: -5,  // Отрицательное значение
      lastMessage: 'test',
      'lastActivity.timestamp': 123,  // Неверный тип
    },
    {
      chatId: 1,
      name: 123,  // Неверный тип
      lastMessage: 'test',
      'lastActivity.timestamp': '1727021159',
      'lastMessage.status': 'invalid',  // Неверное значение
    },
  ];

  return testCustomChats(invalidChats);
}

