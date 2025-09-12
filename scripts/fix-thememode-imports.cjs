const fs = require('fs');
const path = require('path');

// Функция для исправления импортов ThemeMode
function fixThemeModeImports() {
  const componentsDir = 'src/components';
  
  // Рекурсивно обходим все файлы
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.stories.ts')) {
        fixImportsInFile(filePath);
      }
    });
  }
  
  function fixImportsInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Определяем категорию файла для правильного относительного пути
    const relativePath = path.relative(componentsDir, filePath);
    const pathParts = relativePath.split(path.sep);
    
    if (pathParts.length >= 3) {
      const category = pathParts[0]; // atoms, blocks, compounds, elements, molecules, organisms
      
      let correctThemeModeImport;
      
      if (category === 'elements') {
        // Для elements компонентов - ThemeMode в той же категории
        correctThemeModeImport = '../ThemeMode/ThemeMode.vue';
      } else {
        // Для других категорий - ThemeMode в elements
        correctThemeModeImport = '../../elements/ThemeMode/ThemeMode.vue';
      }
      
      // Исправляем неправильные импорты ThemeMode
      content = content.replace(
        /import\s+ThemeMode\s+from\s+['"][^'"]*ThemeMode[^'"]*['"];?/g,
        `import ThemeMode from '${correctThemeModeImport}';`
      );
      
      // Специальный случай для ThemeMode.stories.ts - он должен импортировать сам себя
      if (filePath.includes('ThemeMode/stories/ThemeMode.stories.ts')) {
        content = content.replace(
          /import\s+ThemeMode\s+from\s+['"][^'"]*['"];?/g,
          `import ThemeMode from '../ThemeMode.vue';`
        );
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed ThemeMode import in: ${filePath}`);
      }
    }
  }
  
  walkDir(componentsDir);
  console.log('ThemeMode import fixing completed!');
}

// Запускаем исправление
fixThemeModeImports();
