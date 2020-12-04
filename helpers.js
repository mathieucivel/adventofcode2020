import got from 'got'
import session from './.session.js'

const CACHE = {}
const URL = 'https://adventofcode.com/2020/day/$$/input'

export async function fetchInput(day, {splitNewLine = true, splitBlankLine = false} = {}) {
  const url = URL.replace('$$', day)

  let data
  if (CACHE[day]) {
    data = CACHE[day]
  } 
  else {
    const response = await got(url, {headers : { cookie: session}})
    data = response.body
    CACHE[day] = data
  }

  if (splitBlankLine) {
    return data.split("\n\n").map(l => l.replace(/\n/gm, ' '))
  }

  if (splitNewLine) {
    return data.split("\n").filter(l => !!l)
  }
  
  return data
}

export function parseInput(input, regexp, ...mapping) {
  return input
    .map(i => regexp.exec(i))
    .map(r => {
      const result = {}
      mapping.forEach((key, i) => {
        result[key] = r[i+1]
      })
      return result
    })
}