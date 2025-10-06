#!/usr/bin/env tsx

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { glob } from 'glob';

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
  component: string;
  componentFolder: string;
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
  component: string;
  componentFolder: string;
  theme: string;
  isValid: boolean;
  errors: string[];
  invalidPrefixes: string[];
}

/**
 * Интерфейс для результатов валидации запрещенных переменных
 */
interface ForbiddenVariablesValidationResult {
  component: string;
  componentFolder: string;
  theme: string;
  isValid: boolean;
  errors: string[];
  forbiddenVariables: string[];
}

/**
 * Интерфейс для результатов валидации использования базовых настроек темы
 */
interface ThemeUsageValidationResult {
  component: string;
  componentFolder: string;
  theme: string;
  isValid: boolean;
  errors: string[];
  hardcodedValues: string[];
}

/**
 * Интерфейс для результатов валидации отсутствия data-theme в файлах стилей
 */
interface DataThemeValidationResult {
  component: string;
  componentFolder: string;
  theme: string;
  isValid: boolean;
  errors: string[];
  dataThemeUsage: string[];
}

/**
 * Интерфейс для результатов валидации отсутствия CSS классов в файлах тем
 */
interface CSSClassesValidationResult {
  component: string;
  componentFolder: string;
  theme: string;
  isValid: boolean;
  errors: string[];
  cssClasses: string[];
}

/**
 * Интерфейс для результатов валидации отсутствия импортов тем в файлах стилей
 */
interface ThemeImportsValidationResult {
  component: string;
  componentFolder: string;
  theme: string;
  isValid: boolean;
  errors: string[];
  themeImports: string[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
 * Логирование с цветами
 */
function log(message: string, color: Color = 'reset'): void {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Извлекает CSS переменные из SCSS файла
 */
function extractCSSVariablesFromSCSS(filePath: string): ThemeCSSVariables {
  const content = fs.readFileSync(filePath, 'utf-8');
  const variables: ThemeCSSVariables = {};
  
  // Регулярное выражение для поиска CSS переменных
  const variableRegex = /--chotto-([^:]+):\s*([^;]+);/g;
  let match;
  
  while ((match = variableRegex.exec(content)) !== null) {
    const variableName = `--chotto-${match[1]}`;
    const variableValue = match[2].trim();
    variables[variableName] = variableValue;
  }
  
  return variables;
}

/**
 * Получает интерфейс компонента из файла types.ts
 */
function getComponentInterface(componentPath: string): string[] {
  const typesPath = path.join(componentPath, 'styles', 'types.ts');
  
  if (!fs.existsSync(typesPath)) {
    return [];
  }
  
  const content = fs.readFileSync(typesPath, 'utf-8');
  const interfaceRegex = /export interface (\w*ThemeCSSVariables)\s*{([^}]+)}/s;
  const match = content.match(interfaceRegex);
  
  if (!match) {
    return [];
  }
  
  const interfaceContent = match[2];
  const variables: string[] = [];
  
  // Извлекаем переменные из интерфейса
  const variableRegex = /'([^']+)':\s*string;/g;
  let varMatch;
  
  while ((varMatch = variableRegex.exec(interfaceContent)) !== null) {
    variables.push(varMatch[1]);
  }
  
  return variables;
}

/**
 * 1. Валидация соответствия интерфейсам
 */
function validateComponentThemeInterface(
  componentName: string,
  componentFolder: string,
  themePath: string,
  expectedVariables: string[]
): InterfaceValidationResult {
  const themeName = path.basename(themePath, '.scss');
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
    component: componentName,
    componentFolder: componentFolder,
    theme: themeName,
    isValid,
    errors,
    missingVariables,
    extraVariables
  };
}

/**
 * 2. Валидация префиксов CSS переменных
 */
function validateCSSVariablePrefixes(
  componentName: string,
  componentFolder: string,
  themePath: string
): PrefixValidationResult {
  const themeName = path.basename(themePath, '.scss');
  const content = fs.readFileSync(themePath, 'utf-8');
  
  // Регулярное выражение для поиска всех CSS переменных
  const variableRegex = /--chotto-([a-zA-Z0-9-]+):/g;
  const expectedPrefix = `--chotto-${componentName.toLowerCase()}`;
  const invalidPrefixes: string[] = [];
  let match;
  
  while ((match = variableRegex.exec(content)) !== null) {
    const fullVariableName = `--chotto-${match[1]}`;
    
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
    component: componentName,
    componentFolder: componentFolder,
    theme: themeName,
    isValid,
    errors,
    invalidPrefixes
  };
}

/**
 * 3. Валидация отсутствия глобальных переменных в файлах стилей компонентов
 */
function validateForbiddenGlobalVariablesInStyleFiles(
  componentName: string,
  componentFolder: string,
  stylePath: string
): ForbiddenVariablesValidationResult {
  const themeName = `${componentName}.scss`;
  const content = fs.readFileSync(stylePath, 'utf-8');
  
  // Регулярное выражение для поиска глобальных переменных (использование в var())
  const globalVariableRegex = /var\(--chotto-theme-([a-zA-Z0-9-]+)\)/g;
  const forbiddenVariables: string[] = [];
  let match;
  
  while ((match = globalVariableRegex.exec(content)) !== null) {
    const fullVariableName = `--chotto-theme-${match[1]}`;
    forbiddenVariables.push(fullVariableName);
  }
  
  const isValid = forbiddenVariables.length === 0;
  const errors: string[] = [];
  
  if (forbiddenVariables.length > 0) {
    errors.push(`Запрещенные глобальные переменные: ${forbiddenVariables.join(', ')}`);
  }
  
  return {
    component: componentName,
    componentFolder: componentFolder,
    theme: themeName,
    isValid,
    errors,
    forbiddenVariables
  };
}

/**
 * 3. Валидация отсутствия глобальных переменных в файлах тем (должны быть разрешены)
 */
function validateForbiddenGlobalVariablesInThemeFiles(
  componentName: string,
  componentFolder: string,
  themePath: string
): ForbiddenVariablesValidationResult {
  const themeName = path.basename(themePath, '.scss');
  const content = fs.readFileSync(themePath, 'utf-8');
  
  // В файлах тем глобальные переменные разрешены, поэтому всегда возвращаем валидный результат
  return {
    component: componentName,
    componentFolder: componentFolder,
    theme: themeName,
    isValid: true,
    errors: [],
    forbiddenVariables: []
  };
}

/**
 * 4. Валидация использования базовых настроек темы
 */
function validateThemeUsageInComponents(
  componentName: string,
  componentFolder: string,
  stylePath: string
): ThemeUsageValidationResult {
  const content = fs.readFileSync(stylePath, 'utf-8');
  const hardcodedValues: string[] = [];
  
  // Функция для проверки, содержит ли строка CSS переменную
  function containsCSSVariable(line: string): boolean {
    return line.includes('var(--chotto-') || line.includes('var(--shadow-');
  }
  
  // Функция для проверки, является ли значение CSS переменной
  function isCSSVariable(value: string): boolean {
    return value.trim().startsWith('var(--chotto-') || value.trim().startsWith('var(--shadow-');
  }
  
  // Функция для получения строки, содержащей совпадение
  function getLineContainingMatch(content: string, matchIndex: number): string {
    const beforeMatch = content.substring(0, matchIndex);
    const lines = beforeMatch.split('\n');
    return lines[lines.length - 1] || '';
  }
  
  // Проверяем жестко заданные цвета (исключаем CSS переменные)
  const colorRegex = /:\s*(#[0-9a-fA-F]{3,6}|rgba?\([^)]+\)|hsla?\([^)]+\));/g;
  let colorMatch;
  while ((colorMatch = colorRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, colorMatch.index);
    
    if (!containsCSSVariable(currentLine)) {
      hardcodedValues.push(`Жестко заданный цвет: ${colorMatch[1]}`);
    }
  }
  
  // Проверяем жестко заданные размеры шрифтов (исключаем CSS переменные)
  const fontSizeRegex = /font-size:\s*([0-9.]+(?:rem|em|px|%));/g;
  let fontSizeMatch;
  while ((fontSizeMatch = fontSizeRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, fontSizeMatch.index);
    
    if (!containsCSSVariable(currentLine)) {
      hardcodedValues.push(`Жестко заданный размер шрифта: ${fontSizeMatch[1]}`);
    }
  }
  
  // Проверяем жестко заданные отступы (исключаем CSS переменные)
  const paddingRegex = /padding:\s*([0-9.]+(?:rem|em|px|%)(?:\s+[0-9.]+(?:rem|em|px|%))*);/g;
  let paddingMatch;
  while ((paddingMatch = paddingRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, paddingMatch.index);
    
    if (!containsCSSVariable(currentLine)) {
      hardcodedValues.push(`Жестко заданные отступы: ${paddingMatch[1]}`);
    }
  }
  
  // Проверяем жестко заданные скругления (исключаем CSS переменные)
  const borderRadiusRegex = /border-radius:\s*([0-9.]+(?:rem|em|px|%));/g;
  let borderRadiusMatch;
  while ((borderRadiusMatch = borderRadiusRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, borderRadiusMatch.index);
    
    if (!containsCSSVariable(currentLine)) {
      hardcodedValues.push(`Жестко заданное скругление: ${borderRadiusMatch[1]}`);
    }
  }
  
  // Проверяем жестко заданные шрифты (исключаем CSS переменные)
  const fontFamilyRegex = /font-family:\s*([^;]+);/g;
  let fontFamilyMatch;
  while ((fontFamilyMatch = fontFamilyRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, fontFamilyMatch.index);
    const fontValue = fontFamilyMatch[1].trim();
    
    if (!containsCSSVariable(currentLine) && !isCSSVariable(fontValue)) {
      hardcodedValues.push(`Жестко заданный шрифт: ${fontValue}`);
    }
  }
  
  // Проверяем жестко заданные тени (исключаем CSS переменные)
  const boxShadowRegex = /box-shadow:\s*([^;]+);/g;
  let boxShadowMatch;
  while ((boxShadowMatch = boxShadowRegex.exec(content)) !== null) {
    const currentLine = getLineContainingMatch(content, boxShadowMatch.index);
    const shadowValue = boxShadowMatch[1].trim();
    
    if (!containsCSSVariable(currentLine) && !isCSSVariable(shadowValue)) {
      hardcodedValues.push(`Жестко заданная тень: ${shadowValue}`);
    }
  }
  
  const isValid = hardcodedValues.length === 0;
  const errors: string[] = [];
  
  if (hardcodedValues.length > 0) {
    errors.push(`Жестко заданные значения: ${hardcodedValues.join(', ')}`);
  }
  
  return {
    component: componentName,
    componentFolder: componentFolder,
    theme: 'style.scss',
    isValid,
    errors,
    hardcodedValues
  };
}

/**
 * 5. Валидация отсутствия data-theme в файлах стилей
 */
function validateNoDataThemeInStyleFiles(
  componentName: string,
  componentFolder: string,
  stylePath: string
): DataThemeValidationResult {
  const content = fs.readFileSync(stylePath, 'utf-8');
  const dataThemeUsage: string[] = [];
  
  // Регулярное выражение для поиска data-theme
  const dataThemeRegex = /\[data-theme="[^"]+"\]/g;
  let match;
  
  while ((match = dataThemeRegex.exec(content)) !== null) {
    dataThemeUsage.push(match[0]);
  }
  
  const isValid = dataThemeUsage.length === 0;
  const errors: string[] = [];
  
  if (dataThemeUsage.length > 0) {
    errors.push(`Использование data-theme в файле стилей: ${dataThemeUsage.join(', ')}`);
  }
  
  return {
    component: componentName,
    componentFolder: componentFolder,
    theme: 'style.scss',
    isValid,
    errors,
    dataThemeUsage
  };
}

/**
 * 6. Валидация отсутствия CSS классов в файлах тем
 */
function validateNoCSSClassesInThemeFiles(
  componentName: string,
  componentFolder: string,
  themePath: string
): CSSClassesValidationResult {
  const themeName = path.basename(themePath, '.scss');
  const content = fs.readFileSync(themePath, 'utf-8');
  const cssClasses: string[] = [];
  
  // Разбиваем на строки и проверяем каждую
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Пропускаем пустые строки и комментарии
    if (!line || line.startsWith('//') || line.startsWith('/*')) {
      continue;
    }
    
    // Ищем CSS классы в строке
    const classMatch = line.match(/\.([a-zA-Z][a-zA-Z0-9_-]*)\s*{/);
    if (classMatch) {
      const className = classMatch[1];
      
      // Запрещаем любые CSS классы в файлах тем компонентов
      cssClasses.push(`.${className}`);
    }
  }
  
  const isValid = cssClasses.length === 0;
  const errors: string[] = [];
  
  if (cssClasses.length > 0) {
    errors.push(`CSS классы в файле темы: ${cssClasses.join(', ')}`);
  }
  
  return {
    component: componentName,
    componentFolder: componentFolder,
    theme: themeName,
    isValid,
    errors,
    cssClasses
  };
}

/**
 * 7. Валидация отсутствия импортов тем в файлах стилей
 */
function validateNoThemeImportsInStyleFiles(
  componentName: string,
  componentFolder: string,
  stylePath: string
): ThemeImportsValidationResult {
  const content = fs.readFileSync(stylePath, 'utf-8');
  const themeImports: string[] = [];
  
  // Регулярное выражение для поиска импортов тем
  const themeImportRegex = /@(import|use)\s+['"][^'"]*themes[^'"]*['"]/g;
  let match;
  
  while ((match = themeImportRegex.exec(content)) !== null) {
    themeImports.push(match[0]);
  }
  
  const isValid = themeImports.length === 0;
  const errors: string[] = [];
  
  if (themeImports.length > 0) {
    errors.push(`Импорты тем в файле стилей: ${themeImports.join(', ')}`);
  }
  
  return {
    component: componentName,
    componentFolder: componentFolder,
    theme: 'style.scss',
    isValid,
    errors,
    themeImports
  };
}

/**
 * Основная функция валидации
 */
async function validateAllThemes(): Promise<void> {
  log('🔍 Начинаю валидацию тем компонентов...', 'cyan');
  log('');
  
  // Находим компоненты рекурсивно: любая папка внутри src/components/**, в которой есть подпапка styles
  // Исключаем только служебные подпапки (styles, stories, themes) как сами компоненты
  const allPaths = await glob('src/components/**');
  const componentPaths = allPaths.filter(p => {
    const isDirectory = fs.existsSync(p) && fs.statSync(p).isDirectory();
    if (!isDirectory) return false;
    const pathParts = p.split('/');
    const name = pathParts[pathParts.length - 1];
    // Исключаем служебные папки сами по себе
    if (['styles', 'stories', 'themes'].includes(name)) return false;
    // Считаем компонентом только папку, в которой есть подпапка styles
    const stylesDir = path.join(p, 'styles');
    return fs.existsSync(stylesDir) && fs.statSync(stylesDir).isDirectory();
  });
  
  const interfaceResults: InterfaceValidationResult[] = [];
  const prefixResults: PrefixValidationResult[] = [];
  const forbiddenResults: ForbiddenVariablesValidationResult[] = [];
  const themeUsageResults: ThemeUsageValidationResult[] = [];
  const dataThemeResults: DataThemeValidationResult[] = [];
  const cssClassesResults: CSSClassesValidationResult[] = [];
  const themeImportsResults: ThemeImportsValidationResult[] = [];
  
  for (const componentPath of componentPaths) {
    const componentName = path.basename(componentPath);
    const componentFolder = path.basename(path.dirname(componentPath));
    const typesPath = path.join(componentPath, 'styles', 'types.ts');
    
    // Проверяем основной файл стилей компонента (для всех компонентов)
    const stylePath = path.join(componentPath, 'styles', `${componentName}.scss`);
    if (fs.existsSync(stylePath)) {
      // 3. Валидация отсутствия глобальных переменных в файлах стилей
      const forbiddenStyleResult = validateForbiddenGlobalVariablesInStyleFiles(componentName, componentFolder, stylePath);
      forbiddenResults.push(forbiddenStyleResult);
      
      // 4. Валидация использования базовых настроек темы
      const themeUsageResult = validateThemeUsageInComponents(componentName, componentFolder, stylePath);
      themeUsageResults.push(themeUsageResult);
      
      // 5. Валидация отсутствия data-theme в файлах стилей
      const dataThemeResult = validateNoDataThemeInStyleFiles(componentName, componentFolder, stylePath);
      dataThemeResults.push(dataThemeResult);
      
      // 7. Валидация отсутствия импортов тем в файлах стилей
      const themeImportsResult = validateNoThemeImportsInStyleFiles(componentName, componentFolder, stylePath);
      themeImportsResults.push(themeImportsResult);
      
      if (!forbiddenStyleResult.isValid) {
        log(`   ❌  style.scss: ${forbiddenStyleResult.errors.join('; ')}`, 'red');
      }
      
      if (!themeUsageResult.isValid) {
        log(`   ⚠️  style.scss: ${themeUsageResult.errors.join('; ')}`, 'yellow');
      }
      
      if (!dataThemeResult.isValid) {
        log(`   ❌  style.scss: ${dataThemeResult.errors.join('; ')}`, 'red');
      }
      
      if (!themeImportsResult.isValid) {
        log(`   ❌  style.scss: ${themeImportsResult.errors.join('; ')}`, 'red');
      }
    }
    
    // Проверяем, есть ли файл types.ts
    if (!fs.existsSync(typesPath)) {
      log(`⚠️  Компонент ${componentName}: файл types.ts не найден`, 'yellow');
      continue;
    }
    
    // Получаем ожидаемые переменные из интерфейса
    const expectedVariables = getComponentInterface(componentPath);
    
    if (expectedVariables.length === 0) {
      log(`⚠️  Компонент ${componentName}: интерфейс не найден или пуст`, 'yellow');
      continue;
    }
    
    log(`📋 Проверяю компонент: ${componentName}`, 'blue');
    log(`   Ожидаемые переменные: ${expectedVariables.length}`, 'blue');
    
    // Находим все темы компонента
    const themePaths = await glob(path.join(componentPath, 'styles/themes/*.scss'));
    
    for (const themePath of themePaths) {
      // 1. Валидация соответствия интерфейсу
      const interfaceResult = validateComponentThemeInterface(componentName, componentFolder, themePath, expectedVariables);
      interfaceResults.push(interfaceResult);
      
      // 2. Валидация префиксов CSS переменных
      const prefixResult = validateCSSVariablePrefixes(componentName, componentFolder, themePath);
      prefixResults.push(prefixResult);
      
      // 3. Валидация отсутствия глобальных переменных в файлах тем (разрешены)
      const forbiddenResult = validateForbiddenGlobalVariablesInThemeFiles(componentName, componentFolder, themePath);
      forbiddenResults.push(forbiddenResult);
      
      // 6. Валидация отсутствия CSS классов в файлах тем
      const cssClassesResult = validateNoCSSClassesInThemeFiles(componentName, componentFolder, themePath);
      cssClassesResults.push(cssClassesResult);
      
      const themeName = path.basename(themePath, '.scss');
      
      if (interfaceResult.isValid && prefixResult.isValid && forbiddenResult.isValid && cssClassesResult.isValid) {
        log(`   ✅ ${themeName}: интерфейс OK, префиксы OK, глобальные переменные OK, CSS классы OK`, 'green');
      } else {
        const allErrors = [...interfaceResult.errors, ...prefixResult.errors, ...forbiddenResult.errors, ...cssClassesResult.errors];
        log(`   ❌ ${themeName}: ${allErrors.join('; ')}`, 'red');
      }
    }
    
    log('');
  }
  
  // Выводим итоговую статистику
  const allResults = [...interfaceResults, ...prefixResults, ...forbiddenResults, ...themeUsageResults, ...dataThemeResults, ...cssClassesResults, ...themeImportsResults];
  const validResults = allResults.filter(r => r.isValid);
  const invalidResults = allResults.filter(r => !r.isValid);
  
  log('📊 Итоговая статистика:', 'cyan');
  log(`   Всего проверено: ${interfaceResults.length} тем (7 проверок на тему)`, 'blue');
  log(`   ✅ Валидных проверок: ${validResults.length}`, 'green');
  log(`   ❌ Невалидных проверок: ${invalidResults.length}`, invalidResults.length > 0 ? 'red' : 'green');
  
  if (invalidResults.length > 0) {
    log('', 'reset');
    log('❌ Детали ошибок:', 'red');
    for (const result of invalidResults) {
      // Показываем папку компонента и имя файла
      const displayName = result.theme === 'style.scss' 
        ? `${result.componentFolder} / ${result.component}.scss` 
        : `${result.componentFolder} / ${result.theme}`;
      log(`   ${displayName}:`, 'yellow');
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

export { 
  validateAllThemes, 
  extractCSSVariablesFromSCSS, 
  validateComponentThemeInterface,
  validateCSSVariablePrefixes,
  validateForbiddenGlobalVariablesInStyleFiles,
  validateForbiddenGlobalVariablesInThemeFiles,
  validateThemeUsageInComponents,
  validateNoDataThemeInStyleFiles,
  validateNoCSSClassesInThemeFiles,
  validateNoThemeImportsInStyleFiles
};