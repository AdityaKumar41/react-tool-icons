function template(variables, { tpl }) {
  return tpl`
import * as React from 'react';

interface Props extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
}

const ${variables.componentName} = ({ size = 24, color = "currentColor", ...props }: Props) => (
  <svg 
    width={size}
    height={size}
    fill={color}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    {...props}
  >
    ${variables.jsx}
  </svg>
);

${variables.componentName}.displayName = '${variables.componentName}';

export default ${variables.componentName};
`;
}

module.exports = template;
