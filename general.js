// GENERAL FUNCTIONS
export function getRandomNum(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

export function randomize(min, max) {
    return min + Math.random() * (max - min);
}

export function map(in_val, in_min, in_max, out_min, out_max) {
    return (
        ((in_val - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
}

export function blur(object, blurAmount) {
    object.style.filter = `blur(${blurAmount}px)`;
    // ??Why do i need this here even though i already have the transition defined in css?
    //?? This also overrides the transition for transform so the flies move
    object.style.transition = "filter 1s";
}

//CREATE BG STARS
//function modified from https://laurelschwulst.github.io/nina-alan.world/
export function createStars(bg, bgYear) {
    const starMaxSize = 30;
    const starMinSize = 10;
    const fontStretchMin = .1;
    const fontStretchMax = 3;

    const character_count = bgYear.length;
    // console.log("character count", character_count);

    const numRows = window.innerHeight / starMaxSize;
    const numColumns = window.innerWidth / (starMaxSize * character_count);
    const numStars = numRows * numColumns;

    let margin_vertical = starMaxSize;
    let margin_horizontal = starMaxSize;

    // console.log("margin vertical", margin_vertical);

    for (let i = 0; i < numStars; i++) {
        const fontsize = randomize(starMinSize, starMaxSize);
        const fontStretch = randomize(fontStretchMin, fontStretchMax);

        const vertical_shift = randomize(-50, 50);

        const star = document.createElement("div");
        const p = document.createElement("p");

        star.appendChild(p);
        bg.appendChild(star);

        star.className = `star-${Math.ceil(Math.random() * 3)}`;
        p.innerHTML = bgYear;

        p.style.fontSize = fontsize + "px";
        // ??Not working
        p.style.transform = `scaleX(${fontStretch})`;
        star.style.margin = `${margin_vertical}px ${margin_horizontal}px`;
        // p.style.verticalAlign = vertical_shift + "px";
        star.style.transform = `translateY(${vertical_shift}px)`;
    }
}

