---
# https://vitepress.dev/reference/default-theme-home-page
layout: home
title: 斯派莎克阀门 | SpiraxSarco 蒸汽行业的首选!

hero:
  # name: "全面、综合控制系统解决方案"
  text: '<br>更智能的能源管理从这里开始'
  tagline: '斯派莎克致力于革新蒸汽系统的可持续性实现蒸汽的可持续性有助于我们共同迈向碳中和的全球目标。 <br><br>'
  # image:
  #   src: "/logo.png"
  #   alt: "斯派莎克阀门logo"
  actions:
    - theme: brand
      text: 产品中心
      link: /Products/
    - theme: alt
      text: 了解更多
      link: /Contact

features:
  - icon: <span class="i-material-symbols-location-on-rounded"></span>
    title: 分支机构
    details: 斯派莎克在40多个国家有分支机构
  - icon: <span class="i-mynaui-telephone-call-solid"></span>
    title: 联系我们
    details: (+86) 021-5160 2757
  - icon: <span class="i-material-symbols-mark-email-read"></span>
    title: 9:00 AM - 5:00 PM
    details: 周一到周六
---

<script setup>
import { VPTeamMembers } from 'vitepress/theme'

const members = [
  {
    avatar: '/team/leader.jpg',
    name: 'William Sterling',
    title: '创始人、CEO兼主席'
  }
]
</script>

<FeatureSection />

<!-- 公司亮点 -->
<CompanyHighlights />

<div class="team-container full-width-container">
  <div class="team-container-overlay py-12">
    <div class="team-description text-sm font-bold">LEADERS</div>
    <p class="team-description text-4xl font-bold">公司领导层</p>
    <p class="team-description text-sm mx-auto">公认的企业管理专家，在阀门和执行机构行业具有40多年的国际经验。</p>
    <VPTeamMembers size="medium" :members="members" />
  </div>
</div>

<!-- 最新产品 -->
<ProductSection />

<style>
/* 全宽容器样式 */
.full-width-container {
  position: relative;
  width: 100vw;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

.team-container {
  text-align: center;
  background: url('/images/home-leader.jpg') no-repeat fixed 0 0 / cover;
  color: white;
}
.team-container-overlay {
  background: rgb(7, 11, 43, 0.88);
}
.VPTeamMembers {
  display: flex;
  justify-content: center;
}
.VPTeamMembers .profile {
  background: transparent;
}
.VPTeamMembers .profile .avatar {
  width: 160px !important;
  height: 160px !important;
}
</style>
