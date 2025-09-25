const fs = require('fs');
const path = require('path');

// 要添加的 YAML 配置
const yamlToAdd = {
  sidebar: false,
  aside: false,
  outline: false
};

// 读取列表页面.txt文件获取路径列表
function getPathList() {
  const filePath = path.join(__dirname, '列表页面.txt');
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return content
      .split('\n')
      .filter(line => line.trim() !== '')
      .map(line => line.trim());
  } catch (error) {
    console.error('读取列表页面.txt失败:', error.message);
    return [];
  }
}

// 解析 markdown 文件的 front matter
function parseFrontMatter(content) {
  const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = content.match(frontMatterRegex);
  
  if (!match) {
    // 如果没有 front matter，创建一个
    return {
      frontMatter: {},
      body: content,
      hasFrontMatter: false
    };
  }

  const frontMatterText = match[1];
  const body = match[2];
  
  // 简单解析 YAML（处理基本的键值对）
  const frontMatter = {};
  const lines = frontMatterText.split('\n');
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine === '' || trimmedLine.startsWith('#')) continue;
    
    // 处理数组类型（如 imgs）
    if (trimmedLine.startsWith('- ')) {
      continue; // 跳过数组项，由上一个键处理
    }
    
    // 处理键值对
    const colonIndex = trimmedLine.indexOf(':');
    if (colonIndex > 0) {
      const key = trimmedLine.substring(0, colonIndex).trim();
      const value = trimmedLine.substring(colonIndex + 1).trim();
      
      // 检查下一行是否是数组
      const currentIndex = lines.indexOf(line);
      const nextLine = lines[currentIndex + 1];
      if (nextLine && nextLine.trim().startsWith('- ')) {
        // 处理数组
        const arrayItems = [];
        for (let i = currentIndex + 1; i < lines.length; i++) {
          const arrayLine = lines[i].trim();
          if (arrayLine.startsWith('- ')) {
            arrayItems.push(arrayLine.substring(2).trim());
          } else if (arrayLine === '') {
            continue;
          } else {
            break;
          }
        }
        frontMatter[key] = arrayItems;
      } else {
        // 处理普通值
        if (value === 'true') frontMatter[key] = true;
        else if (value === 'false') frontMatter[key] = false;
        else if (value === '') frontMatter[key] = '';
        else frontMatter[key] = value;
      }
    }
  }
  
  return {
    frontMatter,
    body,
    hasFrontMatter: true,
    originalFrontMatterText: frontMatterText
  };
}

// 生成 YAML front matter 文本
function generateFrontMatter(frontMatter) {
  const lines = [];
  
  for (const [key, value] of Object.entries(frontMatter)) {
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`  - ${item}`);
      }
    } else {
      lines.push(`${key}: ${value}`);
    }
  }
  
  return lines.join('\n');
}

// 更新单个文件
function updateFile(filePath) {
  const fullPath = path.join(__dirname, 'docs', filePath);
  
  try {
    // 检查文件是否存在
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  文件不存在: ${filePath}`);
      return false;
    }

    // 读取文件内容
    const content = fs.readFileSync(fullPath, 'utf-8');
    const parsed = parseFrontMatter(content);
    
    // 检查是否需要添加配置
    let needsUpdate = false;
    for (const [key, value] of Object.entries(yamlToAdd)) {
      if (!(key in parsed.frontMatter) || parsed.frontMatter[key] !== value) {
        parsed.frontMatter[key] = value;
        needsUpdate = true;
      }
    }
    
    if (!needsUpdate) {
      console.log(`✅ 已存在配置: ${filePath}`);
      return false;
    }
    
    // 生成新的文件内容
    const newFrontMatter = generateFrontMatter(parsed.frontMatter);
    const newContent = `---\n${newFrontMatter}\n---\n\n${parsed.body}`;
    
    // 写入文件
    fs.writeFileSync(fullPath, newContent, 'utf-8');
    console.log(`✅ 已更新: ${filePath}`);
    return true;
    
  } catch (error) {
    console.error(`❌ 处理文件失败 ${filePath}:`, error.message);
    return false;
  }
}

// 主函数
function main() {
  console.log('开始更新 markdown 文件的 YAML front matter...\n');
  
  const pathList = getPathList();
  if (pathList.length === 0) {
    console.log('❌ 没有找到要处理的文件路径');
    return;
  }
  
  console.log(`📝 找到 ${pathList.length} 个文件路径\n`);
  
  let updatedCount = 0;
  let existingCount = 0;
  let errorCount = 0;
  
  for (const filePath of pathList) {
    const result = updateFile(filePath);
    if (result === true) {
      updatedCount++;
    } else if (result === false) {
      // 检查文件是否存在来区分已存在配置还是文件不存在
      const fullPath = path.join(__dirname, 'docs', filePath);
      if (fs.existsSync(fullPath)) {
        existingCount++;
      } else {
        errorCount++;
      }
    } else {
      errorCount++;
    }
  }
  
  console.log('\n📊 处理结果统计:');
  console.log(`✅ 成功更新: ${updatedCount} 个文件`);
  console.log(`ℹ️  已存在配置: ${existingCount} 个文件`);
  console.log(`❌ 处理失败: ${errorCount} 个文件`);
  console.log(`📝 总计: ${pathList.length} 个文件`);
}

// 运行脚本
if (require.main === module) {
  main();
}

module.exports = { updateFile, parseFrontMatter, generateFrontMatter };
