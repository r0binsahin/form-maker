# Form Maker

## Overview
This is a React application using TypeScript and Vite for rapid development.

## Prerequisites

- npm 

## Getting Started

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Development
Run the development server:
```bash
npm run dev
```

### JSON Server
To run the mock backend:
```bash
npm run json-server
```



### Linting
Run ESLint to check code quality:
```bash
npm run lint
```

### Preview
Preview the production build:
```bash
npm run preview
```

## Project Structure
- `src/`: Source code directory
- `src/assets/db.json`: Mock backend JSON data

## Technologies
- React 18.3.1
- TypeScript 5.6.2
- Vite 6.0.1
- Tailwind CSS 3.4.17
- Json-server

## ESLint Configuration

### Type-Aware Lint Rules
To enable type-aware lint rules, update your `eslint.config.js`:

```javascript
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';

export default tseslint.config({
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
  extends: [
    tseslint.configs.recommendedTypeChecked,
    // Optional: for stricter type checking
    // tseslint.configs.strictTypeChecked,
  ],
  plugins: [react],
  settings: {
    react: {
      version: '18.3'
    }
  },
  rules: {
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
});
```

## Recommended IDE Extensions
- ESLint
- Prettier
- TypeScript VSCode Plugin

## Troubleshooting
- Ensure all dependencies are installed correctly
- Check that you're using a compatible Node.js version
- Run `npm cache clean --force` if you encounter persistent issues

