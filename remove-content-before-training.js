#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

// 要查找的目标内容
const TARGET_LINE = '### 查找一种产品'

/**
 * 递归遍历目录获取所有 .md 文件
 * @param {string} dir 目录路径
 * @param {string[]} fileList 文件列表数组
 * @returns {string[]} 包含所有 .md 文件路径的数组
 */
function getAllMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // 递归遍历子目录
      getAllMarkdownFiles(filePath, fileList)
    } else if (path.extname(file).toLowerCase() === '.md') {
      // 只处理 .md 文件
      fileList.push(filePath)
    }
  })

  return fileList
}

/**
 * 处理单个 markdown 文件
 * @param {string} filePath 文件路径
 * @returns {boolean} 是否进行了修改
 */
function processMarkdownFile(filePath) {
  try {
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8')
    const lines = content.split('\n')

    // 查找目标行的位置
    let targetLineIndex = -1
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === TARGET_LINE) {
        targetLineIndex = i
        break
      }
    }

    // 如果找到了目标行
    if (targetLineIndex !== -1) {
      console.log(`✓ 在文件 ${filePath} 中找到目标内容，位于第 ${targetLineIndex + 1} 行`)

      // 删除目标行及其之后的所有内容
      const remainingLines = lines.slice(0, targetLineIndex)
      const newContent = remainingLines.join('\n')

      // 写回文件
      fs.writeFileSync(filePath, newContent, 'utf8')
      console.log(`✓ 已删除第 ${targetLineIndex + 1} 行及之后的所有内容`)

      return true
    } else {
      console.log(`- 文件 ${filePath} 中未找到目标内容`)
      return false
    }
  } catch (error) {
    console.error(`✗ 处理文件 ${filePath} 时出错:`, error.message)
    return false
  }
}

/**
 * 主函数
 */
function main() {
  const docsDir = path.join(__dirname, 'docs')

  // 检查 docs 目录是否存在
  if (!fs.existsSync(docsDir)) {
    console.error('✗ docs 目录不存在！')
    process.exit(1)
  }

  console.log('开始扫描 docs 目录下的所有 .md 文件...\n')

  // 获取所有 markdown 文件
  const markdownFiles = getAllMarkdownFiles(docsDir)
  console.log(`找到 ${markdownFiles.length} 个 .md 文件\n`)

  let modifiedCount = 0
  let processedCount = 0

  // 处理每个文件
  markdownFiles.forEach((filePath) => {
    processedCount++
    console.log(
      `[${processedCount}/${markdownFiles.length}] 正在处理: ${path.relative(docsDir, filePath)}`,
    )

    const wasModified = processMarkdownFile(filePath)
    if (wasModified) {
      modifiedCount++
    }

    console.log('') // 空行分隔
  })

  // 输出处理结果
  console.log('='.repeat(60))
  console.log(`处理完成！`)
  console.log(`总共处理了 ${processedCount} 个文件`)
  console.log(`修改了 ${modifiedCount} 个文件`)

  if (modifiedCount > 0) {
    console.log('\n⚠️  建议在提交更改之前检查修改的文件内容！')
  }
}

// 添加确认提示
function askForConfirmation() {
  const readline = require('readline')
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })

  console.log('⚠️  此脚本将删除包含目标内容的文件中该内容及其之后的所有内容（包括目标内容本身）')
  console.log(`⚠️  目标内容: "${TARGET_LINE}"`)
  console.log('⚠️  这个操作不可撤销！建议先备份重要文件。\n')

  rl.question('确定要继续吗？(y/N): ', (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      console.log('\n开始处理...\n')
      main()
    } else {
      console.log('操作已取消。')
    }
    rl.close()
  })
}

// 检查是否有 --force 参数跳过确认
if (process.argv.includes('--force')) {
  main()
} else {
  askForConfirmation()
}
