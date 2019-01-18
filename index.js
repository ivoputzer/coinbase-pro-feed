/* eslint-disable camelcase */

const { Readable } = require('stream')

const socket = require('./socket')

exports.feedFor = (product_ids, { channels, objectMode = true } = Object.prototype, env = process.env, { socketFor } = socket) => {
  const feed = new Readable({ objectMode, read: Function.prototype })

  socketFor(product_ids, { channels }, env)
    .on('data', function onMessage (data) {
      try {
        feed.push(objectMode ? JSON.parse(data) : data)
      } catch (err) {
        this.emit('error', err) // does this work?
        this.removeListener('data', onMessage) // is this is necessary?
      }
    })
    .on('error', function onError (err) {
      feed.emit('error', err) // does this work?
      this.close() // is this is necessary?
    })

  return feed
}

// exports.coinbaseProFeedFor = (product_ids, {
//   sandbox = false,
//   channels = ['full'],
//   auth = {}
// } = Object.prorotype, {
//   stringify
// } = JSON, Websocket = require('ws'), {EOL} = require('os'), {Readable} = require('stream')) => {
//   if (!channels.includes('heartbeat')) channels.push('heartbeat')

//   const feed = new Readable({ objectMode: true, read: Function.prototype })
//   const sock = new Websocket(sandbox ? 'wss://ws-feed-public.sandbox.pro.coinbase.com' : 'wss://ws-feed.pro.coinbase.com')
//     .on('open', () => {
//       const timestamp = 1e-3 * Date.now()
//       const message = stringify({
//         product_ids,
//         channels,
//         timestamp,
//         signature: signatureFor({ timestamp, method: 'get', path: '/users/self/verify' }, { npm_config_coinbase_pro_api_secret }),
//         key: npm_config_coinbase_pro_api_key,
//         passphrase: npm_config_coinbase_pro_api_passphrase,
//         type: 'subscribe'
//       })
//       sock.send(message, err => {
//         // if (err) feed.emit('error', err)
//       })
//     })
//     .once('message', ({type, reason}) => {
//       if (type === 'error') throw new Error(reason)
//       sock.on('message', data => feed.push(data + EOL))
//     })
//     .on('close', () => {
//       feed.push(null)
//     })

//   return feed
// }
