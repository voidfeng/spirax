/**
 * 产品相关类型定义
 */

export interface Product {
  /** 产品标题 */
  title: string
  /** 产品目录名 */
  directory: string
  /** 产品图片列表 */
  images: string[]
  /** 产品详情页URL */
  url: string
  /** 产品分类 */
  category: string[]
}

export interface ProductCardProps {
  /** 产品图片 */
  image: string
  /** 产品标题 */
  title: string
  /** 产品链接 */
  link?: string
  /** 产品描述 */
  description?: string
}

export interface ProductSectionProps {
  /** 最大显示产品数量 */
  maxCount?: number
  /** 产品分类过滤 */
  category?: string
}
