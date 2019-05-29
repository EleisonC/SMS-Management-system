const express = require("express")
const app = express()
const models = require("./models")
const bodyParser = require("body-parser")

const contactRouter = require("./routes/contactRoutes")
const messageRouter = require("./routes/messageRoutes")

app.use(bodyParser({json:true}))
app.use('/contacts', contactRouter);
app.use('/messages', messageRouter);


let server;
models.sequelize.sync({force:false}).then(()=>{
   server = app.listen( 3000,()=>{
        console.log("Api Is Running On Port ", 3000)
    })
})

module.exports = app
