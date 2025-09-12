const fs = require('fs');
const path = require('path');

// Функция для исправления всех импортов
function fixAllImports() {
  const componentsDir = 'src/components';
  const helpersDir = 'src/helpers';
  
  // Исправляем импорты в компонентах
  function fixComponentImports() {
    console.log('Fixing component imports...');
    
    function walkDir(dir) {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          walkDir(filePath);
        } else if (file.endsWith('.vue')) {
          fixImportsInComponentFile(filePath);
        }
      });
    }
    
    function fixImportsInComponentFile(filePath) {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // Определяем уровень вложенности
      const relativePath = path.relative(componentsDir, filePath);
      const pathParts = relativePath.split(path.sep);
      
      if (pathParts.length >= 2) {
        const category = pathParts[0];
        const isInComponentFolder = pathParts.length > 2;
        
        // Исправляем импорты locale
        if (isInComponentFolder) {
          content = content.replace(
            /from\s+['"]\.\.\/\.\.\/locale\//g,
            "from '../../../locale/"
          );
        } else {
          content = content.replace(
            /from\s+['"]\.\.\/\.\.\/locale\//g,
            "from '../../locale/"
          );
        }
        
        // Исправляем импорты других компонентов
        const categories = ['atoms', 'blocks', 'compounds', 'elements', 'molecules', 'organisms'];
        
        categories.forEach(otherCategory => {
          if (isInComponentFolder) {
            // Из папки компонента
            content = content.replace(
              new RegExp(`from\\s+['"]\\.\\.\\/${otherCategory}\\/([^'"]*)\\.vue['"];?`, 'g'),
              `from '../../${otherCategory}/$1/$1.vue';`
            );
          } else {
            // Из корня категории (старая структура)
            content = content.replace(
              new RegExp(`from\\s+['"]\\.\\.\\/${otherCategory}\\/([^'"]*)\\.vue['"];?`, 'g'),
              `from '../${otherCategory}/$1/$1.vue';`
            );
          }
        });
        
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content);
          console.log(`Fixed component imports in: ${filePath}`);
        }
      }
    }
    
    walkDir(componentsDir);
  }
  
  // Исправляем импорты в helpers
  function fixHelperImports() {
    console.log('Fixing helper imports...');
    
    const helperFiles = fs.readdirSync(helpersDir);
    
    helperFiles.forEach(file => {
      if (file.endsWith('.ts')) {
        const filePath = path.join(helpersDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        const originalContent = content;
        
        // Исправляем импорты компонентов в helpers
        content = content.replace(
          /from\s+['"]\.\.\/components\/atoms\/([^'"]*).vue['"];?/g,
          "from '../components/atoms/$1/$1.vue';"
        );
        
        content = content.replace(
          /from\s+['"]\.\.\/components\/molecules\/([^'"]*).vue['"];?/g,
          "from '../components/molecules/$1/$1.vue';"
        );
        
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content);
          console.log(`Fixed helper imports in: ${filePath}`);
        }
      }
    });
  }
  
  fixComponentImports();
  fixHelperImports();
  console.log('All imports fixing completed!');
}

// Запускаем исправление
fixAllImports();
