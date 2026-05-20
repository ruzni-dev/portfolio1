ScrollReveal({
    reset: true,
    distance: "80px",
    duration: 1500,
    delay: 150
});

ScrollReveal().reveal('.top', { origin: "top" });
ScrollReveal().reveal('.bot', { origin: "bottom" });
ScrollReveal().reveal('.left', { origin: "left" });
ScrollReveal().reveal('.right', { origin: "right" });

const themeSwitch = document.getElementById("themeSwitch");
const toggle = document.getElementById('themeSwitch');
const label = document.getElementById('modeLabel');

themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("light", !themeSwitch.checked);
});

toggle.addEventListener('change', () => {
    label.innerText = !toggle.checked ? 'LIGHT MODE' : 'DARK MODE';
});

document.addEventListener('DOMContentLoaded', function() {    
    // Setup scroll progress bar
    setupProgressBar();
    
    // Setup back to top button
    setupBackToTop();
});

// Setup scroll progress bar
function setupProgressBar() {
    window.onscroll = function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
    };
}

// Setup back to top button
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

const curserOutline = document.querySelector("[data-curser-out-line]");

window.addEventListener("mousemove", function(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    curserOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 100, fill: "forwards"})
})