const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("header nav a");

document.addEventListener("DOMContentLoaded", function () {
    setupProgressBar();
    setupBackToTop();
    setupSkillAnimations();
    setupPreloader();
    setupRevealAnimations();
    setupTypedAnimations();
    setupThemeToggle();
    setupContactForm();
    setupCertificateModal();
    setupCursorFollower();
});

if (menuIcon && navbar) {
    menuIcon.addEventListener("click", () => {
        menuIcon.classList.toggle("fa-xmark");
        navbar.classList.toggle("active");
    });
}

function setupProgressBar() {
    const progressBar = document.getElementById("myBar");
    const header = document.querySelector("header");

    if (!progressBar && !header && !sections.length) {
        return;
    }

    window.addEventListener("scroll", () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        if (progressBar) {
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
            progressBar.style.width = `${scrolled}%`;
        }

        sections.forEach((section) => {
            const top = window.scrollY;
            const offset = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute("id");

            if (!id || top < offset || top >= offset + sectionHeight) {
                return;
            }

            navLinks.forEach((link) => link.classList.remove("active"));

            const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        });

        if (header) {
            header.classList.toggle("sticky", window.scrollY > 100);
        }

        if (menuIcon && navbar) {
            menuIcon.classList.remove("fa-xmark");
            navbar.classList.remove("active");
        }
    });
}

function setupBackToTop() {
    const backToTopBtn = document.getElementById("backToTop");

    if (!backToTopBtn) {
        return;
    }

    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add("active");
        } else {
            backToTopBtn.classList.remove("active");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

function setupSkillAnimations() {
    const skillLevels = document.querySelectorAll(".skill-level");

    if (!skillLevels.length || typeof IntersectionObserver === "undefined") {
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute("data-level") || "0";
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillLevels.forEach((level) => observer.observe(level));
}

function setupPreloader() {
    const preloader = document.querySelector(".preloader");

    if (!preloader) {
        return;
    }

    document.body.style.display = "block";
    window.setTimeout(() => {
        preloader.style.display = "none";
    }, 1000);
}

function setupRevealAnimations() {
    if (typeof ScrollReveal !== "function") {
        return;
    }

    ScrollReveal({
        reset: true,
        distance: "80px",
        duration: 1500,
        delay: 150
    });

    ScrollReveal().reveal(".home-content, .heading", { origin: "top" });
    ScrollReveal().reveal(".home-img, .services-container, .portfolio-box, .contact, .skills-container, .certifications-container", { origin: "bottom" });
    ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" });
    ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" });
}

function setupTypedAnimations() {
    if (typeof Typed !== "function") {
        return;
    }

    if (document.querySelector(".multiple-text")) {
        new Typed(".multiple-text", {
            strings: ["Fullstack Developer", "Software Developer", "Designer", "Software Engineer", "Cyber Protecter"],
            typeSpeed: 100,
            backSpeed: 100,
            backDelay: 1000,
            loop: true
        });
    }

    if (document.querySelector(".mlt-load")) {
        new Typed(".mlt-load", {
            strings: ["Compiling <span>Awesome...</span>"],
            typeSpeed: 20
        });
    }

    if (document.querySelector(".mlt-load1")) {
        new Typed(".mlt-load1", {
            strings: ["Please <span>Wait...</span>"],
            typeSpeed: 20
        });
    }

    if (document.querySelector(".mlt-load2")) {
        new Typed(".mlt-load2", {
            strings: ["It's <span>Ruzni's</span> Universe..."],
            typeSpeed: 20
        });
    }
}

function toggleText() {
    const moreText = document.getElementById("moreText");
    const btn = document.getElementById("toggleBtn");

    if (!moreText || !btn) {
        return;
    }

    if (moreText.style.display === "none" || moreText.style.display === "") {
        moreText.style.display = "inline";
        btn.innerText = "Read Less";
    } else {
        moreText.style.display = "none";
        btn.innerText = "Read More";
    }
}

function setupContactForm() {
    const contactForm = document.getElementById("contactForm");

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fullName = document.getElementById("fullName")?.value || "";
        const emailAddress = document.getElementById("emailAddress")?.value || "";
        const mobileNumber = document.getElementById("mobileNumber")?.value || "";
        const emailSubject = document.getElementById("emailSubject")?.value || "";
        const yourMessage = document.getElementById("yourMessage")?.value || "";

        const recipientEmail = "ruzni2003@gmail.com";
        const subject = encodeURIComponent(emailSubject);
        const body = encodeURIComponent(`Name: ${fullName}\nEmail: ${emailAddress}\nPhone: ${mobileNumber}\n\nMessage:\n${yourMessage}`);

        window.location.href = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
    });
}

function setupThemeToggle() {
    const themeSwitch = document.getElementById("themeSwitch");
    const modeLabel = document.getElementById("modeLabel");

    if (!themeSwitch) {
        return;
    }

    themeSwitch.addEventListener("change", () => {
        document.body.classList.toggle("light", !themeSwitch.checked);

        if (modeLabel) {
            modeLabel.innerText = themeSwitch.checked ? "DARK MODE" : "LIGHT MODE";
        }
    });

    if (modeLabel) {
        modeLabel.innerText = themeSwitch.checked ? "DARK MODE" : "LIGHT MODE";
    }
}

function setupCursorFollower() {
    const curserOutline = document.querySelector("[data-curser-out-line]");

    if (!curserOutline || typeof curserOutline.animate !== "function") {
        return;
    }

    window.addEventListener("mousemove", function (e) {
        curserOutline.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
        }, { duration: 100, fill: "forwards" });
    });
}

function setupCertificateModal() {
    const modal = document.getElementById("certificate-modal");
    const modalBody = document.getElementById("modal-body");

    if (!modal || !modalBody) {
        return;
    }

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeModal();
        }
    });
}

function openCertificateModal(pdfUrl) {
    const modal = document.getElementById("certificate-modal");
    const modalBody = document.getElementById("modal-body");

    if (!modal || !modalBody) {
        return;
    }

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    modalBody.innerHTML = `
        <div class="pdf-viewer">
            <iframe src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" frameborder="0"></iframe>
        </div>
    `;
}

function closeModal() {
    const modal = document.getElementById("certificate-modal");

    if (!modal) {
        return;
    }

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
}