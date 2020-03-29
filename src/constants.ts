export enum City {
  moscow = 'moscow',
  nsk = 'novosibirsk',
  barnaul = 'barnaul',
  talmenka = 'talmenka',
}

interface User {
  city: City;
  userId: string;
  chatId: number;
}

export const users = new Map<string, User>([
  ['roman', { city: City.nsk, userId: '181897343', chatId: 506029551 }],
  ['vikaMSK', { userId: '90274813', city: City.barnaul, chatId: 924804423 }],
  ['vikaBarnaul', { userId: '90274813', city: City.talmenka, chatId: 924804423 }],
  ['vikaTalmenka', { userId: '90274813', city: City.talmenka, chatId: 924804423 }],
  ['andrej', { userId: '85101500', city: City.nsk, chatId: 234 }],
]);

export enum Sticker {
  notGood = 16177,
  good = 16194,
}
