let screens = document.querySelectorAll(".screen");
let mode_btn = document.body;
let defaultScreen = "Menu";

let scroll_btn = document.getElementById("scroll_down");

scroll_btn.addEventListener("click", () => {
    const offset = 90;

    document.getElementById("Modern").scrollBy({
        top: offset,
        behavior: "smooth"
    });
    
});

function Init(){
    // Check if there is a saved screen in the session Storage (Persists during Tab Session)
    let savedScreen = sessionStorage.getItem('currentScreen');

    // if there's a savedScreen and it's valid use it or else change to default screen
    if(savedScreen && isValidScreen(savedScreen)){
        ChangeScreen(savedScreen);
    }
    else {
        ChangeScreen(defaultScreen);
    }

}

function isValidScreen(screenName) {
    return Array.from(screens).some(screen => screen.id === screenName);
}

function ChangeScreen(mode) {

    let screenFound = false;

    // 1. Hide all the Screens
    screens.forEach(screen => {
        if(screen.id === mode){
            screen.classList.remove("Hidden");
            screenFound = true;
        }
        else{
            screen.classList.add("Hidden");
        }
    });

    if(!screenFound) {
        console.warn(`There is no screen ${mode}`);
        return;
    }

    // Save the Current Screen to sessionStorage (persists during tab session only)
    sessionStorage.setItem('currentScreen', mode);
}

mode_btn.addEventListener("click", function(event){
    let clicked = event.target.closest("button");

    if(clicked.dataset.mode)
    {
        let mode = clicked.dataset.mode;

        console.log(`Switch to : ${mode}`);
        
        ChangeScreen(mode)
    }
});

// Navbar
document.querySelectorAll('.dropbtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = btn.parentElement;
        dropdown.classList.toggle('open');
    });
});

document.addEventListener('click', () => {
    document.querySelectorAll('.dropdown.open').forEach(d => {
        d.classList.remove('open');
    });
});

// Hamburger
const hamburger = document.getElementById("hamburger");
const navContainer = document.querySelector(".nav_Container");

hamburger.addEventListener("click", () => {
    navContainer.classList.toggle("show");
});
document.querySelectorAll(".nav_Container a").forEach(link => {
    link.addEventListener("click", () => {
        navContainer.classList.remove("show");
    });
});



// Section Cards
Cards = document.querySelectorAll(".Section_Card");

Cards.forEach(card => {
    const overlay = card.querySelector(".Card_Overlay");
    const img = card.dataset.img;
    const hue = card.dataset.hue || "hue-rotate(0deg)";
    const filter = card.dataset.filter || "none";
    const hov_width = card.dataset.hov_width || "40%";

    card.style.setProperty('--_img', img);
    card.style.setProperty('--_hue', hue);
    card.style.setProperty('--_hov_width', hov_width);
    overlay.style.setProperty('--_filter', filter);

})

Init();