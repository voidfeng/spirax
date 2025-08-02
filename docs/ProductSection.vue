<template>
  <div class="product-selection bg-gray-50 dark:bg-gray-800 py-16 full-width-container">
    <div class="container mx-auto px-4">
      <div class="text-center">
        <div class="text-base font-bold text-primary">信誉和认证</div>
        <div class="text-4xl font-bold mb-3">最新产品</div>
        <p class="text-sm text-gray-600 dark:text-gray-300 mx-auto mb-10">
          产品的质量保证体系适用于我们的所有流程及产品。我们的质量管理程序确保交付的每件产品均能达到或超过客户要求的质量水准。
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
        <a href="/products" class="inline-block px-8 py-3 text-white font-medium rounded-lg hover:bg-primary/90 transition-colors">
          浏览全部产品
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCard from './ProductCard.vue'
import { data } from './api.data'

const products = data.slice(0, 3)

</script>

<style scoped>
.product-selection .container {
  max-width: 1152px;
}
</style> 