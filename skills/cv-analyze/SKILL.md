---
name: CV Analysis
description: This skill should be used when the user asks to "analyze my CV", "extract CV profile", "review my resume", "parse my CV", or runs /ra:cv-analyze. It reads a CV/resume and produces a structured capability profile stored in .local.md for other skills to reference.
---

### CV File Discovery

To locate the CV file, check in this order:
1. Read `${CLAUDE_PLUGIN_ROOT}/.local.md` and check `cv_file_path` in frontmatter
2. Search current working directory for files matching `*CV*`, `*cv*`, `*resume*`, `*Resume*` (use Glob)
3. If not found, prompt: "未找到 CV 文件。请提供 CV 文件路径，或将 CV 放在当前工作目录下。其他功能需要先完成 CV 分析。"

### CV Content Extraction

After locating the CV file, extract content using the appropriate method based on file type:

**For PDF files**, use a three-level fallback:

1. **Read tool** (primary): Use the Read tool directly to read the PDF. This works for most PDFs natively.
2. **PyPDF2** (fallback): If Read fails or returns incomplete content, try extracting text via Python:
   ```bash
   python3 -c "import PyPDF2; reader = PyPDF2.PdfReader(open('FILE_PATH','rb')); print('\n'.join([p.extract_text() or '' for p in reader.pages]))"
   ```
   If PyPDF2 is not installed, skip to next fallback.
3. **textutil** (last resort): On macOS, use the built-in textutil:
   ```bash
   textutil -convert txt -stdout "FILE_PATH"
   ```

**For DOCX files**:
- Use textutil (macOS built-in): `textutil -convert txt -stdout "FILE_PATH"`
- Or use python3 with python-docx if textutil output is insufficient

### CV Analysis Process

After extracting the CV content:
2. Extract and categorize:
   - **Education**: degrees, institutions, dates, grades (note: do NOT judge grades, just record them)
   - **Technical Skills**: programming languages, frameworks, tools
   - **Project Experience**: name, description, technologies used, achievements — flag which projects are most relevant to research applications
   - **Work Experience**: job titles, companies, responsibilities
   - **Internships**: similar to work experience
   - **Awards & Honors**: competitions, scholarships, hackathons
   - **Teaching Experience**: courses taught, role (TA/instructor)
   - **Publications**: papers, venues (if any)
3. Evaluate for research application relevance:
   - **Strengths**: experiences, skills, and achievements that strengthen a research degree application
   - **Areas for Improvement**: gaps that could be addressed (no publications, low grades, etc.) — note these objectively without judgment
   - **Packaging Opportunities**: experiences that could be framed more strongly for applications

### Output

Write the structured profile to `${CLAUDE_PLUGIN_ROOT}/.local.md`:
- Set `cv_profile_analyzed: true` in frontmatter
- Set `cv_file_path` in frontmatter if not already set
- Populate the `## CV Profile` markdown section with all extracted information
- Use clear headers and bullet points

After writing, present a summary to the user highlighting:
- Top 3 strengths for research applications
- Key experiences that connect to potential research directions
- Any notable packaging opportunities

### Important Notes
- Never judge or comment negatively on grades — they are factual data
- Focus on identifying connections between experience and research potential
- The output must be structured enough for other skills (cold-email, professor-match, etc.) to reference programmatically
- Support both English and Chinese CVs
