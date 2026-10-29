/**
 * DARKBEAST / MOHAMAD RUZNI - APPLE macOS & visionOS ENGINE
 * Features:
 * 1. macOS Floating Glass Dock with Authentic Magnification Physics
 * 2. Apple Spotlight Search Engine (⌘K / Ctrl+K)
 * 3. Apple Dynamic Island with Live Clock & Telemetry
 * 4. RUZNI_OS Cyber Terminal Window
 * 5. Apple Web Audio Haptics (Glass taps, clicks, success sounds)
 * 6. Particle Neural Mesh Canvas (Strictly rgb(1, 198, 252))
 * 7. 3D Card Physics, Metrics Counting, Skills Search, Modals, and Form
 */

document.addEventListener('DOMContentLoaded', () => {
    // Permanent Dark Theme Lock
    document.body.classList.remove('light');
    try { localStorage.removeItem('luxury-portfolio-theme'); } catch (e) {}

    initCyberCanvas();
    initReticleCursor();
    initNavbarScroll();
    initMacOSDock();
    initAppleSpotlight();
    initDynamicIslandClock();
    initCyberTerminal();
    initTextScrambler();
    initAudioController();
    initHeroCard3DTilt();
    initMetricsCounter();
    initSkillsCommandCenter();
    initHackerRankFilters();
    initProjectStack();
    initSimulationSlider();
    initCertCoverflow();
    initModalSystem();
    initContactForm();
    initQuickCopyEmail();
    initBackToTop();
});

/* ===================================================================
   1. CYBER PARTICLE CANVAS (STRICTLY rgb(1, 198, 252))
   =================================================================== */
function initCyberCanvas() {
    const canvas = document.getElementById('luxuryCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let particles = [];
    const particleCount = Math.min(Math.floor((width * height) / 19000), 70);
    const connectionDistance = 140;
    const mouseRadius = 150;

    let mouse = { x: null, y: null };

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.size = Math.random() * 1.8 + 0.8;
            this.alpha = Math.random() * 0.5 + 0.25;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0) this.x = width;
            else if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            else if (this.y > height) this.y = 0;

            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouseRadius) {
                    const force = (mouseRadius - dist) / mouseRadius;
                    this.x -= (dx / dist) * force * 1.6;
                    this.y -= (dy / dist) * force * 1.6;
                }
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(1, 198, 252, ${this.alpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(1, 198, 252, 0.6)';
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < connectionDistance) {
                    const opacity = (1 - dist / connectionDistance) * 0.22;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(1, 198, 252, ${opacity})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });

        requestAnimationFrame(animate);
    }
    animate();
}

/* ===================================================================
   2. FUTURISTIC APPLE OS GLASS CURSOR SYSTEM
   =================================================================== */
function initReticleCursor() {
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    const label = document.getElementById('cursor-label');
    if (!dot || !ring) return;

    if (window.matchMedia('(pointer: coarse), (hover: none)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let prevMouseX = mouseX;
    let prevMouseY = mouseY;
    let speed = 0;
    let currentAngle = 0;
    let isVisible = false;

    // Zero-latency hardware-accelerated dot positioning
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (!isVisible) {
            isVisible = true;
            dot.style.opacity = '1';
            ring.style.opacity = '1';
        }
        dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    }, { passive: true });

    // 60/120fps fluid physics render loop with velocity-based elongation
    function renderCursor() {
        const dx = mouseX - ringX;
        const dy = mouseY - ringY;
        ringX += dx * 0.18;
        ringY += dy * 0.18;

        const moveDist = Math.hypot(mouseX - prevMouseX, mouseY - prevMouseY);
        speed += (moveDist - speed) * 0.28;
        prevMouseX = mouseX;
        prevMouseY = mouseY;

        if (moveDist > 1.2) {
            currentAngle = Math.atan2(dy, dx);
        }

        const isSpecialState = document.body.classList.contains('cursor-hover') ||
                              document.body.classList.contains('cursor-view') ||
                              document.body.classList.contains('cursor-text') ||
                              document.body.classList.contains('cursor-down');

        if (!isSpecialState && speed > 2) {
            // Organic liquid glass stretch along trajectory
            const stretch = Math.min(1 + speed * 0.016, 1.45);
            const squash = Math.max(1 - speed * 0.008, 0.76);
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) rotate(${currentAngle}rad) scale(${stretch}, ${squash})`;
        } else if (document.body.classList.contains('cursor-down')) {
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(0.82)`;
        } else {
            ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
        }

        requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Dynamic event delegation for interactive hover states
    document.addEventListener('mouseover', (e) => {
        const target = e.target;
        if (!target) return;

        // Text caret mode for inputs & textarea
        if (target.closest('input, textarea, [contenteditable="true"]')) {
            document.body.classList.add('cursor-text');
            return;
        }

        // View HUD mode for showcase & simulation cards
        if (target.closest('.portfolio-box, .simulation-card, .gallery-slide, .hr-star-trophy-card, .hr-role-lux-card')) {
            document.body.classList.add('cursor-view');
            if (label) label.textContent = 'VIEW ↗';
            return;
        }

        // Interactive squircle mode for buttons, links, controls
        if (target.closest('a, button, .dock-item, .tab-btn, .back-to-top, .sound-toggle, .dynamic-island, .spotlight-result-item, .filter-chip, [role="button"]')) {
            document.body.classList.add('cursor-hover');
            playAppleSound('hover');
        }
    }, { passive: true });

    document.addEventListener('mouseout', (e) => {
        const related = e.relatedTarget;
        if (!related || !related.closest('input, textarea, [contenteditable="true"]')) {
            document.body.classList.remove('cursor-text');
        }
        if (!related || !related.closest('.portfolio-box, .simulation-card, .gallery-slide, .hr-star-trophy-card, .hr-role-lux-card')) {
            document.body.classList.remove('cursor-view');
            if (label) label.textContent = '';
        }
        if (!related || !related.closest('a, button, .dock-item, .tab-btn, .back-to-top, .sound-toggle, .dynamic-island, .spotlight-result-item, .filter-chip, [role="button"]')) {
            document.body.classList.remove('cursor-hover');
        }
    }, { passive: true });

    // Tactile Mousedown + Click Shockwave
    window.addEventListener('mousedown', (e) => {
        document.body.classList.add('cursor-down');
        playAppleSound('tap');

        // Spawn dynamic holographic ripple
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        document.body.appendChild(ripple);
        setTimeout(() => {
            if (ripple && ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 420);
    }, { passive: true });

    window.addEventListener('mouseup', () => {
        document.body.classList.remove('cursor-down');
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
        ring.style.opacity = '0';
        isVisible = false;
    });
    document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        isVisible = true;
    });
}

/* ===================================================================
   3. APPLE macOS DOCK MAGNIFICATION PHYSICS
   =================================================================== */
function initMacOSDock() {
    const dock = document.getElementById('macosDock');
    if (!dock) return;

    const dockItems = dock.querySelectorAll('.dock-item');
    const sections = document.querySelectorAll('section[id]');

    // macOS Magnification on mouse move
    dock.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX;
        dockItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.left + rect.width / 2;
            const distance = Math.abs(mouseX - itemCenter);
            const maxDistance = 120;

            if (distance < maxDistance) {
                const scale = 1 + (1 - distance / maxDistance) * 0.28;
                const translateY = (1 - distance / maxDistance) * -8;
                item.style.transform = `scale(${scale}) translateY(${translateY}px)`;
            } else {
                item.style.transform = 'scale(1) translateY(0)';
            }
        });
    });

    dock.addEventListener('mouseleave', () => {
        dockItems.forEach(item => {
            item.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Active dock indicator on scroll
    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        let currentSectionId = '';
        sections.forEach(sec => {
            const secTop = sec.offsetTop - 200;
            const secHeight = sec.offsetHeight;
            if (winScroll >= secTop && winScroll < secTop + secHeight) {
                currentSectionId = sec.getAttribute('id');
            }
        });

        if (currentSectionId) {
            dockItems.forEach(item => {
                const href = item.getAttribute('href');
                if (href === `#${currentSectionId}`) {
                    item.classList.add('active');
                } else if (href) {
                    item.classList.remove('active');
                }
            });
        }
    }, { passive: true });

    // Dock quick buttons
    const dockSpotBtn = document.getElementById('dockSpotlightBtn');
    if (dockSpotBtn) {
        dockSpotBtn.addEventListener('click', () => {
            openSpotlight();
        });
    }

    const dockTermBtn = document.getElementById('dockTerminalBtn');
    if (dockTermBtn) {
        dockTermBtn.addEventListener('click', () => {
            const termModal = document.getElementById('cyberTerminalModal');
            if (termModal) {
                termModal.classList.add('open');
                termModal.setAttribute('aria-hidden', 'false');
                playAppleSound('pop');
                setTimeout(() => document.getElementById('terminalInput')?.focus(), 100);
            }
        });
    }
}

/* ===================================================================
   4. APPLE SPOTLIGHT SEARCH (⌘K / Ctrl+K)
   =================================================================== */
const SPOTLIGHT_INDEX = [
    { title: 'Home / Executive Intro', category: 'navigation', desc: 'Main hero and executive software craftsman introduction', link: '#home', icon: 'fa-house' },
    { title: 'Executive Dossier (About Me)', category: 'navigation', desc: 'Academic pedigree, Moratuwa BIT & SEUSL double degree details', link: '#about', icon: 'fa-user-tie' },
    { title: 'Skills & Tech Matrix', category: 'skills', desc: 'JavaScript, React, Node, Spring Boot, Python, SQL, C#, Docker', link: '#skills', icon: 'fa-layer-group' },
    { title: 'Walmart USA Simulation', category: 'simulations', desc: 'Advanced Data Structures & Relational Database Architecture simulation', link: '#simulations', icon: 'fa-building-columns' },
    { title: 'JPMorgan Chase Simulation', category: 'simulations', desc: 'Software engineering, financial data feeds & real-time visualizers', link: '#simulations', icon: 'fa-chart-line' },
    { title: 'Citi Technology Simulation', category: 'simulations', desc: 'Markets & Banking Technology architecture and distributed systems', link: '#simulations', icon: 'fa-landmark' },
    { title: '5★ HackerRank Elite Profile', category: 'certs', desc: 'Top problem solver badges in Java, SQL, Python, C', link: '#hackerrank', icon: 'fa-star' },
    { title: 'University of Moratuwa Certs', category: 'certs', desc: 'Web Development & Python Programming accredited credentials', link: '#certifications', icon: 'fa-award' },
    { title: 'UniMart Enterprise ERP', category: 'projects', desc: 'Multi-store inventory, billing & reactive analytics system', link: '#portfolio', icon: 'fa-laptop-code' },
    { title: 'Fullstack Task Orchestration Hub', category: 'projects', desc: 'Real-time kanban & collaborative project workspace', link: '#portfolio', icon: 'fa-list-check' },
    { title: 'Download Executive Resume / CV', category: 'action', desc: 'Get official PDF dossier from Google Drive', link: 'https://drive.google.com/file/d/1zH18yxWMdOYtbDRnXFMQVHe324t2tH8Q/view?usp=sharing', external: true, icon: 'fa-file-arrow-down' },
    { title: 'Contact Mohamad Ruzni', category: 'contact', desc: 'Direct email: ruzni.dev@gmail.com • Open to worldwide roles', link: '#contact', icon: 'fa-paper-plane' },
    { title: 'Launch RUZNI_OS Terminal', category: 'action', desc: 'Interactive command shell CLI interface', action: 'terminal', icon: 'fa-terminal' }
];

function initAppleSpotlight() {
    const triggerBtn = document.getElementById('spotlightTriggerBtn');
    const modal = document.getElementById('spotlightModal');
    const input = document.getElementById('spotlightInput');
    const resultsContainer = document.getElementById('spotlightResults');
    const filterPills = document.querySelectorAll('.spot-filter-pill');

    if (!modal || !input || !resultsContainer) return;

    let activeFilter = 'all';
    let selectedIndex = 0;
    let filteredList = [...SPOTLIGHT_INDEX];

    function renderResults() {
        const query = input.value.trim().toLowerCase();
        filteredList = SPOTLIGHT_INDEX.filter(item => {
            const matchesFilter = (activeFilter === 'all') || (item.category === activeFilter);
            const matchesQuery = !query ||
                item.title.toLowerCase().includes(query) ||
                item.desc.toLowerCase().includes(query) ||
                item.category.toLowerCase().includes(query);
            return matchesFilter && matchesQuery;
        });

        if (filteredList.length === 0) {
            resultsContainer.innerHTML = `
                <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted); font-size: 1.4rem;">
                    <i class="fas fa-magnifying-glass" style="font-size: 2.4rem; color: var(--cyan-electric); margin-bottom: 1rem; display: block;"></i>
                    No matches found for "${query}"
                </div>
            `;
            return;
        }

        selectedIndex = Math.min(selectedIndex, filteredList.length - 1);
        selectedIndex = Math.max(0, selectedIndex);

        resultsContainer.innerHTML = filteredList.map((item, idx) => `
            <a href="${item.link || '#'}" class="spot-item ${idx === selectedIndex ? 'selected' : ''}" data-index="${idx}" ${item.external ? 'target="_blank"' : ''}>
                <div class="spot-item-left">
                    <div class="spot-item-icon">
                        <i class="fas ${item.icon}"></i>
                    </div>
                    <div class="spot-item-info">
                        <h5>${item.title}</h5>
                        <p>${item.desc}</p>
                    </div>
                </div>
                <span class="spot-badge">${item.category}</span>
            </a>
        `).join('');

        // Attach click handlers
        resultsContainer.querySelectorAll('.spot-item').forEach(el => {
            el.addEventListener('click', (e) => {
                const idx = parseInt(el.getAttribute('data-index'), 10);
                executeSpotlightItem(filteredList[idx], e);
            });
        });
    }

    function executeSpotlightItem(item, e) {
        if (item.action === 'terminal') {
            if (e) e.preventDefault();
            closeSpotlight();
            const termModal = document.getElementById('cyberTerminalModal');
            if (termModal) {
                termModal.classList.add('open');
                termModal.setAttribute('aria-hidden', 'false');
                setTimeout(() => document.getElementById('terminalInput')?.focus(), 100);
            }
            return;
        }

        if (item.external) {
            closeSpotlight();
            return;
        }

        if (item.link && item.link.startsWith('#')) {
            closeSpotlight();
            const targetEl = document.querySelector(item.link);
            if (targetEl) {
                targetEl.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    window.openSpotlight = function() {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        playAppleSound('pop');
        input.value = '';
        renderResults();
        setTimeout(() => input.focus(), 80);
    };

    window.closeSpotlight = function() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        playAppleSound('click');
    };

    if (triggerBtn) {
        triggerBtn.addEventListener('click', openSpotlight);
    }

    // Modal background click or ESC click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeSpotlight();
    });
    const escPill = document.querySelector('.spotlight-esc-pill');
    if (escPill) escPill.addEventListener('click', closeSpotlight);

    // Keyboard shortcut (⌘K or Ctrl+K)
    document.addEventListener('keydown', (e) => {
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            if (modal.classList.contains('open')) {
                closeSpotlight();
            } else {
                openSpotlight();
            }
        }
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeSpotlight();
        }
    });

    // Keyboard navigation in search input
    input.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            selectedIndex = (selectedIndex + 1) % filteredList.length;
            renderResults();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            selectedIndex = (selectedIndex - 1 + filteredList.length) % filteredList.length;
            renderResults();
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (filteredList[selectedIndex]) {
                executeSpotlightItem(filteredList[selectedIndex]);
            }
        }
    });

    input.addEventListener('input', () => {
        selectedIndex = 0;
        renderResults();
    });

    // Filter pills
    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            filterPills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeFilter = pill.getAttribute('data-spot') || 'all';
            selectedIndex = 0;
            renderResults();
        });
    });

    renderResults();
}

/* ===================================================================
   5. APPLE DYNAMIC ISLAND CLOCK & TELEMETRY
   =================================================================== */
function initDynamicIslandClock() {
    const clockEl = document.getElementById('islandClock');
    if (!clockEl) return;

    function updateTime() {
        const now = new Date();
        const options = {
            timeZone: 'Asia/Colombo',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        };
        const timeStr = now.toLocaleTimeString('en-US', options);
        clockEl.textContent = `${timeStr} (GMT+5:30)`;
    }
    updateTime();
    setInterval(updateTime, 1000);

    const dynamicIsland = document.getElementById('dynamicIsland');
    if (dynamicIsland) {
        dynamicIsland.addEventListener('click', () => {
            dynamicIsland.classList.toggle('active');
            playAppleSound('pop');
        });
    }
}

/* ===================================================================
   6. APPLE WEB AUDIO HAPTICS (GLASS TAPS & POPS)
   =================================================================== */
let audioCtx = null;
let soundEnabled = true;

function initAudioController() {
    const soundBtn = document.getElementById('soundToggleBtn');

    try {
        const savedSound = localStorage.getItem('apple-portfolio-sound');
        if (savedSound === 'muted') {
            soundEnabled = false;
            if (soundBtn) {
                soundBtn.classList.add('muted');
                const icon = soundBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-volume-xmark';
            }
        }
    } catch (e) {}

    if (soundBtn) {
        soundBtn.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            const icon = soundBtn.querySelector('i');
            if (soundEnabled) {
                soundBtn.classList.remove('muted');
                if (icon) icon.className = 'fas fa-volume-high';
                try { localStorage.setItem('apple-portfolio-sound', 'active'); } catch (e) {}
                playAppleSound('pop');
            } else {
                soundBtn.classList.add('muted');
                if (icon) icon.className = 'fas fa-volume-xmark';
                try { localStorage.setItem('apple-portfolio-sound', 'muted'); } catch (e) {}
            }
        });
    }

    document.querySelectorAll('.btn, .skills-tab-btn, .project-filter-btn, .hr-tab-btn, .social-icon-btn, .terminal-trigger-btn, .spotlight-trigger-btn').forEach(el => {
        el.addEventListener('click', () => playAppleSound('click'));
    });
}

function playAppleSound(type) {
    if (!soundEnabled) return;
    try {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);

        const now = audioCtx.currentTime;

        if (type === 'pop') {
            // Apple-style UI pop
            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === 'hover') {
            // Subtle glass tap
            osc.type = 'sine';
            osc.frequency.setValueAtTime(1400, now);
            osc.frequency.exponentialRampToValueAtTime(1000, now + 0.02);
            gain.gain.setValueAtTime(0.012, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);
            osc.start(now);
            osc.stop(now + 0.02);
        } else if (type === 'click') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(850, now);
            osc.frequency.exponentialRampToValueAtTime(420, now + 0.04);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
            osc.start(now);
            osc.stop(now + 0.04);
        } else if (type === 'success') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(523.25, now);
            osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.12);
            gain.gain.setValueAtTime(0.08, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
            osc.start(now);
            osc.stop(now + 0.12);
        }
    } catch (e) {}
}

/* ===================================================================
   7. RUZNI_OS CYBER TERMINAL
   =================================================================== */
function initCyberTerminal() {
    const triggerBtn = document.getElementById('terminalTriggerBtn');
    const modal = document.getElementById('cyberTerminalModal');
    const closeDot = document.getElementById('terminalCloseDot');
    const input = document.getElementById('terminalInput');
    const output = document.getElementById('terminalOutput');
    const body = document.getElementById('terminalBody');

    if (!modal || !input || !output) return;

    function openTerminal() {
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        playAppleSound('pop');
        setTimeout(() => input.focus(), 100);
    }

    function closeTerminal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        playAppleSound('click');
    }

    if (triggerBtn) triggerBtn.addEventListener('click', openTerminal);
    if (closeDot) closeDot.addEventListener('click', closeTerminal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeTerminal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeTerminal();
        }
    });

    function printLine(text, className = '') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        line.innerHTML = text;
        output.appendChild(line);
        if (body) body.scrollTop = body.scrollHeight;
    }

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const rawVal = input.value.trim();
            if (!rawVal) return;

            printLine(`<span class="terminal-prompt">ruzni@cyber-sys:~$</span> ${rawVal}`, 'cmd-echo');
            playAppleSound('click');
            input.value = '';

            const cmd = rawVal.toLowerCase();

            switch (cmd) {
                case 'help':
                    printLine('AVAILABLE SYSTEM COMMANDS:', 'cyan');
                    printLine('  <span class="cyan">whoami</span>      - Display executive profile dossier');
                    printLine('  <span class="cyan">skills</span>      - Query technical skills &amp; proficiencies');
                    printLine('  <span class="cyan">projects</span>    - List deployed production software systems');
                    printLine('  <span class="cyan">simulations</span> - Review Fortune 500 corporate simulations');
                    printLine('  <span class="cyan">certs</span>       - Inspect accredited certifications');
                    printLine('  <span class="cyan">contact</span>     - Initialize direct communication channels');
                    printLine('  <span class="cyan">cv</span>          - Download executive resume / dossier');
                    printLine('  <span class="cyan">spotlight</span>   - Open Apple Spotlight Search');
                    printLine('  <span class="cyan">clear</span>       - Flush terminal buffer');
                    printLine('  <span class="cyan">exit</span>        - Terminate shell session');
                    break;

                case 'whoami':
                    printLine('NAME: Mohamad Ruzni', 'cyan');
                    printLine('ROLE: Executive Software Engineer & Fullstack Craftsman');
                    printLine('ACADEMIA: University of Moratuwa (BIT) & SEUSL (BSc Applied Science)');
                    printLine('ALGORITHM RANK: 5-Star HackerRank Elite (Java, SQL, Python, C)');
                    break;

                case 'skills':
                    printLine('TECH STACK // ACTIVE PROTOCOLS:', 'cyan');
                    printLine('• Fullstack: JavaScript (ES6+), React.js, Node.js, Express.js, Tailwind');
                    printLine('• Core Systems: Java & Spring Boot, Python & Data ETL, C# .NET Core, C/C++');
                    printLine('• Databases: PostgreSQL, MySQL, SQLite, MongoDB');
                    break;

                case 'projects':
                    printLine('CORE PRODUCTION SYSTEMS:', 'cyan');
                    printLine('1. <span class="cyan">UniMart Enterprise ERP</span> — React, Node, Express, MongoDB');
                    printLine('2. <span class="cyan">E-commerce Multi-Vendor Portal</span> — Next.js, Node.js, SQL');
                    printLine('3. <span class="cyan">Task Orchestration Hub</span> — Fullstack Workspace System');
                    break;

                case 'simulations':
                    printLine('FORTUNE 500 CORPORATE SIMULATIONS:', 'cyan');
                    printLine('• Walmart Global Tech USA');
                    printLine('• JPMorgan Chase & Co.');
                    printLine('• Citi');
                    break;

                case 'certs':
                    printLine('VERIFIED CREDENTIALS (15+ TOTAL):', 'cyan');
                    printLine('• 5★ HackerRank (Java, SQL, Python, Problem Solving)');
                    printLine('• University of Moratuwa (BIT)');
                    printLine('• Microsoft Accredited Engineering Certs');
                    break;

                case 'contact':
                    printLine('COMMUNICATION FREQUENCIES:', 'cyan');
                    printLine('• Email: <span class="cyan">ruzni.dev@gmail.com</span>');
                    printLine('• LinkedIn: <span class="cyan">linkedin.com/in/ruzni-dev</span>');
                    break;

                case 'cv':
                    printLine('Initiating transfer of CV / Dossier...', 'cyan');
                    window.open('https://drive.google.com/file/d/1zH18yxWMdOYtbDRnXFMQVHe324t2tH8Q/view?usp=sharing', '_blank');
                    break;

                case 'spotlight':
                    closeTerminal();
                    if (window.openSpotlight) window.openSpotlight();
                    break;

                case 'clear':
                    output.innerHTML = '';
                    break;

                case 'exit':
                    closeTerminal();
                    break;

                default:
                    printLine(`Command not recognized: '${rawVal}'. Type <span class="cyan">'help'</span> for instructions.`, 'dim');
                    break;
            }
        }
    });
}

/* ===================================================================
   8. TEXT SCRAMBLER DECRYPTION
   =================================================================== */
function initTextScrambler() {
    const chars = '01#@$%&*<>~/[]{}—=+';
    const scrambleElements = document.querySelectorAll('.section-tag');

    scrambleElements.forEach(el => {
        const originalText = el.innerText;
        let isScrambling = false;

        function scramble() {
            if (isScrambling) return;
            isScrambling = true;
            let iteration = 0;
            const maxIterations = originalText.length;

            const interval = setInterval(() => {
                el.innerText = originalText
                    .split('')
                    .map((letter, index) => {
                        if (letter === ' ' || letter === '\n') return letter;
                        if (index < iteration) {
                            return originalText[index];
                        }
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('');

                if (iteration >= maxIterations) {
                    clearInterval(interval);
                    el.innerText = originalText;
                    isScrambling = false;
                }
                iteration += 1 / 2;
            }, 30);
        }

        el.addEventListener('mouseenter', scramble);
    });
}

/* ===================================================================
   9. HERO 3D TILT
   =================================================================== */
function initHeroCard3DTilt() {
    const wrap = document.querySelector('.hero-card-3d-wrap');
    const card = document.querySelector('.hero-card-3d');
    if (!wrap || !card) return;

    wrap.addEventListener('mousemove', (e) => {
        const rect = wrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    wrap.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
}

/* ===================================================================
   10. METRICS COUNTER
   =================================================================== */
function initMetricsCounter() {
    const metricNumbers = document.querySelectorAll('.metric-number');
    if (!metricNumbers.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const targetVal = parseInt(el.getAttribute('data-count'), 10) || 0;
                const suffix = el.getAttribute('data-suffix') || '';
                animateValue(el, 0, targetVal, 1600, suffix);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    metricNumbers.forEach(num => observer.observe(num));

    function animateValue(obj, start, end, duration, suffix) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(easeOutProgress * (end - start) + start);
            obj.textContent = `${current}${suffix}`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.textContent = `${end}${suffix}`;
            }
        };
        window.requestAnimationFrame(step);
    }
}

/* ===================================================================
   11. SKILLS SEARCH & FILTER
   =================================================================== */
function initSkillsCommandCenter() {
    const tabs = document.querySelectorAll('.skills-tab-btn');
    const searchInput = document.getElementById('skillSearchInput');
    const skillCards = document.querySelectorAll('.skill-card');
    const skillFills = document.querySelectorAll('.skill-bar-fill');

    let activeFilter = 'all';
    let searchQuery = '';

    function filterSkills() {
        skillCards.forEach(card => {
            const domain = card.getAttribute('data-domain') || '';
            const skillName = (card.querySelector('h4')?.textContent || '').toLowerCase();
            const matchesFilter = (activeFilter === 'all') || (domain === activeFilter);
            const matchesSearch = !searchQuery || skillName.includes(searchQuery);

            if (matchesFilter && matchesSearch) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            activeFilter = tab.getAttribute('data-filter') || 'all';
            filterSkills();
            playAppleSound('click');
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim().toLowerCase();
            filterSkills();
        });
    }

    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const targetWidth = fill.getAttribute('data-width') || '80%';
                fill.style.width = targetWidth;
                progressObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.2 });

    skillFills.forEach(fill => progressObserver.observe(fill));
}

/* ===================================================================
   12. HACKERRANK FILTERS
   =================================================================== */
function initHackerRankFilters() {
    const tabs = document.querySelectorAll('.hr-tab-btn');
    const cards = document.querySelectorAll('.hr-cert-card');

    if (!tabs.length || !cards.length) return;

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            cards.forEach(card => {
                const cat = card.getAttribute('data-category');
                if (filter === 'all' || cat === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.96)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 40);
                } else {
                    card.classList.add('hidden');
                }
            });
            playAppleSound('click');
        });
    });
}

/* ===================================================================
   13. PORTFOLIO LAYERED 3D CARD STACK (DEPTH DECK)
   =================================================================== */
function initProjectStack() {
    const stage = document.getElementById('projectStackStage');
    const cards = document.querySelectorAll('.project-stack-card');
    const prevBtn = document.getElementById('projPrevBtn');
    const nextBtn = document.getElementById('projNextBtn');
    const counterCurrent = document.getElementById('projCurrentNum');
    const dashes = document.querySelectorAll('.proj-dash');
    const deck = document.getElementById('projectStackDeck');
    const section = document.getElementById('portfolio');

    if (!stage || cards.length === 0) return;

    let currentIndex = 0;
    const totalCards = cards.length;
    let autoPlayTimer = null;
    const AUTO_DELAY = 4500;
    let isVisible = false;

    // Responsive stack offset step (horizontal and vertical diagonal progression)
    function getStep() {
        return window.innerWidth < 640 ? { x: 8, y: -8 } : { x: 16, y: -14 };
    }

    function updateProjectStack(playSound = true) {
        const step = getStep();

        cards.forEach((card, i) => {
            // Forward circular offset from currentIndex:
            const pos = (i - currentIndex + totalCards) % totalCards;

            if (pos === 0) {
                // Active Front Card
                card.style.transform = 'translate3d(0px, 0px, 0px) scale(1)';
                card.style.opacity = '1';
                card.style.zIndex = '10';
                card.style.filter = 'none';
                card.style.pointerEvents = 'auto';
                card.classList.add('active');
            } else if (pos === 1) {
                // Layer 1 behind
                card.style.transform = `translate3d(${step.x}px, ${step.y}px, 0px) scale(0.97)`;
                card.style.opacity = '0.7';
                card.style.zIndex = '8';
                card.style.filter = 'brightness(0.85)';
                card.style.pointerEvents = 'auto';
                card.classList.remove('active');
            } else if (pos === 2) {
                // Layer 2 behind
                card.style.transform = `translate3d(${step.x * 2}px, ${step.y * 2}px, 0px) scale(0.94)`;
                card.style.opacity = '0.45';
                card.style.zIndex = '6';
                card.style.filter = 'brightness(0.7)';
                card.style.pointerEvents = 'auto';
                card.classList.remove('active');
            } else if (pos === 3) {
                // Layer 3 behind
                card.style.transform = `translate3d(${step.x * 3}px, ${step.y * 3}px, 0px) scale(0.91)`;
                card.style.opacity = '0.25';
                card.style.zIndex = '4';
                card.style.filter = 'brightness(0.55)';
                card.style.pointerEvents = 'auto';
                card.classList.remove('active');
            } else if (pos === totalCards - 1) {
                // Exit card sliding back
                card.style.transform = 'translate3d(-40px, 12px, 0px) scale(0.95)';
                card.style.opacity = '0';
                card.style.zIndex = '1';
                card.style.pointerEvents = 'none';
                card.classList.remove('active');
            } else {
                // Hidden cards in deep background
                card.style.transform = `translate3d(${step.x * 3.5}px, ${step.y * 3.5}px, 0px) scale(0.88)`;
                card.style.opacity = '0';
                card.style.zIndex = '0';
                card.style.pointerEvents = 'none';
                card.classList.remove('active');
            }
        });

        // Update counter
        if (counterCurrent) {
            counterCurrent.textContent = String(currentIndex + 1).padStart(2, '0');
        }

        // Update dashes
        dashes.forEach((dash, i) => {
            dash.classList.toggle('active', i === currentIndex);
        });

        if (playSound && typeof playAppleSound === 'function') {
            playAppleSound('card');
        }
    }

    function goToCard(index, playSound = true) {
        if (index < 0) index = totalCards - 1;
        if (index >= totalCards) index = 0;
        currentIndex = index;
        updateProjectStack(playSound);
    }

    function nextCard(userInitiated = false) {
        goToCard(currentIndex + 1, true);
        if (userInitiated) resetAutoPlay();
    }

    function prevCard(userInitiated = false) {
        goToCard(currentIndex - 1, true);
        if (userInitiated) resetAutoPlay();
    }

    // Attach click events
    if (nextBtn) nextBtn.addEventListener('click', () => nextCard(true));
    if (prevBtn) prevBtn.addEventListener('click', () => prevCard(true));

    // Dash clicks
    dashes.forEach((dash, i) => {
        dash.addEventListener('click', () => {
            goToCard(i, true);
            resetAutoPlay();
        });
    });

    // Peeking card click: clicking any card in the stack brings it to front!
    cards.forEach((card, i) => {
        card.addEventListener('click', (e) => {
            // Don't intercept if clicking an action link or inspect button
            if (e.target.closest('a') || e.target.closest('button')) return;
            if (i !== currentIndex) {
                goToCard(i, true);
                resetAutoPlay();
            } else {
                // If front card is clicked, open modal
                openProjectModal(card);
            }
        });
    });

    // Window resize handler to recalculate card step
    window.addEventListener('resize', () => {
        updateProjectStack(false);
    });

    // Auto-sliding Engine (100% Error-Free, IntersectionObserver, Zero Window Jerk)
    function startAutoPlay() {
        stopAutoPlay();
        if (!isVisible) return;
        autoPlayTimer = setInterval(() => {
            if (isVisible && !document.hidden) {
                goToCard(currentIndex + 1, false);
            }
        }, AUTO_DELAY);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Pause on hover
    if (deck) {
        deck.addEventListener('mouseenter', stopAutoPlay);
        deck.addEventListener('mouseleave', () => {
            if (isVisible) startAutoPlay();
        });
    }

    // IntersectionObserver so auto-sliding ONLY runs when section is visible
    if ('IntersectionObserver' in window && section) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                    startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        }, { threshold: 0.1 });
        observer.observe(section);
    } else {
        isVisible = true;
        startAutoPlay();
    }

    // Tab visibility change
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else if (isVisible) {
            startAutoPlay();
        }
    });

    // Initial render
    updateProjectStack(false);
}

// Global modal helper for stack cards
window.openProjectModalFromStack = function(index) {
    const cards = document.querySelectorAll('.project-stack-card');
    if (cards[index]) {
        openProjectModal(cards[index]);
    }
};

/* ===================================================================
   13.5. FORTUNE 500 CORPORATE JOB SIMULATIONS SPATIAL SLIDER
   =================================================================== */
function initSimulationSlider() {
    const track = document.getElementById('simTrack');
    const slides = document.querySelectorAll('.sim-slide');
    const tabs = document.querySelectorAll('.sim-corp-tab');
    const dots = document.querySelectorAll('.sim-dot');
    const prevBtn = document.getElementById('simPrevBtn');
    const nextBtn = document.getElementById('simNextBtn');
    const currentNum = document.getElementById('simCounterCurrent');
    const progressBar = document.getElementById('simProgressBar');
    const sliderDeck = document.getElementById('simSliderDeck');
    const section = document.getElementById('simulations');

    if (!track || slides.length === 0) return;

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayTimer = null;
    const AUTO_DELAY = 4500;
    let isVisible = false;

    function goToSlide(index, playSound = true) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentIndex = index;

        // Slide Track translation
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update slides active state
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });

        // Synchronize Corporate Tabs if present (NO scrollIntoView)
        tabs.forEach((tab, i) => {
            const isActive = i === currentIndex;
            tab.classList.toggle('active', isActive);
            tab.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        // Synchronize Dots
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });

        // Update Counter
        if (currentNum) {
            currentNum.textContent = String(currentIndex + 1).padStart(2, '0');
        }

        // Update Progress Bar
        if (progressBar) {
            progressBar.style.width = `${((currentIndex + 1) / totalSlides) * 100}%`;
        }

        if (playSound) {
            playAppleSound('tap');
        }
    }

    function startAutoPlay() {
        stopAutoPlay();
        if (!isVisible) return;
        autoPlayTimer = setInterval(() => {
            goToSlide(currentIndex + 1, false);
        }, AUTO_DELAY);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Only auto-play when visibly in viewport (Error-Free)
    const targetElement = sliderDeck || section;
    if (targetElement && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                    startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        }, { threshold: 0.1 });
        observer.observe(targetElement);
    } else {
        isVisible = true;
        startAutoPlay();
    }

    // Pause on hover
    if (sliderDeck) {
        sliderDeck.addEventListener('mouseenter', stopAutoPlay);
        sliderDeck.addEventListener('mouseleave', () => {
            if (isVisible) startAutoPlay();
        });
    }

    // Pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else if (isVisible) {
            startAutoPlay();
        }
    });

    // Button event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
            resetAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
            resetAutoPlay();
        });
    }

    // Corporate Tab clicks
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSlide = parseInt(tab.getAttribute('data-slide'), 10);
            if (!isNaN(targetSlide) && targetSlide !== currentIndex) {
                goToSlide(targetSlide);
                resetAutoPlay();
            }
        });
    });

    // Indicator Dot clicks
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetSlide = parseInt(dot.getAttribute('data-slide'), 10);
            if (!isNaN(targetSlide) && targetSlide !== currentIndex) {
                goToSlide(targetSlide);
                resetAutoPlay();
            }
        });
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    const viewport = document.getElementById('simViewport') || sliderDeck;

    if (viewport) {
        viewport.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        viewport.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 45) {
            if (diff < 0) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(currentIndex - 1);
            }
            resetAutoPlay();
        }
    }

    // Initialize state
    goToSlide(0, false);
}

/* ===================================================================
   13.6. ACCREDITED CERTIFICATIONS 3D SPATIAL COVERFLOW DECK
   =================================================================== */
function initCertCoverflow() {
    const stage = document.getElementById('certStage');
    const cards = document.querySelectorAll('.cert-3d-card');
    const chips = document.querySelectorAll('.cert-scrub-chip');
    const prevBtn = document.getElementById('certPrevBtn');
    const nextBtn = document.getElementById('certNextBtn');
    const scrubber = document.getElementById('certScrubberBar');
    const deck = document.getElementById('certCoverflowDeck');
    const section = document.getElementById('certifications');

    if (!stage || cards.length === 0) return;

    let currentIndex = 0;
    const totalCards = cards.length;
    let autoPlayTimer = null;
    const AUTO_DELAY = 4500;
    let isVisible = false;

    function getCircularOffset(i, current, total) {
        let diff = (i - current) % total;
        if (diff > total / 2) diff -= total;
        if (diff <= -total / 2) diff += total;
        return diff;
    }

    function updateCoverflow(playSound = true) {
        cards.forEach((card, i) => {
            const offset = getCircularOffset(i, currentIndex, totalCards);
            const isCenter = offset === 0;

            card.classList.toggle('active', isCenter);

            if (isCenter) {
                // Center active card
                card.style.transform = 'translateX(0) scale(1) rotateY(0deg) translateZ(0)';
                card.style.opacity = '1';
                card.style.zIndex = '20';
                card.style.filter = 'blur(0px)';
                card.style.pointerEvents = 'auto';
            } else if (offset === -1) {
                // Immediate Left card (joined rope previous)
                card.style.transform = 'translateX(-56%) scale(0.85) rotateY(16deg) translateZ(-60px)';
                card.style.opacity = '0.65';
                card.style.zIndex = '10';
                card.style.filter = 'blur(0.5px)';
                card.style.pointerEvents = 'auto';
            } else if (offset === 1) {
                // Immediate Right card (joined rope next)
                card.style.transform = 'translateX(56%) scale(0.85) rotateY(-16deg) translateZ(-60px)';
                card.style.opacity = '0.65';
                card.style.zIndex = '10';
                card.style.filter = 'blur(0.5px)';
                card.style.pointerEvents = 'auto';
            } else {
                // All other cards tucked cleanly behind inside the stage
                const dir = offset > 0 ? 1 : -1;
                card.style.transform = `translateX(${dir * 80}%) scale(0.7) translateZ(-140px)`;
                card.style.opacity = '0';
                card.style.zIndex = '1';
                card.style.filter = 'blur(2px)';
                card.style.pointerEvents = 'none';
            }
        });

        // Synchronize Scrubber Chips (Local horizontal container scroll only, NEVER window scroll)
        chips.forEach((chip, i) => {
            const isActive = i === currentIndex;
            chip.classList.toggle('active', isActive);
            chip.setAttribute('aria-selected', isActive ? 'true' : 'false');
            if (isActive && scrubber) {
                scrubber.scrollLeft = chip.offsetLeft - (scrubber.offsetWidth / 2) + (chip.offsetWidth / 2);
            }
        });

        if (playSound) {
            playAppleSound('tap');
        }
    }

    function goToCert(index, playSound = true) {
        currentIndex = (index % totalCards + totalCards) % totalCards;
        updateCoverflow(playSound);
    }

    function startAutoPlay() {
        stopAutoPlay();
        if (!isVisible) return;
        autoPlayTimer = setInterval(() => {
            goToCert(currentIndex + 1, false);
        }, AUTO_DELAY);
    }

    function stopAutoPlay() {
        if (autoPlayTimer) {
            clearInterval(autoPlayTimer);
            autoPlayTimer = null;
        }
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Only auto-play when visibly in viewport (Error-Free)
    const targetCert = stage || deck || section;
    if (targetCert && 'IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
                if (isVisible) {
                    startAutoPlay();
                } else {
                    stopAutoPlay();
                }
            });
        }, { threshold: 0.1 });
        observer.observe(targetCert);
    } else {
        isVisible = true;
        startAutoPlay();
    }

    // Pause on hover
    if (deck) {
        deck.addEventListener('mouseenter', stopAutoPlay);
        deck.addEventListener('mouseleave', () => {
            if (isVisible) startAutoPlay();
        });
    }

    // Pause when tab is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopAutoPlay();
        } else if (isVisible) {
            startAutoPlay();
        }
    });

    // Card click: clicking side card brings it to center
    cards.forEach((card, idx) => {
        card.addEventListener('click', (e) => {
            if (card.classList.contains('active') && e.target.closest('button')) {
                return;
            }
            if (idx !== currentIndex) {
                e.preventDefault();
                goToCert(idx);
                resetAutoPlay();
            }
        });
    });

    // Nav arrows
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            goToCert(currentIndex - 1);
            resetAutoPlay();
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            goToCert(currentIndex + 1);
            resetAutoPlay();
        });
    }

    // Scrubber Chips
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const idx = parseInt(chip.getAttribute('data-index'), 10);
            if (!isNaN(idx) && idx !== currentIndex) {
                goToCert(idx);
                resetAutoPlay();
            }
        });
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    stage.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchEndX - touchStartX;
        if (Math.abs(diff) > 40) {
            if (diff < 0) {
                goToCert(currentIndex + 1);
            } else {
                goToCert(currentIndex - 1);
            }
            resetAutoPlay();
        }
    }, { passive: true });

    // Initial render
    updateCoverflow(false);
}

/* ===================================================================
   14. MODAL SYSTEM
   =================================================================== */
function initModalSystem() {
    const certModal = document.getElementById('certificate-modal');
    const projectModal = document.getElementById('project-modal');

    if (certModal) {
        certModal.addEventListener('click', (e) => {
            if (e.target === certModal) closeCertificateModal();
        });
    }
    if (projectModal) {
        projectModal.addEventListener('click', (e) => {
            if (e.target === projectModal) closeProjectModal();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCertificateModal();
            closeProjectModal();
        }
    });

    document.querySelectorAll('.portfolio-box, .project-stack-card').forEach(box => {
        box.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) return;
            openProjectModal(box);
        });
    });
}

window.openCertificateModal = function(pdfUrl) {
    playAppleSound('pop');
    const modal = document.getElementById('certificate-modal');
    const modalBody = document.getElementById('modal-body');
    if (!modal || !modalBody) return;

    modalBody.innerHTML = `
        <div class="pdf-viewer">
            <iframe src="${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0" title="Certificate Viewer"></iframe>
        </div>
        <div style="margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1.2rem;">
            <a href="${pdfUrl}" target="_blank" class="btn btn-primary" style="font-size: 1.35rem; padding: 1rem 2.2rem;">
                <i class="fas fa-external-link-alt"></i> Open Full PDF
            </a>
            <button onclick="closeCertificateModal()" class="btn btn-outline" style="font-size: 1.35rem; padding: 1rem 2.2rem;">
                Close
            </button>
        </div>
    `;

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

window.closeCertificateModal = function() {
    const modal = document.getElementById('certificate-modal');
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
};

window.openProjectModal = function(card) {
    playAppleSound('pop');
    const modal = document.getElementById('project-modal');
    const modalBody = document.getElementById('project-modal-body');
    if (!modal || !modalBody) return;

    const title = card.getAttribute('data-project-title') || 'Featured Project';
    const badge = card.getAttribute('data-project-badge') || 'Production';
    const badgeIcon = card.getAttribute('data-project-badge-icon') || 'fa-cube';
    const longDesc = card.getAttribute('data-project-long-desc') || '';
    const techStack = card.getAttribute('data-project-tech') || '';
    const demoUrl = card.getAttribute('data-project-demo-url') || '#';

    modalBody.innerHTML = `
        <h2>${title}</h2>
        <span class="modal-badge"><i class="fa-solid ${badgeIcon}"></i> ${badge}</span>
        <p>${longDesc}</p>
        <div class="modal-tech-stack">
            <i class="fa-solid fa-microchip"></i>
            <span><strong>Architecture &amp; Tech:</strong> ${techStack}</span>
        </div>
        <div class="modal-buttons">
            <a href="${demoUrl}" target="_blank" class="btn btn-primary">
                <i class="fa-solid fa-up-right-from-square"></i> Launch Live Application
            </a>
            <button onclick="closeProjectModal()" class="btn btn-outline">Close Preview</button>
        </div>
    `;

    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
};

window.closeProjectModal = function() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
};

/* ===================================================================
   15. QUICK COPY EMAIL & TOAST NOTIFICATION
   =================================================================== */
function initQuickCopyEmail() {
    const copyBtns = document.querySelectorAll('.quick-copy-email-btn');
    const emailToCopy = 'ruzni.dev@gmail.com';

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            navigator.clipboard.writeText(emailToCopy).then(() => {
                playAppleSound('success');
                showToastNotification('Email copied to clipboard: ruzni.dev@gmail.com');
            }).catch(() => {
                showToastNotification('ruzni.dev@gmail.com');
            });
        });
    });
}

function showToastNotification(message) {
    let toast = document.querySelector('.toast-notice');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast-notice';
        document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-circle-check" style="color: var(--cyan-electric);"></i> <span>${message}</span>`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3200);
}

/* ===================================================================
   16. CONTACT FORM
   =================================================================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const messageField = document.getElementById('yourMessage');
    const messageCount = document.getElementById('messageCount');
    const submitBtn = document.getElementById('submitBtn');
    const contactStatus = document.getElementById('contactStatus');

    if (messageField && messageCount) {
        messageField.addEventListener('input', () => {
            const maxChars = 600;
            if (messageField.value.length > maxChars) {
                messageField.value = messageField.value.slice(0, maxChars);
            }
            messageCount.textContent = `${messageField.value.length} / ${maxChars}`;
        });
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const fullName = document.getElementById('fullName').value.trim();
        const emailAddress = document.getElementById('emailAddress').value.trim();
        const mobileNumber = document.getElementById('mobileNumber').value.trim();
        const emailSubject = document.getElementById('emailSubject').value.trim();
        const projectType = document.getElementById('projectType').value;
        const yourMessage = messageField.value.trim();
        const privacyConsent = document.getElementById('privacyConsent').checked;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        const phonePattern = /^[+\d\s()-]{7,20}$/;

        const fields = [
            document.getElementById('fullName'),
            document.getElementById('emailAddress'),
            document.getElementById('mobileNumber'),
            document.getElementById('emailSubject'),
            document.getElementById('projectType'),
            messageField
        ];
        fields.forEach(f => f.classList.remove('input-invalid'));

        if (!fullName || !emailAddress || !mobileNumber || !emailSubject || !projectType || !yourMessage) {
            fields.forEach(f => {
                if (!f.value.trim()) f.classList.add('input-invalid');
            });
            if (contactStatus) {
                contactStatus.className = 'response-msg error';
                contactStatus.textContent = 'Please complete all required fields before proceeding.';
            }
            return;
        }

        if (!emailPattern.test(emailAddress)) {
            document.getElementById('emailAddress').classList.add('input-invalid');
            if (contactStatus) {
                contactStatus.className = 'response-msg error';
                contactStatus.textContent = 'Please provide a valid corporate or personal email address.';
            }
            return;
        }

        if (!phonePattern.test(mobileNumber)) {
            document.getElementById('mobileNumber').classList.add('input-invalid');
            if (contactStatus) {
                contactStatus.className = 'response-msg error';
                contactStatus.textContent = 'Please provide a valid contact phone or WhatsApp number.';
            }
            return;
        }

        if (!privacyConsent) {
            if (contactStatus) {
                contactStatus.className = 'response-msg error';
                contactStatus.textContent = 'Please accept the communication consent to proceed.';
            }
            return;
        }

        playAppleSound('success');
        if (contactStatus) {
            contactStatus.className = 'response-msg success';
            contactStatus.textContent = 'Opening secure mail client for dispatch...';
        }

        if (submitBtn) {
            submitBtn.textContent = 'Preparing Dispatch...';
            submitBtn.disabled = true;
        }

        const recipient = 'ruzni.dev@gmail.com';
        const subject = encodeURIComponent(`[Inquiry] ${projectType} - ${emailSubject}`);
        const body = encodeURIComponent(
            `Client / Inquirer: ${fullName}\n` +
            `Email: ${emailAddress}\n` +
            `Phone: ${mobileNumber}\n` +
            `Domain / Project: ${projectType}\n\n` +
            `Message Details:\n${yourMessage}`
        );

        window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

        setTimeout(() => {
            if (submitBtn) {
                submitBtn.textContent = 'Send Message';
                submitBtn.disabled = false;
            }
        }, 1500);
    });
}

/* ===================================================================
   17. BACK TO TOP
   =================================================================== */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 350) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    }, { passive: true });

    btn.addEventListener('click', () => {
        playAppleSound('pop');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

function initNavbarScroll() {
    const header = document.querySelector('.header');
    const progressBar = document.getElementById('myBar');

    window.addEventListener('scroll', () => {
        const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        if (progressBar) {
            progressBar.style.width = `${scrolled}%`;
        }
        if (header) {
            header.classList.toggle('sticky', winScroll > 50);
        }
    }, { passive: true });
}
