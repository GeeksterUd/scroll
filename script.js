const imageContainer = document.getElementById("img-container");

let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

const count = 10;
const apikey = "W6d6aeCC5epbGpnYtnc6c9ppY6Xa9h_GLw-7Ndwn2rw&query=car";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apikey}&count=${count}`;

function setAttribute(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
    }
}

function displayPhotos() {
    totalImages = photosArray.length;
    imagesLoaded = 0;
    photosArray.forEach((photo) => {
        const item = document.createElement("a");
        
        setAttribute(item, {
            href: photo.links.html,
            target: "_blank",
        });

        const img = document.createElement("img");
        setAttribute(img, {
            src: photo.urls.regular,
        });

        img.addEventListener('load', imageLoaded);

        item.append(img);

        imageContainer.append(item);
    });
}


async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}

window.addEventListener("scroll", () =>{
    if(window.scrollY + window.innerHeight >= document.body.offsetHeight && ready){
        ready = false;
        getPhotos();
    }
});

getPhotos();