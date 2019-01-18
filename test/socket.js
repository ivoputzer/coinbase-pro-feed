test('coinbase-pro-feed/socket', () => {
  const { deepStrictEqual } = require('assert')

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
  })

  test('.socketFor', () => {
    const { socketFor } = require('../socket')

    test('is callable', () => {
      deepStrictEqual(typeof socketFor, 'function')
    })
  })
})
