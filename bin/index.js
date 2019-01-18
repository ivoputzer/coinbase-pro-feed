#!/usr/bin/env node

const { EOL } = require('os')
const { feedFor } = require('..')

feedFor(process.argv.slice(2), { objectMode: false })
  .on('error', console.error)
  .once('data', function () {
    this.on('data', process.stdout.write.bind(process.stdout, EOL))
  })
  .pipe(process.stdout)
