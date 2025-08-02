import { readFileSync } from 'fs'
import { parse } from 'path'
const path = require('path');

interface Product {
  title: string
  directory: string
  images: string[]
  url: string
}


export declare const data: Product[]


// Utility function to generate a slug from a string (used for anchor links)
function slugify(text: string): string {
  return (
    text
      // Replace special characters and spaces with hyphens
      .replace(/[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g, '-')
      // Remove continuous separators
      .replace(/-{2,}/g, '-')
      // Remove leading/trailing hyphens
      .replace(/^-+|-+$/g, '')
      // Ensure it doesn't start with a number (e.g. #121)
      .replace(/^(\d)/, '_$1')
      // Convert to lowercase
      .toLowerCase()
  )
}



/**
 * 从markdown内容中提取标题
 * 直接使用frontmatter中的title字段
 */
function extractTitle(content: string, filename: string) {
  // 提取frontmatter部分
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (frontmatterMatch && frontmatterMatch[1]) {
    const frontmatter = frontmatterMatch[1];
    
    // 查找title字段
    const titleMatch = frontmatter.match(/title:\s*(.*)/);
    if (titleMatch && titleMatch[1] && titleMatch[1].trim()) {
      return titleMatch[1].trim();
    }
  }
  
  // 如果没有找到title字段，使用文件名作为备选
  return slugify(path.basename(filename));
}

/**
 * 从markdown内容中提取图片
 */
function extractImages(content: string): string[] {
    const images: string[] = [];
    
    // 从 frontmatter 的 imgs 字段获取图片
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)!;
    const frontmatter = frontmatterMatch[1];
    
    // 匹配imgs字段，支持多种格式
    // 1. 查找imgs:行
    const imgsLine = frontmatter.match(/imgs:\s*(.*)/);
    if (imgsLine) {
        if (imgsLine[1].trim()) {
            // 如果imgs:后面直接跟着内容，可能是单张图片
            images.push(imgsLine[1].trim().replace(/^-/, ''));
        } else {
            // 如果imgs:后面是换行，则查找列表项
            const imgsList = frontmatter.match(/imgs:\s*\n((\s*-\s*.*\n*)+)/);
            if (imgsList && imgsList[1]) {
                // 分割成行并处理每一行
                const lines = imgsList[1].split('\n');
                lines.forEach(line => {
                    const imgPath = line.match(/\s*-\s*(.*)/);
                    if (imgPath && imgPath[1] && imgPath[1].trim()) {
                      images.push(imgPath[1].trim().replace(/^-/, ''));
                    }
                });
            }
        }
    }
    
    return images;
}

export default {
  watch: ['./ball/**/*.md'],
  load(watchedFiles) {
    // 读取所有md文件
    console.log('files:', watchedFiles)
    return watchedFiles
      .map((file) => {
        const content = readFileSync(file, 'utf-8')
        const { name, dir } = parse(file)
        const images = extractImages(content)
        return {
          title: extractTitle(content, name+'.md'),
          directory: (dir.split('/').pop() || '').replace(/^\d+-/, '')
          images,
          url: file.replace(/^docs/, '').replace(/index\.md$/, ''),
          category: content.match(/category: (.*)/)?.[1].split(';') || [],
        }
      })
      .filter((item) => item.images.length > 0)
  }
}
