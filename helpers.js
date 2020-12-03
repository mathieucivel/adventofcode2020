import got from 'got'
import session from './.session.js'

const CACHE = {}
const URL = 'https://adventofcode.com/2020/day/$$/input'

export async function fetchInput(day) {
  const url = URL.replace('$$', day)

  if (CACHE[day]) return CACHE[day]

  const response = await got(url, {headers : { cookie: session}})
  CACHE[day] = response.body.split("\n").filter(l => !!l)

  return CACHE[day]
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