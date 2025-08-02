// uno.config.ts
import { defineConfig } from 'unocss'
import { presetUno, presetAttributify, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      cdn: 'https://esm.sh/'
    }),
  ],
  shortcuts: [
    { 'btn': 'py-2 px-4 font-semibold rounded-lg shadow-md' },
    { 'btn-primary': 'text-white bg-blue-500 hover:bg-blue-700' },
  ],
  theme: {
    colors: {
      'primary': '#0f2c6e',
      'primary-light': '#0f2c6e',
      'primary-dark': '#0f2c6e',
    }
  },
  rules: [
    ['custom-rule', { color: 'red' }]
  ]
}) 