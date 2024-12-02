"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkProfanity = void 0;
const bannedWords = [
    'bad word',
    'another bad word',
];
const checkProfanity = (text) => {
    return bannedWords.some((word) => text.includes(word));
};
exports.checkProfanity = checkProfanity;
