import {fetchInput, parseInput} from './helpers.js'


let input = await fetchInput(4, {splitBlankLine:true}) 

const r = /(\w{3}):([^\s]+)/g

const entries = input.map(i => i.match(r)) 
  .map(res => res.reduce((acc, v) => Object.assign(acc, Object.fromEntries([v.split(':')])), {})) 


const REQUIRED_FIELDS = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid' 
]

function isValid(entry) {
  for (const field of REQUIRED_FIELDS) {
    if (!entry[field]) return false
  }
  return true
}


const result1 = entries.map(isValid).reduce((count, e) => count += e, 0)

console.log(result1);


// -------------

const VALIDATIONS = [
  e => +e >= 1920 && +e <= 2002,
  e => +e >= 2010 && +e <= 2020,
  e => +e >= 2020 && +e <= 2030,
  e => {
    const m = e.match(/^(\d{2,3})(in|cm)$/)
    if (!m) return false
    const n = +m[1]
    return m[2] === 'cm' ? n >= 150  && n <= 193 : n >= 59  && n <= 76
  },
  e => /^#[0-9a-f]{6}$/.test(e),
  e => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(e),
  e => /^[0-9]{9}$/.test(e),
]

const t = '124cm'


function isValid2(entry) {
  for (let i = 0; i < REQUIRED_FIELDS.length; i++) {
    const field = REQUIRED_FIELDS[i];
    const validation =  VALIDATIONS[i] 
    if (!entry[field]) return false
    if (!validation(entry[field])) return false
  }
  
  return true
}

const result2 = entries.map(isValid2).reduce((count, e) => count += e, 0)

console.log(result2);

