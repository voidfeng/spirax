<template>
  <div class="product-selection bg-gray-50 dark:bg-gray-800 py-16 full-width-container">
    <div class="container mx-auto px-4">
      <div class="text-center">
        <div class="text-base font-bold text-primary">信誉和认证</div>
        <div class="text-4xl font-bold mb-3">最新产品</div>
        <p class="text-sm text-gray-600 dark:text-gray-300 mx-auto mb-10">
          我们的行业领先解决方案建立在最广泛、创新且能无缝协作的蒸汽和流体处理产品组合之上，能够以最低运营成本满足您的需求，同时提供行业领先的保修和持续的系统高效支持。
        </p>
      </div>

      <div class="flex flex-wrap -mx-4">
        <ProductCard
          v-for="product in products"
          :key="product.title"
          :image="product.images[0]"
          :title="product.title"
          :link="product.url"
        />
      </div>

      <div class="text-center mt-10">
        <a href="/products" class="inline-block px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
          浏览全部产品
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { data } from '../../data/api.data'

// 限制显示前3个产品
const products = data.slice(0, 3)
</script>

<style scoped>
.product-selection .container {
  max-width: 1152px;
}
</style>
