# Next.js + TailwindCSS + ESLint + Prettier

## Create Next.js project

yarn create next-app digital-health-insights
cd digital-health-insights

## Setup TailwindCSS

yarn add -D tailwindcss postcss autoprefixer
yarn tailwindcss init -p

### Tailwind configuration example

- tailwind.config.js

```
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "media",
  theme: {
    fontFamily: {
      sans: ["Jost", "sans-serif"],
    },
    fontSize: {
      sm: ["12px", "16px"],
      base: ["14px", "22px"],
      lg: ["16px", "24px"],
      xl: ["18px", "22px"],
      "2xl": ["28px", "34px"],
      "3xl": ["30px", "38px"],
      "4xl": ["55px", "70px"],
    },
    colors: {
      dark: "#152030",
      "gray-dark": "#222222",
      gray: "#4C4D5C",
      "gray-light": "#F3F1F6",
      "purple-dark": "#321898",
      purple: "#582BCF",
      "purple-light": "#E2E4F5",
      pink: "#E2E4F5",
      red: "#FF4F52",
      blue: "#4267B2",
      sky: "#1DA1F2",
      white: "#FFFFFF",
      black: "#000000",
    },
    container: {
      center: true,
      padding: "1rem",
    },
    extend: {},
  },
  plugins: [],
};
```

## Configure ESLint & Prettier

yarn add -D prettier eslint-config-prettier

_ESLint should have already been installed while creating the project using create-next-app_

- delete .eslintrc.json and create .eslintrc.js

```
// https://eslint.org/docs/user-guide/configuring/
module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
    es2021: true
  },
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:@next/next/recommended',
    'plugin:import/recommended',
    'prettier',
    'plugin:storybook/recommended'
  ],
  settings: {
    react: {
      version: 'detect'
    }
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    'no-unused-vars': 'warn',
    'no-undef': 'error'
  }
}
```

- .prettierrc.js

```
// https://prettier.io/docs/en/configuration.html

module.exports = {
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  // bracketSpacing: false,
  semi: false,
  trailingComma: 'none'
}
```

- .eslintignore & .prettierignore

```
!/.*.js
*.min.js
.*cache
.next/
build/
dist/
node_modules/
public/
```

- .vscode/settings.json

```
{
  "editor.formatOnSave": true,
  // Run Stylelint fix when you save the file
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": true
  },
  // Recommended config for the extension
  "css.validate": false,
  "less.validate": false,
  "scss.validate": false
}
```

## Additional Setup

- styles/main.scss

```
@import './_typography.scss';

@tailwind base;
@tailwind components;
@tailwind utilities;
```

- styles/\_typography.scss

```
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700;800&display=swap');
```

- jsconfig.json
  For path aliases

```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/lib/*": ["lib/*"],
      "@/components/*": ["components/*"],
      "@/functions/*": ["functions/*"],
      "@/styles/*": ["styles/*"]
    }
  }
}
```

## Install important dependencies for Next.js project

yarn add classnames prop-types sass
yarn add next-auth next-seo @apollo/client graphql deepmerge lodash
