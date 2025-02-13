const fs = require('fs').promises;
const path = require('path');
const { transform } = require('@svgr/core');

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true }).catch(() => {});
}

async function buildIcons() {
  try {
    const assetsDir = path.join(__dirname, '../assets');
    const srcIconsDir = path.join(__dirname, '../src/icons');
    await ensureDir(srcIconsDir);

    const categories = await fs.readdir(assetsDir);
    const allExports = new Map(); // Track all exports to check for duplicates

    for (const category of categories) {
      const categoryPath = path.join(assetsDir, category);
      if (!(await fs.stat(categoryPath)).isDirectory()) continue;

      console.log(`Processing category: ${category}`);
      const outputDir = path.join(srcIconsDir, category);
      await ensureDir(outputDir);

      const files = await fs.readdir(categoryPath);
      const svgFiles = files.filter((f) => f.endsWith('.svg'));
      const categoryExports = [];

      for (const svgFile of svgFiles) {
        try {
          const content = await fs.readFile(path.join(categoryPath, svgFile), 'utf8');
          const baseName = path
            .basename(svgFile, '.svg')
            .split('-')
            .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
            .join('');

          // Add category prefix to component name
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

          const componentCode = `import React from 'react';

interface ${componentName}Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  className?: string;
}

const ${componentName}: React.FC<${componentName}Props> = ({
  size = 24,
  color = "currentColor",
  className,
  ...props
}) => (
  <svg
    ${svgOutput.match(/<svg([^>]*)>/)[1].trim()}
    className={className}
    {...props}
  >
    ${svgOutput.match(/<svg[^>]*>(.*?)<\/svg>/s)[1]}
  </svg>
);

${componentName}.displayName = '${componentName}';

export default ${componentName};
`;

          await fs.writeFile(path.join(outputDir, `${componentName}.tsx`), componentCode);
          categoryExports.push(componentName);

          // Track exports
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
        await fs.writeFile(path.join(outputDir, 'index.ts'), indexContent);
      }
    }

    // Create main index.ts with explicit exports
    const mainIndexContent = categories
      .map((category) => `export * from './icons/${category}';`)
      .join('\n');
    await fs.writeFile(path.join(srcIconsDir, '../index.ts'), mainIndexContent);

    console.log('✅ Icons built successfully!');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

buildIcons();
