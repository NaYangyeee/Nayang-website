import type { L } from './types';

/**
 * 产品与项目 — how I do requirements and delivery.
 *
 * Structure informed by the PM/PjM guide she shared; every claim inside is
 * grounded in work she has actually done — the medical agent's requirement
 * translation, the enterprise agent's benchmark design, the multi-robot
 * pilot's spec and quality rules. This is the page that says: I do not only
 * build the system, I decide what gets built and make sure it lands.
 */

export const product = {
  title: { zh: '产品与项目', en: 'Product & delivery' } satisfies L,
  lede: {
    zh: '工程师做久了会发现：把一件事做成，一半靠代码，一半靠"说清楚要做什么、排好谁能做完、验收时敢不敢说不行"。我做的 Agent 项目里，需求、节奏、验收这三件事都有我的一份——这里写我怎么干。',
    en: 'Engineer long enough and you learn: getting something built is half code, half saying clearly what to build, who can finish it, and whether you dare reject it at acceptance. In my agent projects I own a piece of all three — requirements, rhythm, acceptance. This is how I work them.',
  } satisfies L,

  /** The two roles, as one seesaw. Straight from the guide's core distinction. */
  roles: [
    {
      title: { zh: '产品经理', en: 'Product manager' } satisfies L,
      question: { zh: '做什么、为什么', en: 'What, and why' } satisfies L,
      body: {
        zh: '把模糊的"想要"翻译成可验收的"规格"：用户是谁、什么场景、做到什么程度算好。产品经理错了，后面所有人都在高效地做一件错事。',
        en: 'Translating a vague "want" into an acceptable spec: who is it for, in what scene, and what counts as good. When the product call is wrong, everyone downstream is efficiently building the wrong thing.',
      } satisfies L,
    },
    {
      title: { zh: '项目经理', en: 'Project manager' } satisfies L,
      question: { zh: '怎么做、何时完成', en: 'How, and by when' } satisfies L,
      body: {
        zh: '把规格翻译成节奏：拆到什么粒度、谁先谁后、风险放在哪里、什么时候必须喊停。项目经理错了，正确的事也会在错误的顺序里死掉。',
        en: 'Translating the spec into rhythm: how fine to slice, what comes first, where the risks live, when to call a stop. When the project call is wrong, the right thing still dies in the wrong order.',
      } satisfies L,
    },
  ],

  /** 我做需求的方式 — the product half, grounded in her real work. */
  requirements: [
    {
      title: { zh: '需求先翻译成可验收的规格', en: 'Translate requirements into acceptable specs' } satisfies L,
      body: {
        zh: '医疗 Agent 项目里，"患者问的每一句都要有着落"这句话，我把它落成了具体规格：症状/既往史/过敏三个槽位、必问追问清单、停止条件、越界回答的定义——每一条都能在回归用例里说"过了"或"没过"。模糊的需求养不出可回归的系统。',
        en: 'On the medical agent, "every patient question must land somewhere" became a concrete spec: three slots for symptoms, history and allergies, a mandatory follow-up list, stop conditions, and a definition of out-of-scope — each one passable or fail-able in a regression case. Vague requirements cannot raise a regressable system.',
      } satisfies L,
    },
    {
      title: { zh: '验收标准先行，而不是事后补', en: 'Acceptance criteria first, never retrofitted' } satisfies L,
      body: {
        zh: '企业内部 Agent 的 benchmark 是我先于功能定的：工具选择 Top-1、长链路成功率、平均调用次数——每个数字都对应一类明确的坏 case。先立尺子再动工，验收时就没有"我觉得还行"这种话。',
        en: 'The enterprise agent’s benchmark was set before the features: tool-selection top-1, long-chain success, mean tool calls — each number tied to a concrete failure class. Put the ruler down before the work starts, and acceptance never comes down to "it feels fine".',
      } satisfies L,
    },
    {
      title: { zh: '用数据做取舍，不做和气佬', en: 'Decide with data, not with goodwill' } satisfies L,
      body: {
        zh: '数据飞轮是我管的：线上 bad case 按 ASR/OCR/检索/对话策略分流，先修哪一类看量级和影响，而不是看谁提的。资源永远不够，排序的依据必须摆在桌面上。',
        en: 'The data flywheel is mine: production bad cases are routed by ASR, OCR, retrieval and dialogue policy, and which class to fix first is decided by volume and impact — never by who asked. Resources are always short; the ranking has to be on the table.',
      } satisfies L,
    },
  ],

  /** 我带节奏的方式 — the project half. */
  delivery: [
    {
      title: { zh: '里程碑切到"能验收"的粒度', en: 'Milestones cut to acceptance size' } satisfies L,
      body: {
        zh: '预演项目里我没有一上来就奔"机器人跑起来"，而是先定阶段产出：观测用例、Episode 数据规范、质量规则、接口方案——每一份都是能单独评审、单独说"完成"的东西。大目标不会自己变成进度。',
        en: 'On the pilot I did not run at "the robot works" — I staged deliverables first: observation cases, the episode data spec, quality rules, the interface design. Each one reviewable and completable on its own. Big goals do not become progress by themselves.',
      } satisfies L,
    },
    {
      title: { zh: '风险提前写下来，而不是在心里', en: 'Risks written down, not carried in your head' } satisfies L,
      body: {
        zh: '多机器人协作里最贵的风险是"真机出问题不可复现"——所以回放、仿真回归、假控制器这些事排在动手之前。风险登记的意义不是消掉它，是让所有人都知道它在那里、谁在看它。',
        en: 'The most expensive risk in multi-robot work is "a hardware failure you cannot reproduce" — so replay harnesses, simulated regression suites and the fake controller came before the real thing. Registering a risk does not remove it; it makes sure everyone knows it exists and who is watching it.',
      } satisfies L,
    },
    {
      title: { zh: '复盘是流程的一部分', en: 'Retrospectives are part of the process' } satisfies L,
      body: {
        zh: '每次评测迭代都留结论：这个版本为什么涨、为什么跌、哪条坏 case 还站着。写在文档里的复盘才进得了下一次排期；口头的"下次注意"会跟着会议一起散掉。',
        en: 'Every evaluation iteration leaves its conclusions: why this version rose, why it fell, which bad case still stands. A retrospective that is written down makes it into the next plan; the spoken "we will be careful next time" evaporates with the meeting.',
      } satisfies L,
    },
  ],

  /** 常用框架 — the small toolkit, as chips with one line each. */
  frameworks: [
    { name: '用户故事', line: { zh: '谁、要什么、为什么——需求的原子单位', en: 'Who, wants what, and why — the atomic unit of a requirement' } },
    { name: 'MoSCoW', line: { zh: '必须有 / 应该有 / 可以有 / 不做——砍需求的顺序', en: 'Must, should, could, won’t — the order of cutting' } },
    { name: 'RICE', line: { zh: '触达 × 影响 × 信心 ÷ 成本——排优先级的算术', en: 'Reach × impact × confidence ÷ effort — the arithmetic of priority' } },
    { name: '里程碑评审', line: { zh: '每个节点停下来问：能验收吗？不能就重排', en: 'Stop at each node and ask: can we accept? If not, replan' } },
    { name: '事后复盘', line: { zh: '发生了什么、为什么、下一次改哪一件事', en: 'What happened, why, and the one thing to change next time' } },
  ],

  /** 验收清单 — the five questions before anything ships. */
  checklist: {
    title: { zh: '我的验收清单', en: 'My acceptance checklist' } satisfies L,
    intro: {
      zh: '任何东西交出去之前，我自己先过这五问——都答得上，才配叫"做完"。',
      en: 'Before anything leaves my hands, it passes these five — answer all of them or it is not done.',
    } satisfies L,
    items: [
      {
        zh: '验收标准是谁定的、写在哪里？（没有标准 = 还没有开始）',
        en: 'Who set the acceptance criteria, and where are they written? (No criteria = not started.)',
      },
      {
        zh: '它解决的是哪个真实的坏 case？说不出具体场景 = 在解决自己的想象',
        en: 'Which real bad case does it fix? No concrete scene = fixing your own imagination.',
      },
      {
        zh: '怎么证明它解决了？评测、回放还是真机——证据链在哪里',
        en: 'Where is the proof? Evaluation, replay or hardware — show the evidence chain.',
      },
      {
        zh: '它会让什么变差？速度、成本、别的模块——代价必须显式',
        en: 'What does it make worse? Speed, cost, other modules — the price must be explicit.',
      },
      {
        zh: '失败了怎么发现、怎么回滚？静默失效比失败本身更贵',
        en: 'How will a failure be noticed, and how do we roll back? A silent failure costs more than a failure.',
      },
    ],
  },
};
