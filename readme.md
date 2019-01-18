coinbase-pro-feed
===
Lightweight [Coinbase Pro Websocket Feed](https://docs.pro.coinbase.com/#websocket-feed) implementation.

[![travis](https://img.shields.io/travis/ivoputzer/coinbase-pro-feed.svg?style=for-the-badge)](https://travis-ci.org/ivoputzer/coinbase-pro-feed)
[![dependencies](https://img.shields.io/badge/dependencies-2-blue.svg?style=for-the-badge&colorB=44CC11)](https://www.npmjs.com/package/coinbase-pro-feed?activeTab=dependencies)
[![coverage status](https://img.shields.io/coveralls/ivoputzer/coinbase-pro-feed.svg?style=for-the-badge)](https://coveralls.io/github/ivoputzer/coinbase-pro-feed?branch=master)
[![linter](https://img.shields.io/badge/coding%20style-standard-brightgreen.svg?style=for-the-badge)](http://standardjs.com/)

[![node](https://img.shields.io/badge/node-6%2B-blue.svg?style=for-the-badge)](https://nodejs.org/docs/v6.0.0/api)
[![version](https://img.shields.io/npm/v/coinbase-pro-feed.svg?style=for-the-badge&colorB=007EC6)](https://www.npmjs.com/package/coinbase-pro-feed)
[![license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge&colorB=007EC6)](https://spdx.org/licenses/MIT)
[![minzip](https://img.shields.io/bundlephobia/minzip/coinbase-pro-feed.svg?style=for-the-badge)](https://bundlephobia.com/scan-results?packages=coinbase-pro-feed)
[![downloads](https://img.shields.io/npm/dt/coinbase-pro-feed.svg?style=for-the-badge&colorB=007EC6)](https://www.npmjs.com/package/coinbase-pro-feed)

## Install
```js
npm install -s coinbase-pro-feed
```

## .feedFor(product_ids[, options[, env]])
The feed wraps websocket client using `stream.Readable`:

```js
const { feedFor } = require('coinbase-pro-feed')

feedFor(['btc-eur'], { objectMode: false }) // when false
  .pipe(process.stdout)                     // data event invokes raw buffer

feedFor(['btc-eur'], { objectMode: true }) // when true
  .on('data', console.log)                 // data event invokes parsed object
```

- **product_ids** (default: `[]`)
- **options** (default: `{ objectMode = true, channels: ['full'] }`)
- **env** (default: `process.env`)

### .socketFor(product_ids[, options[, env]])
The websocket client allows you to connect and listen to exchange messages.

```js
const { feedFor } = require('coinbase-pro-feed')

socketFor(['btc-eur'], { channels })
  .on('open', () => {
    console.log('open') // socket connected
  })
  .on('data' (data) => {
    console.log('data:', data) // parsed messages
  })
  .on('error', (err) => {
    console.error('error:', err) // socket error
  })
  .on('close', () => {
    console.log('close') // socket closed
  })
```

## Command Line Interface (CLI)
When installed globally it is possibile to access the command line interface:

```shell
npm install --global coinbase-pro-feed
```

#### Usage
```shell
coinbase-pro-feed btc-eur eth-eur ltc-eur

# stdout compatible with http://jsonlines.org
```

<!--

The client will automatically subscribe to the heartbeat channel.
By default, the full channel will be subscribed to unless other channels are requested.

const websocket = new Gdax.WebsocketClient(
  ['BTC-USD', 'ETH-USD'],
  'wss://ws-feed-public.sandbox.pro.coinbase.com',
  {
    key: 'suchkey',
    secret: 'suchsecret',
    passphrase: 'muchpassphrase',
  },
  { channels: ['full', 'level2'] }
);
Optionally, change subscriptions at runtime:

websocket.unsubscribe({ channels: ['full'] });

websocket.subscribe({ product_ids: ['LTC-USD'], channels: ['ticker', 'user'] });

websocket.subscribe({
  channels: [
    {
      name: 'user',
      product_ids: ['ETH-USD'],
    },
  ],
});

websocket.unsubscribe({
  channels: [
    {
      name: 'user',
      product_ids: ['LTC-USD'],
    },
    {
      name: 'user',
      product_ids: ['ETH-USD'],
    },
  ],
});
The following events can be emitted from the WebsocketClient:

open
message
close
error
 -->
