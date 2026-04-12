---
name: cv-analyze
description: Use when the user asks to analyze a CV or resume, extract an applicant profile, review a resume, or parse a CV. Read the user's CV or resume, produce a structured research application profile, and write it to the shared memory file for reuse by other application skills.
---

# CV 画像分析

## 共享状态

- 共享记忆文件位于 `../../memory.md`。
- 开始时先读取该文件；若不存在则创建同结构模板。
- 画像分析完成后，重写整个 `memory.md`，并把 frontmatter 中的 `cv_profile_analyzed` 设为 `true`。

## 语言规则

- 支持 `zh`、`en`、`bilingual` 三种输出模式。
- 若用户当前消息明确指定语言，优先遵循当前消息。
- 否则读取 `memory.md` 中的 `preferred_language`。
- 若仍无法判断，则跟随用户当前对话语言。
- `memory.md` 的章节标题保持固定英文结构，章节内容可按选定语言填写。

## 执行流程

1. 确认 CV 文件路径：
   - 先读 `memory.md` frontmatter 中的 `cv_file_path`。
   - 若为空，再在当前工作目录用 `rg --files` 查找 `cv`、`CV`、`resume`、`Resume` 相关文件。
   - 仍找不到时，直接用中文向用户要一个明确路径。
2. 读取 CV 内容：
   - PDF 优先尝试命令行提取，如 `pdftotext`。
   - macOS 可回退到 `textutil -convert txt -stdout`。
   - 再不行时用 Python 库做兜底提取。
   - DOCX 优先用 `textutil`，必要时再用 Python。
3. 提取并整理以下信息：
   - 教育背景
   - 技术技能
   - 研究相关项目与经历
   - 工作 / 实习经历
   - 奖项荣誉
   - 论文 / 输出
4. 在此基础上给出：
   - `Strengths for Applications`
   - `Areas for Improvement`
   - `Packaging Opportunities`
5. 把结果写回 `../../memory.md`：
   - 更新 `cv_file_path`
   - 更新 `cv_profile_analyzed`
   - 规范整理所有章节，不要只在文末追加

## 输出要求

- 向用户汇报时，优先给出：
  - 3 个最强申请优势
  - 最能连接研究方向的经历
  - 2 到 3 个可包装增强点

## 约束

- 对成绩和短板只做客观记录，不做情绪化评价。
- 不臆造论文、奖项、项目或研究经历。
- 如果 CV 内容不完整或提取失败，先明确缺失项，再继续。
