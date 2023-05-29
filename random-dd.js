#!/usr/bin/env node

let fs = require('fs')

let args = Object.fromEntries(process.argv.slice(2).map(arg => arg.split('=')))

if (!args.of) {
  console.error('missing "of" output file argument')
  process.exit(1)
}

args.bs ||= '512'
args.count ||= '0'

let count = +args.count

function start() {
  if (count > 0) {
    loopI(count)
  } else {
    loopEndless()
  }
}

let bs = +args.bs
let i = 0
let buffer = Buffer.alloc(bs)
let stream = fs.createWriteStream(args.of)

let { random } = Math

function loopI() {
  if (i === count) {
    end()
  } else {
    write(loopI)
  }
}

function loopEndless() {
  write(loopEndless)
}

const reportInterval = 1000

let bytes = 0
let startTime = Date.now()
let nextReportTime = startTime + reportInterval

function write(cb) {
  for (let i = 0; i < bs; i++) {
    buffer[i] = (random() * 256) >> 0
  }
  stream.write(buffer, err => {
    if (err) {
      console.error(err)
      process.exit(1)
    } else {
      i++
      bytes += bs
      let now = Date.now()
      if (now >= nextReportTime) {
        report()
        nextReportTime = now + reportInterval
      }
      cb()
    }
  })
}

function format1024() {
  if (bytes > 1024 ** 3) {
    return (bytes / 1024 ** 3).toFixed(1) + ' GiB'
  }
  if (bytes > 1024 ** 2) {
    return (bytes / 1024 ** 2).toFixed(1) + ' MiB'
  }
  if (bytes > 1024 ** 1) {
    return (bytes / 1024).toFixed(1) + ' KiB'
  }
  return bytes + ' B'
}
function format1000() {
  if (bytes > 1000 ** 3) {
    return (bytes / 1000 ** 3).toFixed(1) + ' GB'
  }
  if (bytes > 1000 ** 2) {
    return (bytes / 1000 ** 2).toFixed(1) + ' MB'
  }
  if (bytes > 1000 ** 1) {
    return (bytes / 1000).toFixed(1) + ' KB'
  }
  return bytes + ' B'
}

function report() {
  let time = Date.now() - startTime
  let speed = bytes / (time / 1000) / 1024 / 1024
  let timeStr = (time / 1000).toFixed(0) + ' s'
  let speedStr = speed.toFixed(1) + ' MB/s'
  process.stdout.write(
    `\r${bytes} bytes (${format1000()}, ${format1024()}) copied, ${timeStr}, ${speedStr}`,
  )
}

function end() {
  report()
  console.log('\ndone.')
}

process.on('SIGINT', () => {
  console.log(`\n${i.toLocaleString()} records out`)
  report()
  console.log()
  process.exit(0)
})

start()
