---
name: interview-ppt
description: 当用户要求制作 PhD 面试 PPT、导师面谈 slides、research presentation deck、逐页 speaking notes，或希望把项目材料重组为适合面谈的幻灯片时使用。该 skill 负责把 CV、项目文档与导师匹配信息组织成简洁的学术展示内容。
---

# 面试 PPT 组织

## 前置检查

- 先读取 `../../memory.md`。
- 若 `cv_profile_analyzed` 未完成，但用户在当前对话中已经提供了足够材料，则直接继续，不要强制阻塞。
- 若缺少项目文档、目标导师或目标场景，优先补齐最少必要信息。

## 语言规则

- 支持 `zh`、`en`、`bilingual` 三种输出模式。
- 若用户明确要求英文 slide content 或英文 speaking notes，优先遵循当前请求。
- 若未明确说明，则读取 `memory.md` 的 `preferred_language`。
- 若输出为 bilingual，默认 slide content 仍以目标展示语言为主，不重复整套双语内容。

## 先判断 deck mode

根据场景判断并收敛 deck 类型：

- `meeting`：套磁、初次见面、导师沟通
- `formal-interview`：PhD 面试、奖学金面试、panel interview
- `project-presentation`：重点讲 1 到 2 个项目

若用户未指定，默认按 `formal-interview` 处理。

## 执行流程

### 1. 先搭建整套 deck 策略

优先确认：

- 目标导师 / 项目
- 面试语言
- 最强的 2 到 4 段项目或经历
- 用户只要 slide content，还是还要 speaking notes / visuals

输出时优先组织为高信息密度、低冗余的学术面谈结构，而不是简历翻页。

常见页序：

- Who I Am
- Awards / Skills
- Research & Project Experience
- Teaching / Industry Experience
- Research Fit
- Potential PhD Directions
- Closing / Q&A

### 2. 把项目材料重构成面谈逻辑

不要机械沿用原始项目文档里的 background / aim / data / summary 结构。

优先重构成更适合面谈的形式，例如：

- Objective / Process / Outcome
- Problem / Method / Result
- Goal / Key Design / What I Learned

若用户希望更好讲，优先采用：

- 每个项目 2 个 objective
- 每个 objective 1 页
- 每页都讲清楚做了什么、怎么做、达到了什么结果

### 3. 生成 slide content

每页默认输出：

- slide title
- 可直接粘贴进 PPT 的英文 bullets
- 必要时补一句布局建议

风格要求：

- 学术化
- 简洁
- 便于口头表达

### 4. 生成 speaking notes

如果用户要口语稿，默认写短版英文讲解词：

- 每页约 20 到 40 秒
- 句子简单
- 适合导师面谈
- 避免过度修饰

### 5. 生成视觉建议

当页面需要图时，优先给：

- 适合的图类型
- image generation prompt
- 简单流程图 / 结构图建议

项目页优先考虑：

- 流程图
- 模块关系图
- 技术亮点图
- 场景概念图

## Research Fit 页

若用户要求和导师研究方向匹配的页面：

1. 先提炼导师研究主题
2. 再提炼用户背景中的自然连接点
3. 避免空泛夸赞
4. 要让“过去经历 -> 未来研究方向”的过渡自然成立

## Future Directions 页

若用户要求 future research interests：

- 不要只给关键词列表
- 优先输出 2 到 3 个 mini-proposals

每个方向尽量包含：

- 方向标题
- 简短问题定义
- possible methods

如果用户要求更短，可压缩成：

- 一行方向
- 一行 methods

## 输出优先级

按以下顺序输出高价值内容：

1. 整体 deck outline
2. 最终 slide 文案
3. speaking notes
4. visual suggestions

如果用户已经有现成 PPT，优先只改指定页面，而不是整套重做。

## 约束

- 不要把 PPT 写成长段文书。
- 不要把 CV 直接平移成 bullets。
- 不要虚构论文、方法、结果、数据集或导师兴趣。
- 涉及导师当前研究方向时，优先核对最新公开信息。
- 整套 deck 应偏面谈展示，而不是论文答辩风格。
