const fs = require('fs');
const path = require('path');

// Функция для обновления основного индексного файла
function updateMainIndex() {
  const componentsDir = 'src/components';
  const mainIndexPath = path.join(componentsDir, 'index.ts');
  
  let content = '';
  
  // Добавляем экспорты из категорий
  const categories = ['atoms', 'blocks', 'compounds', 'elements', 'molecules', 'organisms', 'containers', 'layouts'];
  
  categories.forEach(category => {
    const categoryPath = path.join(componentsDir, category);
    if (fs.existsSync(categoryPath)) {
      content += `// ${category.charAt(0).toUpperCase() + category.slice(1)}\n`;
      content += `export * from './${category}';\n\n`;
    }
  });
  
  fs.writeFileSync(mainIndexPath, content);
  console.log(`Updated main index file: ${mainIndexPath}`);
}

// Также обновим индексные файлы категорий, которые могли быть пропущены
function updateCategoryIndexes() {
  const componentsDir = 'src/components';
  const categories = ['blocks', 'compounds', 'elements', 'molecules', 'organisms'];
  
  categories.forEach(category => {
    const categoryPath = path.join(componentsDir, category);
    if (!fs.existsSync(categoryPath)) return;
    
    console.log(`\nUpdating index for category: ${category}`);
    
    const items = fs.readdirSync(categoryPath, { withFileTypes: true });
    const componentDirs = items.filter(item => item.isDirectory() && item.name !== 'stories');
    
    if (componentDirs.length > 0) {
      let content = '// Components\n';
      
      componentDirs.forEach(componentDir => {
        const componentName = componentDir.name;
        content += `export { default as ${componentName} } from './${componentName}/${componentName}.vue';\n`;
      });
      
      const indexPath = path.join(categoryPath, 'index.ts');
      fs.writeFileSync(indexPath, content);
      console.log(`Updated index file: ${indexPath}`);
    }
  });
}

// Запускаем обновление
updateCategoryIndexes();
updateMainIndex();
console.log('\nMain index update completed!');
