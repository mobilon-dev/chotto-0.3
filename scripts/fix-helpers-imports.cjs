const fs = require('fs');
const path = require('path');

// Функция для исправления импортов helpers
function fixHelpersImports() {
  const componentsDir = 'src/components';
  
  // Рекурсивно обходим все файлы
  function walkDir(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        walkDir(filePath);
      } else if (file.endsWith('.vue')) {
        fixImportsInFile(filePath);
      }
    });
  }
  
  function fixImportsInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    
    // Определяем уровень вложенности для правильного относительного пути
    const relativePath = path.relative(componentsDir, filePath);
    const pathParts = relativePath.split(path.sep);
    
    if (pathParts.length >= 2) {
      const category = pathParts[0]; // atoms, blocks, compounds, elements, molecules, organisms
      const componentName = pathParts[1]; // имя компонента
      
      let correctHelpersPath;
      
      if (pathParts.length === 2) {
        // Файл находится прямо в категории (старая структура)
        correctHelpersPath = '../../helpers/';
      } else {
        // Файл находится в папке компонента (новая структура)
        correctHelpersPath = '../../../helpers/';
      }
      
      // Исправляем импорты helpers
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/helpers\//g,
        `from '${correctHelpersPath}`
      );
      
      // Исправляем импорты helpers без слеша в конце
      content = content.replace(
        /from\s+['"]\.\.\/\.\.\/helpers['"];?/g,
        `from '${correctHelpersPath.slice(0, -1)}';`
      );
      
      if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed helpers imports in: ${filePath}`);
      }
    }
  }
  
  walkDir(componentsDir);
  console.log('Helpers import fixing completed!');
}

// Запускаем исправление
fixHelpersImports();
