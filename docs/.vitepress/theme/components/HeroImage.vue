<template>
  <div class="hero-image h-30 md:h-55 rounded-2">
    <img :src="imageUrl" :alt="title" class="hero-image__img" />
    <div class="hero-image__overlay">
      <h2 class="hero-image__title">{{ title }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  imageUrl: string
  title: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.hero-image {
  position: relative;
  width: 100%;
  overflow: hidden;
  margin: 24px 0;
}

.hero-image__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

.hero-image__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 8px 24px;
  background: var(--vp-c-brand-3);
  width: 100%;
  opacity: 0.8;
  h2 {
    font-size: 18px;
    padding-top: 0;
  }
}

.hero-image__title {
  margin: 0;
  color: var(--vp-c-white);
  font-weight: bold;
  text-shadow: var(--vp-shadow-2);
  line-height: 1.2;
  border: none !important;
  position: relative;
  z-index: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-image__overlay {
    padding: 8px 16px;
  }

  .hero-image__title {
    font-size: 1.5rem;
  }
}

@media (max-width: 480px) {
  .hero-image__title {
    font-size: 1.25rem;
  }
}
</style>
