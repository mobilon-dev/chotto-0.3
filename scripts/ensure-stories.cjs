const fs = require('fs');
const path = require('path');

function ensureDir(dirPath) {
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath, { recursive: true });
	}
}

function pascalCase(input) {
	return input
		.replace(/[-_ ]+(.)/g, (_, chr) => chr.toUpperCase())
		.replace(/^(.)/, (_, chr) => chr.toUpperCase());
}

function buildStoryContent(category, componentName) {
	const title = `${pascalCase(category)}/${componentName}`;
	return `import type { Meta, StoryObj } from '@storybook/vue3-vite';
import ${componentName} from '../${componentName}.vue';

const meta = {
  title: '${title}',
  component: ${componentName},
  args: {},
} satisfies Meta<typeof ${componentName}>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
`;
}

function ensureStories() {
	const componentsRoot = path.join(process.cwd(), 'src', 'components');
	const categories = ['atoms', 'blocks', 'compounds', 'elements', 'molecules', 'organisms'];

	categories.forEach((category) => {
		const categoryPath = path.join(componentsRoot, category);
		if (!fs.existsSync(categoryPath)) return;

		const items = fs.readdirSync(categoryPath, { withFileTypes: true });
		const componentDirs = items.filter((d) => d.isDirectory());

		componentDirs.forEach((dirent) => {
			const componentName = dirent.name;
			const componentDir = path.join(categoryPath, componentName);
			const vuePath = path.join(componentDir, `${componentName}.vue`);
			if (!fs.existsSync(vuePath)) return; // skip non-component dirs

			const storiesDir = path.join(componentDir, 'stories');
			const storyPath = path.join(storiesDir, `${componentName}.stories.ts`);
			if (!fs.existsSync(storyPath)) {
				ensureDir(storiesDir);
				const content = buildStoryContent(category, componentName);
				fs.writeFileSync(storyPath, content, 'utf8');
				console.log(`Created: ${path.relative(process.cwd(), storyPath)}`);
			}
		});
	});

	console.log('Stories ensured for all components.');
}

ensureStories();
