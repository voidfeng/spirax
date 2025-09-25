---
sidebar: false
aside: false
outline: false
---

<HeroImage 
  imageUrl="/d/file/p/2015-04-21/ef81bc6cd6aba8655e301d7ff89f379f.jpg"
  title="联系我们"
/>

<div class="contact-container">

<div class="contact-description">
  <p class="lead-text">我们的专家将指导您以最佳方式满足您的需求</p>
  <p>我们的蒸汽系统专家将帮您找到最合适的蒸汽系统及热能管理解决方案。</p>
</div>

<div class="contact-grid">

### 🏢 销售一部

<div class="contact-card">
  <div class="contact-item">
    <span class="contact-icon">📍</span>
    <div class="contact-info">
      <strong>地址</strong>
      <p>上海市闵行区浦江高科技园区新骏环路600号</p>
      <p>邮编：201114</p>
    </div>
  </div>

  <div class="contact-item">
    <span class="contact-icon">📞</span>
    <div class="contact-info">
      <strong>电话</strong>
      <p><a href="tel:021-51602757">021-5160 2757</a></p>
    </div>
  </div>

  <div class="contact-item">
    <span class="contact-icon">📠</span>
    <div class="contact-info">
      <strong>传真</strong>
      <p>021-6091 1164</p>
    </div>
  </div>

  <div class="contact-item">
    <span class="contact-icon">✉️</span>
    <div class="contact-info">
      <strong>邮箱</strong>
      <p><a href="mailto:13917444407@163.com">13917444407@163.com</a></p>
    </div>
  </div>
</div>

### 🕐 营业时间

<div class="business-hours-card">
  <div class="hours-item">
    <span class="day">周一至周五</span>
    <span class="time">8:30 - 17:30</span>
  </div>
  <div class="hours-item">
    <span class="day">周六</span>
    <span class="time">9:00 - 16:00</span>
  </div>
  <div class="hours-item">
    <span class="day">周日</span>
    <span class="time">休息</span>
  </div>
</div>

### 🚀 专业服务

<div class="services-grid">
  <div class="service-item">
    <div class="service-icon">🔧</div>
    <h4>技术支持</h4>
    <p>专业的技术团队为您提供全方位的技术支持和解决方案</p>
  </div>
  
  <div class="service-item">
    <div class="service-icon">⚡</div>
    <h4>快速响应</h4>
    <p>24小时内响应客户需求，提供及时有效的服务</p>
  </div>
  
  <div class="service-item">
    <div class="service-icon">🛡️</div>
    <h4>质量保证</h4>
    <p>严格的质量控制体系，确保产品质量和服务标准</p>
  </div>
</div>

</div>

</div>

<style scoped>
.contact-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  /* 移动端滚动优化 */
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
}

.contact-description {
  text-align: center;
  margin-bottom: 3rem;
}

.lead-text {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
  margin-bottom: 1rem;
}

.contact-grid {
  display: grid;
  gap: 2rem;
}

.contact-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--vp-c-divider);
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.contact-item:last-child {
  border-bottom: none;
}

.contact-icon {
  font-size: 1.5rem;
  min-width: 2rem;
}

.contact-info strong {
  display: block;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.contact-info p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
}

.contact-info a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  transition: all 0.3s ease;
  display: inline-block;
  padding: 0.25rem 0;
  min-height: 44px; /* 确保触摸目标至少44px高 */
  line-height: 1.4;
}

.contact-info a:hover {
  color: var(--vp-c-brand-2);
  text-decoration: underline;
}

.contact-info a:active {
  background-color: var(--vp-c-brand-soft);
  border-radius: 4px;
  padding: 0.25rem 0.5rem;
  margin: 0 -0.5rem;
}

.business-hours-card {
  background: var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--vp-c-divider);
}

.hours-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.hours-item:last-child {
  border-bottom: none;
}

.day {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.time {
  color: var(--vp-c-text-2);
}


.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.service-item {
  background: var(--vp-c-bg-soft);
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  border: 1px solid var(--vp-c-divider);
  transition: all 0.3s ease;
}

.service-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

/* 移动端禁用悬停效果 */
@media (hover: none) and (pointer: coarse) {
  .service-item:hover {
    transform: none;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .service-item:active {
    transform: scale(0.98);
    transition: transform 0.1s ease;
  }
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
  display: block;
}

.service-item h4 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-1);
  font-weight: 600;
}

.service-item p {
  margin: 0;
  color: var(--vp-c-text-2);
  line-height: 1.6;
  font-size: 0.9rem;
}

/* 移动端优化 */
@media (max-width: 768px) {
  .contact-container {
    padding: 1rem;
  }
  
  .contact-description {
    margin-bottom: 2rem;
  }
  
  .lead-text {
    font-size: 1.1rem;
  }
  
  .contact-card,
  .business-hours-card {
    padding: 1.5rem;
    margin-bottom: 1rem;
  }
  
  .contact-item {
    padding: 0.75rem 0;
  }
  
  .contact-icon {
    font-size: 1.25rem;
    min-width: 1.5rem;
  }
  
  .contact-info strong {
    font-size: 0.9rem;
  }
  
  .contact-info p {
    font-size: 0.9rem;
  }
  
  .hours-item {
    padding: 0.5rem 0;
  }
  
  .services-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .service-item {
    padding: 1.5rem;
  }
  
  .service-icon {
    font-size: 2.5rem;
  }
  
  .service-item h4 {
    font-size: 1rem;
  }
  
  .service-item p {
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .contact-container {
    padding: 0.75rem;
  }
  
  .contact-card,
  .business-hours-card {
    padding: 1rem;
  }

  
  .contact-icon {
    align-self: flex-start;
  }
  
  .service-item {
    padding: 1rem;
  }
  
  .service-icon {
    font-size: 2rem;
  }
}
</style>
