import { getRandomNum, randomize, map, blur, createStars } from './general.js';

const currentDate = new Date();
const container = document.querySelector(".container");
const diaries_container = document.querySelector(".diaries_container");
const diaryDiv = document.querySelector(".diary");
let target = document.querySelector('.target');
const diaryImg = document.createElement("img");
const translationDiv = document.querySelector(".translation");
const translationImg = document.createElement("img");
let diaryImgSrc = "";

const bg = document.querySelector(".bg");

let originalShown = true;


const propagandaImgSrcs = [
    "imgs/propaganda/propaganda0.png",
    "imgs/propaganda/propaganda1.png",
    "imgs/propaganda/propaganda2.png",
    "imgs/propaganda/propaganda3.png",
    "imgs/propaganda/propaganda4.png",
    "imgs/propaganda/propaganda5.png",
    "imgs/propaganda/propaganda6.png",
    // "imgs/propaganda/propaganda.png",
]

const flyTexts = [
    "This",
    "historical",
    "account",
    "is", 
    "clear."
]

//FUNCTIONS ON START
init();

function init() {
    // SET DIARY IMG
    if (currentDate.getMonth() === 10 && currentDate.getDate() === 2) {
        diaryImgSrc = "imgs/8_14/IMG_3687.JPG";
    }
    else {

        diaryImgSrc = "imgs/8_14/IMG_3687_folder.png";
        // diaryImgSrc = getRandomNum(propagandaImgSrcs);
        // container.style.alignItems = "center";
        // diaryDiv.style.height = "80vh";
    }

    diaryImg.src = diaryImgSrc;
    diaryDiv.appendChild(diaryImg);

    //SET TRANSLATION
    translationDiv.appendChild(translationImg);
    translationImg.src = "imgs/8_14/IMG_3687_translated.png"


    createStars(bg, "1966");

    //wait for image to load before sending divs to target,  otherwise target has no width or height so divs all go to center
    diaryImg.addEventListener('load', createMovingDivs, {once: true})
}


// MOUSE HOVER
diaries_container.addEventListener("mouseover", () => {
    sendFliestoEdges();
});

diaries_container.addEventListener("mouseout", ()=> {
    sendFliestoTarget();
})

//??How do I get this to fade in and out?? I can't add a set timeout for the display bc that messes up the positioning
diaries_container.addEventListener("click", ()=> {
    if (originalShown) {
        // translationDiv.style.display = "flex";
        // diaryDiv.style.opacity = 0;
        // setTimeout(() => {
        //     diaryDiv.style.display = "none";
        //     translationDiv.style.opacity = 1;
        // }, 500);

        diaryImg.src = "imgs/8_14/IMG_3687_translated.png";
        originalShown = false;
    }
    else {
        // diaryDiv.style.display = "flex";
        // translationDiv.style.opacity = 0;
        // setTimeout(() => {
        //     translationDiv.style.display = "none";
        //     diaryDiv.style.opacity = 1;
        // }, 500);

        diaryImg.src = "imgs/8_14/IMG_3687_threshold.png";
        originalShown = true;
    }

})



function getRandomEdges() {
    // Calculate random positions on the window edges
    const edge = Math.floor(Math.random() * 4); // Choose a random edge (0 - top, 1 - right, 2 - bottom, 3 - left)

    let x, y;
    const buffer = 50; // Distance from the window border

    switch (edge) {
        case 0: // Top edge
            x = Math.random() * window.innerWidth;
            y = -buffer;
            break;
        case 1: // Right edge
            x = window.innerWidth + buffer;
            y = Math.random() * window.innerHeight;
            break;
        case 2: // Bottom edge
            x = Math.random() * window.innerWidth;
            y = window.innerHeight + buffer;
            break;
        case 3: // Left edge
            x = -buffer;
            y = Math.random() * window.innerHeight;
            break;
    }

    return [x, y];
}

function getClosestEdge(leftX, topY, rightX, bottomY) {
    const buffer = 50; // Distance from the window border

    const distanceFromTop = topY;
    const distanceFromBottom = window.innerHeight - bottomY;
    const distanceFromLeft = leftX;
    const distanceFromRight = window.innerWidth - rightX;

    const minDistance = Math.min(distanceFromTop, distanceFromBottom, distanceFromLeft, distanceFromRight);

    if (minDistance === distanceFromTop) {
        console.log("close to top");
        console.log(-distanceFromTop);
        return [0, -distanceFromTop]; // Top edge
    } else if (minDistance === distanceFromRight) {
        console.log("close to right");
        console.log(distanceFromRight);
        return [distanceFromRight, 0]; // Right edge
    } else if (minDistance === distanceFromBottom) {
        console.log("close to bottom");
        console.log(distanceFromBottom);
        return [0, distanceFromBottom]; // Bottom edge
    } else {
        console.log("close to left");
        console.log(-distanceFromLeft);
        return [-distanceFromLeft, 0]; // Left edge
    }
}


//CREATE FLIES
// Function to create divs at random positions and animate towards the target
function createMovingDivs() {
    const numDivs = 1; // Number of divs to create

    const fontStretchMin = .1;
    const fontStretchMax = .8;
    
    for (let i = 0; i < numDivs; i++) {
        const flyContainer = document.createElement('div');
        flyContainer.classList.add('fly_container');
        const fly = document.createElement('div');
        fly.classList.add('fly');
        const flyText = document.createElement('p');
        flyText.innerHTML = flyTexts[i % flyTexts.length];

        const fontStretch = randomize(fontStretchMin, fontStretchMax);

        flyText.style.transform = `scaleX(${fontStretch})`;

        const [x, y] = getRandomEdges();

        flyContainer.style.top = `${y}px`;
        flyContainer.style.left = `${x}px`;

        document.body.appendChild(flyContainer);
        flyContainer.appendChild(fly);
        fly.appendChild(flyText);
    }

    sendFliestoTarget();
}

//SEND FLIES TO TARGET
function sendFliestoTarget() {
    const flyContainers = document.querySelectorAll(".fly_container");
    const flies = document.querySelectorAll(".fly");
    // Calculate the distance and duration based on div's initial position
    flyContainers.forEach((flyContainer) => {
        const deltaX = randomize(target.getBoundingClientRect().left - flyContainer.getBoundingClientRect().left, target.getBoundingClientRect().right - flyContainer.getBoundingClientRect().right);
        const deltaY = randomize(target.getBoundingClientRect().top - flyContainer.getBoundingClientRect().top, target.getBoundingClientRect().bottom - flyContainer.getBoundingClientRect().bottom);
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const speed = randomize(100, 300); // Varying speed

        flyContainer.style.transition = `transform ${distance / speed}s`;
        flyContainer.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        

    })

    flies.forEach((fly) => {
        blur(fly, 0);
    })

    blur(target, 3);
}

//DISPERSE FLIES
function sendFliestoEdges() {
    const flyContainers = document.querySelectorAll(".fly_container");
    const flies = document.querySelectorAll(".fly");

    flyContainers.forEach((flyContainer) => {
        // const [x, y] = getRandomEdges();
        const [x, y] = getClosestEdge(flyContainer.getBoundingClientRect().left, flyContainer.getBoundingClientRect().top, flyContainer.getBoundingClientRect().right, flyContainer.getBoundingClientRect().bottom);

        const deltaX = x;
        const deltaY = y;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const speed = randomize(200, 300); // Varying speed

        // ??The fly dispersal isn't working quite right. They're not going to the window edges?
        flyContainer.style.transition = `transform ${2}s`;
        flyContainer.style.transform = `translate(${deltaX}px, ${deltaY}px)`;

    })

    flies.forEach((fly) => {
        blur(fly, 10);
    })

    blur(target, 0);

}


