interface ISidebarItem {
  url: string;
  name: string;
}

export const SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    url: crypto.randomUUID(),
    name: 'По проекту',
  },
  {
    url: crypto.randomUUID(),
    name: 'Объекты',
  },
  {
    url: crypto.randomUUID(),
    name: 'РД',
  },
  {
    url: crypto.randomUUID(),
    name: 'МТО',
  },
  {
    url: '/',
    name: 'СМР',
  },
  {
    url: crypto.randomUUID(),
    name: 'График',
  },
  {
    url: crypto.randomUUID(),
    name: 'МиМ',
  },
  {
    url: crypto.randomUUID(),
    name: 'Рабочие',
  },
  {
    url: crypto.randomUUID(),
    name: 'Капвложения',
  },
  {
    url: crypto.randomUUID(),
    name: 'Бюджет',
  },
  {
    url: crypto.randomUUID(),
    name: 'Финансирование',
  },
  {
    url: crypto.randomUUID(),
    name: 'Панорамы',
  },
  {
    url: crypto.randomUUID(),
    name: 'Камеры',
  },
  {
    url: crypto.randomUUID(),
    name: 'Поручения',
  },
  {
    url: crypto.randomUUID(),
    name: 'Контрагенты',
  },
];
