document.addEventListener('DOMContentLoaded', function() {    
    // Setup scroll progress bar
    setupProgressBar();
    
    // Setup back to top button
    setupBackToTop();

    // Sync percentage fill from badge text to outer skill card
    setupSkillFillBars();
    setupSkillFillAnimations();
    setupSkillsSliderControls();
    
    // Setup HackerRank certifications interactive filters
    setupHackerRankFilters();
});

let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");

menuIcon.onclick = () => {
    menuIcon.classList.toggle("fa-xmark");
    navbar.classList.toggle("active");
};

let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

// Setup scroll progress bar
function setupProgressBar() {
    window.onscroll = function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";

        sections.forEach(sec => {
            let top = window.scrollY;
            let offset = sec.offsetTop - 150;
            let height = sec.offsetHeight;
            let id = sec.getAttribute("id");

            if(top >= offset && top < offset + height) {
                navLinks.forEach(links => {
                    links.classList.remove("active");
                    document.querySelector("header nav a[href*=" + id + "]").classList.add("active");
                });
            };
        });

        let header = document.querySelector("header");

        header.classList.toggle("sticky", window.scrollY > 100);

        menuIcon.classList.remove("fa-xmark");
        navbar.classList.remove("active");
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

function setupSkillFillBars() {
    const skillItems = document.querySelectorAll('.skill');

    skillItems.forEach(item => {
        const meta = item.querySelector('.skill-meta');
        const badge = item.querySelector('.skill-badge');

        if (!meta || !badge) return;

        const fill = badge.style.getPropertyValue('--skill-fill') || badge.textContent.trim();
        if (fill) {
            meta.style.setProperty('--skill-fill', fill);
        }
    });
}

function setupSkillsSliderControls() {
    const sliderGroups = [
        {
            container: document.querySelector('.skills-container'),
            prevBtn: document.querySelector('.skills-prev'),
            nextBtn: document.querySelector('.skills-next')
        },
        {
            container: document.querySelector('.simulations-container'),
            prevBtn: document.querySelector('.simulations-prev'),
            nextBtn: document.querySelector('.simulations-next')
        },
        {
            container: document.querySelector('.hr-certs-grid'),
            prevBtn: document.querySelector('.hr-certs-prev'),
            nextBtn: document.querySelector('.hr-certs-next')
        }
    ];

    sliderGroups.forEach(({ container, prevBtn, nextBtn }) => {
        if (!container || !prevBtn || !nextBtn) return;

        const scrollAmount = () => Math.max(container.clientWidth * 0.8, 320);

        const updateArrowState = () => {
            const maxScrollLeft = Math.max(container.scrollWidth - container.clientWidth, 0);
            const atStart = container.scrollLeft <= 4;
            const atEnd = container.scrollLeft >= maxScrollLeft - 4;

            prevBtn.disabled = atStart;
            nextBtn.disabled = atEnd;
            prevBtn.style.opacity = atStart ? '0.45' : '1';
            nextBtn.style.opacity = atEnd ? '0.45' : '1';
        };

        prevBtn.addEventListener('click', () => {
            container.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            container.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
        });

        container.addEventListener('scroll', updateArrowState, { passive: true });
        window.addEventListener('resize', updateArrowState);
        updateArrowState();
    });
}

function setupSkillFillAnimations() {
    const skillMetas = document.querySelectorAll('.skill-meta');

    if (!skillMetas.length) return;

    if (!('IntersectionObserver' in window)) {
        skillMetas.forEach(meta => meta.classList.add('is-visible'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 1.0  });

    skillMetas.forEach(meta => observer.observe(meta));
}

const typed = new Typed(".multiple-text", {
    strings: ["Junior Fullstack Developer", "Junior Software Developer", "Associative Designer", "Associative Software Engineer", "Junior Cyber Protecter"],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

function toggleText() {
  const moreText = document.getElementById("moreText");
  const btn = document.getElementById("toggleBtn");

  if (moreText.style.display === "none" || moreText.style.display === "") {
    moreText.style.display = "inline";
    btn.innerText = "Read Less";
  } else {
    moreText.style.display = "none";
    btn.innerText = "Read More";
  }
}

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const messageField = document.getElementById('yourMessage');
    const messageCount = document.getElementById('messageCount');
    const submitBtn = document.getElementById('submit');

    if (messageField && messageCount) {
        messageField.addEventListener('input', () => {
            const maxChars = 600;
            if (messageField.value.length > maxChars) {
                messageField.value = messageField.value.slice(0, maxChars);
            }
            messageCount.textContent = `${messageField.value.length} / ${maxChars}`;
        });
    }

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const emailAddress = document.getElementById('emailAddress').value.trim();
        const mobileNumber = document.getElementById('mobileNumber').value.trim();
        const emailSubject = document.getElementById('emailSubject').value.trim();
        const projectType = document.getElementById('projectType').value;
        const yourMessage = document.getElementById('yourMessage').value.trim();
        const privacyConsent = document.getElementById('privacyConsent').checked;
        const contactStatus = document.getElementById('contactStatus');

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const phonePattern = /^[+\d\s()-]{7,20}$/;

        const formFields = [
            document.getElementById('fullName'),
            document.getElementById('emailAddress'),
            document.getElementById('mobileNumber'),
            document.getElementById('emailSubject'),
            document.getElementById('projectType'),
            document.getElementById('yourMessage')
        ];
        formFields.forEach(field => field.classList.remove('input-invalid'));

        if (!fullName || !emailAddress || !mobileNumber || !emailSubject || !projectType || !yourMessage) {
            formFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('input-invalid');
                }
            });
            if (contactStatus) {
                contactStatus.className = 'response-msg error';
                contactStatus.textContent = 'Please complete all fields before sending your message.';
            }
            return;
        }

        if (!emailPattern.test(emailAddress)) {
            document.getElementById('emailAddress').classList.add('input-invalid');
            if (contactStatus) {
                contactStatus.className = 'response-msg error';
                contactStatus.textContent = 'Please enter a valid email address.';
            }
            return;
        }

        if (!phonePattern.test(mobileNumber)) {
            document.getElementById('mobileNumber').classList.add('input-invalid');
            if (contactStatus) {
                contactStatus.className = 'response-msg error';
                contactStatus.textContent = 'Please enter a valid phone number.';
            }
            return;
        }

        if (!privacyConsent) {
            if (contactStatus) {
                contactStatus.className = 'response-msg error';
                contactStatus.textContent = 'Please accept the contact consent checkbox to continue.';
            }
            return;
        }

        if (contactStatus) {
            contactStatus.className = 'response-msg success';
            contactStatus.textContent = 'Opening your email app...';
        }
        if (submitBtn) {
            submitBtn.value = 'Preparing...';
            submitBtn.disabled = true;
        }

        const recipientEmail = 'ruzni.dev@gmail.com';
        const subject = encodeURIComponent(`${projectType} - ${emailSubject}`);
        const body = encodeURIComponent(
            `Name: ${fullName}\nEmail: ${emailAddress}\nPhone: ${mobileNumber}\nProject Type: ${projectType}\n\nMessage:\n${yourMessage}`
        );

        const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
        window.location.href = mailtoUrl;

        setTimeout(() => {
            if (submitBtn) {
                submitBtn.value = 'Send Message';
                submitBtn.disabled = false;
            }
        }, 1200);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    document.body.style.display = "block";
    setTimeout(() => {
    document.querySelector(".preloader").style.display = "none";
    setTimeout(() => {
    }, 1000);
    ScrollReveal({
    reset: true,
    distance: "80px",
    duration: 1500,
    delay: 150
    });
    ScrollReveal().reveal('.home-content, .heading, .hr-section-subtitle', { origin: "top" });
    ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact, .skills-container, .certifications-container, .hr-roles-grid, .hr-tabs-container, .hr-certs-slider-wrap', { origin: "bottom" });
    ScrollReveal().reveal('.home-content h1, .about-img, anmt1, .hr-profile-card', { origin: "left" });
    ScrollReveal().reveal('.home-content p, .about-content, .hr-star-card, .hr-cert-card', { origin: "right" });
    }, 1000);
});

const typed1 = new Typed(".mlt-load", {
    strings: ["Compiling <span>Awesome...</span>"],
    typeSpeed: 20,
});

const typed2 = new Typed(".mlt-load1", {
    strings: ["Please <span>Wait...</span>"],
    typeSpeed: 20,
});

const typed3 = new Typed(".mlt-load2", {
    strings: ["It's <span>Ruzni's</span> Universe..."],
    typeSpeed: 20,
});

const themeSwitch = document.getElementById('themeSwitch');

if (themeSwitch) {
    // Apply theme: isDark true -> dark mode (no .light class)
    const applyTheme = (isDark) => {
        document.body.classList.toggle('light', !isDark);
        themeSwitch.checked = !!isDark;
    };

    // Initialize from user preference (localStorage) or system preference
    const saved = localStorage.getItem('theme'); // 'light' or 'dark'
    if (saved === 'light') {
        applyTheme(false);
    } else if (saved === 'dark') {
        applyTheme(true);
    } else if (window.matchMedia) {
        // follow OS preference when no saved preference
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        applyTheme(!prefersLight);
    } else {
        // default to dark if nothing else
        applyTheme(true);
    }

    // Persist user choice when they toggle
    themeSwitch.addEventListener('change', () => {
        const isDark = themeSwitch.checked;
        document.body.classList.toggle('light', !isDark);
        try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
    });

    // If the user hasn't explicitly chosen, update when OS preference changes
    if (window.matchMedia) {
        const mql = window.matchMedia('(prefers-color-scheme: light)');
        const onPrefChange = (e) => {
            if (!localStorage.getItem('theme')) {
                const prefersLightNow = e.matches;
                applyTheme(!prefersLightNow);
            }
        };
        if (mql.addEventListener) mql.addEventListener('change', onPrefChange);
        else if (mql.addListener) mql.addListener(onPrefChange);
    }
}

const cursorOutline = document.querySelector("[data-curser-out-line]");
const interactiveCursorTargets = 'a, button, .btn, .portfolio-box, .services-box, .skill-category, .slider-arrow, .experience-item, .cert-img';

if (cursorOutline && window.matchMedia('(pointer: fine)').matches) {
    const updateCursorPosition = (x, y) => {
        cursorOutline.style.left = `${x}px`;
        cursorOutline.style.top = `${y}px`;
    };

    const setCursorVisibility = (target) => {
        const isInteractiveTarget = target && target.closest(interactiveCursorTargets);

        if (isInteractiveTarget) {
            cursorOutline.classList.remove('is-visible');
            cursorOutline.classList.add('is-hidden');
            cursorOutline.classList.add('is-active');
            return;
        }

        cursorOutline.classList.remove('is-hidden');
        cursorOutline.classList.remove('is-active');
        cursorOutline.classList.add('is-visible');
    };

    window.addEventListener('pointermove', (e) => {
        updateCursorPosition(e.clientX, e.clientY);
        setCursorVisibility(e.target);
    });

    document.addEventListener('pointerover', (e) => {
        setCursorVisibility(e.target);
    });
}

document.addEventListener("scroll", () => {
  const skillLevels = document.querySelectorAll(".skill-level");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.getAttribute("data-level");
      }
    });
  }, { threshold: 0.5 });

  skillLevels.forEach(level => {
    observer.observe(level);
  });
});

// Modal interactions
document.addEventListener('DOMContentLoaded', () => {
    // Bind click events to all portfolio boxes
    const portfolioBoxes = document.querySelectorAll('.portfolio-box');
    portfolioBoxes.forEach(box => {
        box.addEventListener('click', () => {
            openProjectModal(box);
        });
    });

    // Close certificate modal when clicking outside content
    const certModal = document.getElementById('certificate-modal');
    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) closeModal();
        });
    }

    // Close project modal when clicking outside content
    const projectModal = document.getElementById('project-modal');
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeProjectModal();
        });
    }
    
    // Close modals with Escape key
    document.addEventListener('keydown', (e) => { 
        if (e.key === 'Escape') {
            closeModal();
            closeProjectModal();
        }
    });
});

// Function to open certificate modal with PDF preview
function openCertificateModal(pdfUrl) {
    const modal = document.getElementById('certificate-modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;
    
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    
    // Create modal content with PDF viewer
    modalBody.innerHTML = `
        <div class="pdf-viewer">
            <iframe src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" frameborder="0"></iframe>
        </div>
    `;
    document.body.style.overflow = 'hidden';
}

// Close certificate modal function
function closeModal() {
    const modal = document.getElementById('certificate-modal');
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Function to open project details modal dynamically
function openProjectModal(card) {
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('project-modal-body');
    if (!modal || !modalBody) return;
    
    // Extract metadata from card
    const title = card.getAttribute('data-project-title') || 'Project Details';
    const badge = card.getAttribute('data-project-badge') || 'Project';
    const badgeIcon = card.getAttribute('data-project-badge-icon') || 'fa-cube';
    const longDesc = card.getAttribute('data-project-long-desc') || '';
    const techStack = card.getAttribute('data-project-tech') || '';
    const demoUrl = card.getAttribute('data-project-demo-url') || '#';
    
    // Build modal content html
    modalBody.innerHTML = `
        <h2>${title}</h2>
        <span class="modal-badge"><i class="fa-solid ${badgeIcon}"></i> ${badge}</span>
        <p>${longDesc}</p>
        <div class="modal-tech-stack">
            <i class="fa-solid fa-microchip"></i>
            <span><strong>Tech stack:</strong> ${techStack}</span>
        </div>
        <div class="modal-buttons">
            <a href="${demoUrl}" target="_blank" class="modal-btn primary"><i class="fa-solid fa-up-right-from-square"></i> Live Preview</a>
            <button onclick="closeProjectModal()" class="modal-btn outline">Close</button>
        </div>
    `;
    
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

// Close project modal function
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

// Setup HackerRank certifications interactive filters
function setupHackerRankFilters() {
    const tabs = document.querySelectorAll('.hr-tab-btn');
    const cards = document.querySelectorAll('.hr-cert-card');
    const grid = document.querySelector('.hr-certs-grid');

    if (!tabs.length || !cards.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');

            // Add animating class to grid for transitions
            if (grid) grid.classList.add('hr-certs-grid-animating');

            cards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    // Show matching card
                    card.classList.remove('hidden');
                    // Add subtle fade/scale entry animation
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    // Hide non-matching card
                    card.classList.add('hidden');
                }
            });

            // Remove animating class after transition finishes
            setTimeout(() => {
                if (grid) grid.classList.remove('hr-certs-grid-animating');
            }, 300);
        });
    });
}
