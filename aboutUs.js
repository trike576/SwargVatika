// ==================== HAMBURGER MENU ====================
const toggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const backdrop = document.getElementById("navBackdrop");

if (toggle && navbar && backdrop) {
    // Open/Close menu on hamburger click
    toggle.addEventListener("click", () => {
        navbar.classList.toggle("open");
        backdrop.classList.toggle("show");
    });
    
    // Close menu on backdrop click
    backdrop.addEventListener("click", () => {
        navbar.classList.remove("open");
        backdrop.classList.remove("show");
    });

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("open");
            backdrop.classList.remove("show");
        });
    });
}

// Close menu on window resize (when switching from mobile to desktop)
window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
        navbar.classList.remove("open");
        backdrop.classList.remove("show");
    }
});

// Close menu on Escape key press
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        navbar.classList.remove("open");
        backdrop.classList.remove("show");
    }
});

// ==================== DISABLE BODY SCROLL WHEN MENU IS OPEN ====================
const preventScroll = () => {
    if (navbar && navbar.classList.contains("open")) {
        document.body.style.overflow = "hidden";
    } else {
        document.body.style.overflow = "auto";
    }
};

// Add mutation observer to watch for menu open/close
const menuObserver = new MutationObserver(preventScroll);
if (navbar) {
    menuObserver.observe(navbar, { 
        attributes: true, 
        attributeFilter: ["class"] 
    });
}

// ==================== SCROLL ANIMATIONS ====================
// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered animation delay
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 100);
            
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animations to various sections
const animateElements = () => {
    // Value cards
    const valueCards = document.querySelectorAll(".value-card");
    valueCards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(30px)";
        card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        fadeInObserver.observe(card);
    });

    // Reason items
    const reasonItems = document.querySelectorAll(".reason-item");
    reasonItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateY(30px)";
        item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        fadeInObserver.observe(item);
    });

    // Commitment boxes
    const commitmentBoxes = document.querySelectorAll(".commitment-box");
    commitmentBoxes.forEach(box => {
        box.style.opacity = "0";
        box.style.transform = "translateX(-30px)";
        box.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        fadeInObserver.observe(box);
    });

    // Offer items
    const offerItems = document.querySelectorAll(".offer-item");
    offerItems.forEach(item => {
        item.style.opacity = "0";
        item.style.transform = "translateX(-30px)";
        item.style.transition = "opacity 0.6s ease, transform 0.6s ease";
        fadeInObserver.observe(item);
    });
};

// Initialize animations when DOM is loaded
document.addEventListener("DOMContentLoaded", animateElements);

// ==================== STORY IMAGE PARALLAX EFFECT ====================
const storyImage = document.querySelector(".story-image");

if (storyImage) {
    window.addEventListener("scroll", () => {
        const scrolled = window.pageYOffset;
        const imageTop = storyImage.offsetTop;
        const imageHeight = storyImage.offsetHeight;
        
        if (scrolled > imageTop - window.innerHeight && scrolled < imageTop + imageHeight) {
            const parallaxSpeed = 0.3;
            const yPos = (scrolled - imageTop) * parallaxSpeed;
            storyImage.style.transform = `translateY(${yPos}px)`;
        }
    });
}

// ==================== NUMBER COUNTER ANIMATION ====================
// Animate numbers in "Why Choose Us" section
const animateNumbers = () => {
    const reasonNumbers = document.querySelectorAll(".reason-number");
    
    const numberObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalNumber = parseInt(target.textContent);
                let currentNumber = 0;
                
                const increment = finalNumber / 30; // 30 frames
                const timer = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= finalNumber) {
                        target.textContent = String(finalNumber).padStart(2, '0');
                        clearInterval(timer);
                    } else {
                        target.textContent = String(Math.floor(currentNumber)).padStart(2, '0');
                    }
                }, 30);
                
                numberObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    reasonNumbers.forEach(num => {
        numberObserver.observe(num);
    });
};

// Initialize number animation
document.addEventListener("DOMContentLoaded", animateNumbers);

// ==================== CTA BUTTONS SMOOTH SCROLL ====================
const ctaButtons = document.querySelectorAll(".cta-btn");

ctaButtons.forEach(button => {
    // Add ripple effect on click
    button.addEventListener("click", function(e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + "px";
        ripple.style.left = x + "px";
        ripple.style.top = y + "px";
        ripple.classList.add("ripple");
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple CSS dynamically
const style = document.createElement("style");
style.textContent = `
    .cta-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== VALUE CARD TILT EFFECT ====================
const valueCards = document.querySelectorAll(".value-card");

valueCards.forEach(card => {
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
    });
});

// ==================== SMOOTH SCROLL TO TOP ====================
// Add a "scroll to top" button
const createScrollTopButton = () => {
    const button = document.createElement("button");
    button.innerHTML = "↑";
    button.className = "scroll-top-btn";
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: #2d5016;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(button);
    
    // Show/hide button on scroll
    window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
            button.style.opacity = "1";
            button.style.visibility = "visible";
        } else {
            button.style.opacity = "0";
            button.style.visibility = "hidden";
        }
    });
    
    // Scroll to top on click
    button.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
    
    // Hover effect
    button.addEventListener("mouseenter", () => {
        button.style.backgroundColor = "#3a6b1f";
        button.style.transform = "scale(1.1)";
    });
    
    button.addEventListener("mouseleave", () => {
        button.style.backgroundColor = "#2d5016";
        button.style.transform = "scale(1)";
    });
};

// Initialize scroll-to-top button
createScrollTopButton();

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";
    
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
});

// ==================== CONSOLE MESSAGE ====================
console.log("SwargVatika About Us Page Loaded Successfully! 🌱");
console.log("Learn more about our commitment to fresh, organic farming.");