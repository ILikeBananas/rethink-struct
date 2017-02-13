(async () => {
  const rethtruct = require('../src/structurate')
  const rethink = require('rethinkdb')

  try {
    const conn = await rethink.connect({ hostname: 'localhost' })
    await rethtruct(require('./sample.json'))
    console.log('Done')
  } catch (e) {
    console.error(e)
  }
})()