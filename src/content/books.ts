import type { L } from './types';

/**
 * 书架 — the bookshelf.
 *
 * One entry per book; the shelf fills itself and wraps into new rows, so
 * adding a book later is one object. Notes are optional and are meant to be
 * one line in her own words — the current ones are drafts she can keep or
 * rewrite. Colours come from a fixed spine palette so the shelf never turns
 * into a rainbow; `hue` picks which family a book stands in.
 */

export type Book = {
  title: L;
  author: L;
  /** 四大名著 / 外国经典 — the two shelves this starts with. */
  group: L;
  note?: L;
  /** Spine colour index into the palette below. */
  hue: number;
};

/** Spine families. Muted ink, oxblood, forest, ochre — a library, not a toybox. */
export const SPINES = [
  '#7a3b2e', // oxblood
  '#2f4a3c', // forest
  '#b98e2f', // ochre
  '#31435c', // slate
  '#5c3a6b', // plum
  '#8a4a5a', // rosewood
  '#4a5a4a', // moss
  '#6b5632', // umber
] as const;

export const books: Book[] = [
  {
    title: { zh: '三国演义', en: 'Romance of the Three Kingdoms' },
    author: { zh: '罗贯中', en: 'Luo Guanzhong' },
    group: { zh: '四大名著', en: 'Chinese classics' },
    note: {
      zh: '谋略书里写得最好的，是人——每个决策后面都站着一个会犯错的人。',
      en: 'The best book about strategy, because every scheme has a fallible person behind it.',
    },
    hue: 0,
  },
  {
    title: { zh: '红楼梦', en: 'Dream of the Red Chamber' },
    author: { zh: '曹雪芹', en: 'Cao Xueqin' },
    group: { zh: '四大名著', en: 'Chinese classics' },
    note: {
      zh: '细节里全是伏笔。值得读两遍，第二遍看结构。',
      en: 'Foreshadowing in every detail. Worth two reads — the second one is about structure.',
    },
    hue: 5,
  },
  {
    title: { zh: '西游记', en: 'Journey to the West' },
    author: { zh: '吴承恩', en: 'Wu Cheng’en' },
    group: { zh: '四大名著', en: 'Chinese classics' },
    note: {
      zh: '小时候看打妖怪，长大后看的是团队：四个人各有各的毛病，凑在一起才走得完。',
      en: 'As a kid you see the monsters; later you see the team — four flawed people who only make it together.',
    },
    hue: 2,
  },
  {
    title: { zh: '水浒传', en: 'Water Margin' },
    author: { zh: '施耐庵', en: 'Shi Nai’an' },
    group: { zh: '四大名著', en: 'Chinese classics' },
    note: {
      zh: '一百零八个人的众生相。最喜欢看每个人上山的理由——没有一个是一样的。',
      en: 'A hundred and eight faces of the world. The reasons each one goes up the mountain are never the same.',
    },
    hue: 1,
  },
  {
    title: { zh: '战争与和平', en: 'War and Peace' },
    author: { zh: '托尔斯泰', en: 'Leo Tolstoy' },
    group: { zh: '外国经典', en: 'Foreign classics' },
    note: {
      zh: '宏大叙事里最打动我的反而是个人：战争再大，日子还是具体的一天一天过的。',
      en: 'For all its scale, what stays is the personal — history moves, and people live it one day at a time.',
    },
    hue: 3,
  },
  {
    title: { zh: '百年孤独', en: 'One Hundred Years of Solitude' },
    author: { zh: '加西亚·马尔克斯', en: 'Gabriel García Márquez' },
    group: { zh: '外国经典', en: 'Foreign classics' },
    note: {
      zh: '第一句就决定全书气质的小说。布恩迪亚家族的名字难记，但时间的感觉忘不掉。',
      en: 'A novel whose first sentence sets its whole climate. You forget the names, never the sense of time.',
    },
    hue: 4,
  },
  {
    title: { zh: '1984', en: 'Nineteen Eighty-Four' },
    author: { zh: '乔治·奥威尔', en: 'George Orwell' },
    group: { zh: '外国经典', en: 'Foreign classics' },
    note: {
      zh: '读的时候会不舒服，但"新话"这个设定让我重新想清楚语言和思考的关系。',
      en: 'An uncomfortable read. Newspeak made me think properly about what language does to thought.',
    },
    hue: 3,
  },
  {
    title: { zh: '了不起的盖茨比', en: 'The Great Gatsby' },
    author: { zh: '菲茨杰拉德', en: 'F. Scott Fitzgerald' },
    group: { zh: '外国经典', en: 'Foreign classics' },
    note: {
      zh: '薄薄一本，全是克制。结尾那盏绿灯是文学里我最喜欢的意象之一。',
      en: 'Thin, and all restraint. The green light is one of my favourite images in literature.',
    },
    hue: 2,
  },
  {
    title: { zh: '傲慢与偏见', en: 'Pride and Prejudice' },
    author: { zh: '简·奥斯汀', en: 'Jane Austen' },
    group: { zh: '外国经典', en: 'Foreign classics' },
    note: {
      zh: '两百年前的对话到今天还是活的。伊丽莎白的机智是最好的那一种——不服输但不刻薄。',
      en: 'Dialogue that is still alive two centuries on. Elizabeth’s wit is the best kind — stubborn, never mean.',
    },
    hue: 6,
  },
  {
    title: { zh: '老人与海', en: 'The Old Man and the Sea' },
    author: { zh: '海明威', en: 'Ernest Hemingway' },
    group: { zh: '外国经典', en: 'Foreign classics' },
    note: {
      zh: '"一个人可以被毁灭，但不能被打败。"短，但每一句都有重量。',
      en: '“A man can be destroyed but not defeated.” Short, and every sentence carries weight.',
    },
    hue: 1,
  },
  {
    title: { zh: '小王子', en: 'The Little Prince' },
    author: { zh: '圣埃克苏佩里', en: 'Antoine de Saint-Exupéry' },
    group: { zh: '外国经典', en: 'Foreign classics' },
    note: {
      zh: '常读常新：小时候是童话，现在是"驯养"和"独一无二的玫瑰"。',
      en: 'It changes with you — a fairy tale first, later a book about taming and a rose that is unique.',
    },
    hue: 2,
  },
  {
    title: { zh: '月亮与六便士', en: 'The Moon and Sixpence' },
    author: { zh: '毛姆', en: 'W. Somerset Maugham' },
    group: { zh: '外国经典', en: 'Foreign classics' },
    note: {
      zh: '不歌颂理想主义，只是把"一个人真的去追月亮"这件事讲得让人没法忽视。',
      en: 'It does not glorify idealism — it just makes a man actually chasing the moon impossible to ignore.',
    },
    hue: 4,
  },
];
