module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    mocha: true
  },
  extends: [
    'standard'
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
    ecmaVersion: 'latest'
  },
  plugins: [
    'mocha'
  ],
  rules: {
  }
}
