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





function appendElement(data){
    let {
            alt_description:alt, 
            likes, 
            downloads, 
            links:{
                download:img,
                html
            },
            urls,
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



        let div = document.createElement('div')
        div.innerHTML = `
        <p>${username}</p>
        <p>Likes: ${likes}</p>
        <p>downloads: ${downloads}</p>
        <img src='${urls.small}' alt='${alt}'/>
        <img src='${avatars.large}' alt='${alt}'/>
        <a href='${html}' target='_blank'>Link</a>
        <a href='${portfolio}' target='_blank'>Portfolio</a>`;


        document.querySelector('.images').appendChild(div)
}




function appendElements(api_result){
    api_result.forEach(img=>{
        appendElement(img)
    })
}

let data = getPhotots()
// console.log(data);

// appendElements(data)
//read this: https://web.dev/samesite-cookies-explained/?utm_source=devtools