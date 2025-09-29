<script lang="ts" setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, page } = useData()

const category2url = {
  蒸汽疏水阀: '/Products/Traps/',
  '蒸汽疏水阀,浮球式疏水阀': '/ball/',
  '蒸汽疏水阀,热动力疏水阀': '/thermodynamic/',
  '蒸汽疏水阀,压力平衡式疏水阀': '/balanced-pressure/',
  '蒸汽疏水阀,双金属疏水阀': '/bimetallic/',
  '蒸汽疏水阀,固定排放温度疏水阀': '/fixed-temperature-discharge/',
  '蒸汽疏水阀,倒吊桶式疏水阀': '/inverted-bucket/',
  '蒸汽疏水阀,疏水阀性能检测系统': '/steam-trap-performance/',
  '蒸汽疏水阀,万向连接疏水阀': '/swivel-connectors/',
  '蒸汽疏水阀,密封型疏水阀': '/sealed-steam-traps/',
  '蒸汽疏水阀,分配及冷凝水收集管': '/manifolds-and-insulation-jackets/',
  控制系统: '#',
  '控制系统,控制阀': '/control-valves/',
  '控制系统,电动执行器': '/electric-actuators/',
  '控制系统,气动执行器': '/pneumatic-actuators/',
  '控制系统,定位器，控制器和感应器': '/pcas/',
  '控制系统,减温减压系统': '/d-d-system/',
  '控制系统,气动活塞角阀': '/piston-valves/',
  '控制系统,减压阀': '/pressure-reducing/',
  '控制系统,安全阀': '/safety-valves/',
  '控制系统,自作用温度控制系统': '/self-acting-controls/',
  管道附件: '/Products/fittings/',
  '管道附件,密封波纹管截止阀': '/stop-valves/',
  '管道附件,球阀': '/ball-valves/',
  '管道附件,止回阀': '/check-valves/',
  '管道附件,排空气阀': '/air-valves/',
  '管道附件,泄压阀': '/depressurisation-valves/',
  '管道附件,真空破坏器': '/vacuum-breakers/',
  '管道附件,汽水分离器': '/separators/',
  '管道附件,过滤器': '/strainers/',
  '管道附件,消音器': '/diffusers/',
  '管道附件,汽水混合站': '/hosedown-stations/',
  '管道附件,压力表': '/Pressure-gauge/',
  '管道附件,观视镜': '/sight-glasses/',
  锅炉控制系统: '/Boiler-Control-System/',
  '锅炉控制系统,给水除氧箱': '/feedtanks/',
  '锅炉控制系统,排空帽': '/vent-heads/',
  '锅炉控制系统,蒸汽喷射器': '/steam-injectors/',
  '锅炉控制系统,液位控制': '/level-controls/',
  '锅炉控制系统,TDS 排污控制': '/tds-blowdown-controls/',
  '锅炉控制系统,底部排污系统': '/bottom-blowdown-systems/',
  '锅炉控制系统,排污罐': '/blowdown-vessels/',
  '锅炉控制系统,取样冷却器': '/sample-coolers/',
  '锅炉控制系统,电导率测量仪': '/conductivity-meters/',
  '锅炉控制系统,闪蒸罐': '/flash-steam/',
  '锅炉控制系统,热回收系统': '/heat-recovery-systems/',
  冷凝水泵及热量回收: '/Products/crp-and-hr/',
  '冷凝水泵及热量回收,凝结水回收机械泵': '/pressure-powered-pumps/',
  '冷凝水泵及热量回收,电泵': '/electric-pumps/',
  压缩空气产品: '/Products/air-traps/',
  '压缩空气产品,压缩空气疏水阀': '/drain-traps/',
  流量计: '/flowmeter/',
  '流量计,流量计算机、显示装置和变送器': '/computers-displays/',
  '流量计,Gilflo ILVA流量计': '/Gilflo-ILVA/',
  '流量计,TFA流量计': '/TFA/',
  '流量计,TVA流量计': '/TVA/',
  加湿器: '#',
  '加湿器,直接喷射式蒸汽加湿器': '/steam-injection-humidifiers/',
  换热产品解决方案: '#',
  '换热产品解决方案,蒸汽换热机组': '/heat-exchangers/',
  '换热产品解决方案,Quickheat换热机组': '/Quickheat/',
  洁净蒸汽产品: '#',
  '控制系统,洁净蒸汽发生器': '/clean-steam-generator/',
  '控制系统,洁净蒸汽阀件': '/clean-steams/',
}

const imageList = computed(() => {
  if (!frontmatter.value.imgs) return []

  // 如果是字符串，转换为数组
  if (typeof frontmatter.value.imgs === 'string') {
    return [frontmatter.value.imgs]
  }

  return frontmatter.value.imgs
})

// 当前显示的图片
const currentImage = ref('')

onMounted(() => {
  if (imageList.value.length > 0) {
    currentImage.value = imageList.value[0]
  }
})

// 监听图片列表变化，路由切换时重置当前图片
watch(
  imageList,
  newImageList => {
    if (newImageList.length > 0) {
      currentImage.value = newImageList[0]
    } else {
      currentImage.value = ''
    }
  },
  { immediate: true }
)

// 切换显示的图片
function changeImage(img: string) {
  currentImage.value = img
}

// 获取产品分类
const categories = computed(() => {
  if (!frontmatter.value.category) return []
  return frontmatter.value.category.split(';').map((item: string) => item.split(','))
})

// 获取产品型号
const productModel = computed(() => {
  const title = frontmatter.value.title || ''
  const modelMatch = title.match(/S\d+\/S\d+|S\d+/)
  return modelMatch ? modelMatch[0] : title.split('–')[0].trim()
})

// 获取产品标题
const productTitle = computed(() => {
  return frontmatter.value.title || ''
})

// 获取短描述
const desc = computed(() => {
  return frontmatter.value.desc || ''
})

const getCategoryUrl = (d: string, index: number) => {
  console.log(d, index)
  let url = ''
  for (const key in category2url) {
    const keys = key.split(',')
    if (index === 0 && keys[index] === key) {
      console.log('找到了', key, category2url[key as keyof typeof category2url])
      url = category2url[key as keyof typeof category2url]
      break
    }
    if (index === 1 && keys[index] === d) {
      url = category2url[key as keyof typeof category2url]
      break
    }
  }
  return url
}
</script>

<template>
  <div class="product-detail-header">
    <div class="product-container content-page-auto-width">
      <!-- 产品信息区域 -->
      <div class="product-info">
        <!-- 产品分类导航 -->
        <nav class="product-categories">
          <template v-for="category in categories" :key="category.join('')">
            <a
              v-for="(d, index) in category"
              :href="getCategoryUrl(d, index)"
              :title="`斯派莎克${d}`"
              class="category-link"
            >
              {{ d }}
            </a>
          </template>
        </nav>

        <!-- 产品标题 -->
        <div class="product-title-section">
          <h2 class="product-title">{{ productModel }}</h2>
        </div>

        <!-- 产品描述 -->
        <div v-if="desc" class="product-description">
          <p>{{ desc }}</p>
        </div>

        <!-- 产品缩略图列表 -->
        <div v-if="imageList.length > 1" class="thumbnail-list">
          <button
            v-for="(img, index) in imageList"
            :key="index"
            class="thumbnail-item"
            :class="{ 'thumbnail-active': img === currentImage }"
            @click="changeImage(img)"
            :aria-label="`选择图片 ${index + 1}`"
          >
            <img :src="img" :alt="`${productTitle} - 缩略图${index + 1}`" class="thumbnail-image" />
          </button>
        </div>
      </div>

      <!-- 产品主图区域 -->
      <div class="product-image-section">
        <div class="main-image-container">
          <img v-if="currentImage" :src="currentImage" :alt="productTitle" class="main-image" />
          <div v-else class="no-image-placeholder">暂无图片</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 主容器布局 */
.product-detail-header {
  width: 100%;
  padding: 1rem 0;
}

.product-container {
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

/* 产品信息区域 */
.product-info {
  flex: 1;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
}

/* 产品分类导航 */
.product-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-link {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-decoration: none;
  padding: 0.25rem 0.5rem;
  padding-left: 0;
  border-radius: 0.375rem;
  transition: color 0.2s ease;
}

.category-link:hover {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
}

/* 产品标题 */
.product-title-section {
  margin: 0;
}

.product-title {
  margin: 0;
  margin-bottom: 2rem;
  font-size: 1.875rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
  line-height: 1.2;
}

/* 产品描述 */
.product-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.product-description p {
  margin: 0;
}

/* 缩略图列表 */
.thumbnail-list {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0.5rem 0;
  scrollbar-width: thin;
  scrollbar-color: var(--vp-c-divider) transparent;
}

.thumbnail-item {
  width: 5rem;
  height: 5rem;
  border: 2px solid var(--vp-c-border);
  border-radius: 0.5rem;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
  background: none;
  padding: 0;
}

.thumbnail-item:hover {
  border-color: var(--vp-c-brand-2);
  transform: translateY(-1px);
}

.thumbnail-active {
  border-color: var(--vp-c-brand-1) !important;
  box-shadow: 0 0 0 2px rgba(var(--vp-c-brand-1-rgb), 0.2);
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 产品主图区域 */
.product-image-section {
  flex: 1;
  min-width: 300px;
  max-width: 50%;
}

.main-image-container {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
}

.main-image {
  width: 100%;
  height: auto;
  display: block;
  max-height: 500px;
  object-fit: contain;
}

.no-image-placeholder {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vp-c-text-2);
  font-size: 1.125rem;
  background-color: var(--vp-c-bg-soft);
}

/* 响应式布局 */
@media (max-width: 768px) {
  .product-container {
    flex-direction: column-reverse;
    gap: 1.5rem;
  }

  .product-info {
    min-width: unset;
    text-align: center;
  }

  .product-categories {
    justify-content: center;
  }

  .thumbnail-list {
    justify-content: center;
    order: -1;
  }

  .product-image-section {
    max-width: none;
    min-width: unset;
  }

  .main-image-container {
    max-width: 100%;
  }

  .no-image-placeholder {
    height: 240px;
  }
}

@media (max-width: 480px) {
  .product-container {
    padding: 0 0.75rem;
    gap: 1rem;
  }

  .product-info {
    gap: 1rem;
  }

  .product-title {
    font-size: 1.5rem;
  }

  .thumbnail-item {
    width: 4rem;
    height: 4rem;
  }

  .no-image-placeholder {
    height: 200px;
    font-size: 1rem;
  }
}

/* 可访问性改进 */
@media (prefers-reduced-motion: reduce) {
  .thumbnail-item,
  .category-link {
    transition: none;
  }
}

/* 支持暗色主题 */
@media (prefers-color-scheme: dark) {
  .thumbnail-list {
    scrollbar-color: var(--vp-c-divider) transparent;
  }
}
</style>
