/*
 Reorganize src/library/components into Atomic folders:
 atoms, elements, blocks, compounds, containers
 - Moves .vue and paired .stories.ts files
 - Rebuilds barrel file src/library/components/index.ts
 Usage:
   node scripts/restructure-components.cjs --dry-run
   node scripts/restructure-components.cjs
*/

const fs = require('fs');
const path = require('path');

const DRY_RUN = process.argv.includes('--dry-run');
const COMPONENTS_DIR = path.join(process.cwd(), 'src', 'library', 'components');

if (!fs.existsSync(COMPONENTS_DIR)) {
  console.error('Не найден каталог: src/library/components');
  process.exit(1);
}

const categoryToMatchers = {
  atoms: [/Tooltip\.vue$/],
  elements: [/^Button.*\.vue$/, /ChatTabs\.vue$/, /ChannelSelector\.vue$/, /ThemeMode\.vue$/, /FilePreview\.vue$/, /FileUploader\.vue$/, /AudioRecorder\.vue$/, /VideoRecorder\.vue$/],
  blocks: [/^Chat(List|Item)\.vue$/, /^ChatPanel\.vue$/, /^Feed(FoundObjects|FoundItem|Search)?\.vue$/, /^MessageKeyboard\.vue$/],
  compounds: [/^CommunicationPanel\.vue$/, /^SideBar\.vue$/, /^TemplateSelector\.vue$/, /^UserProfile\.vue$/],
  containers: [/^SplashScreen\.vue$/, /^PlaceholderComponent\.vue$/]
};

function pickCategory(fileName) {
  for (const [category, matchers] of Object.entries(categoryToMatchers)) {
    if (matchers.some((r) => r.test(fileName))) return category;
  }
  return 'elements';
}

function ensureDirs() {
  for (const dir of ['atoms', 'elements', 'blocks', 'compounds', 'containers']) {
    const full = path.join(COMPONENTS_DIR, dir);
    if (!fs.existsSync(full)) {
      if (!DRY_RUN) fs.mkdirSync(full, { recursive: true });
      console.log(`DIR ${DRY_RUN ? '(dry)' : ''}: ${path.relative(process.cwd(), full)}`);
    }
  }
}

function listComponentFiles() {
  return fs
    .readdirSync(COMPONENTS_DIR)
    .filter((f) => f.endsWith('.vue'))
    .filter((f) => !['index.ts'].includes(f));
}

function moveWithStories(srcVuePath, category) {
  const fileName = path.basename(srcVuePath);
  const baseName = fileName.replace(/\.vue$/, '');
  const targetDir = path.join(COMPONENTS_DIR, category);
  const targetVue = path.join(targetDir, fileName);

  // Move .vue
  console.log(`MOVE ${DRY_RUN ? '(dry)' : ''}: ${path.relative(process.cwd(), srcVuePath)} -> ${path.relative(process.cwd(), targetVue)}`);
  if (!DRY_RUN) fs.renameSync(srcVuePath, targetVue);

  // Move .stories.ts if exists
  const storyName = `${baseName}.stories.ts`;
  const srcStory = path.join(COMPONENTS_DIR, storyName);
  if (fs.existsSync(srcStory)) {
    const targetStory = path.join(targetDir, storyName);
    console.log(`MOVE ${DRY_RUN ? '(dry)' : ''}: ${path.relative(process.cwd(), srcStory)} -> ${path.relative(process.cwd(), targetStory)}`);
    if (!DRY_RUN) fs.renameSync(srcStory, targetStory);
  }

  return { name: baseName, relPath: `./${category}/${fileName}` };
}

function rebuildBarrel(exportsList) {
  const outPath = path.join(COMPONENTS_DIR, 'index.ts');
  const lines = [];
  for (const e of exportsList.sort((a, b) => a.name.localeCompare(b.name))) {
    lines.push(`export { default as ${e.name} } from '${e.relPath}';`);
  }
  const content = lines.join('\n') + '\n';
  console.log(`WRITE ${DRY_RUN ? '(dry)' : ''}: ${path.relative(process.cwd(), outPath)} (${exportsList.length} exports)`);
  if (!DRY_RUN) fs.writeFileSync(outPath, content, 'utf8');
}

function main() {
  ensureDirs();
  const vueFiles = listComponentFiles();
  const exportsList = [];
  for (const vueFile of vueFiles) {
    const full = path.join(COMPONENTS_DIR, vueFile);
    const category = pickCategory(vueFile);
    const exp = moveWithStories(full, category);
    exportsList.push(exp);
  }
  rebuildBarrel(exportsList);
  console.log('Готово.');
}

main();

