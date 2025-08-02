const fs = require('fs');
const path = require('path');

// 支持的图片文件扩展名
const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.bmp'];

// 获取所有图片文件
function getAllImageFiles(dir) {
    const images = [];
    
    function scanDirectory(currentDir) {
        const files = fs.readdirSync(currentDir);
        
        for (const file of files) {
            const fullPath = path.join(currentDir, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                scanDirectory(fullPath);
            } else {
                const ext = path.extname(file).toLowerCase();
                if (imageExtensions.includes(ext)) {
                    images.push({
                        fileName: file,
                        fullPath: fullPath,
                        relativePath: path.relative(process.cwd(), fullPath)
                    });
                }
            }
        }
    }
    
    if (fs.existsSync(dir)) {
        scanDirectory(dir);
    }
    
    return images;
}

// 获取所有markdown文件
function getAllMarkdownFiles(dir) {
    const markdownFiles = [];
    
    function scanDirectory(currentDir) {
        if (!fs.existsSync(currentDir)) return;
        
        const files = fs.readdirSync(currentDir);
        
        for (const file of files) {
            const fullPath = path.join(currentDir, file);
            const stat = fs.statSync(fullPath);
            
            if (stat.isDirectory()) {
                scanDirectory(fullPath);
            } else if (file.endsWith('.md')) {
                markdownFiles.push({
                    fileName: file,
                    fullPath: fullPath,
                    relativePath: path.relative(process.cwd(), fullPath)
                });
            }
        }
    }
    
    scanDirectory(dir);
    return markdownFiles;
}

// 检查字符串是否包含中文字符
function containsChinese(str) {
    return /[\u4e00-\u9fff]/.test(str);
}

// 检查图片是否在markdown文件中被引用
function checkImageUsage() {
    console.log('开始检查图片使用情况...');
    
    // 获取2022目录下的所有图片
    const imagesDir = path.join(__dirname, 'docs', 'public', '2022');
    const images = getAllImageFiles(imagesDir);
    console.log(`找到 ${images.length} 个图片文件`);
    
    // 获取所有markdown文件
    const docsDir = path.join(__dirname, 'docs');
    const markdownFiles = getAllMarkdownFiles(docsDir);
    console.log(`找到 ${markdownFiles.length} 个Markdown文件`);
    
    // 读取所有markdown文件内容
    const markdownContents = markdownFiles.map(mdFile => {
        try {
            const content = fs.readFileSync(mdFile.fullPath, 'utf8');
            return {
                ...mdFile,
                content: content
            };
        } catch (error) {
            console.warn(`无法读取文件 ${mdFile.relativePath}: ${error.message}`);
            return {
                ...mdFile,
                content: ''
            };
        }
    });
    
    // 检查每个图片是否被引用
    const results = {
        summary: {
            totalImages: images.length,
            totalMarkdownFiles: markdownFiles.length,
            usedImages: 0,
            unusedImages: 0,
            checkDate: new Date().toISOString()
        },
        imageUsage: [],
        unusedImages: []
    };
    
    images.forEach(image => {
        const usedIn = [];
        const fileName = image.fileName;
        
        // 准备搜索的文件名列表
        const searchNames = [fileName];
        
        // 如果文件名包含中文，添加URL编码版本
        if (containsChinese(fileName)) {
            const encodedName = encodeURIComponent(fileName);
            searchNames.push(encodedName);
            console.log(`中文文件名 ${fileName} 的URL编码版本: ${encodedName}`);
        }
        
        // 在所有markdown文件中搜索图片文件名（包括URL编码版本）
        markdownContents.forEach(mdFile => {
            for (const searchName of searchNames) {
                if (mdFile.content.includes(searchName)) {
                    // 避免重复添加同一个文件
                    const existingUsage = usedIn.find(usage => usage.file === mdFile.relativePath);
                    if (!existingUsage) {
                        usedIn.push({
                            file: mdFile.relativePath,
                            fileName: mdFile.fileName,
                            foundAs: searchName // 记录以什么形式找到的
                        });
                    }
                    break; // 找到一种形式就跳出循环
                }
            }
        });
        
        const imageInfo = {
            fileName: fileName,
            relativePath: image.relativePath,
            isUsed: usedIn.length > 0,
            usedIn: usedIn,
            hasChinese: containsChinese(fileName),
            searchNames: searchNames
        };
        
        results.imageUsage.push(imageInfo);
        
        if (usedIn.length > 0) {
            results.summary.usedImages++;
            const usageDetails = usedIn.map(usage => 
                usage.foundAs !== fileName ? `${usage.fileName}(as ${usage.foundAs})` : usage.fileName
            ).join(', ');
            console.log(`✓ ${fileName} 被使用在 ${usedIn.length} 个文件中: ${usageDetails}`);
        } else {
            results.summary.unusedImages++;
            results.unusedImages.push({
                fileName: fileName,
                relativePath: image.relativePath,
                hasChinese: containsChinese(fileName)
            });
            console.log(`✗ ${fileName} 未被使用`);
        }
    });
    
    // 保存结果到JSON文件
    const outputFile = path.join(__dirname, 'image-usage-report.json');
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2), 'utf8');
    
    console.log('\n=== 检查完成 ===');
    console.log(`总计图片: ${results.summary.totalImages}`);
    console.log(`已使用图片: ${results.summary.usedImages}`);
    console.log(`未使用图片: ${results.summary.unusedImages}`);
    console.log(`报告已保存到: ${outputFile}`);
    
    return results;
}

// 删除未使用的图片
function deleteUnusedImages(reportFilePath, dryRun = true) {
    console.log('开始删除未使用的图片...');
    
    // 检查报告文件是否存在
    if (!fs.existsSync(reportFilePath)) {
        console.error(`错误: 报告文件 ${reportFilePath} 不存在`);
        console.log('请先运行图片使用检查生成报告文件');
        return false;
    }
    
    try {
        // 读取报告文件
        const reportContent = fs.readFileSync(reportFilePath, 'utf8');
        const report = JSON.parse(reportContent);
        
        if (!report.unusedImages || !Array.isArray(report.unusedImages)) {
            console.error('错误: 报告文件格式不正确，找不到 unusedImages 数组');
            return false;
        }
        
        const unusedImages = report.unusedImages;
        console.log(`找到 ${unusedImages.length} 个未使用的图片文件`);
        
        if (unusedImages.length === 0) {
            console.log('没有需要删除的图片');
            return true;
        }
        
        // 显示删除模式
        if (dryRun) {
            console.log('\n=== 预览模式 (不会实际删除文件) ===');
        } else {
            console.log('\n=== 实际删除模式 ===');
        }
        
        let deletedCount = 0;
        let failedCount = 0;
        let totalSize = 0;
        const failedFiles = [];
        
        // 处理每个未使用的图片
        unusedImages.forEach((imageInfo, index) => {
            const filePath = imageInfo.relativePath;
            const absolutePath = path.resolve(filePath);
            
            try {
                // 检查文件是否存在
                if (!fs.existsSync(absolutePath)) {
                    console.log(`⚠️  文件不存在: ${filePath}`);
                    return;
                }
                
                // 获取文件大小
                const stats = fs.statSync(absolutePath);
                const fileSize = stats.size;
                totalSize += fileSize;
                
                if (dryRun) {
                    console.log(`[${index + 1}/${unusedImages.length}] 🔍 预览删除: ${filePath} (${formatFileSize(fileSize)})`);
                    deletedCount++;
                } else {
                    // 实际删除文件
                    fs.unlinkSync(absolutePath);
                    console.log(`[${index + 1}/${unusedImages.length}] ✅ 已删除: ${filePath} (${formatFileSize(fileSize)})`);
                    deletedCount++;
                }
            } catch (error) {
                console.error(`[${index + 1}/${unusedImages.length}] ❌ 删除失败: ${filePath} - ${error.message}`);
                failedFiles.push({
                    file: filePath,
                    error: error.message
                });
                failedCount++;
            }
        });
        
        // 显示删除结果统计
        console.log('\n=== 删除结果统计 ===');
        if (dryRun) {
            console.log(`预览删除文件数: ${deletedCount}`);
        } else {
            console.log(`成功删除文件数: ${deletedCount}`);
        }
        console.log(`失败文件数: ${failedCount}`);
        console.log(`总文件大小: ${formatFileSize(totalSize)}`);
        
        if (failedFiles.length > 0) {
            console.log('\n=== 删除失败的文件 ===');
            failedFiles.forEach(item => {
                console.log(`${item.file}: ${item.error}`);
            });
        }
        
        // 保存删除记录
        const deleteRecord = {
            deleteDate: new Date().toISOString(),
            dryRun: dryRun,
            totalFiles: unusedImages.length,
            deletedCount: deletedCount,
            failedCount: failedCount,
            totalSize: totalSize,
            failedFiles: failedFiles,
            reportFile: reportFilePath
        };
        
        const recordFileName = dryRun ? 'delete-preview-record.json' : 'delete-record.json';
        const recordFilePath = path.join(__dirname, recordFileName);
        fs.writeFileSync(recordFilePath, JSON.stringify(deleteRecord, null, 2), 'utf8');
        console.log(`\n删除记录已保存到: ${recordFilePath}`);
        
        return deletedCount > 0;
        
    } catch (error) {
        console.error(`处理报告文件时出错: ${error.message}`);
        return false;
    }
}

// 格式化文件大小显示
function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// 交互式删除确认
function deleteUnusedImagesWithConfirmation(reportFilePath) {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    console.log('⚠️  警告: 即将删除未使用的图片文件！');
    console.log('建议先运行预览模式查看要删除的文件列表');
    console.log('');
    
    rl.question('请选择操作:\n1. 预览模式 (查看要删除的文件，不实际删除)\n2. 实际删除\n3. 取消\n请输入选项 (1/2/3): ', (answer) => {
        switch (answer.trim()) {
            case '1':
                console.log('\n开始预览模式...');
                deleteUnusedImages(reportFilePath, true);
                break;
            case '2':
                rl.question('\n确认要删除所有未使用的图片吗？此操作不可恢复！\n输入 "YES" 确认删除: ', (confirmation) => {
                    if (confirmation === 'YES') {
                        console.log('\n开始删除文件...');
                        deleteUnusedImages(reportFilePath, false);
                    } else {
                        console.log('操作已取消');
                    }
                    rl.close();
                });
                break;
            case '3':
                console.log('操作已取消');
                rl.close();
                break;
            default:
                console.log('无效选项，操作已取消');
                rl.close();
                break;
        }
        
        if (answer.trim() === '1') {
            rl.close();
        }
    });
}

// 命令行参数处理
function handleCommandLineArgs() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        // 默认运行检查
        checkImageUsage();
        return;
    }
    
    const command = args[0];
    
    switch (command) {
        case 'check':
            checkImageUsage();
            break;
        case 'delete':
            const reportFile = args[1] || path.join(__dirname, 'image-usage-report.json');
            deleteUnusedImagesWithConfirmation(reportFile);
            break;
        case 'delete-preview':
            const previewReportFile = args[1] || path.join(__dirname, 'image-usage-report.json');
            deleteUnusedImages(previewReportFile, true);
            break;
        case 'delete-force':
            const forceReportFile = args[1] || path.join(__dirname, 'image-usage-report.json');
            console.log('⚠️  强制删除模式 - 跳过确认');
            deleteUnusedImages(forceReportFile, false);
            break;
        case 'help':
        case '--help':
        case '-h':
            console.log(`
图片使用检查和清理工具

用法:
  node check-image-usage.js [command] [options]

命令:
  check                检查图片使用情况并生成报告 (默认)
  delete [reportFile]  交互式删除未使用的图片
  delete-preview [reportFile]  预览要删除的图片（不实际删除）
  delete-force [reportFile]    强制删除未使用的图片（跳过确认）
  help                 显示此帮助信息

参数:
  reportFile          报告文件路径 (默认: ./image-usage-report.json)

示例:
  node check-image-usage.js                    # 检查图片使用情况
  node check-image-usage.js delete             # 交互式删除
  node check-image-usage.js delete-preview     # 预览要删除的文件
  node check-image-usage.js delete-force       # 强制删除
            `);
            break;
        default:
            console.error(`未知命令: ${command}`);
            console.log('使用 "node check-image-usage.js help" 查看帮助信息');
            break;
    }
}

// 运行主程序
if (require.main === module) {
    handleCommandLineArgs();
}

module.exports = { 
    checkImageUsage, 
    getAllImageFiles, 
    getAllMarkdownFiles,
    deleteUnusedImages,
    deleteUnusedImagesWithConfirmation 
};
