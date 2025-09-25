#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 从错误日志中提取的精确死链接列表
const exactDeadLinks = [
  // 语言版本链接
  '/tw',
  '/en',
  '/tw.html',
  '/en.html',
  '/tw/index',
  '/en/index',
  
  // 导航页面链接
  '/about',
  '/contact',
  '/about.html',
  '/contact.html',
  '/about_en',
  '/contact_en',
  '/about_en.html',
  '/contact_en.html',
  '/sitemap',
  '/sitemap.html',
  '/news',
  '/services',
  
  // 文章链接
  '/article/arts/85',
  '/article/arts/85.html',
  '/article/arts/86',
  '/article/arts/86.html',
  
  // valves 目录链接
  '/valves/2',
  '/valves/2.html',
  '/valves/27',
  '/valves/27.html',
  '/valves/30',
  '/valves/30.html',
  '/valves/33',
  '/valves/33.html',
  '/valves/34',
  '/valves/34.html',
  '/valves/35',
  '/valves/35.html',
  '/valves/36',
  '/valves/36.html',
  '/valves/37',
  '/valves/37.html',
  '/valves/38',
  '/valves/38.html',
  '/valves/39',
  '/valves/39.html',
  '/valves/40',
  '/valves/40.html',
  '/valves/41',
  '/valves/41.html',
  '/valves/42',
  '/valves/42.html',
  '/valves/43',
  '/valves/43.html',
  '/valves/44',
  '/valves/44.html',
  '/valves/45',
  '/valves/45.html',
  '/valves/46',
  '/valves/46.html',
  '/valves/47',
  '/valves/47.html',
  '/valves/48',
  '/valves/48.html',
  '/valves/49',
  '/valves/49.html',
  '/valves/50',
  '/valves/50.html',
  '/valves/51',
  '/valves/51.html',
  '/valves/52',
  '/valves/52.html',
  '/valves/53',
  '/valves/53.html',
  '/valves/54',
  '/valves/54.html',
  '/valves/55',
  '/valves/55.html',
  '/valves/56',
  '/valves/56.html',
  '/valves/57',
  '/valves/57.html',
  '/valves/58',
  '/valves/58.html',
  '/valves/59',
  '/valves/59.html',
  '/valves/87',
  '/valves/87.html',
  '/valves/88',
  '/valves/88.html',
  '/valves/89',
  '/valves/89.html',
  '/valves/90',
  '/valves/90.html',
  '/valves/91',
  '/valves/91.html',
  '/valves/92',
  '/valves/92.html',
  '/valves/93',
  '/valves/93.html',
  '/valves/94',
  '/valves/94.html',
  '/valves/95',
  '/valves/95.html',
  '/valves/96',
  '/valves/96.html',
  '/valves/97',
  '/valves/97.html',
  '/valves/98',
  '/valves/98.html',
  '/valves/100',
  '/valves/100.html',
  '/valves/101',
  '/valves/101.html',
  '/valves/102',
  '/valves/102.html',
  '/valves/103',
  '/valves/103.html',
  '/valves/104',
  '/valves/104.html',
  '/valves/105',
  '/valves/105.html',
  '/valves/106',
  '/valves/106.html',
  '/valves/107',
  '/valves/107.html',
  '/valves/108',
  '/valves/108.html',
  '/valves/109',
  '/valves/109.html',
  '/valves/110',
  '/valves/110.html',
  '/valves/111',
  '/valves/111.html',
  '/valves/112',
  '/valves/112.html',
  '/valves/113',
  '/valves/113.html',
  '/valves/114',
  '/valves/114.html',
  '/valves/115',
  '/valves/115.html',
  '/valves/116',
  '/valves/116.html',
  '/valves/117',
  '/valves/117.html',
  '/valves/118',
  '/valves/118.html',
  '/valves/119',
  '/valves/119.html',
  
  // valve 单数链接
  '/valve/45',
  '/valve/45.html',
  '/valve/47',
  '/valve/47.html',
  '/valve/50',
  '/valve/50.html',
  '/valve/66',
  '/valve/66.html',
  '/valve/67',
  '/valve/67.html',
  '/valve/73',
  '/valve/73.html',
  '/valve/74',
  '/valve/74.html',
  '/valve/84',
  '/valve/84.html',
  '/valve/86',
  '/valve/86.html',
  '/valve/89',
  '/valve/89.html',
  '/valve/90',
  '/valve/90.html',
  '/valve/91',
  '/valve/91.html',
  '/valve/92',
  '/valve/92.html',
  '/valve/93',
  '/valve/93.html',
  '/valve/96',
  '/valve/96.html',
  '/valve/97',
  '/valve/97.html',
  '/valve/102',
  '/valve/102.html',
  '/valve/103',
  '/valve/103.html',
  '/valve/104',
  '/valve/104.html',
  '/valve/106',
  '/valve/106.html',
  
  // 品牌和产品目录链接 (带 /index 后缀)
  '/import/index',
  '/SpiraxSarco/index',
  '/Crane/index',
  '/Yoshitake/index',
  '/Armstrong/index',
  '/Fitok/index',
  '/Tyco/index',
  '/Jung/index',
  '/Flowserve/index',
  '/Hank/index',
  '/Hattersley/index',
  '/Rongpai/index',
  '/products/index',
  
  // 产品类别链接 (带 /index 后缀)
  '/zf/index',
  '/df/index',
  '/qf/index',
  '/aqf/index',
  '/ssf/index',
  '/jyf/index',
  '/jzf/index',
  '/zhf/index',
  '/gmf/index',
  '/phf/index',
  '/jzfm/index',
  '/dcf/index',
  '/pqf/index',
  '/xsf/index',
  '/zxf/index',
  '/tjf/index',
  '/glq/index',
  '/xff/index',
  '/slf/index',
  
  // 进口产品链接 (带 /index 后缀)
  '/jkfm/index',
  '/jkzf/index',
  '/jkdf/index',
  '/jkqf/index',
  '/jkaqf/index',
  '/jkssf/index',
  '/jkjyf/index',
  '/jkjzf/index',
  '/jkzhf/index',
  '/jkgmf/index',
  '/jkphf/index',
  '/jkjzfm/index',
  '/jkdcf/index',
  '/jkpqf/index',
  '/jkxsf/index',
  '/jkzxf/index',
  '/jktjf/index',
  '/jkglq/index',
  '/jkxffm/index',
  '/jkslkzf/index',
  
  // 品牌和产品目录链接 (不带 /index 后缀)
  '/import/',
  '/SpiraxSarco/',
  '/Crane/',
  '/Yoshitake/',
  '/Armstrong/',
  '/Fitok/',
  '/Tyco/',
  '/Jung/',
  '/Flowserve/',
  '/Hank/',
  '/Hattersley/',
  '/Rongpai/',
  '/products/',
  
  // 产品类别链接 (不带 /index 后缀)
  '/zf/',
  '/df/',
  '/qf/',
  '/aqf/',
  '/ssf/',
  '/jyf/',
  '/jzf/',
  '/zhf/',
  '/gmf/',
  '/phf/',
  '/jzfm/',
  '/dcf/',
  '/pqf/',
  '/xsf/',
  '/zxf/',
  '/tjf/',
  '/glq/',
  '/xff/',
  '/slf/',
  
  // 进口产品链接 (不带 /index 后缀)
  '/jkfm/',
  '/jkzf/',
  '/jkdf/',
  '/jkqf/',
  '/jkaqf/',
  '/jkssf/',
  '/jkjyf/',
  '/jkjzf/',
  '/jkzhf/',
  '/jkgmf/',
  '/jkphf/',
  '/jkjzfm/',
  '/jkdcf/',
  '/jkpqf/',
  '/jkxsf/',
  '/jkzxf/',
  '/jktjf/',
  '/jkglq/',
  '/jkxffm/',
  '/jkslkzf/',
  
  // URL编码的中文路径
  '/zxf/%E6%BE%B6%E6%A0%AC%E7%81%AA%E7%BB%BE%E5%BD%92%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE2.html',
  '/zxf/%E9%8D%90%E5%91%AC%E7%AC%A3%E9%96%BD%E5%A0%9D%E7%80%B7%E9%97%83%E2%82%AC.html',
  '/zxf/J94W-kataojiaoshi.html',
  '/zxf/J21-wailuowen.html',
  '/zxf/%E9%8D%8F%EE%85%A1%EE%9D%97%E8%A4%B0%E3%88%A0%E5%94%B4%E6%BE%B6%E6%A0%A6%E7%AC%A3%E9%96%BD%E5%A0%9D%E7%80%B7%E9%97%83%E2%82%AC.html',
  '/zxf/%E7%BC%87%E5%BA%A2%E7%88%A3%E9%8D%97%E2%80%B3%EE%9A%9C%E9%96%BD%E5%A0%A5%E6%A6%BE.html',
  '/zxf/%E6%BE%B6%E6%A0%AC%E7%81%AA%E7%BB%BE%E5%BD%92%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE2.html',
  '/zxf/%E9%96%BD%E5%A0%9D%E7%80%B7%E9%97%83%E2%82%AC.html',
  '/zxf/%E9%8D%90%E5%91%AC%E7%AC%A3%E9%96%BD%E5%A0%9D%E7%80%B7%E9%97%83%E2%82%AC.html',
  '/zxf/%E7%BC%87%E5%BA%A2%E7%88%A3%E7%80%B5%E5%9C%AD%E5%89%A8%E9%96%BD%E5%A0%A5%E6%A6%BE.html',
  '/zxf/%E9%8D%99%E6%A0%A5%E5%B8%87%E9%8E%B4%EE%81%85%EE%84%9B%E9%97%83%E2%82%AC.html',
  '/zxf/%E5%A8%89%E6%9B%9E%E5%8F%9E%E9%8E%B4%EE%81%85%EE%84%9B%E9%97%83%E2%82%AC.html',
  '/zxf/%E6%BE%B6%E6%B0%AC%E5%BD%9B%E7%92%81%EF%BF%A0%E5%99%BA%E9%97%83%E2%82%AC.html',
  '/zxf/%E5%A8%91%E8%B9%AD%E7%B6%85%E7%92%81%EF%BF%A0%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE.html',
  '/zxf/%E7%91%99%E6%8E%91%E7%B4%A1%E9%96%BD%E5%A0%9D%E8%88%B0%E9%8E%B4%EE%81%85%EE%84%9B%E9%97%83%E2%82%AC.html',
  '/zxf/%E6%BE%B6%E6%A0%AC%E7%81%AA%E7%BB%BE%E5%BD%92%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE.html',
  '/zxf/%E9%8D%90%E5%91%B0%E7%81%AA%E7%BB%BE%E5%BD%92%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE-%E9%8F%8D%E5%9B%A7%E5%99%AF%E9%8D%A8%EF%BF%BD.html',
  '/zxf/%E9%8D%90%E5%91%B0%E7%81%AA%E7%BB%BE%E5%BD%92%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE-%E9%8E%B5%E5%AC%AD%E7%96%86.html',
  '/zxf/%E9%8D%90%E5%91%B0%E7%81%AA%E7%BB%BE%E5%BD%92%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE-%E9%8E%B5%E5%AC%AB%E7%84%BA.html',
  '/zxf/%E9%8E%B5%E6%8C%8E%E5%BD%83%E9%90%92%E5%A9%83%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE.html',
  '/zxf/%E9%8D%97%E2%80%B3%EE%9A%9C%E5%AF%AE%E5%BF%9B%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE.html',
  '/zxf/%E9%8D%90%E5%91%AD%EE%98%BB%E6%B6%93%E6%BF%8B%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE.html',
  '/zxf/neiluowanzhenxingjiezhifa.html',
  '/zxf/neiwaisi.html',
  '/zxf/jiaoshishuangwaisi.html',
  
  // 其他特殊链接
  '/valve/',
  '/valve/91',
  '/valve/91.html'
];

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

// 获取所有需要处理的文件
function getAllMarkdownFiles() {
  const docsPath = path.join(__dirname, 'docs');
  return getMarkdownFiles(docsPath);
}

// 处理单个文件
function fixLinksInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changesCount = 0;
    const originalContent = content;
    
    // 对每个死链接进行精确匹配和替换
    exactDeadLinks.forEach(deadLink => {
      // 匹配不同格式的链接
      const linkPatterns = [
        // [文本](死链接)
        new RegExp(`\\[([^\\]]+)\\]\\(${deadLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g'),
        // [文本](死链接 "标题")
        new RegExp(`\\[([^\\]]+)\\]\\(${deadLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+"[^"]*"\\)`, 'g'),
        // [文本](死链接 '标题')
        new RegExp(`\\[([^\\]]+)\\]\\(${deadLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s+'[^']*'\\)`, 'g')
      ];
      
      linkPatterns.forEach(pattern => {
        const matches = content.match(pattern);
        if (matches) {
          console.log(`  发现 ${matches.length} 个死链接: ${deadLink}`);
          changesCount += matches.length;
          // 替换为空链接
          content = content.replace(pattern, '[$1](#)');
        }
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
  console.log('🔍 开始精确匹配清理死链接...\n');
  console.log(`📋 共有 ${exactDeadLinks.length} 个死链接需要清理\n`);
  
  const files = getAllMarkdownFiles();
  console.log(`📁 找到 ${files.length} 个 Markdown 文件\n`);
  
  let totalChanges = 0;
  let processedFiles = 0;
  
  files.forEach(file => {
    const changes = fixLinksInFile(file);
    if (changes > 0) {
      processedFiles++;
      totalChanges += changes;
    }
  });
  
  console.log('\n===========================================');
  console.log(`🎉 处理完成!`);
  console.log(`📄 处理了 ${processedFiles} 个文件`);
  console.log(`🔗 总共修复了 ${totalChanges} 个死链接`);
  console.log('===========================================');
  
  if (totalChanges > 0) {
    console.log('\n💡 提示: 死链接已被替换为 # (空链接)，图片链接已保留。');
  }
}

// 运行脚本
main();
