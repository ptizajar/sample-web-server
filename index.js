const sqlite3 = require('promised-sqlite3');
const fs=require('fs')
async function new_database(){
  const db = await sqlite3.AsyncDatabase.open('mydb.db');
  await db.run("CREATE TABLE IF NOT EXISTS stuff (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, artic TEXT)");
  const express = require('express')
  const app = express()
  const port = 3000
  app.use(express.static('public'));

  app.get('/', (req, res) => {
    res.send('Hello World!')
  })

  app.get('/stuff',async (req,res)=>{
   const rows=await db.all("SELECT * FROM stuff");
   const text_rows=rows.map((row)=>{return `<tr><td>${row.name}</td><td>${row.artic}</td></tr>`;}).join('\n');
   const filik=await fs.promises.readFile('public/stuff.html', 'utf8') ;
   let newStr = filik.replace('{{rows}}', text_rows);

   res.send(newStr);

});
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }) 
}
new_database()