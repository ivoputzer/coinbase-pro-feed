#!/usr/bin/env node

const { Transform } = require('stream')
const { EOL } = require('os')
const { feedFor } = require('..')

feedFor(process.argv.slice(2), { objectMode: false })
  .pipe(
    new Transform({
      transform (buffer, _, done) {
        done(null, Buffer.concat([buffer, Buffer.from(EOL)]))
      },
      flush (done) {
        done(null)
      }
    })
  )
  .pipe(process.stdout)
