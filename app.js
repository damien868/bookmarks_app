const Sequelize = require('sequelize')
const { STRING } = Sequelize;
const db = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/bookmarks')
const html=require('html-template-tag')
const express=require('express')
const app=express();

const syncAndSeed = async() => {
    await db.sync({ force: true});
    await db.close();
}
const Bookmarks=db.define('Bookmarks',{
    name:{type:STRING},
    url:{type:STRING},
    category:{type:STRING}
})
app.get('/',async(req,res,next)=>{
    try{
        const bookmarks=  await Bookmarks.findAll();
        res.send(html`
        <html>
            <head>
                <title>Bookmarks</title>
            </head>
            <body>
                <ul>
                    <form method=POST>
                        <li><input name='name'/></li>
                        <li><input name='url'/></li>
                        <li><input name='category'/></li>
                        <button> CREATE</button>
                    </form>
                </ul>
            </body>
        </html>
        `)
        }
    catch(error){
        console.log(error)
    }
})
app.post('/',async(req,res,next)=>{
  try{
      const bookmarks= await Bookmarks.create(req.body)
      res.redirect(`/${bookmarks.name}`)
  }
  catch(error){
      console.log(error)
  }  
})
syncAndSeed();
const port=process.env.port||3000
app.listen(port,()=>console.log(`listening on port ${port}`));