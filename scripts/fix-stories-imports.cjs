const fs = require('fs');
const path = require('path');

// Функция для исправления импортов в stories файлах
function fixStoriesImports() {
  const componentsDir = 'src/components';
  const categories = ['atoms', 'blocks', 'compounds', 'elements', 'molecules', 'organisms'];
  
  categories.forEach(category => {
    const categoryPath = path.join(componentsDir, category);
    if (!fs.existsSync(categoryPath)) return;
    
    console.log(`\nFixing imports in category: ${category}`);
    
    // Получаем все папки компонентов
    const items = fs.readdirSync(categoryPath, { withFileTypes: true });
    const componentDirs = items.filter(item => item.isDirectory() && item.name !== 'stories');
    
    componentDirs.forEach(componentDir => {
      const componentName = componentDir.name;
      const storiesDir = path.join(categoryPath, componentName, 'stories');
      const storiesFile = path.join(storiesDir, `${componentName}.stories.ts`);
      
      if (fs.existsSync(storiesFile)) {
        console.log(`  Fixing imports in: ${storiesFile}`);
        
        let content = fs.readFileSync(storiesFile, 'utf8');
        
        // Заменяем импорт типов Storybook на пакет фреймворка
        content = content.replace(
          /from\s+['"]@storybook\/vue3['"];?/g,
          "from '@storybook/vue3-vite';"
        );
        
        // Исправляем импорт основного компонента
        content = content.replace(
          new RegExp(`import\\s+${componentName}\\s+from\\s+['"][^'"]*['"];?`, 'g'),
          `import ${componentName} from '../${componentName}.vue';`
        );
        
        // Исправляем импорт BaseContainer
        content = content.replace(
          /import\s+BaseContainer\s+from\s+['"][^'"]*['"];?/g,
          `import BaseContainer from '../../../containers/BaseContainer.vue';`
        );
        
        // Исправляем импорт ThemeMode
        content = content.replace(
          /import\s+ThemeMode\s+from\s+['"][^'"]*['"];?/g,
          `import ThemeMode from '../../elements/ThemeMode/ThemeMode.vue';`
        );
        
        // Исправляем другие компоненты из той же категории
        content = content.replace(
          /import\s+(\w+)\s+from\s+['"]\.\.\/(\w+)\.vue\/\2\.vue\.vue['"];?/g,
          `import $1 from '../$2/$2.vue';`
        );
        
        // Исправляем импорты из других категорий
        categories.forEach(otherCategory => {
          if (otherCategory !== category) {
            const regex = new RegExp(`import\\s+(\\w+)\\s+from\\s+['"][^'"]*\\/${otherCategory}\\/([^'"]*)\\.vue['"];?`, 'g');
            content = content.replace(regex, `import $1 from '../../${otherCategory}/$2/$2.vue';`);
          }
        });
        
        fs.writeFileSync(storiesFile, content);
        console.log(`    Fixed imports in: ${storiesFile}`);
      }
    });
  });
  
  console.log('\nImport fixing completed!');
}

// Запускаем исправление импортов
fixStoriesImports();
