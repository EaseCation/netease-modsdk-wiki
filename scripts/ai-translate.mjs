import fs from 'fs/promises';
import path from 'path';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { fileURLToPath } from 'url';
import { createInterface } from 'readline';

// 加载环境变量
dotenv.config();

// 检查环境变量是否存在
const requiredEnvVars = ['OPENAI_API_KEY', 'OPENAI_BASE_URL', 'OPENAI_MODEL'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingEnvVars.length > 0) {
  console.error(`❌ 缺少必要的环境变量: ${missingEnvVars.join(', ')}`);
  console.error('请在.env文件中设置这些变量');
  process.exit(1);
}

// 初始化OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL
});

const model = process.env.OPENAI_MODEL || 'gpt-4-turbo';

// 获取命令行参数（相对路径）
const args = process.argv.slice(2);

if (args.length !== 1) {
  console.error('❌ 请提供要翻译的目录的相对路径');
  console.error('用法: node ai-translate.mjs <目录相对路径>');
  process.exit(1);
}

// 获取脚本所在目录的绝对路径
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
// 计算目标目录的绝对路径
const targetDir = path.resolve(scriptDir, '..', args[0]);

async function findMarkdownFiles(dir) {
  const files = [];
  
  // 检测文本是否包含中文的函数
  function containsChinese(text) {
    // 匹配中文字符的正则表达式
    const chineseRegex = /[\u4e00-\u9fa5]/;
    return chineseRegex.test(text);
  }
  
  async function traverse(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        await traverse(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
        try {
          // 读取文件内容
          const content = await fs.readFile(fullPath, 'utf-8');
          // 如果超过600行，跳过
          const lines = content.split('\n').length;
          if (lines > 600) {
            console.log(`⏭️  跳过超过600行的文件: ${path.relative(targetDir, fullPath)}`);
            continue;
          }
        
          // 如果文件不包含中文，则添加到待翻译列表
          if (!containsChinese(content)) {
            files.push(fullPath);
          } else {
            console.log(`⏭️  跳过已包含中文的文件: ${path.relative(targetDir, fullPath)}`);
          }
        } catch (error) {
          console.error(`❌ 读取文件 ${fullPath} 时出错:`, error.message);
        }
      }
    }
  }
  
  await traverse(dir);
  return files;
}
async function translateMarkdown(filePath) {
  try {
    console.log(`🔄 正在处理文件: ${path.relative(targetDir, filePath)}`);
    
    // 读取Markdown内容
    const content = await fs.readFile(filePath, 'utf-8');
    
    // 创建翻译提示
      const prompt = `你是一位专业的Minecraft基岩版文档翻译者，需要结合给出的原始英文文档，准确翻译为简体中文，保留所有的vitepress特性和组件。在翻译时，尽量保证概念传达的准确性，但是同时需要满足中文母语者的生活自然语序和语法和词语，阅读时需要尽量轻松和容易。
翻译要求：
- 包括头部的matter yml内容，也需要对应翻译。
- 在开头根据matter yml的title字段，添加h1大标题（如果没有的话就不用添加）
- 不需要翻译代码，但是需要翻译代码块中的注释。
- 部分在开发时遇到的专有词汇，需要考虑是否需要保留英文原文。比如：Tick、Component、Entity、Block、Item等
- <CodeHeader>组件需要被替换为另一种表达形式，使用::: code-group :::包裹（别忘了末尾的:::），例子：
::: code-group
\`\`\`json [原始CodeHeader的值]
xxx
\`\`\`
:::

以下为待翻译内容：
${content}`;

    console.log(`🧠 开始翻译，请耐心等待...`);
    
    // 使用OpenAI API进行流式翻译
    const stream = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "system",
          content: "你是一个专业的Markdown文档翻译助手，能够准确地将英文Markdown内容翻译成简体中文，同时保持原有格式和结构。"
        },
        {
          role: "user",
          content: prompt
        }
      ],
      stream: true,
      max_tokens: 8 * 1024,
      response_format: { type: "text" },
    });
    
    let translatedContent = '';
    let reasoningContent = '';
    
    for await (const chunk of stream) {
      // 提取思考过程和内容（如果有的话）
      const reasoning = chunk.choices[0]?.delta?.reasoning_content || '';
      const content = chunk.choices[0]?.delta?.content || '';
      
      if (reasoning) {
        process.stdout.write(reasoning);
        reasoningContent += reasoning;
      }
      
      if (content) {
        process.stdout.write(content);
        translatedContent += content;
      }
    }
    
    // 将翻译后的内容写入文件
    await fs.writeFile(filePath, translatedContent.trim(), 'utf-8');
    console.log(`\n✅ 文件翻译完成: ${path.relative(targetDir, filePath)}`);
    
    return true;
  } catch (error) {
    console.error(`\n❌ 翻译 ${path.relative(targetDir, filePath)} 时出错:`);
    console.error(error.message);
    return false;
  }
}

async function promptForConfirmation(message) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => {
    rl.question(message, answer => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

async function main() {
  try {
    console.log(`🔍 正在扫描目录: ${targetDir}`);
    
    // 检查目录是否存在
    try {
      await fs.access(targetDir);
    } catch (error) {
      console.error(`❌ 指定的目录不存在: ${targetDir}`);
      process.exit(1);
    }
    
    // 查找所有Markdown文件
    const markdownFiles = await findMarkdownFiles(targetDir);
    
    if (markdownFiles.length === 0) {
      console.log(`⚠️ 在 ${targetDir} 中没有找到Markdown文件`);
      process.exit(0);
    }
    
    console.log(`🔎 找到 ${markdownFiles.length} 个Markdown文件`);
    markdownFiles.forEach((file, index) => {
      console.log(`  ${index + 1}. ${path.relative(targetDir, file)}`);
    });
    
    // 请求确认
    const confirmed = await promptForConfirmation(`⚠️ 此操作将翻译并覆盖以上文件。确认继续吗? (y/n): `);
    
    if (!confirmed) {
      console.log('❌ 操作已取消');
      process.exit(0);
    }
    
    console.log('🚀 开始翻译...');
    
    // 逐个翻译文件
    let successful = 0;
    let failed = 0;
    
    for (let i = 0; i < markdownFiles.length; i++) {
      const file = markdownFiles[i];
      console.log(`\n[${i + 1}/${markdownFiles.length}] 处理文件: ${path.relative(targetDir, file)}`);
      
      const success = await translateMarkdown(file);
      
      if (success) {
        successful++;
      } else {
        failed++;
      }
    }
    
    console.log('\n📊 翻译统计:');
    console.log(`✅ 成功: ${successful} 个文件`);
    console.log(`❌ 失败: ${failed} 个文件`);
    
    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ 发生错误:');
    console.error(error);
    process.exit(1);
  }
}

// 通过node指令手动执行，因为需要带参数：node scripts/ai-translate.mjs <目录相对路径>
main();