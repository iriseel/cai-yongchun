import { getRandomNum, randomize, map, blur, createStars } from './general.js';

let sound = false;
const soundBtn = document.querySelector(".sound_btn");

const bg = document.querySelector(".bg");
const thumbnails = document.querySelector(".thumbnails");

const audio = new Audio('audio/March_of_the_Volunteers_16min.mp3');
audio.loop = true;


// Image URLs
const imageUrls = [
    "imgs/propaganda/propaganda0.png",
    "imgs/propaganda/propaganda1.png",
    "imgs/propaganda/propaganda2.png",
    "imgs/propaganda/propaganda3.png",
    "imgs/propaganda/propaganda4.png",
    "imgs/propaganda/propaganda5.png",
    "imgs/propaganda/propaganda6.png",

    "imgs/8_14/IMG_3687_threshold.png",
    // Add more image URLs as needed
];

// createStars(bg, "2023");

// Create 365 divs
const totalDivs = 365;
const totalColumns = 6;
const totalRows = totalDivs / totalColumns;
const thumbnailsWidth = thumbnails.offsetWidth;
for (let i = 0; i < totalDivs; i++) {
    const newDiv = document.createElement('div');
    newDiv.classList.add('thumbnail');
    newDiv.style.width = `${100 / Math.sqrt(totalDivs)}vw`; // Divide window height
    newDiv.style.height = `${100 / Math.sqrt(totalDivs)}vh`; // Divide window height
    // ??Why are the divs overlapping??
    // newDiv.style.width = `${thumbnailsWidth / totalDivs}px`;
    // newDiv.style.height = 100 + "px";
    thumbnails.appendChild(newDiv);
}


// Function to randomly insert images into divs
function insertRandomImages() {
    const divs = document.querySelectorAll(".thumbnail");
    for (let i = 0; i < totalDivs; i++) {
        const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        divs[i].style.backgroundImage = `url('${randomImage}')`;
        divs[i].style.backgroundSize = 'cover';
        divs[i].style.backgroundPosition = 'center';
    }
}
insertRandomImages();




// SET SOUND
soundBtn.addEventListener("click", () => {
    if (!sound) {
        audio.play();
        sound = true;
        soundBtn.textContent = "Sound on";
    }
    else {
        audio.pause();
        sound = false;
        soundBtn.textContent = "Sound off";
    }
})


// Get the text content and split it by words
const paragraphs = document.querySelectorAll('p');

// Function to randomly stretch and compress each word
function stretchAndCompress() {
    paragraphs.forEach((p) => {
        const words = p.innerText.split(' ');
        p.innerHTML = ''; // Clear existing content
        words.forEach(word => {
            const resizeAmount = randomize(.75, 1.25);
            const span = document.createElement('span');
            span.style.display = 'inline-block';
            span.style.transform = `scale(${resizeAmount}, 1)`; // Random scaling horizontally
            span.style.marginRight = '5px'; // Add space between words
            span.textContent = word;
            p.appendChild(span);


            const space = document.createElement('span');
            space.innerHTML = '&nbsp;'; // Non-breaking space
            space.style.transform = `scale(${resizeAmount}, 1)`
            p.appendChild(space);
        });

    })
}


stretchAndCompress();