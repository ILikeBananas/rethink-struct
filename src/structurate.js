const assert = require('assert')
const rethink = require('rethinkdb')

function structurate(model = ensureArg('model'), connection = ensureArg('connection')) {
  return new Promise(async (resolve, reject) => {
    try {
      const dbList = await rethink.dbList().run(connection)

      assert(model.databases, "Can't find 'databases'")
      assert(Array.isArray(model.databases), "'databases' should be an array")

      for (const database of model.databases) {
        assert(database.name, 'A database has no name')
        if (!~dbList.indexOf(database.name))
          await rethink.dbCreate(database.name).run(connection)

        const tbList = await rethink.db(database.name).tableList().run(connection)

        assert(database.tables, "Can't find 'tables'")
        assert(Array.isArray(database.tables), "'tables' should be an array")

        for (const table of database.tables) {
          assert(table.name, 'A table has no name')
          if (!~tbList.indexOf(table.name))
            await rethink.db(database.name).tableCreate(table.name).run(connection)

          const idxList = await rethink.db(database.name).table(table.name).indexList().run(connection)
          
          assert(table.indexes, "Can't find 'tables'")
          assert(Array.isArray(table.indexes), "'tables' should be an array")

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