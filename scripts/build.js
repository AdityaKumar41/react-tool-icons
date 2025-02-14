import { promises as fs } from 'fs';
import { join, basename, dirname } from 'path';
import { fileURLToPath } from 'url';
import { transform } from '@svgr/core';
import prettier from 'prettier';
import generateComponentCode from '../templates/svgr-template.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true }).catch(() => {});
}

async function formatCode(code) {
  try {
    const prettierConfig = await prettier.resolveConfig(process.cwd());
    return prettier.format(code, {
      ...prettierConfig,
      parser: 'typescript',
    });
  } catch (error) {
    console.warn('Warning: Could not format code:', error);
    return code;
  }
}

async function buildIcons() {
  try {
    const assetsDir = join(__dirname, '../assets');
    const srcIconsDir = join(__dirname, '../src/icons');
    await ensureDir(srcIconsDir);

    const categories = await fs.readdir(assetsDir);
    const allExports = new Map();

    for (const category of categories) {
      const categoryPath = join(assetsDir, category);
      const stats = await fs.stat(categoryPath);
      if (!stats.isDirectory()) continue;

      console.log(`Processing category: ${category}`);
      const outputDir = join(srcIconsDir, category);
      await ensureDir(outputDir);

      const files = await fs.readdir(categoryPath);
      const svgFiles = files.filter((f) => f.endsWith('.svg'));
      const categoryExports = [];

      for (const svgFile of svgFiles) {
        try {
          const content = await fs.readFile(join(categoryPath, svgFile), 'utf8');
          const baseName = basename(svgFile, '.svg')
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join('');

          const categoryPrefix = category.charAt(0).toUpperCase() + category.slice(1);
          const componentName = `${categoryPrefix}${baseName}Icon`;

          console.log(`Converting: ${svgFile} to ${componentName}`);

          const svgOutput = await transform(
            content,
            {
              typescript: true,
              plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
              svgoConfig: {
                multipass: true,
                plugins: [
                  {
                    name: 'preset-default',
                    params: {
                      overrides: {
                        removeViewBox: false,
                        removeUnknownsAndDefaults: false,
                      },
                    },
                  },
                ],
              },
            },
            { componentName }
          );

          const componentCode = await generateComponentCode(componentName, svgOutput);
          const formattedCode = await formatCode(componentCode);

          await fs.writeFile(join(outputDir, `${componentName}.tsx`), formattedCode);
          categoryExports.push(componentName);

          if (allExports.has(baseName + 'Icon')) {
            console.log(`Note: ${baseName}Icon exists in multiple categories`);
          }
          allExports.set(baseName + 'Icon', category);
        } catch (error) {
          console.error(`Error converting ${svgFile}:`, error);
        }
      }

      if (categoryExports.length > 0) {
        const indexContent = categoryExports
          .map((name) => `export { default as ${name} } from './${name}';`)
          .join('\n');
        const formattedIndex = await formatCode(indexContent);
        await fs.writeFile(join(outputDir, 'index.ts'), formattedIndex);
      }
    }

    // Create main index.ts
    const mainIndexContent = categories
      .map((category) => `export * from './icons/${category}';`)
      .join('\n');
    const formattedMainIndex = await formatCode(mainIndexContent);
    await fs.writeFile(join(srcIconsDir, '../index.ts'), formattedMainIndex);

    console.log('✅ Icons built successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildIcons();
