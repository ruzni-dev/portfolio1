document.addEventListener('DOMContentLoaded', function() {    
    // Setup scroll progress bar
    setupProgressBar();
    
    // Setup back to top button
    setupBackToTop();
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
    ScrollReveal().reveal('.home-content, .heading', { origin: "top" });
    ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact, .skills-container, .certifications-container', { origin: "bottom" });
    ScrollReveal().reveal('.home-content h1, .about-img, anmt1', { origin: "left" });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: "right" });
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

const curserOutline = document.querySelector("[data-curser-out-line]");

window.addEventListener("mousemove", function(e) {
    const posX = e.clientX;
    const posY = e.clientY;

    curserOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 100, fill: "forwards"})
})

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

document.addEventListener('DOMContentLoaded', () => {
    const projectModal = document.getElementById('project-modal');
    const certificateModal = document.getElementById('certificate-modal');

    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeModal('project');
        });
    }

    if (certificateModal) {
        certificateModal.addEventListener('click', (e) => {
            if (e.target === certificateModal) closeModal('certificate');
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal('project');
            closeModal('certificate');
        }
    });
});

function openProjectModal(projectBox) {
    const modal = document.getElementById('project-modal');
    const image = document.getElementById('project-modal-image');
    const category = document.getElementById('project-modal-category');
    const title = document.getElementById('project-modal-title');
    const year = document.getElementById('project-modal-year');
    const tech = document.getElementById('project-modal-tech');
    const desc = document.getElementById('project-modal-desc');
    const focus = document.getElementById('project-modal-focus');
    const features = document.getElementById('project-modal-features');
    const live = document.getElementById('project-modal-live');

    if (!modal || !projectBox) return;

    const projectTitle = projectBox.getAttribute('data-title') || 'Project';
    const projectCategory = projectBox.getAttribute('data-category') || 'Project';
    const projectYear = projectBox.getAttribute('data-year') || '';
    const projectTech = projectBox.getAttribute('data-tech') || '';
    const projectDesc = projectBox.getAttribute('data-desc') || '';
    const projectLive = projectBox.getAttribute('data-live') || '#';
    const projectFocus = projectBox.getAttribute('data-focus') || '';
    const projectFeatures = (projectBox.getAttribute('data-features') || '').split(';').map(item => item.trim()).filter(Boolean);
    const projectImage = projectBox.querySelector('img');

    if (image && projectImage) {
        image.src = projectImage.src;
        image.alt = projectImage.alt || projectTitle;
    }
    if (category) category.textContent = projectCategory;
    if (title) title.textContent = projectTitle;
    if (year) year.textContent = projectYear;
    if (tech) tech.textContent = projectTech;
    if (desc) desc.textContent = projectDesc;
    if (focus) focus.textContent = projectFocus;
    if (features) {
        features.innerHTML = projectFeatures.map(item => `<li>${item}</li>`).join('');
    }
    if (live) live.href = projectLive;

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
}

function openCertificateModal(pdfUrl) {
    const modal = document.getElementById('certificate-modal');
    const modalBody = document.getElementById('modal-body');

    if (!modal || !modalBody) return;

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');

    modalBody.innerHTML = `
        <div class="pdf-viewer">
            <iframe src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" frameborder="0"></iframe>
        </div>
    `;
}

function closeModal(type) {
    if (!type || type === 'project') {
        const projectModal = document.getElementById('project-modal');
        if (projectModal) {
            projectModal.classList.remove('show');
            projectModal.setAttribute('aria-hidden', 'true');
        }
    }

    if (!type || type === 'certificate') {
        const certificateModal = document.getElementById('certificate-modal');
        if (certificateModal) {
            certificateModal.classList.remove('show');
            certificateModal.setAttribute('aria-hidden', 'true');
        }
    }
}
