/* eslint-disable camelcase */

const { config } = require('./package')

exports.parseBoolean = (variable) => {
  return ['yes', 'true', '1'].includes(variable)
}

exports.addressFor = ({ npm_config_coinbase_pro_socket_sandbox, npm_config_coinbase_pro_socket_address } = process.env, { coinbase_pro_socket_address, coinbase_pro_socket_sandbox_address } = config, { parseBoolean } = exports) => {
  if (npm_config_coinbase_pro_socket_address) {
    return npm_config_coinbase_pro_socket_address
  }

  if (parseBoolean(npm_config_coinbase_pro_socket_sandbox)) {
    return coinbase_pro_socket_sandbox_address
  }

  return coinbase_pro_socket_address
}

const util = require('coinbase-pro-api/util')

exports.messageFor = ({ product_ids, channels }, { npm_config_coinbase_pro_api_key, npm_config_coinbase_pro_api_passphrase, npm_config_coinbase_pro_api_secret } = process.env, { signatureFor } = util) => {
  return JSON.stringify({ product_ids, channels, type: 'subscribe' })
  // const timestamp = 1e-3 * Date.now()
  // return JSON.stringify({
  //   product_ids,
  //   channels,
  //   timestamp,
  //   signature: signatureFor({ timestamp, method: 'get', path: '/users/self/verify' }, { npm_config_coinbase_pro_api_secret }),
  //   key: npm_config_coinbase_pro_api_key,
  //   passphrase: npm_config_coinbase_pro_api_passphrase,
  //   type: 'subscribe'
  // })
}

exports.socketFor = (product_ids, { channels = ['full'] } = Object.prototype, env = process.env, Socket = require('ws'), { addressFor, messageFor } = exports) => {
  if (!channels.includes('heartbeat')) channels.push('heartbeat')

  return new Socket('wss://' + addressFor(env))
    .on('open', onOpen)
    .once('message', onSubscription)

  function onOpen () {
    const message = messageFor({ product_ids, channels }, env)
    this.send(message, err => {
      if (err) this.emit('error', err)
    })
  }

  function onSubscription (message, { parse } = JSON) {
    const subscription = parse(message)

    if (subscription.type === 'error') {
      this.emit('error', new Error(subscription.message + ' (' + subscription.reason + ')'))
    } else {
      this.on('message', (message) => this.emit('data', message))
    }
  }
}
