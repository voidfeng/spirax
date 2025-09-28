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
    <div class="flex flex-wrap gap-8 py-4 md:flex-row flex-col-reverse md:gap-8 gap-0 mx-auto content-page-auto-width px-4">
      <div
        class="w-2/5 min-w-75 flex flex-col gap-6 justify-center md:max-w-2/5 max-w-full md:gap-6 gap-2 md:px-0 px-6 md:text-left text-center"
      >
        <div class="flex flex-wrap gap-2 md:justify-start justify-center md:order-none order-2">
          <a
            v-for="d in categories"
            :href="`/zh/products/${d.join('/')}`"
            :title="`斯派莎克${d.toReversed().join('')}`"
            class="text-sm text-gray-600"
          >
            {{ d.toReversed().join('') }}
          </a>
        </div>

        <div class="md:order-none order-3">
          <h2 class="m-0 text-2xl text-gray-900 font-semibold leading-tight">{{ productModel }}</h2>
        </div>

        <div v-if="desc" class="text-gray-600 leading-relaxed md:order-none order-4">
          <p class="m-0 mb-4">{{ desc }}</p>
        </div>

        <div
          v-if="imageList.length > 1"
          class="flex gap-3 overflow-x-auto py-2 md:justify-start justify-center md:order-none order-1"
        >
          <div
            v-for="(img, index) in imageList"
            :key="index"
            class="w-20 h-20 rounded overflow-hidden cursor-pointer border-2 border-solid transition-all duration-200 flex-shrink-0 border-gray-3"
            :class="{ 'border-blue-500!': img === currentImage }"
            @click="changeImage(img)"
          >
            <img
              :src="img"
              :alt="`${productTitle} - 图片${index + 1}`"
              class="w-full h-full object-cover rounded"
            />
          </div>
        </div>
      </div>

      <div
        class="flex-1 min-w-75 max-w-1/2 flex items-start justify-center md:max-w-1/2 max-w-full rounded overflow-hidden"
      >
        <img
          v-if="currentImage"
          :src="currentImage"
          :alt="productTitle"
          class="w-full shadow-none"
        />
        <div
          v-else
          class="w-full md:h-75 h-60 flex items-center justify-center bg-gray-100 rounded text-gray-500 text-lg"
        >
          暂无图片
        </div>
      </div>
    </div>
  </div>
</template>
