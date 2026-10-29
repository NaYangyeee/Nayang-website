import type { Project } from './types';

/**
 * Four projects, in the order a reader should meet them: the two production
 * systems first, then the pilot, then the personal one.
 *
 * Each is compressed hard from the résumé. The résumé lists five or six
 * bullet groups per project; a website that reproduces all of them is a
 * worse résumé, not a better site. What survives is the part only she can
 * claim — the specific thing she personally owned — plus the numbers.
 *
 * The 具身智能 entry keeps `stage: 'pilot'` and reports 阶段产出 rather than
 * results, because that is what the résumé says it is. It would read as more
 * impressive flattened into the other three, and would be a lie.
 */
export const projects: Project[] = [
  {
    id: 'medical-agent',
    title: { zh: '医疗智能体 Agent 系统', en: 'Hospital Triage Agent' },
    tagline: {
      zh: '语音进、多轮问、有出处地答 —— 而且绝不越界到诊断',
      en: 'Speech in, multi-turn intake, every answer sourced — and never a diagnosis',
    },
    period: '2024.12 — 至今',
    stage: 'production',
    context: {
      zh: '面向医院导诊、挂号后预问诊与科室流程咨询，构建语音输入、多轮对话、OCR 与 RAG 协作的医疗 Agent。按单院四台多交互终端联调，不同医院独立管理知识库、配置与模型服务。',
      en: 'A medical agent for hospital wayfinding, post-registration intake and department-process questions, combining speech input, multi-turn dialogue, OCR and RAG. Deployed across four interactive terminals per hospital, each site managing its own knowledge base, configuration and model services.',
    },
    contributions: [
      {
        zh: '业务状态与流程模块：任务路由、症状/既往史/过敏槽位更新、必问追问与停止条件。把漏问、重复追问、危险信息遗漏和越界回答都转成可回归用例，保留证据引用、信息不足澄清与转人工路径。',
        en: 'Dialogue state and flow: task routing, slot updates for symptoms, history and allergies, mandatory follow-ups and stop conditions. Missed questions, repeated prompts, omitted red-flag information and out-of-scope answers each became a regression case, with evidence citation, clarification-on-insufficient-information and hand-off-to-human paths preserved.',
      },
      {
        zh: '数据飞轮与版本管理：线上日志与用户反馈 → 人工修正 → 问题回归 → 质检入库 → 训练 → 闭集回归的完整闭环。按 ASR、OCR、检索、对话策略分流 bad case，按患者/会话/来源分组切分，减少跨集合泄漏。',
        en: 'A data flywheel with version control: production logs and user feedback → human correction → regression → QA ingest → training → closed-set regression. Bad cases routed by ASR, OCR, retrieval or dialogue policy; splits grouped by patient, session and source so nothing leaks across sets.',
      },
      {
        zh: 'ASR / OCR 专项 SFT：构建音频—转写对与图像—结构化字段数据。ASR 覆盖科室名、症状术语、口语表达与噪声样本；OCR 覆盖扫描报告、表格与字段抽取。分别跟踪 WER / CER、字段准确率及其对下游槽位与检索的影响。',
        en: 'Task-specific SFT for ASR and OCR: audio-transcript pairs and image-to-structured-field data. ASR coverage spans department names, clinical terms, colloquial phrasing and noisy samples; OCR covers scanned reports, tables and field extraction. WER/CER and field accuracy tracked separately, alongside their downstream effect on slots and retrieval.',
      },
      {
        zh: 'LLM SFT 与 DPO：围绕漏问、无证据回答、过度诊断和工具误用构建 chosen / rejected 对，在一致 prompt 与 observation 下比较筛选。配套 rubric + 规则 Verifier + LLM-as-Judge + 人工复核的四层评测，区分模型错误、环境失败与评判误差。',
        en: 'LLM SFT and DPO: chosen/rejected pairs built around missed questions, unsourced answers, over-diagnosis and tool misuse, compared under identical prompts and observations. Evaluation runs four layers — rubric, rule-based verifier, LLM-as-judge and human review — separating model error from environment failure from judge error.',
      },
    ],
    metrics: [
      {
        value: '0.58 → 0.71',
        label: { zh: '内部综合评测均分', en: 'Internal composite eval' },
        detail: { zh: '阶段性，固定病例集', en: 'Staged, fixed case set' },
        provenance: 'measured',
      },
      {
        value: '4',
        label: { zh: '单院交互终端', en: 'Terminals per hospital' },
        detail: { zh: '知识库与模型服务独立管理', en: 'Independent KB and model services' },
        provenance: 'spec',
      },
      {
        value: '4 层',
        label: { zh: '评测体系层级', en: 'Evaluation layers' },
        detail: { zh: 'rubric · Verifier · Judge · 人工', en: 'Rubric · verifier · judge · human' },
        provenance: 'spec',
      },
    ],
    tags: ['SFT', 'DPO', 'ASR', 'OCR', 'RAG', 'MCP', 'vLLM', 'FastAPI'],
  },

  {
    id: 'knowledge-agent',
    title: { zh: '企业内部知识查询 / 个人助理 Agent', en: 'Enterprise Knowledge & Assistant Agent' },
    tagline: {
      zh: '七到十轮的任务，断在第六轮也要能接着跑完',
      en: 'Seven-to-ten-turn tasks that finish even when turn six fails',
    },
    period: '2026.02 — 至今',
    stage: 'production',
    context: {
      zh: '服务多部门、数十名内部用户，覆盖报销制度查询、跨文档分析、业务工具调用与文档生成。典型复杂任务包含 7–10 轮模型与工具交互。个人负责 Harness 执行状态、MCP 接入、RAG 证据链与离线评测。',
      en: 'Serving several departments and dozens of internal users: expense-policy lookup, cross-document analysis, business tool invocation and document generation. A typical complex task runs 7–10 model/tool turns. Owns the harness execution state, MCP integration, the RAG evidence chain and offline evaluation.',
    },
    contributions: [
      {
        zh: '执行状态与恢复：基于 LangGraph 的 ReAct / Plan-and-Execute 执行图，以 task_id / thread_id 隔离任务。state 保存计划、当前步骤、evidence、tool observation、attempt 与终止状态，通过 checkpoint 与中间结果复用支持恢复；加入步骤预算、停止条件与无进展循环检查。',
        en: 'Execution state and recovery: a ReAct / Plan-and-Execute graph on LangGraph, with tasks isolated by task_id and thread_id. State holds the plan, current step, evidence, tool observations, attempt count and termination status; checkpoints and intermediate-result reuse make recovery possible. Step budgets, stop conditions and no-progress loop detection included.',
      },
      {
        zh: 'MCP 工具契约与选择：封装知识检索、业务查询、计算与文档生成工具，明确用途、适用边界、input/output Schema 与 structured result。区分协议异常、执行失败与业务拒绝；围绕相近工具与缺少用例优化选择、澄清与拒调用策略。',
        en: 'MCP tool contracts and selection: knowledge retrieval, business query, computation and document generation wrapped with explicit purpose, applicability boundaries, input/output schemas and structured results. Protocol errors, execution failures and business refusals are distinguished; selection, clarification and refusal strategies tuned around near-identical tools and missing cases.',
      },
      {
        zh: 'RAG 与知识更新：文档解析、章节与表格切分、Query Rewrite、BM25 + 向量混合召回与 Rerank。按部门权限、来源与版本组织检索；跨 2–3 份文档的任务补二次查询，分开评价证据召回与答案支持程度，定位检索缺失、旧版冲突与引用错误。',
        en: 'RAG and knowledge freshness: document parsing, section and table chunking, query rewriting, hybrid BM25-plus-vector recall and reranking. Retrieval organised by department permission, source and version; tasks spanning two or three documents trigger a second query. Evidence recall and answer support are scored separately, which is what localises a retrieval miss versus a stale-version conflict versus a citation error.',
      },
      {
        zh: '分层评测与回归：构建单工具、组合工具、多跳、长链路与异常场景 benchmark，按误选、参数错误、上下文丢失、错误停止与环境故障归因。真实故障沉淀为回放案例，修复轨迹回流训练数据。',
        en: 'Layered evaluation and regression: benchmarks for single tools, tool combinations, multi-hop, long-chain and failure scenarios, attributed by wrong selection, bad parameters, lost context, premature stop or environment fault. Real incidents become replay cases; repaired trajectories flow back into training data.',
      },
    ],
    metrics: [
      {
        value: '63% → 92%',
        label: { zh: '工具选择 Top-1 准确率', en: 'Tool selection, top-1' },
        detail: { zh: '内部评测集', en: 'Internal benchmark' },
        provenance: 'measured',
      },
      {
        value: '45% → 78%',
        label: { zh: '长链路任务成功率', en: 'Long-chain task success' },
        detail: { zh: '7–10 轮交互任务', en: '7–10 turn tasks' },
        provenance: 'measured',
      },
      {
        value: '4.1 → 3.0',
        label: { zh: '平均工具调用次数', en: 'Mean tool calls' },
        detail: { zh: '成功率上升的同时下降', en: 'Fell while success rose' },
        provenance: 'measured',
      },
    ],
    tags: ['LangGraph', 'MCP', 'RAG', 'Rerank', 'Trace', 'Checkpoint', 'benchmark'],
  },

  {
    id: 'embodied-pilot',
    title: { zh: '具身智能 Agent 与多机器人协作预演', en: 'Embodied Agent & Multi-Robot Pilot' },
    tagline: {
      zh: '把 Agent 调度接到真实机械臂之前，先把规范和评测定下来',
      en: 'Settling the specs and the evaluation before an agent touches a real arm',
    },
    period: '预演项目',
    stage: 'pilot',
    context: {
      zh: '与华中科技大学、武汉大学相关团队合作，依托现有 Dobot CR10A、相机与农业蔬果场景，预演 LLM + Harness 调度移动平台与机械臂协作。个人负责数据质量评估、机器人场景与路径预演，并设计 VLA 策略复现接入方案。',
      en: 'With teams at Huazhong University of Science and Technology and Wuhan University, using an existing Dobot CR10A, cameras and an agricultural produce setting, to pilot an LLM-plus-harness scheme coordinating a mobile platform and a manipulator. Owns data-quality assessment, scene and path pre-studies, and the design for integrating VLA policy reproduction.',
    },
    contributions: [
      {
        zh: '观测任务与仿真预演：围绕葡萄串多视角拍摄、目标定位与末端接近，配置 URDF / MoveIt 场景及相机—TCP—基座坐标关系；设计 180° / 360° 候选观测位、遮挡补拍与位姿扰动用例，检查可达性、关节限位与碰撞约束。',
        en: 'Observation tasks and simulation pilot: multi-view capture of grape clusters, target localisation and end-effector approach, with URDF / MoveIt scenes and camera-TCP-base frame relationships configured. Candidate 180° and 360° viewpoints, occlusion re-capture and pose-perturbation cases designed, then checked for reachability, joint limits and collision constraints.',
      },
      {
        zh: 'Episode 数据与质量评估：设计 instruction、图像/状态 observation、action 与 feedback 字段；按 episode 检查帧缺失、时间偏差、单位与角度制、轨迹与速度异常；建立自动质检与数据健康报告。',
        en: 'Episode data and quality assessment: schema for instruction, image and state observations, action and feedback. Per-episode checks for dropped frames, timing skew, unit and angle-convention mismatches, and trajectory or velocity anomalies, backed by automated QA and a data-health report.',
      },
      {
        zh: '设备工具与 Physical Verifier：设计 MCP 到 ROS2 / 厂商接口的状态查询、规划执行与拒绝工具，以 plan_id / request_id、坐标单位、deadline 与反馈状态约束调用；检查任务完成、碰撞、限位及执行超时，区分策略、规划、接口与安全拦截失败。',
        en: 'Device tooling and a physical verifier: MCP-to-ROS2 and vendor-interface tools for state query, plan execution and refusal, constrained by plan_id / request_id, coordinate units, deadlines and feedback state. Task completion, collision, joint limits and execution timeout are checked, separating policy, planning, interface and safety-stop failures.',
      },
    ],
    metrics: [
      {
        value: 'CR10A',
        label: { zh: '目标硬件', en: 'Target hardware' },
        detail: { zh: 'Dobot 协作机械臂 + 移动平台', en: 'Dobot collaborative arm + mobile base' },
        provenance: 'spec',
      },
      {
        value: '180° / 360°',
        label: { zh: '观测位采集模式', en: 'Viewpoint capture modes' },
        detail: { zh: '含遮挡补拍与位姿扰动', en: 'With occlusion re-capture' },
        provenance: 'spec',
      },
      {
        value: '阶段产出',
        label: { zh: '当前状态', en: 'Current status' },
        detail: { zh: '场景用例 · 轨迹规范 · 质量规则 · 接口方案', en: 'Cases, specs, QA rules, interfaces' },
        provenance: 'spec',
      },
    ],
    tags: ['ROS2', 'URDF / MoveIt', 'LIBERO', 'SmolVLA', 'LeRobot', 'MCP'],
  },

  {
    id: 'lilbot-cli',
    title: { zh: 'LilBot-Agent CLI 个人智能体', en: 'LilBot-Agent CLI' },
    tagline: {
      zh: '自己从零写一遍，才知道框架替你做了什么',
      en: 'Writing one from scratch is how you find out what the framework was doing for you',
    },
    period: '2025.07 — 2026.06',
    stage: 'personal',
    context: {
      zh: '参考 Claude Code、CodeWhale 的 CLI 交互与工具契约，结合 Hermes Agent 的 Skill / Memory 思路自行实现。个人侧重工具注册与调用、状态传递、可替换检索组件和测试，借助对照实现理解框架取舍与代码分层。',
      en: 'An agent CLI built from scratch, informed by the interaction model and tool contracts of Claude Code and CodeWhale and by the Skill / Memory design of Hermes Agent. Focused on tool registration and dispatch, state propagation, swappable retrieval components and tests — using a parallel implementation to understand what the frameworks trade away and how they layer their code.',
    },
    contributions: [
      {
        zh: '模块实现与框架对照：拆分 Tool Registry / Skill、执行节点、Memory 与评测入口，统一 CLI / Python 工具 Schema、参数校验与异常返回；对照框架的工具发现、上下文注入与循环终止方式。',
        en: 'Module implementation against a reference: tool registry and skills, execution nodes, memory and an evaluation entry point, with a unified CLI/Python tool schema, parameter validation and error returns — compared throughout against how the frameworks handle tool discovery, context injection and loop termination.',
      },
      {
        zh: '状态与上下文管理：实现条件边、循环重试、checkpoint 与中间结果传递，分开管理会话记忆、任务状态与可复用 Skill；验证摘要压缩、历史裁剪、中断恢复与错误传播。',
        en: 'State and context: conditional edges, retry loops, checkpoints and intermediate-result passing, with session memory, task state and reusable skills kept separate. Summary compression, history trimming, interrupt recovery and error propagation each verified.',
      },
      {
        zh: '代码验证与探索结果：封装 loader、splitter、embedding、retriever / reranker，比较 chunk / overlap 与混合检索；围绕工具契约、状态更新、异常与恢复组织单元与集成测试。',
        en: 'Verification: loader, splitter, embedding and retriever/reranker wrapped behind one interface, with chunk size, overlap and hybrid retrieval compared. Unit and integration tests organised around tool contracts, state updates, exceptions and recovery.',
      },
    ],
    metrics: [
      {
        value: '201',
        label: { zh: 'M3 阶段通过测试项', en: 'Tests passing at M3' },
        detail: { zh: '单元与集成', en: 'Unit and integration' },
        provenance: 'measured',
      },
      {
        value: '77.5% → 97.1%',
        label: { zh: '探索任务完成率', en: 'Exploration task completion' },
        detail: { zh: '与测试项分开统计', en: 'Counted separately from tests' },
        provenance: 'measured',
      },
    ],
    tags: ['Python', 'LangChain / LangGraph', 'pytest', 'RAG', 'Memory'],
  },
];
