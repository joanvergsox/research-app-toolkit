---
name: interview-prep
description: Use when the user asks to prepare for an interview, run a mock interview, practice interview questions, or get ready for a graduate application interview. Generate question sets, simulate Q&A, and provide feedback around the target supervisor, program, and the user's own experience.
---

# 面试准备

## 前置检查

- 先读取 `../../memory.md`。
- 若申请画像缺失，先提示用户运行 `cv-analyze`，因为问题设计需要依赖用户经历。

## 语言规则

- 支持 `zh`、`en`、`bilingual` 三种输出模式。
- 若用户明确指定面试语言，优先遵循当前请求。
- 否则读取 `memory.md` 中的 `preferred_language`。
- 若仍无法判断，则优先按照目标项目或导师最可能使用的面试语言准备。
- 若用户要求 bilingual，默认题目按目标面试语言输出，并补充中文或英文答题提示，而不是双语重复整套题库。

## 先明确面试对象

若缺失则补问：
- 教授姓名
- 学校 / 项目
- 面试语言
- 更想练习完整 mock，还是只要题库和参考答案

## 准备流程

1. 检索目标导师和项目：
   - 导师主页与近年工作
   - 项目面试形式或公开经验
2. 结合用户背景生成问题集，至少覆盖：
   - 研究背景
   - 技术深挖
   - 动机与长期目标
   - 行为类
   - 项目深挖
3. 如果用户要 mock interview：
   - 一次只出一道题
   - 等用户回答后再点评

## 输出要求

- 若用户只要题库：
  - 给分类题目
  - 给每类答题建议
- 若用户要模拟：
  - 逐题推进
  - 每题反馈包含优点、问题、优化方向

## 约束

- 导师研究与项目流程优先看当前公开信息。
- 不要把网上不确定的学生经验当成官方规则。
