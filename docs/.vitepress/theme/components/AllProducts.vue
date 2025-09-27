<script setup lang="ts">
import { data } from '../../../api.data'
import type { Product } from '../../../types/product'

const props = defineProps<{
  category: string
}>()

let prefix = K_PREFIX
const products = (data as Product[]).filter(product => {
  if (!props.category) {
    return true
  } else if (props.category.split(',').length === 1) {
    return product.category.find(item => item.split(',')[0] === props.category)
  } else {
    return product.category.indexOf(props.category) !== -1
  }
})
</script>

<template>
  <div class="max-w-1200px mx-auto p-5">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      <a
        v-for="product in products"
        :key="product.title"
        :href="product.url"
        :title="prefix + product.title"
        class="flex flex-col rounded-lg overflow-hidden dark:shadow-gray-800 transition-all duration-300 hover:translate-y-[-5px] text-inherit h-full bg-white dark:bg-gray-800 no-underline!"
      >
        <div class="h-200px overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            v-if="product.images && product.images.length"
            :src="product.images[0]"
            :alt="product.title"
            class="w-full h-full object-contain"
          />
        </div>
        <!-- <div class="p-4 text-base text-gray-600 dark:text-gray-400 font-medium bg-gray-50 dark:bg-gray-900 text-center">{{ product.directory }}</div> -->
        <div class="py-1 text-center bg-gray-50 dark:bg-gray-900">
          <a
            v-for="d in product.category"
            :href="`/zh/products/${d.replace(',', '/')}`"
            :title="prefix + d.split(',').reverse().join('')"
            class="category-tag mr-2 text-gray-600 dark:text-gray-400 no-underline!"
          >
            {{ d.split(',').reverse().join('') }}
          </a>
        </div>
        <div
          class="p-4 pb-5 text-lg font-bold text-gray-800 dark:text-gray-100 flex-grow text-center"
        >
          {{ product.title }}
        </div>
      </a>
    </div>
  </div>
</template>
