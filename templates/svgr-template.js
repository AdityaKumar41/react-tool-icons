// Function to extract SVG content and props
function extractSvgContent(svgOutput) {
  const svgMatch = svgOutput.match(/<svg([^>]*)>(.*?)<\/svg>/s);
  if (!svgMatch) throw new Error('Invalid SVG output');
  return {
    props: svgMatch[1].trim(),
    content: svgMatch[2].trim(),
  };
}

// Main component generator function
export function generateComponentCode(componentName, svgOutput) {
  const { props, content } = extractSvgContent(svgOutput);

  return `import React from 'react';

interface ${componentName}Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  className?: string;
}

const ${componentName}: React.FC<${componentName}Props> = ({
  size = 32,
  color = "currentColor",
  className,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    fill={color}
    ${props}
    className={className}
    {...props}
  >
    ${content}
  </svg>
);

${componentName}.displayName = '${componentName}';

export default ${componentName};`;
}

export default generateComponentCode;
