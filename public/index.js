// Instantiate new client with a user token
const  init = (url, username)=>{
    fetch(url, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "post",
        body: JSON.stringify({username})
    }).then((data)=>{return data.json()}).then(
        (response)=>{
                const { token } =  response
                feedManager(token, username)
        }
    )
}

const feedManager = async (token, username)=>{
    const client = stream.connect('wf946y4ahq5j', token, "66027");        
    const notificationFeed = client.feed('notification', username);
    const activityFeed = document.getElementById("activity-feed")
    const results = await notificationFeed.get({ limit: 10 });

    const feedTemplate = (date,  message, link, state)=>{
       return(
           `
                <time class="date" datetime="9-17">${date}</time>
                <span class="text">Pull Request: <a href="${link}">${message}</a></span>
            
            `
        )

    }

        
    const singleFeed = (data) =>{
        const div = document.createElement('li')
        div.className = "feed-item"
        div.innerHTML = feedTemplate(data.created_at, data.message, data.html_url, data.state)
        document.getElementById('activity-feed').appendChild(div)
    }
    // get historical feeds
    results.results.map((data)=>{
        data.activities.map((p)=>{
            singleFeed(p)
        })
    })
    

    const callback = data => {
        singleFeed(data.new[0])
    };
    
    const successCallback = async () => {
        console.log('now listening to changes in realtime');
    };
    
    const failCallback = data => {
        alert('something went wrong, check the console logs');
        console.log(data);
    };
    
    notificationFeed.subscribe(callback).then(successCallback, failCallback);
}

init("https://web-hook-feed.herokuapp.com/get-token", "peter")

    
        

