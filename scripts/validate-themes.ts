#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/**
 * Скрипт валидации тем для проекта chotto-themes-prototype
 * Проверяет консистентность CSS переменных с префиксом --chotto-theme
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const THEMES_DIR = path.join(__dirname, '..', 'src', 'themes');
const PREFIX = '--chotto-theme';

// Цвета для консольного вывода
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
} as const;

type Color = keyof typeof colors;

interface CSSVariable {
  name: string;
  value: string;
  line: number;
}

/**
 * Логирование с цветами
 */
function log(message: string, color: Color = 'reset'): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Извлечение CSS переменных из файла
 */
function extractCSSVariables(filePath: string): Map<string, CSSVariable> {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const variables = new Map<string, CSSVariable>();
    
    // Разбиваем содержимое на строки для подсчета номеров строк
    const lines = content.split('\n');
    
    // Проходим по каждой строке
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Ищем строки с CSS переменными, начинающимися с --chotto-theme
      if (line.startsWith('--chotto-theme-') && line.includes(':')) {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
          const varName = line.substring(0, colonIndex).trim();
          const varValue = line.substring(colonIndex + 1).replace(/;$/, '').trim();
          
          // Проверяем, что имя переменной корректное
          if (varName && varName.startsWith('--chotto-theme-') && varName.length > '--chotto-theme-'.length) {
            variables.set(varName, {
              name: varName,
              value: varValue,
              line: i + 1
            });
          }
        }
      }
    }
    
    return variables;
  } catch (error) {
    log(`Ошибка при чтении файла ${filePath}: ${(error as Error).message}`, 'red');
    return new Map();
  }
}

/**
 * Валидация синтаксиса CSS переменной
 */
function validateCSSValue(value: string): string[] {
  const errors: string[] = [];
  
  // Проверка на пустое значение
  if (!value || value.trim() === '') {
    errors.push('Пустое значение');
    return errors;
  }
  
  // Проверка на недопустимые символы
  if (value.includes('undefined') || value.includes('null')) {
    errors.push('Содержит undefined или null');
  }
  
  // Проверка на корректность var() функций
  const varRegex = /var\(--[a-zA-Z0-9-]+\)/g;
  const varMatches = value.match(varRegex);
  if (varMatches) {
    for (const varMatch of varMatches) {
      const varName = varMatch.slice(4, -1); // Убираем var( и )
      if (!varName.startsWith('--') && 
          !varName.startsWith('chotto-theme-') && 
          !varName.startsWith('emerald-') && 
          !varName.startsWith('neutral-') && 
          !varName.startsWith('p-red-') && 
          !varName.startsWith('azure-') && 
          !varName.startsWith('p-coral-') && 
          !varName.startsWith('default-')) {
        errors.push(`Недопустимая ссылка на переменную: ${varName}`);
      }
    }
  }
  
  return errors;
}

/**
 * Получение списка всех тем
 */
function getThemes(): string[] {
  try {
    const themes = fs.readdirSync(THEMES_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);
    
    return themes;
  } catch (error) {
    log(`Ошибка при чтении директории тем: ${(error as Error).message}`, 'red');
    return [];
  }
}

/**
 * Основная функция валидации
 */
function validateThemes(): boolean {
  log('🎨 Валидация тем chotto-themes-prototype', 'cyan');
  log('=' .repeat(50), 'cyan');
  
  const themes = getThemes();
  if (themes.length === 0) {
    log('❌ Темы не найдены', 'red');
    return false;
  }
  
  log(`📁 Найдено тем: ${themes.length}`, 'green');
  themes.forEach(theme => log(`   - ${theme}`, 'blue'));
  log('');
  
  // Сбор всех переменных из всех тем
  const allVariables = new Map<string, Map<string, CSSVariable>>(); // themeName -> variables
  const globalVariableSet = new Set<string>(); // все уникальные переменные
  
  for (const theme of themes) {
    const varsPath = path.join(THEMES_DIR, theme, 'vars.scss');
    const variables = extractCSSVariables(varsPath);
    allVariables.set(theme, variables);
    
    // Добавляем переменные в глобальный набор
    for (const [varName] of variables) {
      if (varName && varName.trim() !== '') {
        globalVariableSet.add(varName);
      }
    }
    
    log(`📋 Тема "${theme}": ${variables.size} переменных`, 'blue');
  }
  
  log('');
  
  // Проверка консистентности переменных
  let hasErrors = false;
  let totalErrors = 0;
  let totalWarnings = 0;
  
  log('🔍 Проверка консистентности переменных...', 'yellow');
  log('');
  
  for (const varName of globalVariableSet) {
    const themeUsage = new Map<string, CSSVariable>();
    
    // Собираем использование переменной во всех темах
    for (const [theme, variables] of allVariables) {
      if (variables.has(varName)) {
        const variable = variables.get(varName)!;
        themeUsage.set(theme, variable);
      }
    }
    
    // Проверяем, что переменная используется во всех темах
    const missingThemes = themes.filter(theme => !themeUsage.has(theme));
    if (missingThemes.length > 0) {
      log(`❌ Переменная ${varName} отсутствует в темах: ${missingThemes.join(', ')}`, 'red');
      hasErrors = true;
      totalErrors++;
    }
    
    // Валидация синтаксиса для каждой переменной
    for (const [theme, variable] of themeUsage) {
      const syntaxErrors = validateCSSValue(variable.value);
      if (syntaxErrors.length > 0) {
        log(`❌ ${theme}: ${varName} (строка ${variable.line}) - ${syntaxErrors.join(', ')}`, 'red');
        hasErrors = true;
        totalErrors++;
      }
    }
  }
  
  // Проверка на лишние переменные (переменные, которые есть только в одной теме)
  log('');
  log('🔍 Проверка на лишние переменные...', 'yellow');
  
  for (const [theme, variables] of allVariables) {
    for (const [varName] of variables) {
      const usageCount = Array.from(allVariables.values())
        .filter(themeVars => themeVars.has(varName)).length;
      
      if (usageCount === 1) {
        log(`⚠️  Переменная ${varName} используется только в теме "${theme}"`, 'yellow');
        totalWarnings++;
      }
    }
  }
  
  // Статистика
  log('');
  log('📊 Статистика валидации:', 'cyan');
  log(`   Всего переменных: ${globalVariableSet.size}`, 'blue');
  log(`   Ошибок: ${totalErrors}`, totalErrors > 0 ? 'red' : 'green');
  log(`   Предупреждений: ${totalWarnings}`, totalWarnings > 0 ? 'yellow' : 'green');
  
  // Детальная статистика по темам
  log('');
  log('📋 Детальная статистика по темам:', 'cyan');
  for (const [theme, variables] of allVariables) {
    const missingCount = globalVariableSet.size - variables.size;
    const status = missingCount === 0 ? '✅' : '❌';
    log(`   ${status} ${theme}: ${variables.size}/${globalVariableSet.size} переменных`, 
        missingCount === 0 ? 'green' : 'red');
    
    if (missingCount > 0) {
      const missing = Array.from(globalVariableSet).filter(varName => !variables.has(varName));
      log(`      Отсутствуют: ${missing.slice(0, 3).join(', ')}${missing.length > 3 ? '...' : ''}`, 'red');
    }
  }
  
  // Результат
  log('');
  if (hasErrors) {
    log('❌ Валидация завершена с ошибками', 'red');
    return false;
  } else {
    log('✅ Валидация завершена успешно', 'green');
    if (totalWarnings > 0) {
      log(`⚠️  Найдено ${totalWarnings} предупреждений`, 'yellow');
    }
    return true;
  }
}

// Запуск валидации
const success = validateThemes();
process.exit(success ? 0 : 1);

export { validateThemes, extractCSSVariables, validateCSSValue };
