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

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const fullName = document.getElementById('fullName').value;
    const emailAddress = document.getElementById('emailAddress').value;
    const mobileNumber = document.getElementById('mobileNumber').value;
    const emailSubject = document.getElementById('emailSubject').value;
    const yourMessage = document.getElementById('yourMessage').value;

    // Construct mailto URL
    const recipientEmail = 'ruzni.dev@gmail.com'; // Replace with your email
    const subject = encodeURIComponent(emailSubject);
    const body = encodeURIComponent(
        `Name: ${fullName}\nEmail: ${emailAddress}\nPhone: ${mobileNumber}\n\nMessage:\n${yourMessage}`
    );

    const mailtoUrl = `mailto:${recipientEmail}?subject=${subject}&body=${body}`;

    // Open mail client
    window.location.href = mailtoUrl;
});

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

const themeSwitch = document.getElementById("themeSwitch");
const toggle = document.getElementById('themeSwitch');
const label = document.getElementById('modeLabel');

themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("light", !themeSwitch.checked);
});

toggle.addEventListener('change', () => {
    label.innerText = !toggle.checked ? 'LIGHT MODE' : 'DARK MODE';
});

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
    // Close modal when clicking outside content
    const modal = document.getElementById('project-modal');
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => { 
        if (e.key === 'Escape') closeModal(); 
    });
});

// Function to open certificate modal with PDF preview
function openCertificateModal(pdfUrl) {
    const modal = document.getElementById('certificate-modal');
    const modalBody = document.getElementById('modal-body');
    
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    
    // Create modal content with PDF viewer
    modalBody.innerHTML = `
        <div class="pdf-viewer">
            <iframe src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0"  frameborder="0"></iframe>
        </div>
    `;
}

// Close modal function
function closeModal() {
    const modal = document.getElementById('certificate-modal');
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
}

// Close modal when clicking outside content
const modal = document.getElementById('certificate-modal');
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => { 
    if (e.key === 'Escape') closeModal(); 
});
