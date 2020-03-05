
const stream = require('getstream');

const client =  stream.connect(
    process.env.API_KEY,
    process.env.API_SECRET
  );



const getToken = (req, res, next)=>{
    const token = client.createUserToken(req.body.username)
    res.json({token})
    next()
}


const githubHook = async (req, res, next)=>{
    // feedManager(req.body)
    const { user, created_at, state } = req.body.pull_request
    const feedUser = client.feed('notification', user.login, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkI…plIn0.NK-A9N8-syHcQ8k3evFU9AVikW2mUs9BKha4Lasxa9E");
    await feedUser.addActivity({
        actor: user.login,
        verb: 'add',
        object: 'picture:10',
        foreign_id: 'picture:10',
        created_at,
        state,
        message: `${user.login} Created a Pull Request`
    });

    const results = await feedUser.get({ limit: 10 });

    res.send(JSON.stringify(results))
}

module.exports = {
    getToken,
    githubHook
}


