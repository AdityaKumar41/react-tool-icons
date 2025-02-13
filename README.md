# React Tool Icons 📦

![React Tool Icons Banner](https://res.cloudinary.com/dtgiujxll/image/upload/v1739441761/personal/hxkgwwom8h4a8tui4blc.png)

A comprehensive collection of 500+ high-quality icons for your React projects, including emojis, blockchain icons, React components, 3D icons, tech stack icons, and more.

[![npm version](https://img.shields.io/npm/v/react-tool-icons.svg)](https://www.npmjs.com/package/react-tool-icons)
[![License](https://img.shields.io/npm/l/react-tool-icons.svg)](https://github.com/yourusername/react-tool-icons/blob/main/LICENSE)
[![Downloads](https://img.shields.io/npm/dm/react-tool-icons.svg)](https://www.npmjs.com/package/react-tool-icons)

## Features

- **500+ Unique Icons**: Carefully crafted icons across multiple categories
- **Multiple Categories**:
  - Emoji Icons
  - Blockchain & Cryptocurrency
  - Tech Stack Icons
  - 3D Icons
  - React-specific Components
  - And many more...
- **Flexible Usage**: Use as React components or SVG
- **Customizable**: Easy to modify size, color, and other properties
- **Lightweight**: Tree-shakeable exports for optimal bundle size
- **TypeScript Support**: Full TypeScript definitions included

## Installation

```bash
# Using npm
npm install react-tool-icons

# Using yarn
yarn add react-tool-icons

# Using pnpm
pnpm add react-tool-icons
```

## Usage

### React Components

```jsx
import { BitcoinIcon, ReactIcon, SmileEmoji } from 'react-tool-icons';

function App() {
  return (
    <div>
      <BitcoinIcon size={24} color="#F7931A" />
      <ReactIcon size={32} color="#61DAFB" />
      <SmileEmoji size={28} />
    </div>
  );
}
```

### SVG Usage

```jsx
import { icons } from 'react-tool-icons/svg';

function App() {
  return <div dangerouslySetInnerHTML={{ __html: icons.bitcoin }} />;
}
```

## Available Icons

### Emoji Icons

- 😊 Smile
- 😎 Cool
- 💖 Heart
- ... and more

### Blockchain Icons

- Bitcoin (BTC)
- Ethereum (ETH)
- Binance Chain (BNB)
- ... and more

### Tech Stack Icons

- React
- Vue
- Angular
- Node.js
- ... and more

### 3D Icons

- Cube
- Sphere
- Cylinder
- ... and more

## Props

| Prop      | Type                | Default   | Description                  |
| --------- | ------------------- | --------- | ---------------------------- |
| size      | number              | 24        | Width and height of the icon |
| color     | string              | 'current' | Color of the icon            |
| className | string              | ''        | Additional CSS classes       |
| style     | React.CSSProperties | {}        | Additional inline styles     |

## Customization

### Size

```jsx
<BitcoinIcon size={32} />
```

### Color

```jsx
<ReactIcon color="#FF0000" />
```

### Custom Styling

```jsx
<EthereumIcon className="custom-class" style={{ margin: '10px' }} />
```

## Browser Support

- Chrome (Latest)
- Firefox (Latest)
- Safari (Latest)
- Edge (Latest)
- Opera (Latest)

## Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

- [Documentation](https://github.com/yourusername/react-tool-icons/wiki)
- [Issues](https://github.com/yourusername/react-tool-icons/issues)
- [Discussions](https://github.com/yourusername/react-tool-icons/discussions)

## Author

Your Name ([@yourusername](https://github.com/yourusername))

## Acknowledgments

Special thanks to all contributors who helped make this package awesome!
