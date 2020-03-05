// Instantiate new client with a user token


  const token = localStorage.getItem("token")
  const username = localStorage.getItem("username")

    const client = stream.connect('wf946y4ahq5j', token, "66027");
    console.log(client)

    const notificationFeed = client.feed('notification', username, token);
    
    const callback = data => {
        console.log(data);
    };
    
    const successCallback = async () => {
        console.log('now listening to changes in realtime');
        
    };
    
    const failCallback = data => {
        alert('something went wrong, check the console logs');
        console.log(data);
    };
    
    notificationFeed.subscribe(callback).then(successCallback, failCallback);
        

