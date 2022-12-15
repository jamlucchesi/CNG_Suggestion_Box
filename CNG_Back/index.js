

 
exports.handler = async(event) =>{
    let title = "";
    let type = "";
    let description = "";
    let priority = 0;
    
    var fs = require('fs');
    var jsonwebtoken = require('jsonwebtoken'); // $ npm install jsonwebtoken

    const client_id = "9af03d76-384e-11ed-b325-cbd20f8b3a11"; // Replace this with your Zube client ID
    const private_key = fs.readFileSync("zube_api_key.pem");
    const project_id = "29602"; // Replace this with your project's ID

    var now = Math.floor(Date.now() / 1000);
    var refresh_jwt = jsonwebtoken.sign({
    iat: now,      // Issued at time
    exp: now + 60, // JWT expiration time (10 minute maximum)
    iss: client_id // Your Zube client id
}, private_key, { algorithm: 'RS256' });

 if (event.body) {
        let body = JSON.parse(event.body)
        if (body.title) 
            title = body.title;
        if (body.type) 
            type = body.type;
        if(body.description)
            description = body.description;
        if (body.priority)
            priority = body.priority;
    }

console.log(title + " " + type + " " + description);

console.log("refresh jwt:");
console.log(refresh_jwt);

const axios = require('axios');

const response = await axios.post(
    'https://zube.io/api/users/tokens',
    '',
    {
        headers: {
            'Authorization': 'Bearer '+ refresh_jwt,
            'X-Client-ID': client_id,
            'Accept': 'application/json'
        }
    }
);



const access_token = response.data.access_token;
console.log("access token")
console.log(response.data.access_token )

const APIresponse = await axios.post('https://zube.io/api/projects/'+project_id+'/tickets',{priority: priority, title: title, type: type, description: description},
{
    headers : {
        'Authorization': 'Bearer '+ access_token,
        'X-Client-ID': client_id,
        'Accept': 'application/json'
    }
    }
);
console.log(APIresponse);
return(APIresponse.data);

}