const bannedWords = [
    'bad word',
    'another bad word',
];

export const checkProfanity = (text: string): boolean => {
    return bannedWords.some((word) => text.includes(word));
};

