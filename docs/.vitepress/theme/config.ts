import { DefaultTheme } from "vitepress"

export const productMenus = [
  {
    link: '/Products/crp-and-hr/',
    text: '冷凝水泵及热量回收和蒸汽洁净产品',
    items: [
      { link: '/pressure-powered-pumps/', text: '凝结水回收机械泵' },
      { link: '/electric-pumps/', text: '电泵' },
      { link: '/clean-steam-generator/', text: '洁净蒸汽发生器' },
      { link: '/clean-steams/', text: '洁净蒸汽阀件' },
    ],
  },
  {
    link: '/Products/Traps/',
    text: '蒸汽疏水阀',
    items: [
      { link: '/ball/', text: '蒸汽浮球式疏水阀' },
      { link: '/thermodynamic/', text: '蒸汽热动力疏水阀' },
      { link: '/balanced-pressure/', text: '蒸汽压力平衡式疏水阀' },
      { link: '/bimetallic/', text: '蒸汽双金属疏水阀' },
      { link: '/fixed-temperature-discharge/', text: '固定排放温度疏水阀' },
      { link: '/inverted-bucket/', text: '蒸汽倒吊桶式疏水阀' },
      { link: '/steam-trap-performance/', text: '蒸汽疏水阀性能检测系统' },
      { link: '/swivel-connectors/', text: '万向连接疏水阀' },
      { link: '/sealed-steam-traps/', text: '密封型疏水阀' },
      { link: '/manifolds-and-insulation-jackets/', text: '蒸汽分配及冷凝水收集管' },
    ],
  },
  {
    link: '/Products/air-traps/',
    text: '压缩空气疏水阀和加湿器',
    items: [
      { link: '/drain-traps/', text: '压缩空气疏水阀' },
      { link: '/steam-injection-humidifiers/', text: '直接喷射式蒸汽加湿器' },
    ],
  },
  {
    link: '/Products/fittings/',
    text: '管道附件',
    items: [
      { link: '/stop-valves/', text: '密封波纹管截止阀' },
      { link: '/ball-valves/', text: '球阀' },
      { link: '/check-valves/', text: '止回阀' },
      { link: '/air-valves/', text: '排空气阀' },
      { link: '/depressurisation-valves/', text: '泄压阀' },
      { link: '/vacuum-breakers/', text: '真空破坏器' },
      { link: '/separators/', text: '汽水分离器' },
      { link: '/strainers/', text: '过滤器' },
      { link: '/diffusers/', text: '消音器' },
      { link: '/hosedown-stations/', text: '汽水混合站' },
      { link: '/Pressure-gauge/', text: '压力表' },
      { link: '/sight-glasses/', text: '观视镜' },
    ],
  },
  {
    link: '/flowmeter/',
    text: '斯派莎克流量计',
    items: [
      { link: '/computers-displays/', text: '流量计算机、显示装置和变送器' },
      { link: '/Gilflo-ILVA/', text: 'GilfloILVA流量计' },
      { link: '/TFA/', text: 'TFA流量计' },
      { link: '/TVA/', text: 'TVA流量计' },
    ],
  },
  {
    link: '/Boiler-Control-System/',
    text: '锅炉控制系统-穆尼阀门',
    items: [
      { link: '/feedtanks/', text: '给水除氧箱' },
      { link: '/vent-heads/', text: '排空帽' },
      { link: '/steam-injectors/', text: '蒸汽喷射器' },
      { link: '/level-controls/', text: '液位控制' },
      { link: '/tds-blowdown-controls/', text: 'TDS排污控制' },
      { link: '/bottom-blowdown-systems/', text: '底部排污系统' },
      { link: '/blowdown-vessels/', text: '排污罐' },
      { link: '/sample-coolers/', text: '取样冷却器' },
      { link: '/conductivity-meters/', text: '电导率测量仪' },
      { link: '/flash-steam/', text: '闪蒸罐' },
      { link: '/heat-recovery-systems/', text: '热回收系统' },
    ],
  },
  {
    text: '换热产品解决方案',
    items: [
      { link: '/heat-exchangers/', text: '蒸汽换热机组' },
      { link: '/Quickheat/', text: 'Quickheat换热机组' },
    ],
  },
  {
    text: '控制系统',
    items: [
      { link: '/control-valves/', text: '控制阀' },
      { link: '/electric-actuators/', text: '电动执行器' },
      { link: '/pneumatic-actuators/', text: '气动执行器' },
      { link: '/pcas/', text: '定位器，控制器和感应器' },
      { link: '/d-d-system/', text: '减温减压系统' },
      { link: '/piston-valves/', text: '气动活塞角阀' },
      { link: '/pressure-reducing/', text: '减压阀' },
      { link: '/safety-valves/', text: '安全阀' },
      { link: '/self-acting-controls/', text: '自作用温度控制系统' },
    ],
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