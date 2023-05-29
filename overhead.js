let start = Date.now()
let next = start + 1000
let i = 0
for (;;) {
  i++
  // Date.now()
  let now = Date.now()
  if (now >= next) {
    report()
    next = now + 1000
  }
}
function report() {
  let time = (Date.now() - start) / 1000
  let speed = (+(i / time).toFixed(1)).toLocaleString() + ' op/s'
  time = time.toLocaleString() + ' s'
  let n = i.toLocaleString()
  process.stdout.write(`\r${n}, ${time}, ${speed}   `)
}
loop()
