<template>
  <div class="feature-card">
    <div
      class="card-content bg-white dark:bg-gray-700 rounded-lg p-6 transition-all text-center border border-gray-100 dark:border-gray-700 border-solid h-[330px] overflow-hidden"
    >
      <div :class="iconClass + ' feature-card__icon mb-6 mx-auto text-5xl'"></div>
      <span class="text-2xl! font-bold">{{ title }}</span>
      <p class="text-sm text-gray-900 dark:text-gray-300">{{ content }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  iconClass: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss">
.feature-card {
  width: calc((100% - 56px) / 3);

  .card-content {
    transition: background-color 0.3s ease;
    &:hover {
      background-color: var(--vp-c-brand-3);
      color: var(--vp-c-white);
      .feature-card__icon {
        color: var(--vp-c-white);
      }
      p {
        color: var(--vp-c-white) !important;
        opacity: 0.9;
      }
    }
    .feature-card__icon {
      color: var(--vp-c-brand-3);
    }
  }
}
</style>
