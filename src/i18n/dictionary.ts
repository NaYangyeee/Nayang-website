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

  'footer.built': {
    zh: '使用 React、TypeScript 与 Vite 构建。静态托管，无任何追踪。',
    en: 'Built with React, TypeScript and Vite. Statically hosted, no tracking.',
  },
  'footer.rights': { zh: '保留所有权利。', en: 'All rights reserved.' },
  'footer.top': { zh: '返回顶部', en: 'Back to top' },
} satisfies Record<string, L>;

export type UIKey = keyof typeof ui;
