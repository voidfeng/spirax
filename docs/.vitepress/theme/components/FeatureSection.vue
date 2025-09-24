<script setup>
import FeatureCard from './FeatureCard.vue'

const features = [
  {
    iconClass: 'i-material-symbols-auto-transmission',
    title: '数字连接',
    content:
      '斯派莎克的套件可作为互联监控系统，提供蒸汽和冷凝水回路中各组件的运行状况指示。只需简单连接，即可识别正常运行和故障的组件，或验证大型蒸汽设备的性能和效率。',
  },
  {
    iconClass: 'i-material-symbols-handheld-controller',
    title: '节省资源',
    content:
      '随着全球人均医疗保健支出的下降，医院及其合作伙伴必须设法提高流程效率，让预算事半功倍。大多数医院的暖通空调、热水、照明、通风、消毒和众多临床流程都需要大量能源，所有这些都会产生巨大的相关成本和排放。',
  },
  {
    iconClass: 'i-material-symbols-valve',
    title: '避免污染风险',
    content:
      '您的食品和饮料加工过程需要蒸汽，但您是否知道在生产过程中使用错误的蒸汽类型 可能会导致产品质量和安全问题？如果不洁净的蒸汽接触到您的产品，则可能会使产品受到铁锈、污垢和化学颗粒的污染。',
  },
]
</script>

<template>
  <div class="feature-section">
    <div class="text-center text-base font-bold text-primary mt-11">探索斯派莎克</div>
    <div class="text-center text-4xl! font-bold mb-3">聚焦产品和服务</div>
    <div class="text-center text-sm text-gray-900 dark:text-gray-300">
      蒸汽几乎可以加热或灭菌所有工业过程。正因如此，它往往是全球众多应用的首选。从食品生产到炼油、啤酒生产和制药公司，蒸汽以其提供安全、可持续和高效的能源而闻名。
    </div>
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
          <a href="/Contact" class="btn inline-block">了解更多</a>
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
