<template>
  <div class="company-highlights full-width-container bg-gray-100 dark:bg-gray-800">
    <div class="container mx-auto py-12">
      <div class="text-center text-base font-bold text-primary">COMPANY</div>
      <div class="text-center text-4xl font-bold mb-3">为什么选择斯派莎克阀门</div>
      <div class="text-center text-sm text-gray-900 dark:text-gray-300 mb-8">
        确保每项产品的设计材料和质量水平达到或超越客户的要求。
      </div>

      <div class="highlights-grid">
        <div v-for="highlight in highlights" :key="highlight.title" class="highlight-card">
          <div class="card-image">
            <img :src="highlight.image" :alt="highlight.title" />
          </div>
          <div class="card-overlay">
            <div class="card-content">
              <h3>{{ highlight.title }}</h3>
              <p>{{ highlight.description }}</p>
              <a :href="highlight.link" class="highlight-link">了解更多</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const highlights = [
  {
    title: '高品质产品',
    description: '超过30年的设计经验，确保每个产品都达到最高标准',
    image: '/images/home-company-highlight1.jpg',
    link: '/Products/',
  },
  {
    title: '全球服务网络',
    description: '在40多个国家和地区拥有分支机构，提供便捷服务',
    image: '/images/home-company-highlight2.jpg',
    link: '/contact-us',
  },
  {
    title: '定制解决方案',
    description: '根据客户需求提供定制化的流体控制解决方案',
    image: '/images/home-company-highlight3.jpg',
    link: '/zh/解决方案/行业/化工和石油/',
  },
  {
    title: '技术创新',
    description: '不断创新，引领流体控制技术的发展',
    image: '/images/home-company-highlight4.jpg',
    link: '/contact-us',
  },
]
</script>

<style scoped>
/* 公司亮点卡片样式 */
.highlights-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.container {
  max-width: 1152px;
}

.company-highlights {
  /* 背景颜色通过类名直接应用 */
}

@media (max-width: 1024px) {
  .highlights-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .highlights-grid {
    grid-template-columns: 1fr;
    padding: 0 24px;
  }
}

.highlight-card {
  position: relative;
  height: 300px;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card-image {
  width: 100%;
  height: 100%;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(7, 11, 43, 0.88);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.highlight-card:hover .card-overlay {
  opacity: 1;
}

.card-content {
  color: white;
  text-align: center;
  padding: 20px;
}

.card-content h3 {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 10px;
}

.card-content p {
  margin-bottom: 15px;
}

.highlight-link {
  display: inline-block;
  padding: 6px 12px;
  background-color: white;
  color: #0847c1;
  border-radius: 4px;
  font-weight: bold;
  transition: all 0.2s ease;
}

.highlight-link:hover {
  background-color: #f0f0f0;
}
</style>
