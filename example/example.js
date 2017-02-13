(async () => {
  const rethtruct = require('../src/structurate')
  const rethink = require('rethinkdb')

  try {
    const conn = await rethink.connect({ hostname: 'localhost' })
    await rethtruct(require('./sample.json'), conn)
    console.log('Done')
  } catch (e) {
    console.error(e)
  }
})()