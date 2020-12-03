import {fetchInput, parseInput} from './helpers.js'


let input = await fetchInput(3)

const l = 31

function isTreeInRow(row, index) {
  return row[index % l] === '#'
}

function countTreeSlope(rows, right = 3, down = 1) {
  let count = 0
  let x = 0
  for (let i = 0; i < rows.length; i+=down) {
    const row = rows[i];
    if (isTreeInRow(row, x)) count++
    x += right
  }
  return count
}

console.log(countTreeSlope(input));


// -------------


const result2 = 
  countTreeSlope(input, 1, 1) *
  countTreeSlope(input, 3, 1) *
  countTreeSlope(input, 5, 1) *
  countTreeSlope(input, 7, 1) *
  countTreeSlope(input, 1, 2)

console.log(result2)

