export enum City {
    moscow = 'moscow',
    nsk = 'novosibirsk',
}

interface User {
    city: City;
    userId: string;
}

export const users = new Map<string, User>([
    ['roman', { city: City.nsk, userId: '181897343' }],
    ['vika', { userId: '90274813', city: City.moscow }],
    ['andrej', {userId: '85101500', city: City.nsk}]
]);

export enum Sticker {
    notGood = 16177,
    good = 16194,
}
