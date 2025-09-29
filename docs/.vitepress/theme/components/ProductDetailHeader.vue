<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, page } = useData()

const category2url = {
  '蒸汽疏水阀,蒸汽压力平衡式疏水阀': '',
  '蒸汽疏水阀,浮球式疏水阀': '',
  '蒸汽疏水阀,浮球式疏水阀,浮球式疏水阀': '',
  '蒸汽疏水阀,浮球式疏水阀,蒸汽疏水阀': '',
  '蒸汽疏水阀,万向连接疏水阀': '',
  '蒸汽疏水阀,热动力疏水阀': '',
  '蒸汽疏水阀,蒸汽疏水阀性能检测系统': '',
  '蒸汽疏水阀,固定排放温度疏水阀': '',
  '蒸汽疏水阀,蒸汽倒吊桶疏水阀': '',
  '蒸汽疏水阀,蒸汽分配及冷凝水收集管': '',
  '蒸汽疏水阀,密封型疏水阀': '',
  '蒸汽疏水阀,蒸汽双金属疏水阀': '',
  管道附件: '',
  '管道附件,球阀': '',
  '管道附件,排空气阀': '',
  '管道附件,止回阀': '',
  '管道附件,泄压阀': '',
  '管道附件,消音器': '',
  '管道附件,汽水混合站': '',
  '管道附件,压力表': '',
  '管道附件,密封波纹管截止阀': '',
  '管道附件,过滤器': '',
  '管道附件,真空破坏器': '',
  '管道附件,汽水分离器': '',
  '管道附件,观视镜': '',
  '控制系统,控制阀': '',
  '控制系统,减温减压系统': '',
  '控制系统,电动执行器': '',
  '控制系统,安全阀': '',
  '控制系统,定位器，控制系统感应器': '',
  '控制系统,气动活塞角阀': '',
  '控制系统,气动执行器': '',
  '控制系统,减压阀': '',
  '控制系统,自作用温度控制系统': '',
  锅炉控制系统: '',
  洁净蒸汽产品: '',
  洁净蒸汽发生器: '',
  洁净蒸汽阀件: '',
  压缩空气产品: '',
  '压缩空气疏水阀和加湿器,压缩空气疏水阀': '',
  冷凝水回收及热量回收: '',
  '冷凝水回收及热量回收,电泵': '',
  '换热产品解决方案,蒸汽换热机组': '',
  '换热产品解决方案,Quickheat换热机组': '',
  '加湿器,直接喷射式蒸汽加湿器': '',
}

// 处理图片数据
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
function changeImage(img) {
  currentImage.value = img
}

// 获取产品分类
const categories = computed(() => {
  if (!frontmatter.value.category) return []
  return frontmatter.value.category.split(';').map(item => item.split(','))
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
</script>

<template>
  <div class="product-detail-header">
    <div class="product-container content-page-auto-width">
      <!-- 产品信息区域 -->
      <div class="product-info">
        <!-- 产品分类导航 -->
        <nav class="product-categories">
          <a
            v-for="d in categories"
            :href="`/zh/products/${d.join('/')}`"
            :title="`斯派莎克${d.toReversed().join('')}`"
            class="category-link"
          >
            {{ d.toReversed().join('') }}
          </a>
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
