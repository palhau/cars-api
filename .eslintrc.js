const path = require('path');

/**
 * ESLint configuration
 * http://eslint.org/docs/user-guide/configuring
 */

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'linebreak-style': 'off', // Avoid LF/CRLF on Win/Linux/Mac
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: [
        ['@', path.join(__dirname)],
        ['@APP', path.join(__dirname, 'src', 'app')],
        ['@Config', path.join(__dirname, 'src', 'configuration')],
        ['@Controllers', path.join(__dirname, 'src', 'controllers')],
        ['@Middlewares', path.join(__dirname, 'src', 'middlewares')],
        ['@Routes', path.join(__dirname, 'src', 'routes')],
        ['@Server', path.join(__dirname, 'src', 'server')],
      ],
    },
  },
};
