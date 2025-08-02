<script lang="ts" setup>
import { ref } from 'vue'
import { productMenus } from '../config'

const showProductMenu = ref(false)
let timer: NodeJS.Timeout | null = null


function onOpen() {
  if (timer) {
    clearTimeout(timer)
  }
  showProductMenu.value = true
}

function onClose() {
  showProductMenu.value = false
}

function onMenuLeave() {
  timer = setTimeout(() => {
    showProductMenu.value = false
  }, 100)
}
</script>

<template>
  <div class="custom-nav-item"
   @mouseenter="onOpen"
   @mouseleave="onMenuLeave"
   @click="showProductMenu = !showProductMenu"
  >
    <span class="nav-text">产品</span>
  </div>
  <div 
    v-if="showProductMenu" 
    class="nav-content" 
    @mouseenter="onOpen"
    @mouseleave="onClose"
  >
    <div class="nav-content-container">
      <div class="product-menu-layout">
        <div v-for="menu in productMenus" :key="menu.text" class="product-category">
          <h3 class="category-title">
            <a :href="menu.link" class="category-link" @click="onClose">{{ menu.text }}</a>
          </h3>
          <div class="sub-menu-list">
            <div v-for="item in menu.items" :key="item.text" class="sub-menu-item">
              <a v-if="item.link" :href="item.link" class="sub-menu-link" @click="onClose">{{ item.text }}</a>
              <span v-else class="sub-menu-text">{{ item.text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 960px) {
  .nav-content-container {
      padding: 0 64px;
  }
}
.custom-nav-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: var(--vp-c-text-1);
}

.custom-nav-item:hover {
  color: var(--vp-c-brand);
}
.dark .custom-nav-item:hover {
  color: var(--vp-c-text-2);
}

.nav-text {
  font-size: 14px;
  font-weight: 500;
}

.nav-content {
  position: fixed;
  top: 98px;
  left: 0;
  right: 0;
  width: 100%;
  background-color: var(--vp-c-bg-soft);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  z-index: 100;
  padding: 24px 0;
}

.nav-content-container {
  max-width: 1280px;
  margin: 0 auto;
  /* padding: 0 32px; */
}

.product-menu-layout {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.category-title {
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--vp-c-text-1);
}

.category-link {
  text-decoration: none;
  color: inherit;
}

.category-link:hover {
  color: var(--vp-c-brand);
}

.sub-menu-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.sub-menu-item {
  font-size: 14px;
}

.sub-menu-link {
  text-decoration: none;
  color: var(--vp-c-text-2);
}

.sub-menu-link:hover {
  color: var(--vp-c-brand);
}

.sub-menu-text {
  color: var(--vp-c-text-3);
}
</style> 