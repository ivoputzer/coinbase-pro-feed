test('coinbase-pro-feed', () => {
  const { deepStrictEqual } = require('assert')

  test('.feedFor', () => {
    const { feedFor } = require('..')

    test('is callable', () => {
      deepStrictEqual(typeof feedFor, 'function')
    })
  })
})
