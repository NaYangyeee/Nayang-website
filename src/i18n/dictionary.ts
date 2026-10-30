import type { L } from '@/content/types';

/**
 * UI chrome only. Everything that is *content* lives in src/content.
 *
 * Keys are flat and dot-namespaced so a missing one is obvious at a glance,
 * and `check:keys` verifies that every key referenced in a component
 * actually exists here — a typo in a lookup otherwise renders as silence.
 */
export const ui = {
  'nav.skip': { zh: '跳到主要内容', en: 'Skip to content' },
  'nav.menu': { zh: '菜单', en: 'Menu' },
  'nav.close': { zh: '关闭', en: 'Close' },
  'nav.home': { zh: '首页', en: 'Home' },
  'nav.lang': { zh: '语言', en: 'Language' },
  'nav.contact': { zh: '联系我', en: 'Get in touch' },
  'nav.badminton': { zh: '羽球', en: 'Badminton' },

  'hero.scroll': { zh: '向下浏览', en: 'Scroll' },
  'hero.viewWork': { zh: '看项目', en: 'See the work' },
  'hero.email': { zh: '发邮件', en: 'Email me' },

  'work.eyebrow': { zh: '项目', en: 'Selected work' },
  'work.title': { zh: '我做过什么', en: 'What I have built' },
  'work.lede': {
    zh: '两个在真实业务里跑着的系统，一个还在预演阶段的机器人项目，一个为了弄懂框架而自己写的 CLI。每个数字后面都标了它的来源。',
    en: 'Two systems running in production, one robotics project still at pilot stage, and a CLI built from scratch to understand what the frameworks do. Every number is labelled with where it came from.',
  },
  'work.context': { zh: '背景', en: 'Context' },
  'work.did': { zh: '我负责的部分', en: 'What I owned' },

  'stage.production': { zh: '生产运行', en: 'In production' },
  'stage.pilot': { zh: '预演阶段', en: 'Pilot' },
  'stage.personal': { zh: '个人项目', en: 'Personal' },

  'prov.measured': { zh: '实测', en: 'Measured' },
  'prov.spec': { zh: '设定值', en: 'Specified' },
  'prov.illustrative': { zh: '示意', en: 'Illustrative' },
  'prov.explain': {
    zh: '实测 = 评测或线上运行中观察到的；设定值 = 配置或硬约束，不是结果；示意 = 用于表达量级，未经测量。',
    en: 'Measured = observed in an evaluation or production run. Specified = a configured value or hard constraint, not an outcome. Illustrative = conveys scale, not measured.',
  },

  'skills.eyebrow': { zh: '技术栈', en: 'Stack' },
  'skills.title': { zh: '用得上手的东西', en: 'What I work with' },
  'skills.lede': {
    zh: '按用途分组，不按熟练度排序 —— 熟练度是个没人能自评准的东西。',
    en: 'Grouped by what it is for, not ranked by proficiency — self-rated proficiency is a number nobody gets right.',
  },

  'path.eyebrow': { zh: '经历', en: 'Path' },
  'path.title': { zh: '怎么走到这里的', en: 'How I got here' },
  'path.work': { zh: '工作', en: 'Experience' },
  'path.education': { zh: '教育', en: 'Education' },

  'contact.eyebrow': { zh: '联系', en: 'Contact' },
  'contact.title': { zh: '聊聊', en: 'Let’s talk' },
  'contact.lede': {
    zh: '开放国内与海外的机会。邮件是最可靠的找到我的方式。',
    en: 'Open to opportunities in China and abroad. Email is the most reliable way to reach me.',
  },
  'contact.emailLabel': { zh: '邮箱', en: 'Email' },
  'contact.githubLabel': { zh: 'GitHub', en: 'GitHub' },

  'badminton.eyebrow': { zh: '工作之外', en: 'Beyond the desk' },
  'badminton.story': { zh: '来路', en: 'The story' },
  'badminton.gallery': { zh: '图集', en: 'Gallery' },
  'badminton.galleryNote': {
    zh: '照片陆续补充中',
    en: 'Photos being added',
  },
  'badminton.coming': { zh: '待补', en: 'Coming' },
  'badminton.photo': { zh: '照片', en: 'Photo' },
  'badminton.prev': { zh: '上一张', en: 'Previous' },
  'badminton.next': { zh: '下一张', en: 'Next' },
  'badminton.back': { zh: '回到主页', en: 'Back to the main site' },
  'badminton.backNote': {
    zh: '这里只是生活的一部分 —— 工作经历在主页',
    en: 'Just one part of the story — the work is on the main page',
  },

  'nav.books': { zh: '书架', en: 'Books' },
  'nav.agents': { zh: '智能体笔记', en: 'Agents' },
  'nav.product': { zh: '产品与项目', en: 'Product' },

  'product.eyebrow': { zh: '另一只手', en: 'The other hand' },
  'product.requirements': { zh: '我做需求的方式', en: 'How I do requirements' },
  'product.delivery': { zh: '我带节奏的方式', en: 'How I run delivery' },
  'product.frameworks': { zh: '常用框架', en: 'The small toolkit' },

  'books.eyebrow': { zh: '书房', en: 'The study' },
  'books.title': { zh: '书架', en: 'The bookshelf' },
  'books.lede': {
    zh: '摆在手边的书。点开一本看它为什么在这里——慢慢补。',
    en: 'The books within reach. Open one to see why it earns its shelf — growing slowly.',
  },
  'books.countNote': { zh: '本，还会继续增加', en: 'books, and counting' },
  'books.noNote': { zh: '这本书的笔记待补。', en: 'A note for this one is still being written.' },
  'books.beyondTitle': { zh: '书架', en: 'The bookshelf' },
  'books.beyondText': {
    zh: '四大名著和几本反复读的外国小说。每本一句话，说它为什么还摆在手边。',
    en: 'The four Chinese classics and a shelf of re-read foreign novels, one line each on why they stay within reach.',
  },

  'agents.eyebrow': { zh: '工具笔记', en: 'Field notes' },
  'agents.fresh': { zh: '新', en: 'New' },
  'agents.strengths': { zh: '强在哪', en: 'Where it is strong' },
  'agents.usage': { zh: '我的用法', en: 'How I use it' },
  'agents.caveat': { zh: '注意', en: 'The catch' },
  'agents.coming': { zh: '截图待补', en: 'Shot coming' },
  'agents.backToList': { zh: '回到笔记列表', en: 'Back to the notes' },
  'agents.next': { zh: '下一个', en: 'Next up' },
  'agents.installTitle': { zh: '把它装起来', en: 'Install it' },
  'agents.installNote': {
    zh: '步骤按我写笔记时点的版本为准——这类工具迭代很快，装不动了先看官方文档。',
    en: 'Steps are as of when I wrote this — these tools iterate fast; if a step breaks, the official docs win.',
  },
  'agents.desktop': { zh: '电脑端', en: 'Desktop' },
  'agents.mobile': { zh: '手机端', en: 'Mobile' },
  'agents.mobileNone': {
    zh: '它没有手机端，也不该有——一个给你读源码的框架，装在手机上只会挡住键盘。',
    en: 'No mobile, and it should not have one — a framework you are meant to read would only be in the way on a phone.',
  },
  'agents.screenshots': { zh: '它长什么样', en: 'What it looks like' },
  'agents.screenshotsNote': {
    zh: '真实截图整理中',
    en: 'Real screenshots on the way',
  },
  'agents.sources': { zh: '官方来源', en: 'Official sources' },
  'agents.docNote': {
    zh: '以上链接都是官方渠道。本页只是个人笔记，任何信息与官方文档冲突时，以官方为准。',
    en: 'All links above are official. This page is personal notes — where anything conflicts, the official docs win.',
  },
  'agents.note': {
    zh: '以上全是个人使用笔记，不是评测也不是排名。工具会更新，笔记也会跟着改。',
    en: 'All of the above is personal field notes — not a review, not a ranking. The tools update, and so will these.',
  },

  'beyond.eyebrow': { zh: '多面', en: 'Beyond work' },
  'beyond.title': { zh: '工作之外的崔力娜', en: 'Lina, outside the résumé' },
  'beyond.lede': {
    zh: '不喧宾夺主 —— 简历在楼上，这里放一两件她真正在乎的事。',
    en: 'Deliberately small. The résumé is upstairs; this is a door to the rest of her.',
  },
  'beyond.badmintonTitle': { zh: '羽球生涯', en: 'Badminton, seriously' },
  'beyond.badmintonText': {
    zh: '打得最久、最认真的一项运动。比赛、训练、球拍和那些照片，在另一个场子里。',
    en: 'The sport she has played longest and most seriously. Matches, training, rackets and photos live on their own court.',
  },
  'beyond.go': { zh: '进去看看', en: 'Step in' },

  'path.posterCaption': {
    zh: '品牌海报 · 插画风格，非本人照片',
    en: 'Brand poster · illustration, not a portrait',
  },

  'contact.cv': { zh: '下载简历', en: 'Download CV' },

  'nf.title': { zh: '这里没有页面', en: 'No page here' },
  'nf.body': {
    zh: '这个地址打不出来东西——可能是链接写错了。主页没丢。',
    en: 'That address leads nowhere — probably a typo in the link. The home page is fine.',
  },
  'nf.home': { zh: '回到主页', en: 'Back to the home page' },

  'footer.built': {
    zh: '使用 React、TypeScript 与 Vite 构建。静态托管，无任何追踪。',
    en: 'Built with React, TypeScript and Vite. Statically hosted, no tracking.',
  },
  'footer.rights': { zh: '保留所有权利。', en: 'All rights reserved.' },
  'footer.top': { zh: '返回顶部', en: 'Back to top' },
} satisfies Record<string, L>;

export type UIKey = keyof typeof ui;
