#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import type { ThemeName, ChottoThemeVariableName, ChottoThemeVariables } from '../src/themes/types';

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

/**
 * Интерфейс для CSS переменных темы
 */
interface ThemeCSSVariables {
  [key: string]: string;
}

/**
 * Интерфейс для результатов валидации соответствия интерфейсу
 */
interface InterfaceValidationResult {
  theme: string;
  isValid: boolean;
  errors: string[];
  missingVariables: string[];
  extraVariables: string[];
}

/**
 * Интерфейс для результатов валидации префиксов
 */
interface PrefixValidationResult {
  theme: string;
  isValid: boolean;
  errors: string[];
  invalidPrefixes: string[];
}

/**
 * Интерфейс для результатов валидации синтаксиса
 */
interface SyntaxValidationResult {
  theme: string;
  isValid: boolean;
  errors: string[];
  syntaxErrors: Array<{
    variable: string;
    error: string;
    line: number;
  }>;
}

/**
 * Интерфейс для результатов валидации цветовой палитры
 */
interface ColorPaletteValidationResult {
  theme: string;
  isValid: boolean;
  errors: string[];
  missingColors: string[];
  extraColors: string[];
}

/**
 * Логирование с цветами
 */
function log(message: string, color: Color = 'reset'): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Извлечение CSS переменных из SCSS файла
 */
function extractCSSVariablesFromSCSS(filePath: string): ThemeCSSVariables {
  const content = fs.readFileSync(filePath, 'utf-8');
  const variables: ThemeCSSVariables = {};
  
  // Регулярное выражение для поиска CSS переменных
  const variableRegex = /--chotto-theme-([^:]+):\s*([^;]+);/g;
  let match;
  
  while ((match = variableRegex.exec(content)) !== null) {
    const variableName = `--chotto-theme-${match[1]}`;
    const variableValue = match[2].trim();
    variables[variableName] = variableValue;
  }
  
  return variables;
}

/**
 * Извлечение цветовой палитры из SCSS файла
 */
function extractColorPaletteFromSCSS(filePath: string): ThemeCSSVariables {
  const content = fs.readFileSync(filePath, 'utf-8');
  const variables: ThemeCSSVariables = {};
  
  // Регулярное выражение для поиска цветовых переменных
  const colorRegex = /--(azure|emerald|neutral|p-red|p-coral|default)-([a-zA-Z0-9-]+):\s*([^;]+);/g;
  let match;
  
  while ((match = colorRegex.exec(content)) !== null) {
    const variableName = `--${match[1]}-${match[2]}`;
    const variableValue = match[3].trim();
    variables[variableName] = variableValue;
  }
  
  return variables;
}

/**
 * Получение ожидаемых переменных из TypeScript интерфейса
 */
function getExpectedThemeVariables(): string[] {
  const typesPath = path.join(__dirname, '..', 'src', 'themes', 'types.ts');
  
  if (!fs.existsSync(typesPath)) {
    return [];
  }
  
  const content = fs.readFileSync(typesPath, 'utf-8');
  const interfaceRegex = /export interface ChottoThemeVariables\s*{([^}]+)}/s;
  const match = content.match(interfaceRegex);
  
  if (!match) {
    return [];
  }
  
  const interfaceContent = match[1];
  const variables: string[] = [];
  
  // Извлекаем переменные из интерфейса
  const variableRegex = /'([^']+)':\s*(string|number|string\s*\|\s*number);/g;
  let varMatch;
  
  while ((varMatch = variableRegex.exec(interfaceContent)) !== null) {
    variables.push(varMatch[1]);
  }
  
  return variables;
}

/**
 * Получение ожидаемых цветовых переменных из TypeScript интерфейса
 */
function getExpectedColorPaletteVariables(): string[] {
  const typesPath = path.join(__dirname, '..', 'src', 'themes', 'types.ts');
  
  if (!fs.existsSync(typesPath)) {
    return [];
  }
  
  const content = fs.readFileSync(typesPath, 'utf-8');
  const interfaceRegex = /export interface ChottoColorPalette\s*{([^}]+)}/s;
  const match = content.match(interfaceRegex);
  
  if (!match) {
    return [];
  }
  
  const interfaceContent = match[1];
  const variables: string[] = [];
  
  // Извлекаем переменные из интерфейса
  const variableRegex = /'([^']+)':\s*(string|number|string\s*\|\s*number);/g;
  let varMatch;
  
  while ((varMatch = variableRegex.exec(interfaceContent)) !== null) {
    variables.push(varMatch[1]);
  }
  
  return variables;
}

/**
 * Валидация соответствия темы интерфейсу
 */
function validateThemeInterface(
  themeName: string,
  themePath: string,
  expectedVariables: string[]
): InterfaceValidationResult {
  const actualVariables = extractCSSVariablesFromSCSS(themePath);
  const actualVariableNames = Object.keys(actualVariables);
  
  const missingVariables = expectedVariables.filter(
    expected => !actualVariableNames.includes(expected)
  );
  
  const extraVariables = actualVariableNames.filter(
    actual => !expectedVariables.includes(actual)
  );
  
  const isValid = missingVariables.length === 0 && extraVariables.length === 0;
  const errors: string[] = [];
  
  if (missingVariables.length > 0) {
    errors.push(`Отсутствуют переменные: ${missingVariables.join(', ')}`);
  }
  
  if (extraVariables.length > 0) {
    errors.push(`Лишние переменные: ${extraVariables.join(', ')}`);
  }
  
  return {
    theme: themeName,
    isValid,
    errors,
    missingVariables,
    extraVariables
  };
}

/**
 * Валидация префиксов CSS переменных
 */
function validateCSSVariablePrefixes(
  themeName: string,
  themePath: string
): PrefixValidationResult {
  const content = fs.readFileSync(themePath, 'utf-8');
  
  // Регулярное выражение для поиска всех CSS переменных
  const variableRegex = /--chotto-theme-([a-zA-Z0-9-]+):/g;
  const expectedPrefix = '--chotto-theme-';
  const invalidPrefixes: string[] = [];
  let match;
  
  while ((match = variableRegex.exec(content)) !== null) {
    const fullVariableName = `--chotto-theme-${match[1]}`;
    
    // Проверяем, что переменная начинается с правильного префикса
    if (!fullVariableName.startsWith(expectedPrefix)) {
      invalidPrefixes.push(fullVariableName);
    }
  }
  
  const isValid = invalidPrefixes.length === 0;
  const errors: string[] = [];
  
  if (invalidPrefixes.length > 0) {
    errors.push(`Неправильные префиксы: ${invalidPrefixes.join(', ')}`);
  }
  
  return {
    theme: themeName,
    isValid,
    errors,
    invalidPrefixes
  };
}

/**
 * Валидация синтаксиса CSS переменных
 */
function validateCSSSyntax(
  themeName: string,
  themePath: string
): SyntaxValidationResult {
  const content = fs.readFileSync(themePath, 'utf-8');
  const lines = content.split('\n');
  const syntaxErrors: Array<{ variable: string; error: string; line: number }> = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (line.startsWith('--chotto-theme-') && line.includes(':')) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const varName = line.substring(0, colonIndex).trim();
        const varValue = line.substring(colonIndex + 1).replace(/;$/, '').trim();
        
        const errors = validateCSSValue(varValue);
        if (errors.length > 0) {
          syntaxErrors.push({
            variable: varName,
            error: errors.join(', '),
            line: i + 1
          });
        }
      }
    }
  }
  
  const isValid = syntaxErrors.length === 0;
  const errors: string[] = [];
  
  if (syntaxErrors.length > 0) {
    errors.push(`Синтаксические ошибки: ${syntaxErrors.length} переменных`);
  }
  
  return {
    theme: themeName,
    isValid,
    errors,
    syntaxErrors
  };
}

/**
 * Валидация цветовой палитры
 */
function validateColorPalette(
  themeName: string,
  themePath: string,
  expectedColors: string[]
): ColorPaletteValidationResult {
  const actualColors = extractColorPaletteFromSCSS(themePath);
  const actualColorNames = Object.keys(actualColors);
  
  const missingColors = expectedColors.filter(
    expected => !actualColorNames.includes(expected)
  );
  
  const extraColors = actualColorNames.filter(
    actual => !expectedColors.includes(actual)
  );
  
  const isValid = missingColors.length === 0 && extraColors.length === 0;
  const errors: string[] = [];
  
  if (missingColors.length > 0) {
    errors.push(`Отсутствуют цвета: ${missingColors.join(', ')}`);
  }
  
  if (extraColors.length > 0) {
    errors.push(`Лишние цвета: ${extraColors.join(', ')}`);
  }
  
  return {
    theme: themeName,
    isValid,
    errors,
    missingColors,
    extraColors
  };
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
function getThemes(): ThemeName[] {
  try {
    const themes = fs.readdirSync(THEMES_DIR, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name as ThemeName);
    
    return themes;
  } catch (error) {
    log(`Ошибка при чтении директории тем: ${(error as Error).message}`, 'red');
    return [];
  }
}

/**
 * Основная функция валидации
 */
async function validateAllThemes(): Promise<void> {
  log('🔍 Начинаю валидацию тем chotto-themes-prototype...', 'cyan');
  log('');
  
  const themes = getThemes();
  if (themes.length === 0) {
    log('❌ Темы не найдены', 'red');
    process.exit(1);
  }
  
  log(`📁 Найдено тем: ${themes.length}`, 'green');
  themes.forEach(theme => log(`   - ${theme}`, 'blue'));
  log('');
  
  // Получаем ожидаемые переменные из TypeScript интерфейсов
  const expectedThemeVariables = getExpectedThemeVariables();
  const expectedColorVariables = getExpectedColorPaletteVariables();
  
  log(`🔍 Отладочная информация:`, 'yellow');
  log(`   Найдено переменных темы: ${expectedThemeVariables.length}`, 'blue');
  log(`   Найдено цветов: ${expectedColorVariables.length}`, 'blue');
  log(`   Первые 5 переменных: ${expectedThemeVariables.slice(0, 5).join(', ')}`, 'blue');
  log(`   Font-weight переменные: ${expectedThemeVariables.filter(v => v.includes('font-weight')).join(', ')}`, 'blue');
  log('');
  
  if (expectedThemeVariables.length === 0) {
    log('❌ Не удалось получить ожидаемые переменные из интерфейса ChottoThemeVariables', 'red');
    process.exit(1);
  }
  
  if (expectedColorVariables.length === 0) {
    log('❌ Не удалось получить ожидаемые цвета из интерфейса ChottoColorPalette', 'red');
    process.exit(1);
  }
  
  // Массивы для сбора результатов валидации
  const interfaceResults: InterfaceValidationResult[] = [];
  const prefixResults: PrefixValidationResult[] = [];
  const syntaxResults: SyntaxValidationResult[] = [];
  const colorPaletteResults: ColorPaletteValidationResult[] = [];
  
  // Валидация каждой темы
  for (const theme of themes) {
    const varsPath = path.join(THEMES_DIR, theme, 'vars.scss');
    
    if (!fs.existsSync(varsPath)) {
      log(`⚠️  Тема ${theme}: файл vars.scss не найден`, 'yellow');
      continue;
    }
    
    log(`📋 Проверяю тему: ${theme}`);
    log(`   Ожидаемые переменные темы: ${expectedThemeVariables.length}`);
    log(`   Ожидаемые цвета: ${expectedColorVariables.length}`);
    
    // Валидация 1: Соответствие интерфейсу
    const interfaceResult = validateThemeInterface(theme, varsPath, expectedThemeVariables);
    interfaceResults.push(interfaceResult);
    
    // Валидация 2: Префиксы CSS переменных
    const prefixResult = validateCSSVariablePrefixes(theme, varsPath);
    prefixResults.push(prefixResult);
    
    // Валидация 3: Синтаксис CSS переменных
    const syntaxResult = validateCSSSyntax(theme, varsPath);
    syntaxResults.push(syntaxResult);
    
    // Валидация 4: Цветовая палитра
    const colorPaletteResult = validateColorPalette(theme, varsPath, expectedColorVariables);
    colorPaletteResults.push(colorPaletteResult);
    
    // Выводим результаты для текущей темы
    if (interfaceResult.isValid && prefixResult.isValid && syntaxResult.isValid && colorPaletteResult.isValid) {
      log(`   ✅ ${theme}: интерфейс OK, префиксы OK, синтаксис OK, цвета OK`, 'green');
    } else {
      const allErrors = [...interfaceResult.errors, ...prefixResult.errors, ...syntaxResult.errors, ...colorPaletteResult.errors];
      log(`   ❌ ${theme}: ${allErrors.join('; ')}`, 'red');
    }
    
    log('');
  }
  
  // Выводим итоговую статистику
  const allResults = [...interfaceResults, ...prefixResults, ...syntaxResults, ...colorPaletteResults];
  const validResults = allResults.filter(r => r.isValid);
  const invalidResults = allResults.filter(r => !r.isValid);
  
  log('📊 Итоговая статистика:', 'cyan');
  log(`   Всего проверено: ${themes.length} тем (4 проверки на тему)`, 'blue');
  log(`   ✅ Валидных проверок: ${validResults.length}`, 'green');
  log(`   ❌ Невалидных проверок: ${invalidResults.length}`, invalidResults.length > 0 ? 'red' : 'green');
  
  if (invalidResults.length > 0) {
    log('', 'reset');
    log('❌ Детали ошибок:', 'red');
    for (const result of invalidResults) {
      log(`   ${result.theme}:`, 'yellow');
      for (const error of result.errors) {
        log(`     - ${error}`, 'red');
      }
    }
    process.exit(1);
  } else {
    log('', 'reset');
    log('🎉 Все темы валидны!', 'green');
  }
}

// Запускаем валидацию
validateAllThemes().catch(error => {
  log(`❌ Ошибка при валидации: ${error}`, 'red');
  process.exit(1);
});

export { validateAllThemes, extractCSSVariablesFromSCSS, validateCSSValue };
