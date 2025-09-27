import { defineConfig } from 'vitepress'
import UnoCSS from 'unocss/vite'
import { productMenus, sidebarMenus } from './theme/config'
import { La51Plugin } from 'vitepress-plugin-51la'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '斯派莎克阀门',
  description:
    '斯派莎克SpiraxSarco于英国1937年成立，常用产品有斯派莎克BSA1T截止阀、斯派莎克FT14疏水阀、斯派莎克SV607安全阀、斯派莎克TD16疏水阀、斯派莎克25P减压阀、斯派莎克M10S球阀、DCV3止回阀、FIG33过滤器、KE73调节阀、SG253观视镜、EPS、EP5、IPS定位器、蒸汽喷射器IN40M、汽水分离器S1、S3、S13、斯派莎克ILVA流量计、TVA流量计、TFA流量计、斯派莎克MFP14冷凝水回收泵等等。',
  // ignoreDeadLinks: true,
  transformPageData: data => {
    if (data.relativePath !== 'index.md')
      data.titleTemplate = `斯派莎克:title | SpiraxSarco 蒸汽行业的首选！`
    else data.titleTemplate = `斯派莎克阀门 | SpiraxSarco 蒸汽行业的首选!`
  },
  head: [
    ['link', { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#5bbad5' }],
    ['link', { rel: 'shortcut icon', href: '/favicon/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-touch-icon.png' }],
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
    ],
    [
      'link',
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
    ],
    ['link', { rel: 'manifest', href: '/favicon/site.webmanifest' }],
    ['link', { rel: 'mask-icon', href: '/favicon/safari-pinned-tab.svg', color: '#002d72' }],
    ['link', { rel: 'shortcut icon', href: '/favicon/favicon.ico' }],
  ],
  lang: 'zh-CN',
  vite: {
    plugins: [
      UnoCSS(),
      La51Plugin({
        id: '3Mz88un7J63XQmNO',
        ck: '3Mz88un7J63XQmNO',
        importMode: 'async',
      }),
    ],
    define: {
      K_PREFIX: JSON.stringify('斯派莎克'),
      K_SUBFIX: JSON.stringify('SpiraxSarco 斯派莎克阀门'),
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: {
      src: '/logo.png',
      alt: 'SpiraxSarco 斯派莎克阀门',
    },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '分类目录',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '产品',
        component: 'CustomNavItem',
      },
      {
        text: '产品',
        items: productMenus,
      },
      {
        text: '行业',
        link: '/Industries/',
      },
      {
        text: '服务',
        link: '/Services/',
      },
      {
        text: '解决方案',
        link: '/Capabilities/',
      },
      { text: '培训', link: '/Training/' },
      { text: '联系我们', link: '/Contact' },
    ],

    sidebar: sidebarMenus,
    outline: {
      label: '本页目录',
    },

    socialLinks: [
      { icon: 'facebook', link: 'https://www.facebook.com/spiraxsarco' },
      { icon: 'instagram', link: 'https://www.instagram.com/spirax_sarco/' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/company/spirax-sarco/' },
      { icon: 'youtube', link: 'https://www.youtube.com/spiraxsarco' },
    ],

    // 添加本地搜索配置
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索...',
          },
          modal: {
            noResultsText: '没有找到：',
            footer: {
              navigateText: '上下切换',
              closeText: '关闭',
              selectText: '回车选择',
            },
          },
        },
      },
    },
  },
})
