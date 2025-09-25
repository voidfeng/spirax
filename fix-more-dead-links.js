#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// 从最新错误日志中提取的死链接
const moreDeadLinks = [
  // 会员和管理页面
  '/member/index_do.php',
  '/index.htm',
  
  // 语言切换和导航
  '/tw/',
  '/en/',
  '/tw/index',
  '/en/index',
  '/cn_applications/index',
  '/cn_products-services/index',
  '/cn_training/index',
  '/cn_university/index',
  '/cn_about/index',
  '/en_products-services/index',
  '/Worldwide',
  
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
  '/products/yalibiao',
  
  // 品牌目录链接
  '/Armstrong/BD16-jzf',
  '/Armstrong/aqf1',
  '/Armstrong/jyf1',
  '/Armstrong/ssf1',
  '/Armstrong/jzf1',
  '/SpiraxSarco/aqf1',
  '/SpiraxSarco/jyf1',
  '/SpiraxSarco/ssf1',
  '/SpiraxSarco/jzf1',
  '/SpiraxSarco/zhf_zkphq_pqf_gsj_dwq1',
  '/SpiraxSarco/sipaishakeSV607anquanfa',
  '/Crane/df1',
  '/Crane/zf1',
  '/Fitok/zxf1',
  '/Hank/df1',
  '/Flowserve/tjf1',
  '/Flowserve/jzf1',
  '/Hattersley/df1',
  '/Rongpai/taiwanrongpaidiefa/df1',
  '/Yoshitake/aqf1',
  '/Yoshitake/ssf1',
  '/Yoshitake/dcf1',
  '/Yoshitake/jyf1',
  '/Yoshitake/Yoshitake1331',
  
  // 服务链接
  '/services/index',
  '/services/204',
  '/services/200',
  '/services/195',
  '/services/190',
  '/services/rdlssf_rjlssf_ylphsssf_sjssssf',
  '/services/spskssf_fqsssf_ddtssf',
  '/services/ArmstrongAICssf',
  '/services/135',
  '/services/aqfgzpc',
  '/services/jfdzy',
  '/services/ytjyfgzyl',
  '/services/51',
  '/services/50',
  '/services/49',
  '/services/48',
  '/services/47',
  '/services/46',
  '/services/45',
  '/services/43',
  '/services/42',
  '/services/41',
  '/services/40',
  '/services/39',
  '/services/38',
  '/services/37',
  '/services/36',
  '/services/35',
  '/services/34',
  '/services/33',
  '/services/3',
  '/services/2',
  
  // 导入链接
  '/import/Armstrong1181',
  '/import/sipaishake25Pjianyafa',
  
  // 其他
  '/jkjyf/xdsjyf1',
  
  // 阀门链接
  '/valves/1',
  '/valve/65',
  '/valve/64',
  '/valve/63',
  '/valve/62',
  '/valve/61',
  '/valve/60',
  '/valve/59',
  '/valve/58',
  '/valve/57',
  '/valve/56',
  '/valve/88',
  
  // DCF相关链接
  '/dcf/ZSH',
  '/dcf/DFB-20_10',
  '/dcf/erweisantong',
  '/dcf/erweiertong',
  '/dcf/FNZS-zhidong',
  '/dcf/ZCT-wuyacha',
  '/dcf/KL-mopianshi',
  '/dcf/ZCBC',
  '/dcf/dcf386',
  '/dcf/24DHS%E4%BA%8C%E4%BD%8D%E5%9B%9B%E9%80%9A%E7%94%B5%E7%A3%81%E9%98%80',
  '/dcf/%E7%94%B5%E7%A3%81%E5%BC%8F%E7%85%A4%E6%B0%94%E5%AE%89%E5%85%A8%E5%88%87%E6%96%AD%E9%98%80',
  '/dcf/%E4%BA%8C%E4%BD%8D%E4%BA%94%E9%80%9A%E7%94%B5%E7%A3%81%E9%98%80',
  '/dcf/ZCG%E5%9E%8B%E9%AB%98%E6%B8%A9%E7%94%B5%E7%A3%81%E9%98%80',
  '/dcf/ZCM-meiqidiancifa',
  '/dcf/ZCT-yetidiancifa',
  '/dcf/JO11SA-buxiugangdiancifa',
  '/dcf/DMF-Z-maichongdiancifa',
  '/dcf/LWGY-yetiwolunliuliangji',
  '/dcf/ZHP-gaoyadiancifa',
  '/dcf/LZNDB-dianciliuliangji',
  '/dcf/ZCA-zhenkongdiancifa',
  '/dcf/ZCZP-falandiancifa',
  '/dcf/GYZ-gaoyadiancifa',
  '/dcf/ZCS-shuiyong',
  '/dcf/dcf402',
  
  // ZXF相关的乱码链接
  '/zxf/%E5%A8%81%E8%B9%AD%E7%B6%85%E7%92%81%EF%BF%A0%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE',
  '/zxf/%E6%BE%B6%E6%A0%AC%E7%81%AA%E7%BB%BE%E5%BD%92%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE',
  '/zxf/%E9%8D%8F%EE%85%A1%EE%9D%97%E8%A4%B0%E3%88%A0%E5%94%B4%E6%BE%B6%E6%A0%A6%E7%AC%A3%E9%96%BD%E5%A0%9D%E7%80%B7%E9%97%83%E2%82%AC',
  '/zxf/%E7%BC%87%E5%BA%A2%E7%88%A3%E9%8D%97%E2%80%B3%EE%9A%9C%E9%96%BD%E5%A0%A5%E6%A6%BE',
  '/zxf/%E6%BE%B6%E6%A0%AC%E7%81%AA%E7%BB%BE%E5%BD%92%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE2',
  '/zxf/%E9%96%BD%E5%A0%9D%E7%80%B7%E9%97%83%E2%82%AC',
  '/zxf/%E9%8D%90%E5%91%AC%E7%AC%A3%E9%96%BD%E5%A0%9D%E7%80%B7%E9%97%83%E2%82%AC',
  '/zxf/%E7%BC%87%E5%BA%A2%E7%88%A3%E7%80%B5%E5%9C%AD%E5%89%A8%E9%96%BD%E5%A0%A5%E6%A6%BE',
  '/zxf/%E9%8D%99%E6%A0%A5%E5%B8%87%E9%8E%B4%EE%81%85%EE%84%9B%E9%97%83%E2%82%AC',
  '/zxf/%E5%A8%89%E6%9B%9E%E5%8F%9E%E9%8E%B4%EE%81%85%EE%84%9B%E9%97%83%E2%82%AC',
  '/zxf/%E6%BE%B6%E6%B0%AC%E5%BD%9B%E7%92%81%EF%BF%A0%E5%99%BA%E9%97%83%E2%82%AC',
  '/zxf/%E7%91%99%E6%8E%91%E7%B4%A1%E9%96%BD%E5%A0%9D%E8%88%B0%E9%8E%B4%EE%81%85%EE%84%9B%E9%97%83%E2%82%AC',
  '/zxf/%E9%8D%90%E5%91%B0%E7%81%AA%E7%BB%BE%E5%BD%92%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE-%E9%8F%8D%E5%9B%A7%E5%99%AF%E9%8D%A8%EF%BF%BD',
  '/zxf/%E9%8D%90%E5%91%B0%E7%81%AA%E7%BB%BE%E5%BD%92%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE-%E9%8E%B5%E5%AC%AD%E7%96%86',
  '/zxf/%E9%8D%90%E5%91%B0%E7%81%AA%E7%BB%BE%E5%BD%92%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE-%E9%8E%B5%E5%AC%AB%E7%84%BA',
  '/zxf/%E9%8E%B5%E6%8C%8E%E5%BD%83%E9%90%92%E5%A9%83%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE',
  '/zxf/%E9%8D%97%E2%80%B3%EE%9A%9C%E5%AF%AE%E5%BF%9B%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE',
  '/zxf/%E9%8D%90%E5%91%AD%EE%98%BB%E6%B6%93%E6%BF%8B%E6%8B%A1%E8%A4%B0%E3%88%A1%E5%9F%85%E5%A7%9D%E3%88%A4%E6%A6%BE'
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

// 处理单个文件
function fixLinksInFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    let changesCount = 0;
    
    // 逐个匹配和替换每个死链接
    moreDeadLinks.forEach(deadLink => {
      // 创建正则表达式，匹配 [任意文本](deadLink) 格式
      const pattern = new RegExp(`\\[([^\\]]+)\\]\\(${deadLink.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
      const matches = newContent.match(pattern);
      if (matches) {
        newContent = newContent.replace(pattern, '[$1](#)');
        changesCount += matches.length;
      }
    });
    
    // 如果有变化，写入文件
    if (changesCount > 0) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ ${path.relative(__dirname, filePath)}: 修复了 ${changesCount} 个死链接`);
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
  console.log('🔍 开始扫描和修复剩余的死链接...\n');
  
  const docsPath = path.join(__dirname, 'docs');
  const files = getMarkdownFiles(docsPath);
  console.log(`📁 找到 ${files.length} 个 Markdown 文件\n`);
  
  let totalFixed = 0;
  let filesModified = 0;
  
  files.forEach(file => {
    const fixed = fixLinksInFile(file);
    if (fixed > 0) {
      totalFixed += fixed;
      filesModified++;
    }
  });
  
  console.log(`\n🎉 处理完成！`);
  console.log(`📊 统计信息:`);
  console.log(`   - 修改文件数: ${filesModified}`);
  console.log(`   - 修复链接数: ${totalFixed}`);
}

main();
