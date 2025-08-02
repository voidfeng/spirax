import { DefaultTheme } from "vitepress"

export const productMenus = [
  {
    text: '蝶阀',
    link: '/zh/products/蝶阀',
    items: [
      {
        text: '三偏心',
        link: '/zh/products/蝶阀/三偏心'
      },
      {
        text: '弹性阀座式',
        link: '/zh/products/蝶阀/弹性阀座式'
      },
      {
        text: '高性能',
        link: '/zh/products/蝶阀/高性能'
      },
    ],
  },
  {
    text: '球阀',
    link: '/zh/products/球阀',
    items: [
      {
        text: '三段式',
        link: '/zh/products/球阀/三段式'
      },
      {
        text: '螺纹式',
        link: '/zh/products/球阀/螺纹式'
      },
      {
        text: '法兰式',
        link: '/zh/products/球阀/法兰式'
      },
      {
        text: '固定式',
        link: '/zh/products/球阀/固定式'
      },
      {
        text: '恶劣工况',
        link: '/zh/products/球阀/恶劣工况'
      },
      {
        text: '多端口',
        link: '/zh/products/球阀/多端口'
      },
      {
        text: '配件',
        link: '/zh/products/球阀/配件'
      }
    ]
  },
  {
    text: '刀闸阀',
    link: '/zh/products/刀闸阀',
    items: [
      {
        text: '双向',
        link: '/zh/products/刀闸阀/双向'
      },
      {
        text: '单向',
        link: '/zh/products/刀闸阀/单向'
      },
      {
        text: '浆料',
        link: '/zh/products/刀闸阀/浆料'
      },
    ]
  },
  {
    text: '控制阀',
    link: '/zh/products/控制阀',
    items: [
      {
        text: '球阀',
        link: '/zh/products/控制阀/球阀'
      },
      {
        text: '蝶阀',
        link: '/zh/products/控制阀/蝶阀'
      },
    ]
  },
  {
    text: '止回阀',
    link: '/zh/products/止回阀',
    items: [
      {
        text: '止回阀',
        link: '/zh/products/止回阀/止回阀'
      },
      {
        text: '配件',
        link: '/zh/products/止回阀/配件'
      },
    ]
  },
  {
    text: '执行机构',
    link: '/zh/products/执行机构',
    items: [
      {
        text: '电动执行机构',
        link: '/zh/products/执行机构/电动执行机构'
      },
      {
        text: '气动执行机构',
        link: '/zh/products/执行机构/气动执行机构'
      },
      {
        text: '液压执行机构',
        link: '/zh/products/执行机构/液压执行机构'
      },
      {
        text: '手操器',
        link: '/zh/products/执行机构/手操器'
      },
    ]
  },
  {
    text: '控制配件',
    link: '/zh/products/控制配件',
    items: [
      {
        text: '接近式传感器',
        link: '/zh/products/控制配件/接近式传感器'
      },
      {
        text: '过滤调压阀',
        link: '/zh/products/控制配件/过滤调压阀'
      },
      {
        text: '定位器',
        link: '/zh/products/控制配件/定位器'
      },
      {
        text: '电磁线圈',
        link: '/zh/products/控制配件/电磁线圈'
      },
      {
        text: '开关盒',
        link: '/zh/products/控制配件/开关盒'
      },
    ]
  },
]

function getSidebarMenus(): DefaultTheme.Sidebar {
  /**
   * 1. 如果是 /zh/products/ 则返回 第一层路径
   * 2. 如果是 其他 
   */
  const baseMenu = {
    '/zh/products': {
      items: [
      {
        text: '产品类别',
        items: productMenus
      },
    ]}
  }

  productMenus.forEach(item => {
    baseMenu[item.link] = {
      items: [
      {
        text: item.text,
        items: item.items,
      }
    ]
    }
  })

  return baseMenu as unknown as DefaultTheme.Sidebar
}

export const sidebarMenus = getSidebarMenus()