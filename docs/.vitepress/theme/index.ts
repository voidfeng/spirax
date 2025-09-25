// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.scss'
import CustomNavItem from './components/CustomNavItem.vue'
import HeroImage from './components/HeroImage.vue'
import ProductLayout from './ProductLayout.vue'
import AllProducts from './components/AllProducts.vue'

// 导入 polyfills
import './polyfills'

// 导入UnoCSS
import 'uno.css'

// 导入 NProgress
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 配置 NProgress
NProgress.configure({
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.1,
})

export default {
  extends: DefaultTheme,
  Layout: ProductLayout,
  enhanceApp({ app, router }) {
    // 注册自定义导航组件
    app.component('CustomNavItem', CustomNavItem)
    // 注册Hero图片组件
    app.component('HeroImage', HeroImage)
    app.component('AllProducts', AllProducts)

    // 配置 NProgress 路由监听
    if (typeof window !== 'undefined') {
      // 路由开始变化时显示进度条
      router.onBeforeRouteChange = () => {
        NProgress.start()
      }

      // 路由变化完成后隐藏进度条
      router.onAfterRouteChange = () => {
        NProgress.done()
      }
    }
  },
} satisfies Theme
