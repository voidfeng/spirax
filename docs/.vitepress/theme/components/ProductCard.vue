<template>
  <div class="product-card w-full md:w-1/2 lg:w-1/3 p-4">
    <div class="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 h-[420px] flex flex-col">
      <div class="product-image h-[220px] overflow-hidden">
        <img :src="image" :alt="title" class="w-full h-full object-contain transition-transform hover:scale-105">
      </div>
      <div class="p-5 flex flex-col flex-grow">
        <h3 class="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{{ title }}</h3>
        <p class="text-gray-600 dark:text-gray-300 text-sm mb-4 flex-grow">{{ description }}</p>
        <div class="text-center mt-auto">
          <a :href="link" class="inline-block px-6 py-2 bg-primary text-white! font-medium rounded hover:bg-primary/90 dark:hover:bg-primary/80 transition-colors">
            查看详情
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductCardProps } from '../../../types/product'

withDefaults(defineProps<ProductCardProps>(), {
  link: '/products',
  description: ''
})
</script>

<style scoped>
.product-image {
  position: relative;
}
:deep(.dark) .product-image::after {
  background: linear-gradient(to top, rgba(55,65,81,0.7), transparent);
}
</style>
