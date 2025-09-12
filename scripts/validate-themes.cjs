/*
 Simple validator that checks presence of required CSS files per theme
 and ensures they are not empty.
*/
const fs = require('fs');
const path = require('path');

const THEMES_DIR = path.join(process.cwd(), 'src', 'assets', 'themes');
const REQUIRED_FILES = [
  '_theme.css',
  'components.css',
  'containers.css',
  'general.css',
  'layouts.css',
  'messages.css',
  'variables.css'
];

function fail(message) {
  console.error(`\u274C ${message}`);
  process.exit(1);
}

function ok(message) {
  console.log(`\u2705 ${message}`);
}

function validate() {
  let errors = 0;
  let themesCount = 0;

  if (!fs.existsSync(THEMES_DIR)) {
    fail('Каталог src/assets/themes не найден');
  }

  const themeNames = fs.readdirSync(THEMES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  if (themeNames.length === 0) {
    fail('Не найдены темы в src/assets/themes');
  }

  for (const themeName of themeNames) {
    themesCount += 1;
    const themePath = path.join(THEMES_DIR, themeName);
    ok(`Проверка темы: ${themeName}`);

    for (const file of REQUIRED_FILES) {
      const filePath = path.join(themePath, file);
      try {
        const stat = fs.statSync(filePath);
        if (!stat.isFile()) {
          console.error(`  \u26A0\uFE0F отсутствует файл: ${themeName}/${file}`);
          errors += 1;
          continue;
        }
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.trim().length === 0) {
          console.error(`  \u26A0\uFE0F пустой файл: ${themeName}/${file}`);
          errors += 1;
        }
      } catch (e) {
        console.error(`  \u26A0\uFE0F отсутствует файл: ${themeName}/${file}`);
        errors += 1;
      }
    }
  }

  if (errors > 0) {
    fail(`Проверка завершена: найдено ошибок — ${errors}, тем — ${themesCount}`);
  } else {
    ok(`Проверка завершена: ошибок нет, тем — ${themesCount}`);
    process.exit(0);
  }
}

validate();

