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
    console.log(req.body)
    const token = client.createUserToken(req.body.username)
    res.json({token})
    next()
})

app.post("/github", async (req, res, next)=>{
    // feedManager(req.body)
    const { user, created_at, state } = req.body.pull_request
    const feedUser = client.feed('user', user.login);
    await feedUser.addActivity({
        actor: user.login,
        verb: 'add',
        object: 'picture:10',
        foreign_id: 'picture:10',
        created_at,
        state,
        message: `${user.login} Created a Pull Request`
    });

    res.send(JSON.stringify(req.body.pull_request))
})


var port = process.env.PORT || 3002

app.listen(port, () => console.log('server started', port))



