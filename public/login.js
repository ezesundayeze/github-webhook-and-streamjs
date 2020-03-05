

        fetch("https://web-hook-feed.herokuapp.com/get-token", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: "post",
            body: JSON.stringify({username: "eze"})
        }).then((data)=>{return data.json()}).then(
            (response)=>{
                    const { token } =  response
                    localStorage.setItem("token", token )
                    localStorage.setItem("username", username )
            }
        )
    
    



