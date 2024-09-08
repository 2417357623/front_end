/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-prettier/skip-formatting',
    './.eslintrc-auto-import.json',
    'eslint-config-love',   

  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.ts'],  // 只针对 .js 和 .ts 文件
      extends: 'eslint-config-love',  // 再次扩展 love 配置
      rules: {
        // 可以为 JS/TS 文件添加一些额外规则
      }
    }
  ]
}
