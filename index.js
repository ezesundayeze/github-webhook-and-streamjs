const express = require('express')
const stream = require('getstream');
const cors = require('cors')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const client =  stream.connect(
    process.env.API_KEY,
    process.env.API_SECRET
  );

app.post("/get-token/", (req, res, next)=>{
    const token = client.createUserToken(req.body.username)
    res.json({token})
    next()
})

const feedManager = async (url, data)=>{
    const user = client.feed('user', data.user);
    await user.addActivity({
        actor: data.user,
        verb: 'add',
        object: 'picture:10',
        foreign_id: 'picture:10',
        message: 'Beautiful bird!'
    });
}

app.post("/github", (req, res, next)=>{
    // feedManager(req.body)
    res.send(JSON.stringify(req.body))
})


var port = process.env.PORT || 3002

app.listen(port, () => console.log('server started', port))



