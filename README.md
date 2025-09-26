# 斯派莎克SpiraxSarco官方网站

> 斯派莎克SpiraxSarco官方网站 - 蒸汽和流体处理解决方案

## 项目简介

本项目是基于 VitePress 构建的斯派莎克SpiraxSarco企业官网，提供完整的产品展示、行业解决方案和技术支持服务。

## 技术栈

- **框架**: VitePress (2.0.0-alpha.9)
- **开发语言**: TypeScript + Vue 3
- **样式**: UnoCSS + SCSS
- **构建工具**: Vite
- **代码规范**: Oxlint + Prettier
- **包管理**: npm

## 项目结构

```
spirax/
├── docs/                    # VitePress 文档目录
│   ├── .vitepress/         # VitePress 配置目录
│   │   ├── config.mts      # 主配置文件
│   │   ├── theme/          # 自定义主题
│   │   ├── cache/          # 缓存目录
│   │   └── dist/           # 构建输出目录
│   ├── public/             # 静态资源目录
│   ├── types/              # TypeScript 类型定义
│   ├── api.data.ts         # 数据API文件
│   ├── ProductCard.vue     # 产品卡片组件
│   ├── ProductSection.vue  # 产品展示组件
│   ├── tsconfig.json       # docs目录TypeScript配置
│   └── [产品目录]/         # 各产品分类文档
├── package.json            # 项目配置文件
├── tsconfig.json          # 根目录TypeScript配置
├── uno.config.ts          # UnoCSS 配置文件
├── .prettierrc            # Prettier 格式化配置
├── .editorconfig          # 编辑器配置
├── .gitignore             # Git 忽略文件
└── README.md              # 项目说明文档
```

## 开发命令

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 代码检查
npm run lint

# 修复代码问题
npm run lint:fix

# 格式化代码
npm run format

# 检查代码格式
npm run format:check

# TypeScript 类型检查
npm run type-check
```

## 主要特性

### 1. 现代化开发环境

- ✅ TypeScript 支持，提供完整的类型检查
- ✅ Vue 3 + Composition API
- ✅ UnoCSS 原子化CSS框架
- ✅ 热更新开发体验

### 2. 代码质量保障

- ✅ Oxlint 代码检查
- ✅ Prettier 代码格式化
- ✅ EditorConfig 编辑器配置统一
- ✅ TypeScript 严格模式

### 3. 项目架构优化

- ✅ 模块化组件设计
- ✅ 统一的ES6模块语法
- ✅ 完善的错误处理机制
- ✅ 响应式设计支持

### 4. 性能优化

- ✅ VitePress 静态站点生成
- ✅ 图片资源优化
- ✅ 代码分割与懒加载
- ✅ SEO 友好

## 最近优化项目

1. **package.json 规范化**
   - 添加项目基本信息和元数据
   - 配置Node.js版本要求
   - 添加代码质量相关脚本

2. **TypeScript 配置完善**
   - 创建根目录和docs目录的TypeScript配置
   - 添加完整的类型声明文件
   - 修复所有类型错误

3. **Vue组件优化**
   - 使用TypeScript改写组件
   - 修复样式问题
   - 完善组件接口定义

4. **代码规范工具**
   - 配置Prettier代码格式化
   - 添加EditorConfig统一编辑器配置
   - 创建.gitignore文件

## 浏览器支持

- Chrome >= 87
- Firefox >= 78
- Safari >= 14
- Edge >= 88

## 部署

项目构建后的静态文件位于 `docs/.vitepress/dist/` 目录，可以部署到任何静态文件服务器。

> 注意：`.vitepress` 目录位于 `docs` 目录下，这是 VitePress 的标准项目结构。

## 开发规范

1. **代码风格**: 使用 Prettier 进行代码格式化
2. **提交规范**: 遵循 Conventional Commits 规范
3. **分支策略**: 使用 Git Flow 工作流
4. **组件开发**: 优先使用 Composition API

## 许可证

MIT License

## 联系方式

如有问题或建议，请联系开发团队。
