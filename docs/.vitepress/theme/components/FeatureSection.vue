<script setup>
import FeatureCard from './FeatureCard.vue'

const features = [
  {
    iconClass: 'i-material-symbols-auto-transmission',
    title: '阀门自动化',
    content: '推出的自动化解决方案包括气动执行机构、液压执行机构、电动执行机构和执行机构附件，这些解决方案几乎适用于世界各地的所有行业，其中包括石油和天然气、采矿、电力、石油化工、水和废水处理以及纸浆和造纸等。'
  },
  {
    iconClass: 'i-material-symbols-handheld-controller',
    title: '控制阀',
    content: '我们久经验证的控制阀组件设计用于精密控制，并通过严格检测以在任何工艺条件下提供始终如一的性能。斯派莎克控制阀解决方案拥有全球范围内的信誉度，有助于在提高生产率和盈利能力的同时降低综合成本。'
  },
  {
    iconClass: 'i-material-symbols-valve',
    title: '隔离阀',
    content: '制造全系列的可靠浮球阀、固定式球阀、蝶阀、带衬阀门和止回阀，适用于在几乎任何流体控制条件下实现正向隔离。'
  }
]
</script>

<template>
  <div class="feature-section">
    <div class="text-center text-base font-bold text-primary mt-11">高性能阀门公司</div>
    <div class="text-center text-4xl! font-bold mb-3">超过30年的卓越设计经验</div>
    <div class="text-center text-sm text-gray-900 dark:text-gray-300">纵观历史，通过生产具有超高价值和品质的产品、个性化的客户服务，以及准时的交货，赢得了卓越声誉。一个全面集成、能满足加工行业真正需要，且具有创新设计的产品线，始终是关键的要素。</div>
    <div class="mt-3 py-10">
      <div class="container mx-auto">
        <div class="feature-section-cards flex flex-wrap justify-between gap-5">
          <FeatureCard 
            v-for="feature in features" 
            :key="feature.title"
            :icon-class="feature.iconClass"
            :title="feature.title"
            :content="feature.content"
          />
        </div>
        <div class="text-center mt-8">
          <a href="/contact-us" class="btn inline-block">了解更多</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media (max-width: 768px) {
  .feature-section-cards {
    flex-direction: column;
  }
  .feature-section-cards .feature-card {
    width: 100%;
  }
}
</style>