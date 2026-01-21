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

// ==================== EXPLORE BUTTON ====================
const exploreButton = document.querySelector(".explore-button");

if (exploreButton) {
    exploreButton.addEventListener("click", () => {
        // Redirect to Products page
        window.location.href = "Products.html";
    });
}

// ==================== SMOOTH SCROLL (OPTIONAL) ====================
// If you want smooth scrolling to products section instead of redirect
// Uncomment this code and comment the above exploreButton code

/*
const exploreButton = document.querySelector(".explore-button");

if (exploreButton) {
    exploreButton.addEventListener("click", () => {
        const productsSection = document.querySelector(".best-sellers");
        if (productsSection) {
            productsSection.scrollIntoView({ 
                behavior: "smooth",
                block: "start"
            });
        }
    });
}
*/

// ==================== PRODUCT CARD ANIMATIONS ====================
// Add animation when products come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const productObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            // Add staggered animation delay
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 100);
            
            productObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all product cards
const productCards = document.querySelectorAll(".product");
productCards.forEach(card => {
    // Set initial state for animation
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    
    productObserver.observe(card);
});

// ==================== PRODUCT LABEL HOVER EFFECT ====================
// Optional: Add additional interactions to product cards
productCards.forEach(card => {
    const imageContainer = card.querySelector(".product-image-container");
    
    if (imageContainer) {
        card.addEventListener("mouseenter", () => {
            const label = card.querySelector(".product-label");
            if (label) {
                label.style.transform = "scale(1.05)";
            }
        });
        
        card.addEventListener("mouseleave", () => {
            const label = card.querySelector(".product-label");
            if (label) {
                label.style.transform = "scale(1)";
            }
        });
    }
});

// ==================== PRODUCT CARD CLICK HANDLER ====================
// Optional: Add click functionality to product cards
productCards.forEach(card => {
    card.addEventListener("click", () => {
        // Get product name from label
        const productLabel = card.querySelector(".product-label");
        const productName = productLabel ? productLabel.textContent : "Product";
        
        // Get availability
        const availability = card.querySelector(".availability").textContent;
        
        if (availability.toLowerCase().includes("yes") || availability.toLowerCase().includes("available")) {
            // Product is available - could redirect to product details or show modal
            console.log(`Clicked on: ${productName}`);
            // Future: Redirect to product details page
            // window.location.href = `product-details.html?product=${productName}`;
        } else {
            // Product is out of stock
            alert(`Sorry, ${productName} is currently out of stock. Please check back later!`);
        }
    });
    
    // Add pointer cursor for better UX
    card.style.cursor = "pointer";
});

// ==================== DISABLE BODY SCROLL WHEN MENU IS OPEN ====================
// Prevent background scrolling when mobile menu is open
const preventScroll = () => {
    if (navbar.classList.contains("open")) {
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

// ==================== CONSOLE MESSAGE ====================
console.log("SwargVatika Home Page Loaded Successfully! 🌱");
console.log("Fresh from our farm, delivered with care.");

// ==================== PAGE LOAD ANIMATION ====================
// Fade in the page content on load
window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";
    
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
});