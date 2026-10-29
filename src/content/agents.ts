import type { L } from './types';

/**
 * 智能体笔记 — working notes on the agents I use, in my own words.
 *
 * These are not reviews and not rankings. I build agents for a living, so
 * the question I ask of each tool is the one I would ask of my own code:
 * what does it actually own, what does it hand to the model, and where does
 * it fail? What is written below is what I would tell a colleague.
 *
 * Everything here is a working impression, not a spec sheet. Two of the
 * entries (WorkBuddy, Muse) are new to me; those say so plainly and will
 * grow as I actually use them.
 */

export type Agent = {
  name: string;
  /** 出处 — who builds it. */
  by: L;
  kind: L;
  /** 一句话定位. */
  line: L;
  /** 强在哪 — concrete, not adjectives. */
  strengths: L[];
  /** 我的用法 — first person, specific. */
  usage: L;
  /** 注意 — the honest caveat. */
  caveat: L;
  /** New to the shelf — shows a "新" chip. */
  fresh?: boolean;
};

export const intro = {
  title: { zh: '智能体笔记', en: 'Agent notes' } satisfies L,
  lede: {
    zh: '我做的系统就是 Agent，所以这些工具对我不是新闻，是生产环境。它们每一家都把"上下文、工具、循环"这三件事重新切分了一遍——看它们怎么切，比看它们的分数有意思。以下是我的使用笔记，按我接触的顺序排。',
    en: 'I build agent systems for a living, so these tools are not news to me — they are the production floor. Each of them re-divides the same three things — context, tools, loops — in its own way, and watching how they cut is more interesting than any benchmark. Notes below, in the order I met them.',
  } satisfies L,
};

export const agents: Agent[] = [
  {
    name: 'Hermes Agent',
    by: { zh: '开源 Agent 框架', en: 'Open-source agent framework' },
    kind: { zh: '框架 · 学习对象', en: 'Framework · study object' },
    line: {
      zh: '模块分层最干净的小型 Agent 框架，Skill 和 Memory 的设计是它的招牌。',
      en: 'The small agent framework with the cleanest layering; its Skill and Memory design is the signature.',
    },
    strengths: [
      {
        zh: 'Skill / Memory 拆得清楚：技能是动作，记忆是状态，谁都不越界',
        en: 'Skill and Memory separated cleanly: skills act, memory holds state, neither overreaches',
      },
      {
        zh: '代码量小到一个人能读完——这是它最大的优点，读一遍等于上了一堂框架课',
        en: 'Small enough to read in full — its best quality; reading it once is a framework course',
      },
      {
        zh: '没有为"演示好看"塞进去的功能，每个模块都有存在理由',
        en: 'Nothing exists for demo appeal; every module justifies itself',
      },
    ],
    usage: {
      zh: '我的 LilBot 就是对照它写的：Skill / Memory 的切分直接借用，工具注册表和它保持一致的精神。它是那种"先别急着用，先把源码读完"的工具。',
      en: 'My LilBot was written against it: the Skill/Memory split is borrowed directly, and the tool registry keeps the same spirit. It is the kind of tool you should finish reading before you start using.',
    },
    caveat: {
      zh: '它不是开箱即用的产品——是个需要你自己动手的框架。没有它替你挡住的那些脏活，得你自己想清楚。',
      en: 'Not a product you can use out of the box — it is a framework you assemble. All the dirty work it refuses to hide from you is yours to reason through.',
    },
  },
  {
    name: 'CodeWhale',
    by: { zh: '国内团队 · 编码智能体', en: 'China-based team · coding agent' },
    kind: { zh: '编码 Agent', en: 'Coding agent' },
    line: {
      zh: '对中文技术语境和国内工程栈理解最好的编码 Agent，IDE 插件和 CLI 都有。',
      en: 'The coding agent with the best grip on Chinese technical context and the domestic engineering stack; ships as an IDE plugin and a CLI.',
    },
    strengths: [
      {
        zh: '中文文档、中文 issue、国产库的问题，它啃得动——国际工具在这上面经常绕远路',
        en: 'Handles Chinese docs, Chinese issues and domestic libraries — where international tools often take the long way round',
      },
      {
        zh: '国内模型接入多，部署形态灵活，公司内网环境里能落地的选择',
        en: 'Broad domestic model support and flexible deployment — a realistic choice inside a corporate intranet',
      },
    ],
    usage: {
      zh: '做国内业务项目时的第一选择：把中文 issue 和需求文档先交给它啃一遍，再决定自己从哪里动手。它像是一个更懂行情的同事，而不是一个外来的顾问。',
      en: 'My first choice on domestic projects: feed it the Chinese issues and requirement docs to chew on first, then decide where to start myself. It reads like a colleague who knows the market, not an outside consultant.',
    },
    caveat: {
      zh: '生态面比国际主流窄一些：第三方 MCP 集成、插件生态还在追。有些在国际工具里现成的东西，在这里要自己接。',
      en: 'Narrower ecosystem than the international mainstream: third-party MCP integrations and plugins are still catching up. Some things that come ready-made elsewhere you wire up yourself.',
    },
  },
  {
    name: 'Claude Code',
    by: { zh: 'Anthropic · 终端智能体', en: 'Anthropic · terminal agent' },
    kind: { zh: '编码 Agent', en: 'Coding agent' },
    line: {
      zh: '终端里的编码智能体，上下文工程和权限体系做得最细的一个。',
      en: 'A coding agent in the terminal, and the one whose context engineering and permission system are the most carefully built.',
    },
    strengths: [
      {
        zh: '上下文管得好：系统提示、记忆、子代理的边界划得清楚，长任务里不容易跑偏',
        en: 'Context managed properly: system prompts, memory and subagent boundaries are drawn clearly, so long tasks stay on course',
      },
      {
        zh: '权限模型是工程级的——每一步做什么、碰什么文件、跑什么命令，都在用户可审的粒度上',
        en: 'The permission model is engineering-grade: what it does, which files it touches, which commands it runs — all at a reviewable granularity',
      },
      {
        zh: 'Claude 系模型在长上下文里读代码的耐力确实好，重构类任务最舒服',
        en: 'The Claude models read code over long contexts with real stamina — refactoring work is where it feels best',
      },
    ],
    usage: {
      zh: '我把它当重活工具用：跨文件的排查、批量重构、给旧代码补测试。习惯是先让它读、让它写方案，卡住了再动手。它也直接重塑了我对"上下文该存什么"的看法——它存解析后的 prompt 字节，我的 LilBot 也跟着这么干。',
      en: 'I use it for the heavy work: cross-file debugging, batch refactoring, adding tests to legacy code. My habit is to let it read, let it draft the plan, and step in only when it stalls. It also changed my mind about what context should store — it keeps resolved prompt bytes, and my LilBot followed.',
    },
    caveat: {
      zh: '长会话要自己会"压上下文"，不然越跑越贵、越跑越钝。它是把好刀，但刀法得自己练。',
      en: 'Long sessions need you to compress context yourself, or it gets more expensive and duller as it goes. A good blade — but the technique is yours to learn.',
    },
  },
  {
    name: 'Codex',
    by: { zh: 'OpenAI · 云端编码智能体', en: 'OpenAI · cloud coding agent' },
    kind: { zh: '编码 Agent', en: 'Coding agent' },
    line: {
      zh: '跑在 OpenAI 云沙箱里的编码智能体，推理强，和 ChatGPT 的记忆与账号体系打通。',
      en: 'A coding agent running in OpenAI’s cloud sandbox — strong reasoning, wired into the ChatGPT memory and account system.',
    },
    strengths: [
      {
        zh: '模型推理能力强，难题上敢往深了想，一次性写对率可观',
        en: 'Strong model reasoning — it is willing to think deep on hard problems, and its first-shot hit rate shows',
      },
      {
        zh: '云端沙箱执行：环境一致，不会把你本机搞乱，设备差也不影响它',
        en: 'Cloud sandbox execution: a consistent environment that never messes up your machine and does not care how weak your device is',
      },
      {
        zh: '跟 ChatGPT 共享记忆，跨会话能记住你的项目背景',
        en: 'Shares memory with ChatGPT — your project context survives across sessions',
      },
    ],
    usage: {
      zh: '我用它做原型和一次性脚本最多，也会拿它和本地工具对拍同一个问题的思路——两条不同的推理路径摆在一起，比单看一家有信息量。',
      en: 'Mostly prototyping and one-off scripts, and I use it to cross-check approaches against local tools — two different reasoning paths side by side carry more information than one.',
    },
    caveat: {
      zh: '云端执行意味着代码要离开你的机器。公司代码、未公开的东西，往里放之前先过一遍保密要求——这不是它的问题，是你用它之前必须想清楚的问题。',
      en: 'Cloud execution means code leaves your machine. Company code and unpublished work: run the confidentiality rules before you feed it anything. Not its fault — but your call to make first.',
    },
  },
  {
    name: 'WorkBuddy',
    by: { zh: '新一代工作流智能体', en: 'New-generation workflow agent' },
    kind: { zh: '工作流 Agent', en: 'Workflow agent' },
    fresh: true,
    line: {
      zh: '把"帮我干活"从写代码扩展到了日常工作流——文档、沟通、任务的自动化。',
      en: 'Extends "do it for me" from code to the everyday workflow — documents, communication, task automation.',
    },
    strengths: [
      {
        zh: '（初印象）不把自己框死在"编程助手"里，工作流层面的整合方向是对的',
        en: '(First impressions) It refuses to box itself into "programming assistant" — the workflow-level integration is the right direction',
      },
    ],
    usage: {
      zh: '还在试用期。目前拿它处理重复性的文档和流程类杂事，等用满一段时间再认真写它。',
      en: 'Still on probation. For now it handles repetitive document and process chores; I will write it up properly once I have used it in earnest.',
    },
    caveat: {
      zh: '新的东西要过一遍数据边界再往深处用——它要接管工作流，就会碰到你的日程、文件和通讯记录。',
      en: 'A new tool needs a data-boundary pass before deep use — to take over your workflow it will meet your calendar, your files and your messages.',
    },
  },
  {
    name: 'Muse',
    by: { zh: '新一代创作智能体', en: 'New-generation creative agent' },
    kind: { zh: '创作 Agent', en: 'Creative agent' },
    fresh: true,
    line: {
      zh: '把智能体的执行能力和创作场景捆在一起，界面和交互思路都更新。',
      en: 'Bundles agentic execution with creative work — a fresher take on both interface and interaction.',
    },
    strengths: [
      {
        zh: '（初印象）对"人和 Agent 一起创作"这件事有想法，不是把聊天框换个皮',
        en: '(First impressions) It has actual ideas about humans and agents creating together — not a chat box with new skin',
      },
    ],
    usage: {
      zh: '观察中。创作不是我天天碰的场景，所以我对它的判断会慢一些——等我拿它做出一个完整东西再说。',
      en: 'Watching. Creative work is not my daily scene, so I will judge slowly — once I have made one complete thing with it.',
    },
    caveat: {
      zh: '创作者工具的雷区是"它替你决定了风格"。到底是我在用工具，还是工具在用我，这个要一直盯。',
      en: 'The minefield for creator tools is "it decided the style for you". Whether the tool is using me or I am using it — that question stays open.',
    },
  },
];
