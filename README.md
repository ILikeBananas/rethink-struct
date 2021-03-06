# RethinkStruct
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/Xstoudi/rethink-struct/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/rethink-struct.svg?style=flat-square)](https://npmjs.com/package/rethink-struct)
## Overview
Assert that databases, tables, indexes exists on your Rethink server and create it if they don't.

## Requirements
* NodeJS 7.x.x or higher
* Harmony flag `--harmony_async_await`

## How to assert ?
Assertion is made by reading a JSON file.
The JSON must be structurated like this:
```json
{
  "databases": [
    {
      "name": "database_name",
      "tables": [
        {
          "name": "table_name",
          "indexes": ["field_to_index", "second_field_to_index"]
        },
        {
          "name": "another_table_name"
        }
      ]
    },
    {
      "name": "another_database_name",
      "tables": [
        "a_table"
      ]
    }
  ]
}
```

Then:
```javascript
const rethink = require('rethinkdb')
const rethinkStruct = require('rethink-struct')
const rethinkConn = await rethink.connect()

await rethinkStruct(require('your.json'), conn)
```

## Example
You can find an example in the `example` folder.
