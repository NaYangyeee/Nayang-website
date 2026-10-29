import type { L, SkillGroup, TimelineEntry } from './types';

export const SITE_URL = 'https://nayang-website.pages.dev';

/**
 * Identity.
 *
 * The English name is "Lina Cui" rather than a separate chosen name: the
 * pinyin of 力娜 already reads as a name an English speaker can say and
 * remember, so there is nothing to gain from inventing a second one and
 * something to lose — a résumé, a GitHub handle and a site that disagree
 * about what someone is called is a small, avoidable friction in exactly the
 * process this site exists to support.
 */
export const profile = {
  name: { zh: '崔力娜', en: 'Lina Cui' } satisfies L,

  title: {
    zh: '大模型应用算法工程师 / Agent & RAG 开发',
    en: 'LLM Application Engineer · Agent & RAG',
  } satisfies L,

  headline: {
    zh: '我做能在真实业务里跑住的 Agent —— 工具选得对、长链路断了能接上、每个结论都有出处。',
    en: 'I build agents that hold up in production — tools chosen correctly, long chains that recover when they break, and every answer traceable to a source.',
  } satisfies L,

  statement: {
    zh: '中国科学院大学电子信息硕士，现在华工科技中央研究院做大模型应用。两年多时间集中在一件事上：让 Agent 在医院导诊和企业内部知识这类真实场景里可靠工作。这意味着大部分工作不是调模型，而是把"它为什么这么答"变成一个能回答的问题 —— 数据飞轮、SFT 与 DPO 的训练闭环、rubric 与 Verifier 组成的评测体系、按 task_id 关联的全链路 Trace。本科自动化出身，做过 ROS2、机械臂和 PLC，所以对"系统要在物理世界里不出错"这件事有直觉。',
    en: 'A master’s in electronic information from the University of Chinese Academy of Sciences, now building LLM applications at the HGTech Central Research Institute. Two years on one problem: making agents work reliably in real settings — hospital triage, enterprise knowledge retrieval. Most of that work is not model tuning. It is turning "why did it answer that?" into a question that has an answer: a data flywheel, SFT and DPO training loops, an evaluation stack of rubrics and verifiers, and traces keyed by task_id across the whole chain. An automation engineering background — ROS2, manipulators, PLC — which is where the instinct for systems that must not fail in the physical world comes from.',
  } satisfies L,

  location: { zh: '中国 · 武汉', en: 'Wuhan, China' } satisfies L,

  availability: {
    zh: '开放国内与海外机会',
    en: 'Open to roles in China and abroad',
  } satisfies L,

  /**
   * Contact.
   *
   * Only channels that actually exist. The résumé lists a phone number and a
   * QQ mailbox; the phone is deliberately not published here, because a
   * personal mobile on a public page is a spam magnet and an email reaches
   * the same person. GitHub is listed because the account exists and is
   * hers. LinkedIn is absent rather than linked to a placeholder — an
   * invalid link on a job-hunting site costs more than a missing one.
   */
  email: '948513837@qq.com',
  github: 'https://github.com/NaYangyeee',
} as const;

/** Section anchors, in page order. */
export const navSections: Array<{ id: string; label: L }> = [
  { id: 'work', label: { zh: '项目', en: 'Work' } },
  { id: 'skills', label: { zh: '技术栈', en: 'Skills' } },
  { id: 'path', label: { zh: '经历', en: 'Path' } },
  { id: 'contact', label: { zh: '联系', en: 'Contact' } },
];

/**
 * The four headline numbers.
 *
 * Every one is a before/after from her own evaluations, and every one is
 * marked `measured`. Resisting the urge to add a fifth that would have to be
 * `illustrative` is the point — four numbers that are all real reads as
 * stronger than six where two are decoration.
 */
export const heroStats: Array<{ value: string; label: L; detail: L }> = [
  {
    value: '63% → 92%',
    label: { zh: '工具选择 Top-1', en: 'Tool selection, top-1' },
    detail: { zh: '企业内部知识 Agent', en: 'Enterprise knowledge agent' },
  },
  {
    value: '45% → 78%',
    label: { zh: '长链路任务成功率', en: 'Long-chain task success' },
    detail: { zh: '7–10 轮模型与工具交互', en: '7–10 model/tool turns' },
  },
  {
    value: '4.1 → 3.0',
    label: { zh: '平均工具调用次数', en: 'Mean tool calls per task' },
    detail: { zh: '同时成功率上升', en: 'While success rate rose' },
  },
  {
    value: '0.58 → 0.71',
    label: { zh: '医疗 Agent 综合评测', en: 'Medical agent eval score' },
    detail: { zh: '阶段性内部评测均分', en: 'Internal, staged' },
  },
];

export const skillGroups: SkillGroup[] = [
  {
    label: { zh: 'Agent 与检索', en: 'Agents & retrieval' },
    items: [
      'Python',
      'LangChain / LangGraph',
      'ReAct',
      'Plan-and-Execute',
      'MCP / Tool Calling',
      'Context / State / Memory',
      'Checkpoint 恢复',
      'BM25 + 向量混合检索',
      'Query Rewrite',
      'Rerank',
      'FAISS / Qdrant',
      'Elasticsearch',
    ],
  },
  {
    label: { zh: '模型 · 数据 · 评测', en: 'Models, data, evaluation' },
    items: [
      'PyTorch',
      'Transformer / Attention',
      'LoRA / QLoRA',
      'SFT',
      'DPO',
      'ASR / OCR 任务训练',
      '数据清洗 / 去重 / 脱敏',
      'JSONL / Parquet',
      '偏好 pair 构建',
      'rubric / Verifier',
      'LLM-as-Judge',
      'benchmark 设计',
      'CNN / YOLO',
    ],
  },
  {
    label: { zh: '工程与部署', en: 'Engineering & deployment' },
    items: [
      'FastAPI',
      'REST / 流式接口',
      'vLLM',
      'Docker',
      'Linux',
      'Git',
      'pytest',
      '日志 / Trace / 超时恢复',
      'Redis / MySQL',
      'C# 上位机与 PLC 通信',
    ],
  },
  {
    label: { zh: '机器人与基础', en: 'Robotics & fundamentals' },
    items: [
      'ROS2',
      'URDF / MoveIt',
      '运动学 / 坐标变换',
      'LeRobot / LIBERO / SmolVLA',
      'NumPy / Pandas / scikit-learn',
      '线性代数 · 概率统计 · 梯度优化',
      'CET-6',
    ],
  },
];

export const timeline: TimelineEntry[] = [
  {
    kind: 'work',
    org: { zh: '华工科技中央研究院', en: 'HGTech Central Research Institute' },
    role: {
      zh: '大模型应用算法工程师 / Agent 开发工程师',
      en: 'LLM Application Engineer · Agent Development',
    },
    period: '2024.07 — 至今',
    detail: {
      zh: '医疗智能体 Agent 系统与企业内部知识查询 Agent。负责训练数据、SFT / DPO、评测闭环与关键业务模块。',
      en: 'Medical triage agent and enterprise knowledge agent. Owns training data, SFT / DPO, the evaluation loop and core business modules.',
    },
  },
  {
    kind: 'work',
    org: {
      zh: '莫斯科鲍曼国立技术大学 · 特种机器人系',
      en: 'Bauman Moscow State Technical University · Special Robotics',
    },
    role: { zh: '远程项目实习', en: 'Remote project internship' },
    period: '2023',
    detail: {
      zh: '工业场景多机器人协作开源项目。基于 PyTorch / YOLOv8 的图像数据整理、标注检查、模型训练与误检漏检分析；参与 ROS2 / Gazebo 仿真联调，在 Jetson TX2 与树莓派上做 Python 开发与设备通信调试。',
      en: 'An open-source multi-robot collaboration project for industrial settings. Image dataset curation, annotation review, model training and false-positive/negative analysis with PyTorch / YOLOv8; ROS2 / Gazebo simulation integration, and Python development and device communication on Jetson TX2 and Raspberry Pi.',
    },
  },
  {
    kind: 'education',
    org: { zh: '中国科学院大学', en: 'University of Chinese Academy of Sciences' },
    role: { zh: '电子信息 · 工学硕士', en: 'MEng, Electronic Information' },
    period: '2021.09 — 2024.06',
    note: { zh: 'GPA 3.43 / 4.00', en: 'GPA 3.43 / 4.00' },
  },
  {
    kind: 'education',
    org: { zh: '北京工商大学', en: 'Beijing Technology and Business University' },
    role: { zh: '自动化 · 工学学士', en: 'BEng, Automation' },
    period: '2016.09 — 2020.06',
    note: { zh: '专业排名 8 / 50', en: 'Ranked 8 / 50 in major' },
  },
];
