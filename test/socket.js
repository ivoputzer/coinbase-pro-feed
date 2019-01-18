test('coinbase-pro-feed/socket', () => {
  const { ok, strictEqual, deepStrictEqual } = require('assert')

  test('.parseBoolean', () => {
    const { parseBoolean } = require('../socket')

    test('is callable', () => {
      deepStrictEqual(typeof parseBoolean, 'function')
    })

    test('is true for `1` string', () => {
      const boolean = parseBoolean('1')
      deepStrictEqual(boolean, true)
    })

    test('is true for `true` stirng', () => {
      const boolean = parseBoolean('true')
      deepStrictEqual(boolean, true)
    })

    test('is true for `yes` string', () => {
      const boolean = parseBoolean('yes')
      deepStrictEqual(boolean, true)
    })

    test('is false for every other value', () => {
      const boolean = parseBoolean('false')
      deepStrictEqual(boolean, false)
    })
  })

  test('.addressFor', () => {
    const { addressFor } = require('../socket')

    test('is callable', () => {
      deepStrictEqual(typeof addressFor, 'function')
    })

    test('returns overridden address when present', () => {
      const address = addressFor({ npm_config_coinbase_pro_socket_address: 'address' })
      deepStrictEqual(address, 'address')
    })

    test('returns sandbox address when switched', () => {
      const address = addressFor({ npm_config_coinbase_pro_socket_sandbox: 'true' })
      deepStrictEqual(address, process.env.npm_package_config_coinbase_pro_socket_sandbox_address)
    })

    test('returns production address by default', () => {
      const address = addressFor()
      deepStrictEqual(address, process.env.npm_package_config_coinbase_pro_socket_address)
    })
  })

  test('.messageFor', () => {
    const { messageFor } = require('../socket')

    test('is callable', () => {
      deepStrictEqual(typeof messageFor, 'function')
    })

    test('returns authenticated subscription message', () => {
      const message = JSON.parse(messageFor({
        product_ids: ['btc-eur'],
        channels: ['heartbeat', 'full']
      }))

      deepStrictEqual(message.product_ids, ['btc-eur'])
      deepStrictEqual(message.channels, ['heartbeat', 'full'])
    })

    test('returns authenticated subscription message when configuration is present', () => {
      const message = JSON.parse(messageFor({
        product_ids: ['btc-eur'],
        channels: ['heartbeat', 'full']
      }, {
        npm_config_coinbase_pro_api_key: 'key',
        npm_config_coinbase_pro_api_passphrase: 'passphrase',
        npm_config_coinbase_pro_api_secret: 'secret'
      }))

      deepStrictEqual(message.product_ids, ['btc-eur'])
      deepStrictEqual(message.channels, ['heartbeat', 'full'])
      ok(message.hasOwnProperty('timestamp'))
      ok(message.hasOwnProperty('signature'))
      strictEqual(message.key, 'key')
      strictEqual(message.passphrase, 'passphrase')
      strictEqual(message.type, 'subscribe')
    })
  })

  test('.socketFor', () => {
    const { socketFor } = require('../socket')

    test('is callable', () => {
      deepStrictEqual(typeof socketFor, 'function')
    })
  })
})
