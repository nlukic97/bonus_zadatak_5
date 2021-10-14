// var endpoint = 'https://api.unsplash.com/photos/random?client_id=UZ5Ib8E_iKHyV3JZWZp2iZK_Jex0omIzfUO2sVCTfMk&count=30';

// fetch(endpoint)
//     .then(function(response){
//         return response.json()
//     })
//     .then(function(jsonData){
//         console.log(JSON.stringify(jsonData));
//     })



function getPhotots(){
    return JSON.parse(localStorage.getItem('api_data'))
}

let data = getPhotots()
console.log(data[1]);



function appendElement(data){
    let {
            alt_description:alt, 
            likes, 
            downloads, 
            links:{
                download:img,
                html
            },
            user:{
                username, 
                portfolio_url:portfolio, 
                profile_image:avatars, 
                social:{
                    instagram_username:instagram,
                    twitter_username:twitter
                }
            } 
        } 
        = data;

        //default alt tag to be added to image
        alt = (alt==='' || alt === null) ? 'Unsplash image' : alt;
}

appendElement(data[0])