---
name: Gap Analysis
description: This skill should be used when the user asks to "analyze research gaps", "find research gaps", "generate research ideas", "discover research opportunities", "analyze papers for gaps", or runs /ra:gap-analysis. It reads a collection of papers, identifies research gaps, and proposes novel research ideas.
---

# Research Gap Analysis

## 1. Prerequisite Check

Read `${CLAUDE_PLUGIN_ROOT}/.local.md`. Check if `cv_profile_analyzed` is `true` and the `## CV Profile` section is populated.

If `cv_profile_analyzed` is not `true` or the `## CV Profile` section is empty, output:

> **未检测到 CV 画像。** 请先运行 `/ra:cv-analyze` 分析你的 CV，其他功能依赖 CV 画像数据。

Output this message and stop immediately.

## 2. Personalization Mode

Ask the user: "是否需要个性化定制？会问你 4-5 个问题来生成更贴合你需求的结果。"

### If the user declines personalization

Use defaults based on the user's cv_profile and the papers provided. Skip to step 3.

### If the user accepts personalization

Ask the following 4-5 questions using AskUserQuestion:

1. **Specific research direction**: "你想聚焦在哪个具体的研究方向？"
2. **Technical capability scope**: "你的技术能力范围是什么？" (pre-fill suggested from cv_profile technical skills)
3. **Contribution type preference**: "你更偏好理论贡献还是应用贡献？" (theoretical / applied / both)
4. **Existing ideas**: "你已经有任何想法或假设吗？"
5. **Target publication venue**: "你的目标发表场所是哪里？" (e.g., CHI, SIGGRAPH, NeurIPS, CVPR, UIST, CSCW)

## 3. Paper Source Selection

First, ask the user whether they want to use Zotero:

"是否使用 Zotero 获取论文？（需要安装 Zotero 桌面端并配置 MCP 插件）"

### If the user chooses NOT to use Zotero

Only offer the folder path option:

Ask the user to provide a folder path containing PDF files. Then:
1. Use Glob to find all PDF files in the directory: `**/*.pdf`
2. List the found files and confirm with the user
3. Use each file path as input to the paper-reader agent

### If the user chooses to use Zotero

Offer both options:

Ask: "请提供论文来源：1. 文件夹路径（包含 PDF 文件的目录）2. Zotero 集合名称"

**Option A: Folder Path** — same as above

**Option B: Zotero Collection**
1. Use `zotero_get_collections` to find the collection key
2. Use `zotero_get_collection_items` with the collection key to list papers
3. Display the list and confirm with the user
4. Use each item key as input to the paper-reader agent

## 4. Parallel Paper Processing

Launch `paper-reader` Agent for each paper (up to 5 in parallel). Send a single message with multiple Agent tool calls, one per paper.

For each paper, pass:
- The paper identifier (file path or Zotero item key)
- Instruction to return the structured summary

Each paper-reader agent returns:

```
### [Paper Title]
**Authors**: [author list]
**Venue**: [conference/journal], **Year**: [year]

**Core Theoretical Contributions**:
- [contribution 1]
- [contribution 2]

**Core Experimental Contributions**:
- [experiment 1]
- [experiment 2]

**Methodology Significance**:
[Why is their approach important or novel?]

**Limitations**:
- [limitation 1]
- [limitation 2]
```

### Processing Strategy

- If there are more than 5 papers, process them in batches of 5
- Wait for each batch to complete before launching the next
- Collect all summaries before proceeding to cross-comparison

## 5. Cross-Comparison and Gap Identification

After collecting all paper summaries, perform a systematic cross-comparison to identify research gaps in four categories:

### 5.1 Methodological Gaps

- Approaches or methods not yet explored in this research area
- Combinations of existing methods that have not been tried
- New methodologies that could address limitations of current approaches
- Techniques from adjacent fields that could be transferred

### 5.2 Application Gaps

- Domains or contexts not yet covered by existing research
- Populations or user groups not studied
- Real-world scenarios not addressed
- Cross-cultural or cross-domain applications

### 5.3 Theoretical Limitations

- Unresolved questions or contradictions in the literature
- Assumptions that remain untested
- Theoretical frameworks that need extension or revision
- Foundational gaps in understanding

### 5.4 Technical Improvements

- Scalability limitations of current approaches
- Efficiency improvements (speed, resource usage)
- Accuracy or performance enhancements
- Robustness and generalizability improvements
- Integration or interoperability opportunities

## 6. Generate Research Ideas

Based on the identified gaps and the user's cv_profile, generate 3-5 research ideas. For each idea, provide:

### Idea Format

```
### Idea [N]: [Short Title]

**Research Question**:
[Clear, specific, and answerable research question]

**Proposed Methodology**:
[Step-by-step description of the approach, methods, and techniques to be used]

**Novelty Justification**:
[How this differs from existing work — reference specific papers and explain what gap this fills]

**Feasibility Assessment**:
- Based on your technical skills: [skill match assessment]
- Required resources: [datasets, equipment, participants, compute]
- Estimated timeline: [rough time estimate]
- Feasibility score: [High / Medium / Low]

**Potential Publication Venues**:
- Primary: [venue 1]
- Secondary: [venue 2]
```

### Feasibility Assessment Logic

Compare the required technical skills for each idea against the user's cv_profile:
- **High feasibility**: User has 80%+ of required skills
- **Medium feasibility**: User has 50-80% of required skills (identifiable skill gaps to fill)
- **Low feasibility**: User has <50% of required skills (significant preparation needed)

## 7. Present and Iterate

### Initial Presentation

1. Present the gap analysis summary (organized by the four gap categories)
2. Present all 3-5 research ideas with full details
3. Ask the user which ideas they find most interesting

### Iterative Refinement

Based on user feedback:
1. Refine selected ideas with more detail
2. Address concerns about feasibility
3. Suggest modifications or combinations of ideas
4. Help prioritize ideas based on user's goals and timeline

### Final Output

Provide a prioritized list with:
- Recommended primary research direction
- Backup options
- Immediate next steps (literature to read, skills to develop, experiments to pilot)
