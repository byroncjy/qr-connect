module.exports = {
<<<<<<< HEAD
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react'
  ],
  rules: {
  }
}
=======
  "env": {
      "browser": true,
      "es2021": true
  },
  "extends": [
      "eslint:recommended",
      "plugin:react/recommended"
  ],
  "overrides": [
      {
          "env": {
              "node": true
          },
          "files": [
              ".eslintrc.{js,cjs}"
          ],
          "parserOptions": {
              "sourceType": "script"
          }
      }
  ],
  "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
  },
  "plugins": [
      "react"
  ],
  "rules": {
  }
}
>>>>>>> a923d3a1dbccdbac55e7e4e82ccf78870b14d016
