#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// URL编码的死链列表
const urlEncodedDeadLinks = [
  // 产品链接（URL编码的中文）
  '/products/%E5%BC%B9%E7%B0%A7%E5%BC%8F%E5%AE%89%E5%85%A8%E9%98%80_1_1',
  '/products/%E5%BC%B9%E7%B0%A7%E5%AE%89%E5%85%A8%E9%98%80_2_1',
  '/products/%E5%AE%89%E5%85%A8%E9%98%80%E5%9E%8B%E5%8F%B7_7_1',
  '/products/%E5%8E%8B%E5%8A%9B%E5%AE%89%E5%85%A8%E9%98%80_8_1',
  '/products/%E7%96%8F%E6%B0%B4%E9%98%80%E5%9E%8B%E5%8F%B7_4_1',
  '/products/%E5%80%92%E5%90%8A%E6%A1%B6%E7%96%8F%E6%B0%B4%E9%98%80_27_1',
  '/products/%E7%83%AD%E5%8A%A8%E5%8A%9B%E7%96%8F%E6%B0%B4%E9%98%80_3_1',
  '/products/%E5%9C%86%E7%9B%98%E5%BC%8F%E7%96%8F%E6%B0%B4%E9%98%80_5_1',
  '/products/%E7%83%AD%E5%8A%A8%E5%8A%9B%E5%BC%8F%E7%96%8F%E6%B0%B4%E9%98%80_6_1',
  '/products/%E5%80%92%E5%90%8A%E6%A1%B6%E5%BC%8F%E7%96%8F%E6%B0%B4%E9%98%80_26_1',
  '/products/%E8%87%AA%E5%8A%A8%E7%96%8F%E6%B0%B4%E9%98%80_25_1',
  '/products/%E7%96%8F%E6%B0%B4%E9%98%80%E6%B3%B5_24_1',
  '/products/%E6%88%AA%E6%AD%A2%E9%98%80%E5%9E%8B%E5%8F%B7_10_1',
  '/products/%E6%B3%95%E5%85%B0%E6%88%AA%E6%AD%A2%E9%98%80_11_1',
  '/products/%E6%89%8B%E5%8A%A8%E6%88%AA%E6%AD%A2%E9%98%80_12_1',
  '/products/%E9%93%B8%E9%92%A2%E6%88%AA%E6%AD%A2%E9%98%80_13_1',
  '/products/%E7%9B%B4%E9%80%9A%E5%BC%8F%E6%88%AA%E6%AD%A2%E9%98%80_14_1',
  '/products/%E7%9B%B4%E6%B5%81%E5%BC%8F%E6%88%AA%E6%AD%A2%E9%98%80_15_1',
  '/products/%E5%AF%B9%E5%A4%B9%E5%BC%8F%E6%AD%A2%E5%9B%9E%E9%98%80_20_1',
  '/products/%E5%AF%B9%E5%A4%B9%E6%AD%A2%E5%9B%9E%E9%98%80_21_1',
  '/products/%E4%B8%8D%E9%94%88%E9%92%A2%E6%AD%A2%E5%9B%9E%E9%98%80_23_1',
  '/products/%E9%93%9C%E6%AD%A2%E5%9B%9E%E9%98%80_22_1',
  '/products/%E7%BD%91%E5%BC%8F%E8%BF%87%E6%BB%A4%E5%99%A8_16_1',
  '/products/Y%E5%9E%8B%E8%BF%87%E6%BB%A4%E5%99%A8_17_1',
  '/products/%E9%93%B8%E9%93%81%E8%BF%87%E6%BB%A4%E5%99%A8_18_1',
  '/products/%E6%B6%B2%E4%BD%93%E8%BF%87%E6%BB%A4%E5%99%A8_19_1',
  '/products/%E9%98%80%E9%97%A8%E5%AE%9A%E4%BD%8D%E5%99%A8_9_1',
  
  // DCF相关链接（URL编码）
  '/dcf/24DHS%E4%BA%8C%E4%BD%8D%E5%9B%9B%E9%80%9A%E7%94%B5%E7%A3%81%E9%98%80',
  '/dcf/%E7%94%B5%E7%A3%81%E5%BC%8F%E7%85%A4%E6%B0%94%E5%AE%89%E5%85%A8%E5%88%87%E6%96%AD%E9%98%80',
  '/dcf/%E4%BA%8C%E4%BD%8D%E4%BA%94%E9%80%9A%E7%94%B5%E7%A3%81%E9%98%80',
  '/dcf/ZCG%E5%9E%8B%E9%AB%98%E6%B8%A9%E7%94%B5%E7%A3%81%E9%98%80'
];

// 解码URL编码的字符串
function decodeUrlPath(encodedPath) {
  try {
    return decodeURIComponent(encodedPath);
  } catch (error) {
    console.warn(`无法解码URL: ${encodedPath}`);
    return encodedPath;
  }
}

// 递归获取所有Markdown文件
function getMarkdownFiles(dir) {
  const files = [];
  
  function scanDirectory(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        if (!['node_modules', '.git', '.vitepress'].includes(item)) {
          scanDirectory(fullPath);
        }
      } else if (stat.isFile() && item.endsWith('.md')) {
        files.push(fullPath);
      }
    }
  }
  
  scanDirectory(dir);
  return files;
}

// 处理单个文件，移除死链
function removeDeadLinksInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changesCount = 0;
    const originalContent = content;
    
    // 对每个URL编码的死链接进行解码和匹配
    urlEncodedDeadLinks.forEach(encodedDeadLink => {
      // 解码URL
      const decodedDeadLink = decodeUrlPath(encodedDeadLink);
      
      // 创建不同格式的链接变体
      const linksToMatch = [
        encodedDeadLink,
        decodedDeadLink,
        decodedDeadLink + '.html',  // 加上.html后缀
        encodedDeadLink + '.html'   // 编码版本也加上.html
      ];
      
      linksToMatch.forEach(deadLink => {
        // 转义特殊字符以用于正则表达式
        const escapedLink = deadLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        // 匹配不同格式的链接
        const patterns = [
          // [文本](死链接)
          new RegExp(`\\[([^\\]]+)\\]\\(${escapedLink}\\)`, 'g'),
          // [文本](死链接 "标题")
          new RegExp(`\\[([^\\]]+)\\]\\(${escapedLink}\\s+"[^"]*"\\)`, 'g'),
          // [文本](死链接 '标题')
          new RegExp(`\\[([^\\]]+)\\]\\(${escapedLink}\\s+'[^']*'\\)`, 'g')
        ];
        
        patterns.forEach(pattern => {
          const matches = content.match(pattern);
          if (matches) {
            console.log(`  找到 ${matches.length} 个死链接: ${deadLink} (原编码: ${encodedDeadLink})`);
            changesCount += matches.length;
            // 替换为空链接
            content = content.replace(pattern, '[$1](#)');
          }
        });
      });
    });
    
    // 如果有变化，写入文件
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ 修复了 ${path.relative(__dirname, filePath)} 中的 ${changesCount} 个死链接`);
      return changesCount;
    }
    
    return 0;
  } catch (error) {
    console.error(`❌ 处理文件 ${filePath} 时出错:`, error.message);
    return 0;
  }
}

// 主函数
function main() {
  console.log('🔍 开始移除URL编码的死链接...\n');
  
  // 首先显示一些解码示例
  console.log('解码示例:');
  urlEncodedDeadLinks.slice(0, 5).forEach(encoded => {
    const decoded = decodeUrlPath(encoded);
    console.log(`  ${encoded} -> ${decoded}`);
  });
  console.log();
  
  console.log(`📋 共有 ${urlEncodedDeadLinks.length} 个URL编码死链接需要移除\n`);
  
  const docsPath = path.join(__dirname, 'docs');
  const files = getMarkdownFiles(docsPath);
  console.log(`📁 找到 ${files.length} 个 Markdown 文件\n`);
  
  let totalChanges = 0;
  let processedFiles = 0;
  
  files.forEach(file => {
    const changes = removeDeadLinksInFile(file);
    if (changes > 0) {
      processedFiles++;
      totalChanges += changes;
    }
  });
  
  console.log('\n===========================================');
  console.log(`🎉 处理完成!`);
  console.log(`📄 处理了 ${processedFiles} 个文件`);
  console.log(`🔗 总共移除了 ${totalChanges} 个URL编码死链接`);
  console.log('===========================================');
  
  if (totalChanges > 0) {
    console.log('\n💡 提示: 死链接已被替换为 # (空链接)');
  }
}

// 运行脚本
main();
