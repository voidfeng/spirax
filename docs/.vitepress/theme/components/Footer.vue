<template>
  <div class="footer full-width-container">
    <!-- 上半部分 - 主题色背景 -->
    <div class="footer-top text-white py-12">
      <div class="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div class="footer-info mb-4 md:mb-0">
          <div class="text-4 font-bold font-italic tracking-widest">
            First &nbsp;for&nbsp; Steam &nbsp;Solutions
          </div>
          <div class="text-3 mt-1 font-bold tracking-widest">
            EXPERTISE &nbsp;| &nbsp;SOLUTIONS&nbsp; |&nbsp; SUSTAINABILITY
          </div>
        </div>
        <div>
          <a href="/Products/" class="VPButton medium px-6!">全部产品</a>
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
.footer-top {
  background-color: var(--vp-c-brand-3);
}
</style>
