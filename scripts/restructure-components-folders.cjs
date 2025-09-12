const fs = require('fs');
const path = require('path');

// Функция для создания директории если она не существует
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Функция для перемещения файла
function moveFile(from, to) {
  ensureDir(path.dirname(to));
  fs.renameSync(from, to);
  console.log(`Moved: ${from} -> ${to}`);
}

// Функция для обновления импортов в файле
function updateImports(filePath, componentName, level) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Обновляем импорт самого компонента
  content = content.replace(
    new RegExp(`import\\s+${componentName}\\s+from\\s+['"]\\.\\/${componentName}\\.vue['"];?`, 'g'),
    `import ${componentName} from '../${componentName}.vue';`
  );
  
  // Обновляем относительные импорты других компонентов в зависимости от уровня вложенности
  const levelUp = '../'.repeat(level);
  
  // Обновляем импорты контейнеров
  content = content.replace(
    /import\s+(\w+)\s+from\s+['"]\.\.\/containers\/(\w+\.vue)['"];?/g,
    `import $1 from '${levelUp}containers/$2';`
  );
  
  // Обновляем импорты других компонентов из atoms
  content = content.replace(
    /import\s+(\w+)\s+from\s+['"]\.\/(\w+\.vue)['"];?/g,
    `import $1 from '../$2/$2.vue';`
  );
  
  fs.writeFileSync(filePath, content);
  console.log(`Updated imports in: ${filePath}`);
}

// Функция для обновления индексного файла
function updateIndexFile(indexPath, components) {
  let content = '// Components\n';
  
  components.forEach(componentName => {
    content += `export { default as ${componentName} } from './${componentName}/${componentName}.vue';\n`;
  });
  
  fs.writeFileSync(indexPath, content);
  console.log(`Updated index file: ${indexPath}`);
}

// Основная функция реорганизации
function restructureComponents() {
  const componentsDir = 'src/components';
  const categories = ['atoms', 'blocks', 'compounds', 'elements', 'molecules', 'organisms'];
  
  categories.forEach(category => {
    const categoryPath = path.join(componentsDir, category);
    if (!fs.existsSync(categoryPath)) return;
    
    console.log(`\nProcessing category: ${category}`);
    
    const files = fs.readdirSync(categoryPath);
    const components = [];
    
    // Находим все .vue файлы (компоненты)
    const vueFiles = files.filter(file => file.endsWith('.vue'));
    
    vueFiles.forEach(vueFile => {
      const componentName = path.basename(vueFile, '.vue');
      const componentDir = path.join(categoryPath, componentName);
      const storiesDir = path.join(componentDir, 'stories');
      
      console.log(`  Processing component: ${componentName}`);
      
      // Создаем папку компонента и папку stories
      ensureDir(componentDir);
      ensureDir(storiesDir);
      
      // Перемещаем .vue файл
      const oldVuePath = path.join(categoryPath, vueFile);
      const newVuePath = path.join(componentDir, vueFile);
      if (fs.existsSync(oldVuePath) && !fs.existsSync(newVuePath)) {
        moveFile(oldVuePath, newVuePath);
      }
      
      // Перемещаем .stories.ts файл если существует
      const storiesFile = `${componentName}.stories.ts`;
      const oldStoriesPath = path.join(categoryPath, storiesFile);
      const newStoriesPath = path.join(storiesDir, storiesFile);
      
      if (fs.existsSync(oldStoriesPath)) {
        moveFile(oldStoriesPath, newStoriesPath);
        
        // Обновляем импорты в stories файле
        updateImports(newStoriesPath, componentName, 2); // 2 уровня вверх (stories -> component -> category)
      }
      
      components.push(componentName);
    });
    
    // Обновляем индексный файл категории
    if (components.length > 0) {
      const indexPath = path.join(categoryPath, 'index.ts');
      updateIndexFile(indexPath, components);
    }
  });
  
  console.log('\nRestructuring completed!');
}

// Запускаем реорганизацию
restructureComponents();
