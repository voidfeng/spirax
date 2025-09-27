<template>
  <div class="top-bar">
    <div class="container">
      <div class="content">
        <div class="left">
          <span>欢迎访问斯派莎克阀门网站</span>
        </div>
        <div class="right">
          <span class="desktop-only">
            <span class="inline-block v-sub i-mynaui-telephone-call-solid"></span>
            +86
            <a href="tel:021-51602757">021-5160 2757</a>
          </span>
          <span class="separator desktop-only">|</span>
          <span class="desktop-only">
            <span class="inline-block v-sub i-material-symbols:mail"></span>
            <a href="mailto:13917444407@163.com">13917444407@163.com</a>
          </span>
          <span class="mobile-only">
            <span class="inline-block v-sub i-mynaui-telephone-call-solid"></span>
            <a href="tel:021-51602757">021-5160 2757</a>
            <span class="separator ml-2 mr-3">|</span>
            <span class="inline-block v-sub i-material-symbols:mail"></span>
            <a href="mailto:13917444407@163.com">13917444407@163.com</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-bar {
  background-color: var(--vp-c-brand-3);
  color: var(--vp-c-white);
  font-size: 14px;
  height: 36px;
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 33;
}

.container {
  margin: 0 auto;
  max-width: 100%;
  padding: 0 32px;
  width: 100%;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.right {
  display: flex;
  gap: 12px;
}

.separator {
  color: var(--vp-c-white);
  opacity: 0.6;
}

.mobile-only {
  display: none;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  .top-bar {
    height: auto;
    padding: 8px 0;
    position: relative;
  }

  .left {
    display: none;
  }

  .desktop-only {
    display: none;
  }

  .mobile-only {
    display: inline;
  }

  .content {
    justify-content: center;
  }
}
</style>
