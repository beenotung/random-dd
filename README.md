# random-dd

cross-platform `dd` implemented in node.js, to overcome performance penalty on windows.

[![npm Package Version](https://img.shields.io/npm/v/random-dd)](https://www.npmjs.com/package/random-dd)

## Why not use dd from git bash?

`dd` on windows run very slow when reading from `/dev/random`.

## Benchmark

Test ran on a windows laptop (samsung penbook 9).

Arguments: `if=/dev/random of=file bs=1048576 count=1024 status=progress`

`dd`: 2.2MB/s
`random-dd`: 79.0MB/s

## Installation (optional)

```bash
npm i -g random-dd
```

## Usage

Below usage example write 500MiB random content to file

Using with installation:

```bash
random-dd of=file bs=1024000 count=500
```

Using without installation:

```bash
npx -y random-dd of=file bs=1024000 count=500
```

## License

This project is licensed with [BSD-2-Clause](./LICENSE)

This is free, libre, and open-source software. It comes down to four essential freedoms [[ref]](https://seirdy.one/2021/01/27/whatsapp-and-the-domestication-of-users.html#fnref:2):

- The freedom to run the program as you wish, for any purpose
- The freedom to study how the program works, and change it so it does your computing as you wish
- The freedom to redistribute copies so you can help others
- The freedom to distribute copies of your modified versions to others
