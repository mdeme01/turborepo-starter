import { customAlphabet } from 'nanoid'

const numberChars = '0123456789'
const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
const upperCaseChars = lowerCaseChars.toUpperCase()
const specialChars = '_'

const alphabet = numberChars + lowerCaseChars + upperCaseChars + specialChars

export const nanoid = customAlphabet(alphabet, 16)
