const fs = require('fs');
const path = require('path');

/**
 * 递归遍历目录，获取所有.md文件
 */
function getAllMarkdownFiles(dir, files = []) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            getAllMarkdownFiles(fullPath, files);
        } else if (item.endsWith('.md')) {
            files.push({
                path: fullPath,
                filename: item,
                mtime: stat.mtime
            });
        }
    }
    
    return files;
}

/**
 * 检查文件是否包含图片
 */
function hasImages(content) {
    // 检查markdown图片语法 ![alt](src) 和 HTML img标签
    const imageRegex = /!\[.*?\]\(.*?\)|<img[^>]+>/i;
    return imageRegex.test(content);
}

/**
 * 清理文本中的markdown格式
 */
function cleanMarkdownFormat(text) {
    return text
        // 移除粗体格式 **text** 和 __text__
        .replace(/\*\*(.*?)\*\*/g, '$1')
        .replace(/__(.*?)__/g, '$1')
        // 移除斜体格式 *text* 和 _text_
        .replace(/\*(.*?)\*/g, '$1')
        .replace(/_(.*?)_/g, '$1')
        // 移除代码格式 `text`
        .replace(/`(.*?)`/g, '$1')
        // 移除链接格式 [text](url)
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        // 移除删除线格式 ~~text~~
        .replace(/~~(.*?)~~/g, '$1')
        // 移除HTML标签
        .replace(/<[^>]*>/g, '')
        // 清理多余的空格
        .replace(/\s+/g, ' ')
        .trim();
}

/**
 * 从markdown内容中提取标题
 */
function extractTitle(content, filename) {
    console.log(filename)
    if (filename !== 'index.md') {
        // 如果不是index.md，使用文件名（去掉.md扩展名）
        return cleanMarkdownFormat(path.basename(filename, '.md'));
    }
    
    // 如果是index.md，从内容中提取标题
    const lines = content.split('\n');
    
    // 跳过vitepress frontmatter（YAML格式的元数据）
    let startIndex = 0;
    if (lines[0] === '---') {
        for (let i = 1; i < lines.length; i++) {
            if (lines[i] === '---') {
                startIndex = i + 1;
                break;
            }
        }
    }
    
    // 从非vitepress格式起始处寻找第一个标题或文本
    for (let i = startIndex; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line) {
            // 如果是标题，提取标题内容
            if (line.startsWith('#')) {
                return cleanMarkdownFormat(line.replace(/^#+\s*/, ''));
            }
            // 如果是普通文本，直接返回
            if (!line.startsWith('<') && !line.startsWith('![')) {
                return cleanMarkdownFormat(line);
            }
        }
    }
    
    return 'Untitled';
}

/**
 * 从markdown内容中提取图片
 */
function extractImages(content) {
    const images = [];
    
    // 匹配 ![alt](src) 格式的图片
    const markdownImageRegex = /!\[.*?\]\((.*?)\)/g;
    let match;
    while ((match = markdownImageRegex.exec(content)) !== null) {
        images.push(match[1]);
    }
    
    // 匹配 HTML img 标签
    const htmlImageRegex = /<img[^>]+src="([^"]+)"/gi;
    while ((match = htmlImageRegex.exec(content)) !== null) {
        images.push(match[1]);
    }
    
    return images;
}

/**
 * 获取父级文件夹名称
 */
function getParentFolderName(filePath, filename) {
    const dir = path.dirname(filePath);
    
    if (filename === 'index.md') {
        // 如果是index.md，获取父级的父级
        const parentDir = path.dirname(dir);
        return path.basename(parentDir);
    } else {
        // 否则获取直接父级
        return path.basename(dir);
    }
}

/**
 * 主函数：生成数据
 */
function generateData() {
    console.log('开始生成数据...');
    
    const docsDir = path.join(__dirname, 'docs/products');
    
    if (!fs.existsSync(docsDir)) {
        console.error('docs 目录不存在');
        return;
    }
    
    // 获取所有markdown文件
    const allFiles = getAllMarkdownFiles(docsDir);
    console.log(`找到 ${allFiles.length} 个markdown文件`);
    
    // 筛选包含图片的文件并处理数据
    const validFiles = [];
    
    for (const file of allFiles) {
        try {
            const content = fs.readFileSync(file.path, 'utf-8');
            
            if (hasImages(content)) {
                const title = extractTitle(content, file.filename);
                const images = extractImages(content);
                const parentFolder = getParentFolderName(file.path, file.filename);
                
                validFiles.push({
                    title,
                    images,
                    parentFolder,
                    mtime: file.mtime,
                    filePath: file.path.replace(__dirname + '/', '') // 相对路径
                });
            }
        } catch (error) {
            console.error(`处理文件 ${file.path} 时出错:`, error.message);
        }
    }
    
    console.log(`找到 ${validFiles.length} 个包含图片的文件`);
    
    // 按修改时间排序（最新的在前）
    validFiles.sort((a, b) => b.mtime - a.mtime);
    
    // 取前10条
    const result = validFiles.slice(0, 10).map(file => ({
        title: file.title,
        images: file.images,
        parentFolder: file.parentFolder,
        lastModified: file.mtime.toISOString(),
        filePath: file.filePath
    }));
    
    // 保存为JSON文件
    const outputPath = path.join(__dirname, 'docs/public/generated-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf-8');
    
    console.log(`数据生成完成！共生成 ${result.length} 条数据`);
    console.log(`输出文件: ${outputPath}`);
    
    // 打印结果预览
    console.log('\n数据预览:');
    result.forEach((item, index) => {
        console.log(`${index + 1}. ${item.title} (${item.parentFolder}) - ${item.images.length} 张图片`);
    });
    
    return result;
}

// 如果直接运行此脚本
if (require.main === module) {
    generateData();
}

module.exports = generateData; 