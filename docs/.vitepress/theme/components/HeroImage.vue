<template>
  <div class="hero-image">
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

<style scoped>
.hero-image {
  position: relative;
  width: 100%;
  height: 220px;
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
  padding: 24px;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  width: 100%;
}

.hero-image__title {
  margin: 0;
  color: white;
  font-size: 1.6rem;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.7);
  line-height: 1.2;
  border: none !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-image__overlay {
    padding: 16px;
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
