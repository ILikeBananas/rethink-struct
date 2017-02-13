const rethink = require('rethinkdb')

function structurate(model = ensureArg('model'), connection = ensureArg('connection')) {
  return new Promise(async (resolve, reject) => {
    try {
      const dbList = await rethink.dbList().run(connection)
      for (const database of model.databases) {
        if (!~dbList.indexOf(database.name))
          await rethink.dbCreate(database.name).run(connection)

        const tbList = await rethink.db(database.name).tableList().run(connection)
        for (const table of database.tables) {
          if (!~tbList.indexOf(table.name))
            await rethink.db(database.name).tableCreate(table.name).run(connection)

          const idxList = await rethink.db(database.name).table(table.name).indexList().run(connection)
          for (const index of table.indexes) {
            if (!~idxList.indexOf(index))
              await rethink.db(database.name).table(table.name).indexCreate(index).run(connection)
          }
        }
      }
    } catch (err) {
      return reject(err)
    }
    console.log('Rethink structure asserted')
    resolve()
  })
}

function ensureArg(argName) {
  throw new Error(`Argument '${argName}' is missing...`)
}

module.exports = structurate