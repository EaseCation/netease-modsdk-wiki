---
title: 版本控制
mentions:
    - SirLich
    - sermah
---

# 版本控制

<!--@include: @/wiki/bedrock-wiki-mirror.md-->

版本控制的核心概念是定期备份代码迭代版本，以便在需要时回滚到特定版本。最基本的版本控制可以通过每天将附加包打包成`.zip`并上传到谷歌网盘实现。这并非不合理，但存在三个显著缺陷，而专业的版本控制系统（VCS）能够有效解决：

- 版本差异比对困难
- 实际回滚到旧版本操作繁琐
- 对团队协作毫无帮助

本教程将介绍`git`工具的基本使用方法，以及免费的在线git托管服务`GitHub`。任何人都可以跟随学习，但如果您身处团队协作环境或经常因忘记备份而丢失工作成果，将会获得最大收益。

本教程不会直接教授`git`或`GitHub`的基础操作，因为这些知识已有优质外部资源可供学习。重点将放在掌握基础后如何针对Minecraft项目进行工具配置。

## Git

`git`是安装在本地计算机上的版本管理工具，可对文件进行版本控制。您可以通过简短信息（例如"修复驯服后龙无法飞行的BUG"）提交（`commit`）文件变更，查看完整修改记录，并快速回滚到特定版本。

Git功能强大且是主流编程项目的标配工具。其应用于Minecraft开发的主要缺点是学习曲线陡峭。请保持耐心循序渐进。

完整的`git`学习请参考[git官方教程](https://www.atlassian.com/git/tutorials/what-is-git)。

## GitHub

GitHub是git项目（`repository`仓库）的在线托管平台，允许多人同时协作开发。这对于地图制作尤为实用。通过GitHub托管，您还可以选择将代码公开，更方便地向世界分享您的附加包。

完整的GitHub学习请参考[GitHub入门指南](https://guides.github.com/activities/hello-world/)。

## 术语自测

如果您已学习至此，希望您已注册GitHub账号并对`git`有初步了解。以下术语将在教程中使用，若不熟悉请自行查询：

- repository（仓库）
- branch（分支）
- commit（提交）
- github
- git

# Git环境配置

本节假设您要将已有项目加入git管理。新建项目的操作流程类似。

## 目录结构

在附加包开发中使用`git`的主要问题在于：git通常通过管理单个文件夹实现版本控制，而基岩版附加包资源分散在`BP`和`RP`两个文件夹。为解决此问题，我们将仓库完全置于`com.mojang`文件夹之外，使用Windows符号链接（`junctions`）实现文件夹映射。

将项目置于独立位置有以下优势：

- 可自由添加配置文件、工具、笔记、.bb文件等附加内容
- 可将RP和BP整合至同一仓库
- 所有项目可在统一位置查看，避免深埋于com.mojang目录中

## 创建Git仓库

为项目选择合适的位置。示例使用`C:/sirlich/projects`。新建以项目命名的文件夹，示例项目名为`wiki`。

右键点击文件夹选择`"Open git Bash"`。若未显示此选项，可通过开始菜单打开`git bash`并导航至项目目录。若未安装`git bash`请立即安装。

输入命令：`git init`。这将在项目中创建空白仓库。

## 链接现有RP和BP

接下来通过创建Windows符号链接让仓库识别您的RP和BP文件夹。符号链接相当于文件系统的虫洞，使文件看似同时存在于两个位置。删除/编辑/添加操作会实时同步。

输入命令：  
`mklink /J wiki_RP "C:/path/to/RP/in/com/mojang"`  
`mklink /J wiki_BP "C:/path/to/BP/in/com/mojang"`

完成后，项目文件夹中将出现`wiki_RP`和`wiki_BP`目录，包含所有现有资源文件。

此时可按照前述教程将仓库推送至`github`。

## 附加文件

由于我们通过符号链接创建仓库，可在项目文件夹中添加任意文件而不影响com.mojang目录。推荐追踪`.bb`文件、封面设计文件（如`.kra`格式）等。

您还可以添加笔记、视频文件等需要版本控制的任何内容。

## VCS使用规范

使用版本控制系统需牢记以下要点：

- 开始工作前务必先`pull`拉取最新版本
- 频繁`commit`提交并`push`推送
- 结束工作前必须`push`推送更改
- 若文件严重损坏，可随时重置到最近可用版本。经常提交/推送能最大限度减少损失
- 必须（强调）编写规范的提交信息，这在需要回滚时至关重要

::: code-group
```json [示例符号链接]
mklink /J demo_RP "C:/Users/Steve/AppData/Local/Packages/Microsoft.MinecraftUWP_8wekyb3d8bbwe/LocalState/games/com.mojang/development_resource_packs/demoRP"
``` 
:::