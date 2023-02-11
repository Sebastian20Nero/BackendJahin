const pool = require('./pool')
const { Client } = require('pg')
const client = new Client(pool)
client.connect()

async function list(table, cond){
      const query=(`SELECT * FROM ${table} where estado='A' ${cond} `)
      const rst = await client.query(query);
      return rst.rows
  }

  async function upsert(query) { 
    const rst = await client.query(query); 
    const state=(rst.rowCount !== undefined && rst.rowCount > 0) ? true : false;
    return state                
  }

  async function remove(table, item, id){
      const query=(`DELETE FROM ${table}	WHERE ${item}=${id}::uuid::uuid;`)
      const rst = await client.query(query);
      return rst.rowCount
  }

  

module.exports = { 
    list,
    upsert,
    remove,
};