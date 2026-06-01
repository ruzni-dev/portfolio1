/* pages.js — refined interactions for a professional, subtle UX */

// Respect reduced motion preference
const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Initialize ScrollReveal if present, with softer defaults
if (window.ScrollReveal && !prefersReducedMotion) {
    const sr = ScrollReveal({
        reset: false,
        distance: '36px',
        duration: 800,
        delay: 100,
        easing: 'cubic-bezier(.2,.8,.2,1)'
    });

    sr.reveal('.top', { origin: 'top' });
    sr.reveal('.bot', { origin: 'bottom' });
    sr.reveal('.left', { origin: 'left' });
    sr.reveal('.right', { origin: 'right' });
} else if (window.ScrollReveal && prefersReducedMotion) {
    // minimal reveals for reduced-motion users
    ScrollReveal({ reset: false, distance: '0px', duration: 0 }).reveal('.top, .bot, .left, .right');
}

// Theme toggle handling (graceful if elements are missing)
const themeSwitch = document.getElementById('themeSwitch');
const modeLabel = document.getElementById('modeLabel');
if (themeSwitch) {
    // Initialize page theme from the checkbox state and listen for changes
    // Current CSS uses `body.light` to enable the light theme, so keep parity.
    document.body.classList.toggle('dark', !!themeSwitch.checked);
    if (modeLabel) modeLabel.textContent = themeSwitch.checked ? 'LIGHT MODE' : 'DARK MODE';

    themeSwitch.addEventListener('change', () => {
        document.body.classList.toggle('dark', !!themeSwitch.checked);
        if (modeLabel) modeLabel.textContent = themeSwitch.checked ? 'LIGHT MODE' : 'DARK MODE';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupProgressBar();
    setupBackToTop();
});

// Smooth progress bar using requestAnimationFrame for easing
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

    function animate() {
        current += (target - current) * 0.12; // easing factor
        bar.style.width = current.toFixed(2) + '%';
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
}

// Back-to-top with fade and accessible focus handling
function setupBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    if (!backToTopBtn) return;

    let visible = false;
    function onScroll() {
        const show = window.pageYOffset > 300;
        if (show !== visible) {
            visible = show;
            backToTopBtn.classList.toggle('active', show);
        }
    }

    window.addEventListener('scroll', onScroll, { passive: true });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
        backToTopBtn.blur();
    });
}

// Smooth, low-impact cursor outline follow (disabled for reduced motion)
const curserOutline = document.querySelector('[data-curser-out-line]');
if (curserOutline && !prefersReducedMotion) {
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