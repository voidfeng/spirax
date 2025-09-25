<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useData } from 'vitepress'

const { frontmatter, page } = useData()

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
  (newImageList) => {
    if (newImageList.length > 0) {
      currentImage.value = newImageList[0]
    } else {
      currentImage.value = ''
    }
  },
  { immediate: true },
)

// 切换显示的图片
function changeImage(img) {
  currentImage.value = img
}

// 获取产品分类
const categories = computed(() => {
  if (!frontmatter.value.category) return []
  return frontmatter.value.category.split(';').map((item) => item.split(','))
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
  <div class="product-detail-container">
    <div class="product-info">
      <div class="product-category">
        <a
          v-for="d in categories"
          :href="`/zh/products/${d.join('/')}`"
          :title="`斯派莎克${d.toReversed().join('')}`"
          class="category-tag"
        >
          {{ d.toReversed().join('') }}
        </a>
      </div>

      <div class="product-model">
        <h2>{{ productModel }}</h2>
      </div>

      <div class="product-description" v-if="desc">
        <p>{{ desc }}</p>
      </div>

      <div class="product-thumbnails" v-if="imageList.length > 1">
        <div
          v-for="(img, index) in imageList"
          :key="index"
          class="thumbnail"
          :class="{ active: img === currentImage }"
          @click="changeImage(img)"
        >
          <img :src="img" :alt="`${productTitle} - 图片${index + 1}`" />
        </div>
      </div>
    </div>

    <div class="product-image">
      <img v-if="currentImage" :src="currentImage" :alt="productTitle" />
      <div v-else class="no-image">暂无图片</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-detail-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  padding: 16px 0;
}

.product-info {
  flex: 1;
  min-width: 300px;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  justify-content: center;
}

.product-image {
  flex: 1;
  min-width: 300px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}

.product-image img {
  max-width: initial;
  height: 350px;
  border-radius: 4px;
  box-shadow: none;
}

.no-image {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--vp-c-bg-soft);
  border-radius: 4px;
  color: var(--vp-c-text-2);
  font-size: 1.2rem;
}

.product-category {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.category-tag {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
}

.product-model h2 {
  margin: 0;
  font-size: 1.75rem;
  color: var(--vp-c-text-1);
  font-weight: 600;
  line-height: 1.2;
}

.product-model h3 {
  margin: 0.5rem 0 0;
  font-size: 1rem;
  color: var(--vp-c-text-2);
  font-weight: normal;
}

.product-description {
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.product-description p {
  margin: 0 0 1rem;
}

.product-thumbnails {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.thumbnail.active {
  border-color: var(--vp-c-brand);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 768px) {
  .product-detail-container {
    flex-direction: column-reverse;
    padding: 0;
    gap: 0;
  }
  .product-category {
    order: 2;
    justify-content: center;
  }
  .product-model {
    order: 3;
  }
  .product-description {
    order: 4;
  }
  .product-info {
    max-width: 100%;
    gap: 0.5rem;
    padding: 0 24px;
    text-align: center;
  }

  .product-image img {
    height: 240px;
  }
  .product-thumbnails {
    justify-content: center;
    order: 1;
  }
}
</style>
