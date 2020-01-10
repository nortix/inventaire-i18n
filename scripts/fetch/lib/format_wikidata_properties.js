#!/usr/bin/env node
var text = ''

const aggregateIndex = (index, propData) => {
  const { property, label } = propData
  index[property] = label
  return index
}

process.stdin
.on('data', buf => text += buf.toString())
.on('close', () => {
  const formatted = JSON.parse(text).reduce(aggregateIndex, {})
  console.log(JSON.stringify(formatted, null, 2))
})
.on('error', err => {
  console.error(err)
  process.exit(1)
})
