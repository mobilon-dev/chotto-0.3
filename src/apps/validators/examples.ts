/**
 * Примеры использования валидатора чатов
 */

import { ref } from 'vue';
import { chats } from '../data/chats';
import { useChatValidator } from './useChatValidator';
import { validateChats, getValidationReport } from './chatValidator';

// ============================================
// Пример 1: Простая валидация (без реактивности)
// ============================================
export function simpleValidationExample() {
  console.log('\n=== ПРОСТАЯ ВАЛИДАЦИЯ ===');
  
  const result = validateChats(chats);
  const report = getValidationReport(result);
  
  console.log(report);
  console.log('\nДетали:');
  console.log('Валидно:', result.isValid);
  console.log('Количество ошибок:', result.errors.length);
  console.log('Количество предупреждений:', result.warnings.length);
  
  return result;
}

// ============================================
// Пример 2: Реактивная валидация с автоматическим обновлением
// ============================================
export function reactiveValidationExample() {
  console.log('\n=== РЕАКТИВНАЯ ВАЛИДАЦИЯ ===');
  
  // Создаем реактивную копию данных
  const chatsData = ref([...chats]);
  
  // Инициализируем валидатор с автоматической валидацией
  const {
    isValid,
    errorCount,
    showReport
  } = useChatValidator(chatsData, {
    autoValidate: true,  // Автоматическая валидация при изменениях
    debounce: 300        // Задержка 300мс перед валидацией
  });
  
  // Выводим отчет в консоль
  console.log('Начальная валидация:');
  showReport();
  
  // Теперь можно работать с реактивными данными
  // При изменении данных валидация будет запускаться автоматически
  
  return {
    chatsData,
    isValid,
    errorCount,
    showReport
  };
}

// ============================================
// Пример 3: Ручная валидация по требованию
// ============================================
export function manualValidationExample() {
  console.log('\n=== РУЧНАЯ ВАЛИДАЦИЯ ===');
  
  const chatsData = ref([...chats]);
  
  // Валидатор БЕЗ автоматической валидации
  const { isValid, errorCount, validate, showReport } = useChatValidator(chatsData, {
    autoValidate: false
  });
  
  console.log('До валидации:');
  console.log('isValid:', isValid.value);
  console.log('errorCount:', errorCount.value);
  
  // Запускаем валидацию вручную
  console.log('\nЗапуск валидации...');
  validate();
  
  // Показываем отчет
  console.log('\nПосле валидации:');
  showReport();
  
  return { chatsData, validate, showReport, isValid, errorCount };
}

// ============================================
// Пример 4: Валидация с намеренными ошибками
// ============================================
export function errorValidationExample() {
  console.log('\n=== ВАЛИДАЦИЯ С ОШИБКАМИ ===');
  
  // Создаем данные с ошибками
  const invalidChats = [
    {
      // Отсутствует chatId
      name: 'Тест',
      countUnread: -5,  // Отрицательное значение
      lastMessage: 'test',
      'lastActivity.timestamp': 123,  // Неверный тип (должна быть строка)
    },
    {
      chatId: 1,
      name: 123,  // Неверный тип (должна быть строка)
      // Отсутствует countUnread
      lastMessage: 'test',
      'lastActivity.timestamp': '1727021159',
      'lastMessage.status': 'invalid',  // Неверное значение
    },
    {
      chatId: 1,  // Дубликат chatId
      name: 'Дубликат',
      countUnread: 0,
      lastMessage: 'test',
      'lastActivity.timestamp': '1727021159',
    }
  ];
  
  const result = validateChats(invalidChats);
  const report = getValidationReport(result);
  
  console.log(report);
  
  console.log('\n📊 Статистика ошибок:');
  result.errors.forEach((error, index) => {
    console.log(`${index + 1}. ${error.path}: ${error.message}`);
  });
  
  return result;
}

// ============================================
// Пример 5: Использование в компоненте Vue
// ============================================
export function vueComponentExample() {
  /*
  
  В вашем компоненте Vue:
  
  ```vue
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { chats } from '@/apps/data/chats';
  import { useChatValidator } from '@/apps/validators/useChatValidator';
  
  const chatsData = ref(chats);
  
  const {
    isValid,
    errorCount,
    showReport
  } = useChatValidator(chatsData, {
    autoValidate: true,
    debounce: 300
  });
  
  // Отслеживаем изменения валидации
  watch(isValid, (newValue) => {
    if (!newValue) {
      console.warn(`⚠️ Данные чатов невалидны! Ошибок: ${errorCount.value}`);
      showReport();
    }
  });
  
  // Функция для показа отчета
  function checkData() {
    showReport();
  }
  </script>
  
  <template>
    <div class="chat-validator">
      <!-- Валидация происходит автоматически и выводится в консоль -->
      <button @click="checkData">
        Показать отчет валидации в консоли
      </button>
    </div>
  </template>
  ```
  
  */
  
  console.log('См. комментарии в коде для примера использования в Vue компоненте');
}

// Запуск всех примеров
export function runAllExamples() {
  simpleValidationExample();
  errorValidationExample();
  // Реактивные примеры нужно запускать в контексте Vue приложения
}

