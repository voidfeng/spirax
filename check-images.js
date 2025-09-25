#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 检查并移除docs目录下markdown文件中不存在的图片引用
 */

// 配置
const DOCS_DIR = path.join(__dirname, 'docs');
const PUBLIC_DIR = path.join(__dirname, 'docs', 'public'); // 图片根目录

/**
 * 递归获取目录下的所有markdown文件
 */
function getAllMarkdownFiles(dir) {
  const files = [];
  
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  traverse(dir);
  return files;
}

/**
 * 检查图片文件是否存在
 */
function imageExists(imagePath) {
  // 处理相对路径
  let fullPath;
  if (imagePath.startsWith('/')) {
    // 绝对路径（相对于docs/public目录）
    fullPath = path.join(PUBLIC_DIR, imagePath);
  } else {
    // 相对路径
    fullPath = path.resolve(PUBLIC_DIR, imagePath);
  }
  
  return fs.existsSync(fullPath);
}

/**
 * 处理单个markdown文件
 */
function processMarkdownFile(filePath) {
  console.log(`处理文件: ${path.relative(__dirname, filePath)}`);
  
  let content = fs.readFileSync(filePath, 'utf-8');
  let modified = false;
  const removedImages = [];
  
  // 1. 处理YAML front matter中的imgs字段
  const frontMatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (frontMatterMatch) {
    const frontMatter = frontMatterMatch[1];
    const imgsMatch = frontMatter.match(/imgs:\s*([\s\S]*?)(?=\n\w|\n---|\n$|$)/);
    
    if (imgsMatch) {
      const imgsSection = imgsMatch[1];
      const imageLines = imgsSection.split('\n').filter(line => line.trim().startsWith('-'));
      
      let newImgsSection = '';
      let hasValidImages = false;
      
      for (const line of imageLines) {
        const imageMatch = line.match(/^\s*-\s*(.+)$/);
        if (imageMatch) {
          const imagePath = imageMatch[1].trim();
          // 跳过远程图片
          if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            newImgsSection += line + '\n';
            hasValidImages = true;
            continue;
          }
          
          if (imageExists(imagePath)) {
            newImgsSection += line + '\n';
            hasValidImages = true;
          } else {
            console.log(`  - 移除不存在的图片: ${imagePath}`);
            removedImages.push(imagePath);
            modified = true;
          }
        }
      }
      
      if (modified) {
        if (hasValidImages) {
          // 替换imgs部分
          const newFrontMatter = frontMatter.replace(
            /imgs:\s*([\s\S]*?)(?=\n\w|\n---|\n$|$)/,
            `imgs:\n${newImgsSection.trimEnd()}`
          );
          content = content.replace(frontMatterMatch[0], `---\n${newFrontMatter}\n---`);
        } else {
          // 移除整个imgs字段
          const newFrontMatter = frontMatter.replace(/imgs:\s*([\s\S]*?)(?=\n\w|\n---|\n$|$)/, '');
          content = content.replace(frontMatterMatch[0], `---\n${newFrontMatter.replace(/\n\n+/g, '\n').trim()}\n---`);
        }
      }
    }
  }
  
  // 2. 处理markdown格式的图片引用 ![alt](path)
  const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
  content = content.replace(markdownImageRegex, (match, alt, imagePath) => {
    // 跳过远程图片
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return match;
    }
    
    if (imageExists(imagePath)) {
      return match;
    } else {
      console.log(`  - 移除不存在的图片: ${imagePath}`);
      removedImages.push(imagePath);
      modified = true;
      return ''; // 移除整个图片引用
    }
  });
  
  // 保存修改后的文件
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`  ✅ 文件已更新，移除了 ${removedImages.length} 个不存在的图片引用`);
  } else {
    console.log(`  ✅ 文件无需修改`);
  }
  
  return removedImages.length;
}

/**
 * 主函数
 */
function main() {
  console.log('开始检查docs目录下的markdown文件中的图片引用...\n');
  
  if (!fs.existsSync(DOCS_DIR)) {
    console.error(`错误: docs目录不存在: ${DOCS_DIR}`);
    process.exit(1);
  }
  
  if (!fs.existsSync(PUBLIC_DIR)) {
    console.error(`错误: public目录不存在: ${PUBLIC_DIR}`);
    process.exit(1);
  }
  
  const markdownFiles = getAllMarkdownFiles(DOCS_DIR);
  console.log(`找到 ${markdownFiles.length} 个markdown文件\n`);
  
  let totalRemovedImages = 0;
  let modifiedFiles = 0;
  
  for (const file of markdownFiles) {
    try {
      const removedCount = processMarkdownFile(file);
      totalRemovedImages += removedCount;
      if (removedCount > 0) {
        modifiedFiles++;
      }
    } catch (error) {
      console.error(`处理文件失败 ${file}: ${error.message}`);
    }
    console.log(''); // 空行分隔
  }
  
  console.log('='.repeat(50));
  console.log(`处理完成!`);
  console.log(`总计处理文件: ${markdownFiles.length}`);
  console.log(`修改的文件: ${modifiedFiles}`);
  console.log(`移除的图片引用: ${totalRemovedImages}`);
}

// 运行脚本
if (require.main === module) {
  main();
}
