// uno.config.ts
import { defineConfig } from 'unocss'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/',
      collections: {
        carbon: () => import('@iconify-json/carbon/icons.json').then(i => i.default),
      },
    }),
  ],
  shortcuts: [
    // 按钮样式
    { btn: 'py-2 px-4 font-semibold rounded-lg shadow-md transition-colors duration-200' },
    { 'btn-primary': 'text-white bg-primary hover:bg-primary/90' },
    {
      'btn-secondary':
        'text-gray-800 bg-gray-200 hover:bg-gray-300 dark:text-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600',
    },

    // 容器样式
    { 'container-fluid': 'w-full max-w-full mx-auto px-4' },
    { 'container-fixed': 'w-full max-w-1200px mx-auto px-4' },

    // 卡片样式
    {
      card: 'bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-100 dark:border-gray-700',
    },
    { 'card-hover': 'transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]' },

    // 文本样式
    { 'text-primary': 'text-primary' },
    { 'text-muted': 'text-gray-600 dark:text-gray-400' },
  ],
  theme: {
    colors: {
      primary: '#5672cd',
      'primary-light': '#6b73ff',
      'primary-dark': '#3b47d9',
    },
    breakpoints: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
})
