// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import CustomNavItem from './components/CustomNavItem.vue'
import ProductLayout from './ProductLayout.vue'

// 导入 polyfills
import './polyfills'

// 导入UnoCSS
import 'uno.css'

export default {
  extends: DefaultTheme,
  Layout: ProductLayout,
  enhanceApp({ app }) {
    // 注册自定义导航组件
    app.component('CustomNavItem', CustomNavItem)
  }
} satisfies Theme 
