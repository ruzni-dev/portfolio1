// Softer reveal animations for a professional feel
const sr = ScrollReveal({
    reset: false,
    distance: '40px',
    duration: 900,
    delay: 120,
    easing: 'cubic-bezier(.2,.8,.2,1)'
});

sr.reveal('.top', { origin: 'top' });
sr.reveal('.bot', { origin: 'bottom' });
sr.reveal('.left', { origin: 'left' });
sr.reveal('.right', { origin: 'right' });

const themeSwitch = document.getElementById('themeSwitch');
// Optional label element — only update if present
const modeLabel = document.getElementById('modeLabel');

if (themeSwitch) {
    themeSwitch.addEventListener('change', () => {
        // Use 'dark' class for the refined theme handling
        document.body.classList.toggle('dark', themeSwitch.checked === false);
        if (modeLabel) modeLabel.textContent = themeSwitch.checked ? 'DARK MODE' : 'LIGHT MODE';
    });
}

document.addEventListener('DOMContentLoaded', function() {    
    // Setup scroll progress bar
    setupProgressBar();
    
    // Setup back to top button
    setupBackToTop();
});

// Setup scroll progress bar
function setupProgressBar() {
    const bar = document.getElementById('myBar');
    if (!bar) return;

    let target = 0;
    let current = 0;

    function onScroll() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        target = height > 0 ? (winScroll / height) * 100 : 0;
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    // animate width smoothly
    function animate() {
        current += (target - current) * 0.12; // easing
        bar.style.width = current.toFixed(2) + '%';
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

// Setup back to top button
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    let visible = false;
    window.addEventListener('scroll', () => {
        const show = window.pageYOffset > 300;
        if (show !== visible) {
            visible = show;
            backToTopBtn.classList.toggle('active', show);
        }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        backToTopBtn.blur();
    });
}

const curserOutline = document.querySelector('[data-curser-out-line]');
if (curserOutline) {
    // smooth follow using lerp
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    }, { passive: true });

    function follow() {
        currentX += (mouseX - currentX) * 0.14;
        currentY += (mouseY - currentY) * 0.14;
        curserOutline.style.left = currentX + 'px';
        curserOutline.style.top = currentY + 'px';
        requestAnimationFrame(follow);
    }

    requestAnimationFrame(follow);
}