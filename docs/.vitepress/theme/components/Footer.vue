<template>
  <div class="footer full-width-container">
    <!-- 上半部分 - 主题色背景 -->
    <div class="footer-top bg-primary text-white py-12">
      <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div class="footer-info mb-4 md:mb-0">
          <div class="text-base font-bold">全球超过40家分支机构</div>
          <div class="text-2xl mt-1 font-bold">专业的产品质量、技术支持、服务</div>
        </div>
        <div>
          <a
            href="/Products/"
            class="px-6 py-2 bg-white text-primary font-semibold rounded hover:bg-gray-100 transition-colors"
            >全部产品</a
          >
        </div>
      </div>
    </div>

    <!-- 下半部分 - 深色背景 -->
    <div class="footer-bottom bg-gray-900 text-white py-6">
      <div class="container mx-auto px-4 text-center text-sm">
        <p>版权所有 © {{ currentYear }} 斯派莎克阀门 | 所有权利保留</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  margin-top: 2rem;
}
</style>
