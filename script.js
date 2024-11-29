document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loading-screen');
    
    
    window.addEventListener('load', function() {
        // initial animations class
        loadingScreen.classList.add('loaded');
        
        
        setTimeout(function() {
            loadingScreen.classList.add('fade-out');
            
            
            setTimeout(function() {
                loadingScreen.style.display = 'none';
            }, 800);
        }, 2000);
    });

    const typed = new Typed('#typed-text', {
        strings: [
            'Full Stack Developer',
            'UI/UX Designer',
            'DSA Enthusiast',
            'Video Editor'
        ],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 1000,
        loop: true
    });

    
    const hoverSound = new Audio('hover.mp3');
    hoverSound.volume = 0.2;

    const techItems = document.querySelectorAll('.tech-item');

    techItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            console.log('Hover event triggered');
            hoverSound.currentTime = 0;
            hoverSound.play().catch(error => {
                console.log("Audio play failed:", error);
            });
        });
    });

    function smoothScroll(target, duration) {
        var targetElement = document.querySelector(target);
        var targetPosition = targetElement.getBoundingClientRect().top;
        var startPosition = window.pageYOffset;
        var startTime = null;

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime;
            var timeElapsed = currentTime - startTime;
            var run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        function ease(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }

        requestAnimationFrame(animation);
    }

    function addSmoothScrolling(linkSelector, targetSelector) {
        const navLink = document.querySelector(linkSelector);
        if (navLink) {
            navLink.addEventListener('click', function(e) {
                e.preventDefault();
                smoothScroll(targetSelector, 1000); 
            });
        }
    }

    addSmoothScrolling('a[href="#experience"]', '#experience');

    addSmoothScrolling('a[href="#projects"]', '#projects');

    addSmoothScrolling('a[href="#about"]', 'footer');

    addSmoothScrolling('a[href="#contact"]', 'footer');

    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Optional: Animate hamburger to X
            this.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.custom-cursor');
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
});

// Example of changing cursor size on hover
document.querySelectorAll('.hover-target').forEach(item => {
    item.addEventListener('mouseenter', () => {
        document.querySelector('.custom-cursor').classList.add('cursor-hover');
    });
    item.addEventListener('mouseleave', () => {
        document.querySelector('.custom-cursor').classList.remove('cursor-hover');
    });
});

// Project data array
const projectsData = [
    {
        title: "Portfolio Website",
        description: "Personal portfolio website built with modern web technologies, featuring a responsive design, interactive elements, and smooth animations.",
        techStack: ["React", "JavaScript", "CSS", "Three.js"],
        githubLink: "https://github.com/AKR4PC/PortfolioWebsite",  // Updated with your actual repository
        image: "path/to/portfolio-image.jpg"
    },
    {
        title: "ToDo Web App",
        description: "A web-based ToDo application built with HTML, CSS, and JavaScript. Features include task management, local storage, and responsive design.",
        image: "path/to/todo-image.jpg",
        techStack: ["HTML", "CSS", "JavaScript"],
        githubLink: "https://github.com/AKR4PC/ToDoWeb"
    },
    // ... other projects
];

// Function to create project cards
function createProjectCard(project) {
    return `
        <div class="project-card">
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tech-stack">
                    ${project.techStack.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.githubLink}" target="_blank" rel="noopener noreferrer" class="github-link">
                        <i class="fab fa-github"></i> View Project
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('visible');
        return;
    }
    
    if (currentScroll > lastScroll && !navbar.classList.contains('scrolled')) {
        // Scroll down
        navbar.classList.remove('visible');
        navbar.classList.add('scrolled');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scrolled')) {
        // Scroll up
        navbar.classList.remove('scrolled');
        navbar.classList.add('visible');
    }
    
    lastScroll = currentScroll;
});

// Optional: Add loading progress
let progress = 0;
const loadingText = document.querySelector('.loading-text');

function updateProgress() {
    progress += Math.random() * 30;
    if (progress > 100) progress = 100;
    
    loadingText.textContent = `Loading... ${Math.floor(progress)}%`;
    
    if (progress < 100) {
        requestAnimationFrame(updateProgress);
    }
}

requestAnimationFrame(updateProgress);
  