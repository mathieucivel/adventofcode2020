import {fetchInput, parseInput} from './helpers.js'


const input = await fetchInput('https://adventofcode.com/2020/day/2/input')

const passwords = parseInput(
  input, 
  /^(\d+)+-(\d+)+\s(\w):\s(\w+)$/, 
  'min', 'max', 'letter', 'password'
)

function countLetters(string, letter) {
  return Array.from(string).reduce((acc, l) => acc + +(l === letter), 0)
}

function isValid1({min, max, letter, password}) {
  const count = countLetters(password, letter)
  return count >= min && count <= max
}

const valids1 = passwords.map(isValid1).filter(v => !!v).length

console.log(valids1);


// -------------

function isValid2({min, max, letter, password}) {
  const pa = Array.from(password) 
  const l1 = pa[min - 1] 
  const l2 = pa[max - 1] 
  const is_l1_letter = l1 === letter 
  const is_l2_letter = l2 === letter 
  return !!(is_l1_letter ^ is_l2_letter) 
}

const valids2 = passwords.map(isValid2).filter(v => !!v).length

console.log(valids2);

