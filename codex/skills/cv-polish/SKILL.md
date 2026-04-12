---
name: cv-polish
description: Use when the user asks to polish a CV or resume, improve a CV, tailor a resume, or optimize a CV. Based on the shared application profile, suggest revisions or produce rewrites for structure, phrasing, and target-program fit.
---

# CV 优化

## 前置检查

- 先读取 `../../memory.md`。
- 如果 `cv_profile_analyzed` 不是 `true`，或 `## CV Profile` 基本为空，先提示用户运行 `cv-analyze`，除非用户明确要求你直接从当前 CV 开始重建画像。

## 语言规则

- 支持 `zh`、`en`、`bilingual` 三种输出模式。
- 若用户明确指定输出语言或目标 CV 语言，优先遵循用户指定。
- 否则读取 `memory.md` 中的 `preferred_language`。
- 若仍无法判断，则默认跟随用户当前对话语言。
- 若用户要求 bilingual，优先输出主版本，并附简短对照说明，而不是把每一行都机械重复两次。

## 先补足关键信息

如以下信息缺失，直接用简短中文问题补齐：
- 目标项目 / 学校 / 学位
- 想突出哪 1 到 2 段经历
- 目标研究方向
- 期望输出语言

## 工作方式

1. 读取原始 CV：
   - 优先使用 `memory.md` 中记录的 `cv_file_path`
   - 若没有，再向用户确认路径
2. 按以下维度审视：
   - 结构顺序是否适合研究型申请
   - bullet 是否动词清晰、结果明确
   - 研究相关经历是否被放在足够靠前的位置
   - 是否缺少研究申请常见要素，如 publications、research experience、methods、technical stack
3. 结合目标项目做定向优化：
   - 强化和目标方向最相关的经历
   - 调整段落顺序
   - 增加必要关键词，但不凭空添加经历
4. 根据源文件类型决定交付方式：
   - 若是文本源文件，可直接编辑
   - 若是 PDF / DOCX 等不适合稳定直接改写的格式，默认给出逐段改写建议和可复制的新版本

## 输出要求

- 至少包含三部分：
  - 主要问题清单
  - 优化后版本或逐段改写建议
  - 为什么这些修改更适合研究申请

## 约束

- 不要把普通工业经历硬包装成虚假的研究经历。
- 不要为了“好看”删除对申请判断有价值的硬信息。
- 若用户给了明确 target，就按 target 优先，而不是做泛化简历优化。
