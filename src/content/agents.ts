import type { L } from './types';

/**
 * 智能体笔记 — working notes on the agents I use, in my own words.
 *
 * These are not reviews and not rankings. I build agents for a living, so
 * the question I ask of each tool is the one I would ask of my own code:
 * what does it actually own, what does it hand to the model, and where does
 * it fail? What is written below is what I would tell a colleague.
 *
 * Logos: official files where the official site served one (Claude Code,
 * Codex, Hermes Agent, WorkBuddy, Muse); CodeWhale carries an original
 * placeholder mark until the official asset arrives. Install steps are
 * written from current public docs — software moves fast, so every page
 * says "以官方文档为准" and links it.
 */

export type InstallStep = {
  /** Sticker. The tutorial voice is deliberately light — a wall of
      terminal commands does not make anyone want to try a tool. */
  emoji: string;
  title: L;
  body?: L;
};

export type Agent = {
  slug: string;
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
  logo: string;
  install: {
    desktop: InstallStep[];
    /** null = no mobile story worth telling; the page says so honestly. */
    mobile: InstallStep[] | null;
  };
  links: { label: string; href: string }[];
  /** Screenshots to come — captions are the brief for the photos she sends. */
  screenshots: { caption: L; src?: string }[];
};

export const intro = {
  title: { zh: '智能体笔记', en: 'Agent notes' } satisfies L,
  lede: {
    zh: '我做的系统就是 Agent，所以这些工具对我不是新闻，是生产环境。它们每一家都把"上下文、工具、循环"这三件事重新切分了一遍——看它们怎么切，比看它们的分数有意思。以下是我的使用笔记，按我接触的顺序排。点进任何一张卡看安装和细节。',
    en: 'I build agent systems for a living, so these tools are not news to me — they are the production floor. Each of them re-divides the same three things — context, tools, loops — in its own way, and watching how they cut is more interesting than any benchmark. Notes below, in the order I met them; open any card for install and detail.',
  } satisfies L,
};

export const agents: Agent[] = [
  {
    slug: 'hermes',
    name: 'Hermes Agent',
    by: { zh: 'Nous Research · 开源', en: 'Nous Research · open source' },
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
    logo: '/assets/logos/hermes-girl.svg',
    install: {
      desktop: [
        { emoji: '🐙', title: { zh: '克隆仓库', en: 'Clone the repo' }, body: { zh: 'git clone https://github.com/NousResearch/hermes-agent', en: 'git clone https://github.com/NousResearch/hermes-agent' } },
        { emoji: '🐍', title: { zh: '开个虚拟环境', en: 'Make a venv' }, body: { zh: 'python -m venv .venv，然后激活它——别污染系统环境', en: 'python -m venv .venv, then activate it — do not pollute the system env' } },
        { emoji: '📦', title: { zh: '安装依赖', en: 'Install' }, body: { zh: 'pip install -e .，等它把依赖捋一遍', en: 'pip install -e ., and let it sort its dependencies' } },
        { emoji: '🧪', title: { zh: '跑通示例', en: 'Run the example' }, body: { zh: '按 README 的 demo 跑一遍——更重要的是打开源码，跟着它的模块边界读', en: 'Run the README demo — but more importantly open the source and read along its module boundaries' } },
      ],
      mobile: null,
    },
    links: [
      { label: 'GitHub', href: 'https://github.com/NousResearch/hermes-agent' },
    ],
    screenshots: [
      {
        caption: { zh: '官方仓库横幅', en: 'The official repo banner' },
        src: '/assets/shots/hermes-banner.png',
      },
      {
        caption: { zh: '官方 GitHub 仓库 · 2026-10-29 截图', en: 'Official GitHub repo · captured 2026-10-29' },
        src: '/assets/shots/hermes-github.png',
      },
    ],
  },
  {
    slug: 'codewhale',
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
    logo: '/assets/logos/codewhale.svg',
    install: {
      desktop: [
        { emoji: '🧩', title: { zh: '装插件', en: 'Install the plugin' }, body: { zh: '在你的 IDE 插件市场里搜 CodeWhale 安装（以官网列出的支持列表为准）', en: 'Search CodeWhale in your IDE extension marketplace (check the official site for the supported list)' } },
        { emoji: '⌨️', title: { zh: '或者用 CLI', en: 'Or take the CLI' }, body: { zh: '官网有命令行版本，按它的安装页走一遍', en: 'The site also ships a CLI — follow its install page' } },
        { emoji: '🔑', title: { zh: '登录', en: 'Sign in' }, body: { zh: '用账号登录，接上你常用的国内模型', en: 'Sign in and connect the domestic models you already use' } },
        { emoji: '🏗️', title: { zh: '开工', en: 'Go' }, body: { zh: '把一个中文 issue 丢给它，先让它读，再动手', en: 'Throw a Chinese issue at it — let it read first, then act' } },
      ],
      mobile: null,
    },
    links: [{ label: '官网', href: 'https://codewhale.ai' }],
    screenshots: [
      { caption: { zh: 'IDE 里的对话面板', en: 'The in-IDE panel' } },
      { caption: { zh: '它啃中文文档的样子', en: 'It chewing through Chinese docs' } },
    ],
  },
  {
    slug: 'claude-code',
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
    logo: '/assets/logos/claude48.png',
    install: {
      desktop: [
        { emoji: '🍎', title: { zh: 'macOS', en: 'macOS' }, body: { zh: 'brew install --cask claude，一行搞定', en: 'brew install --cask claude — one line' } },
        { emoji: '🪟', title: { zh: 'Windows', en: 'Windows' }, body: { zh: '去官网下载安装包，双击走完', en: 'Download the installer from the official site and click through' } },
        { emoji: '📦', title: { zh: '或者走 npm', en: 'Or via npm' }, body: { zh: 'npm install -g @anthropic-ai/claude-code，装了 Node 就能用', en: 'npm install -g @anthropic-ai/claude-code — needs Node, nothing else' } },
        { emoji: '🔑', title: { zh: '登录', en: 'Sign in' }, body: { zh: '首次运行 claude，跟着提示登录 Claude 账号（订阅制）', en: 'Run claude once and follow the login prompt (subscription)' } },
        { emoji: '🚀', title: { zh: '开工', en: 'Go' }, body: { zh: '在项目目录里敲 claude——它读代码、跑命令、改文件，每步都先问你', en: 'Type claude in a project directory — it reads, runs and edits, asking before each step' } },
      ],
      mobile: [
        { emoji: '📱', title: { zh: '网页版', en: 'The web version' }, body: { zh: '没有独立 app，但手机浏览器打开 claude.ai/code 就是它——能看会话、能继续跑任务', en: 'No app, but claude.ai/code in a mobile browser is it — read sessions, keep tasks going' } },
        { emoji: '🔭', title: { zh: '适合手机做的事', en: 'What mobile is good for' }, body: { zh: '监工：看它跑到哪了、回一句"继续"。动手的活留给电脑', en: 'Supervising: check progress, answer "go on". Leave the heavy lifting to the desktop' } },
      ],
    },
    links: [
      { label: '官方文档', href: 'https://docs.anthropic.com/en/docs/claude-code' },
      { label: '网页版', href: 'https://claude.ai/code' },
    ],
    screenshots: [
      {
        caption: { zh: '官方文档页 · 2026-10-29 截图', en: 'Official docs page · captured 2026-10-29' },
        src: '/assets/shots/claude-docs.png',
      },
      { caption: { zh: '终端里的会话', en: 'A session in the terminal' } },
      { caption: { zh: '它自己画的执行计划', en: 'A plan it drafted itself' } },
    ],
  },
  {
    slug: 'codex',
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
    logo: '/assets/logos/openai48.png',
    install: {
      desktop: [
        { emoji: '🖥️', title: { zh: '先有 Node', en: 'Node first' }, body: { zh: '装 Node.js 18+（官网下载或包管理器）', en: 'Install Node 18+ (official site or a package manager)' } },
        { emoji: '📦', title: { zh: '装 CLI', en: 'Install the CLI' }, body: { zh: 'npm install -g @openai/codex', en: 'npm install -g @openai/codex' } },
        { emoji: '🔐', title: { zh: '登录', en: 'Sign in' }, body: { zh: 'codex login，用 ChatGPT 账号走一遍', en: 'codex login with your ChatGPT account' } },
        { emoji: '☁️', title: { zh: '云端开工', en: 'Work in the cloud' }, body: { zh: 'codex cloud 把任务丢到云沙箱——你的电脑只是遥控器', en: 'codex cloud sends the task to the cloud sandbox — your machine is just the remote' } },
        { emoji: '🍏', title: { zh: '（可选）桌面 app', en: '(Optional) desktop app' }, body: { zh: 'macOS 有原生桌面版，喜欢窗口感的去官网拿', en: 'A native macOS desktop app exists — grab it from the official site if you like windows over terminals' } },
      ],
      mobile: [
        { emoji: '💬', title: { zh: '借道 ChatGPT', en: 'Through ChatGPT' }, body: { zh: '手机上的 ChatGPT 客户端能发起和查看 Codex 云端任务——人在外面也能派活、看结果', en: 'The ChatGPT app can start and watch Codex cloud tasks — dispatch work and check results on the go' } },
      ],
    },
    links: [
      { label: 'GitHub', href: 'https://github.com/openai/codex' },
      { label: '开发者文档', href: 'https://developers.openai.com/codex' },
    ],
    screenshots: [
      {
        caption: { zh: '官方 GitHub 仓库 · 2026-10-29 截图', en: 'Official GitHub repo · captured 2026-10-29' },
        src: '/assets/shots/codex-github.png',
      },
      { caption: { zh: '云任务的面板', en: 'The cloud task panel' } },
    ],
  },
  {
    slug: 'workbuddy',
    name: 'WorkBuddy',
    by: { zh: '腾讯 · 办公智能体', en: 'Tencent · office agent' },
    kind: { zh: '工作流 Agent', en: 'Workflow agent' },
    fresh: true,
    line: {
      zh: '腾讯的全场景 AI 办公工作台：把任务丢给它，它拆解、读你授权的文件，交付能验收的成果。',
      en: 'Tencent’s full-scenario AI office workbench: hand it a task, it decomposes, reads the files you authorised, and delivers something you can accept.',
    },
    strengths: [
      {
        zh: '底层是 CodeBuddy 同一套 Agent 架构，但包装成了非技术人员也会用的形态——内部先有两千名非技术员工用了再发布',
        en: 'The same agent architecture as CodeBuddy underneath, but wrapped for non-engineers — two thousand of them used it internally before launch',
      },
      {
        zh: '接微信、企微、QQ、飞书、钉钉——办公场景里它就在你已经在用的地方',
        en: 'Plugs into WeChat, WeCom, QQ, Feishu and DingTalk — it lives where office work already happens',
      },
      {
        zh: '安全边界的设计值得学：只读你授权的文件夹，不是本地部署式的"全盘可读"',
        en: 'Its security boundary is worth studying: it reads only folders you authorised, not the whole disk the way local deployments do',
      },
    ],
    usage: {
      zh: '我现在把它用在两个地方：需要"人话进、成品出"的文档类任务（周报、方案初稿、表格），以及看它怎么做任务拆解——它把 Agent 的产品化边界想得很清楚，这对做 B 端 Agent 的人是活的教材。',
      en: 'Two uses so far: document-shaped tasks where plain language goes in and a deliverable comes out (weekly reports, draft proposals, spreadsheets), and watching how it decomposes tasks — its productisation of agent boundaries is a live lesson for anyone building B2B agents.',
    },
    caveat: {
      zh: '上线初期是真的"半成品"：登录循环、语言切换 bug、吞上下文都出现过，官方紧急扩容迭代才稳下来。教训是通用的：Agent 产品的口碑窗口比普通软件短得多。',
      en: 'At launch it was honestly half-baked — login loops, language-switch bugs, context eating — fixed only by emergency scaling and fast iteration. The general lesson: an agent product’s reputation window is far shorter than normal software’s.',
    },
    logo: '/assets/logos/workbuddy.svg',
    install: {
      desktop: [
        { emoji: '🌐', title: { zh: '网页版直接开工', en: 'The web version' }, body: { zh: '打开 workbuddy.cn，登录后就是工作台——不用装任何东西', en: 'Open workbuddy.cn, sign in, and you have the workbench — nothing to install' } },
        { emoji: '💬', title: { zh: '绑上聊天工具', en: 'Bind your messengers' }, body: { zh: '接微信 / 企微 / QQ 后，聊天窗口里就能派活', en: 'Connect WeChat / WeCom / QQ and you can dispatch tasks from the chat window' } },
        { emoji: '📂', title: { zh: '授权文件夹', en: 'Authorise folders' }, body: { zh: '告诉它哪些文件夹能读——它只碰你授权的范围', en: 'Tell it which folders it may read — that is all it touches' } },
        { emoji: '📄', title: { zh: '派第一个活', en: 'The first task' }, body: { zh: '"把这周的进展整理成周报，引用这几个文档"——然后验收', en: '"Turn this week’s progress into a report, citing these documents" — then accept or send it back' } },
      ],
      mobile: [
        { emoji: '📱', title: { zh: '手机浏览器', en: 'Mobile browser' }, body: { zh: 'workbuddy.cn 在手机浏览器里就是移动版工作台', en: 'workbuddy.cn in a mobile browser is the mobile workbench' } },
        { emoji: '💬', title: { zh: '或直接微信里说', en: 'Or just say it in WeChat' }, body: { zh: '绑定后，微信里对它说话就是派任务——适合查进度、改一句、要个初稿', en: 'Once bound, messaging it in WeChat is dispatching — good for checking progress, one-line edits, first drafts' } },
      ],
    },
    links: [{ label: '官网', href: 'https://workbuddy.cn' }],
    screenshots: [
      {
        caption: { zh: '官网首页 · 2026-10-29 截图', en: 'Official homepage · captured 2026-10-29' },
        src: '/assets/shots/workbuddy-home.png',
      },
      { caption: { zh: '交付物验收界面', en: 'The deliverable acceptance view' } },
      { caption: { zh: '微信里派活的场景', en: 'Dispatching from WeChat' } },
    ],
  },
  {
    slug: 'muse',
    name: 'Muse',
    by: { zh: 'Meta · 个人生活智能体', en: 'Meta · personal life agent' },
    kind: { zh: '生活 Agent', en: 'Life agent' },
    fresh: true,
    line: {
      zh: 'Meta 的个人 AI 智能体：不是"问它怎么做"，是直接"帮我做"——订机票、比价、预约，都在它自己的云端虚拟机里替你完成。',
      en: 'Meta’s personal AI agent: not "how do I do this" but "do it for me" — flights, price checks, bookings, all completed inside its own cloud VM.',
    },
    strengths: [
      {
        zh: '每条出站流量都过一道 Sentinel 审批：发邮件、下单前必须你确认——把"给 AI 多少权力"做成了显式开关',
        en: 'Every outbound action passes a Sentinel approval layer: emails and purchases need your explicit confirm — it made "how much power to hand the AI" an explicit switch',
      },
      {
        zh: '后台异步持续工作：关掉 App 任务照样推进，还有长期记忆记住你的偏好',
        en: 'It keeps working in the background after you close the app, with long-term memory for your preferences',
      },
      {
        zh: '安全规格给得足：凭证与 Agent 隔离，还开出 30 万美元漏洞赏金',
        en: 'The security spec is serious: credentials isolated from the agent, plus a 300k bug bounty',
      },
    ],
    usage: {
      zh: '它把我一直想验证的问题变成了产品：一个人到底愿意把生活里的哪部分交给 Agent？我观察它比用它多——它的授权边界设计，值得做企业 Agent 的人逐条看。',
      en: 'It productised the question I always wanted tested: which parts of life will a person actually hand over to an agent? I watch it more than I use it — its authorisation design deserves line-by-line study from anyone building enterprise agents.',
    },
    caveat: {
      zh: '上线初期的安全事故是真的：擅自改密码、读私人短信，亚马逊已经阻止它代购。它用最快的速度把"信任边界"这个抽象问题变成了具体新闻。',
      en: 'The early security incidents were real: changing passwords on its own, reading private messages, Amazon blocking its shopping. It turned the abstract "trust boundary" question into concrete news faster than anyone wanted.',
    },
    logo: '/assets/logos/muse48.png',
    install: {
      desktop: [
        { emoji: '🌐', title: { zh: '网页版', en: 'The web version' }, body: { zh: '打开 muse.ai，用 Meta 账号登录（目前以美国区为主）', en: 'Open muse.ai and sign in with a Meta account (US-focused for now)' } },
      ],
      mobile: [
        { emoji: '🇺🇸', title: { zh: '美区商店', en: 'US app stores' }, body: { zh: 'App Store / Google Play 美区搜 Muse——目前还没开到其他区', en: 'Search Muse in the US App Store / Play Store — other regions are not open yet' } },
        { emoji: '🪪', title: { zh: '登录', en: 'Sign in' }, body: { zh: 'Meta 账号登录，给它的权限会一条条问你', en: 'Sign in with Meta — it will ask about each permission one by one' } },
        { emoji: '✈️', title: { zh: '派第一个生活任务', en: 'The first life task' }, body: { zh: '"帮我找下周二飞上海最便宜的航班，先别买"——看它怎么问、怎么找、怎么把决定权留给你', en: '"Find the cheapest flight to Shanghai next Tuesday — do not buy" — watch how it asks, searches, and leaves the decision to you' } },
        { emoji: '🛡️', title: { zh: '守着确认弹窗', en: 'Mind the confirmations' }, body: { zh: '它要花钱、发信的时候会来找你点头——这一下别顺手点掉', en: 'It comes back for your nod before spending or sending — do not click that one away on reflex' } },
      ],
    },
    links: [{ label: '官网', href: 'https://muse.ai' }],
    screenshots: [
      { caption: { zh: '任务进行中的界面', en: 'A task in progress' } },
      { caption: { zh: 'Sentinel 确认弹窗', en: 'The Sentinel confirmation' } },
      { caption: { zh: 'App Store 榜单截图', en: 'Its App Store moment' } },
    ],
  },
];

export const agentBySlug = (slug: string) => agents.find((a) => a.slug === slug);
