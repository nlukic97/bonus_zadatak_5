// Listener



var called
var endpoint = 'https://api.unsplash.com/photos/random?client_id=UZ5Ib8E_iKHyV3JZWZp2iZK_Jex0omIzfUO2sVCTfMk&count=30';

const spinnerElement = document.createElement('div')
spinnerElement.classList.add('loader-container')

spinnerElement.innerHTML = `
<div class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
    </div>`;



init()


//init


// function to initialize everything
function init(){
    called = false
    getPhotots()

    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
    
            if(called == false){
                called = true
                getPhotots()
            }
        }
    }
}


async function getPhotots(){
    handleLoader('add')

    /** one liner comment underneath - for testing purposes 
     * (take the json-data/data.json file,  create a localStorage with the key of 'api_data', 
     * add the text from the json file, uncomment this line, and this will be the fake api call 
     * to not use up the api calls on unsplash) 
     * */

     //greturn appendElements(JSON.parse(localStorage.getItem('api_data'))) 

    let data = await fetch(endpoint)
    .then(function(response){
        // console.log(response.status);
        return response.json()
    })
    .then(data=>{
        appendElements(data)
    })
    .catch(function(e) {
        alert('Unable to get images. The API rate limit might have been exceeded.')
        handleLoader('remove')
    });
}




// add each individual object from the array of 30 results which we get
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
        div.classList.add('card')

        div.innerHTML = 
        `<img class='image' src="${urls.small}" alt="Unsplash image" onclick="openLightbox('${urls.regular}')">
                
        <div class="text-content">
            <div class="line-1">
                <div class="avatar-username-container">
                    <img class='avatar' src="${avatars.large}" alt="${alt}">
                    <span class="username">${username}</span>
                </div>

                <div class="likes-downloads-container">
                    <span><i class="fas fa-thumbs-up likes-icon"></i> ${likes}</span>
                    <span><i class="fas fa-download downloads-icon"></i> ${downloads}</span>
                </div>
            </div>

            <div class="links">
                ${handleUrls(html,'fab fa-unsplash','Unsplash')}
                ${handleUrls(portfolio,'fas fa-photo-video','Portfolio')}
                ${handleUrls(handleSocialUsernames('twitter',twitter),'fab fa-twitter','Twitter')}
                ${handleUrls(handleSocialUsernames('instagram',instagram),'fab fa-instagram','Instagram')}
            </div>
        </div>`;


        document.querySelector('.images').appendChild(div)
}

function handleUrls(url, font_awesome_class, text){
    if(url === null || url === ''){
        return  `<span class="unavailable"><i class="${font_awesome_class}"></i> ${text}</span>`
    } else {
        return `<a href="${url}" target="_blank"><i class="${font_awesome_class}"></i> ${text}</a>`;
    };
}

function handleSocialUsernames(platform, username){
    return (username === '' || username === null) ? null : `https://${platform}.com/${username}`
}


function appendElements(api_result){
    api_result.forEach(img=>{
        appendElement(img)
    })

    called = false; //making the api call for more images possible again on scroll
    handleLoader('remove')
}

//handling the spinner
function handleLoader(action){
    if(action === 'remove'){
        document.querySelector('.loader-container').remove()

    } else if (action === 'add'){
        document.querySelector('.container').appendChild(spinnerElement)

    }
}


// toggle the lightbox
function openLightbox(url){
    document.querySelector('#lightbox-image').src = url
    document.body.classList.add('lightbox-on')
}

function closeLightbox(){
    document.body.classList.remove('lightbox-on')
    document.querySelector('#lightbox-image').src = ''
}