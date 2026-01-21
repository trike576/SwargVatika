// ==================== HAMBURGER MENU ====================
const toggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");
const navBackdrop = document.getElementById("navBackdrop");

if (toggle && navbar && navBackdrop) {
    toggle.addEventListener("click", () => {
        navbar.classList.toggle("open");
        navBackdrop.classList.toggle("show");
    });
    
    navBackdrop.addEventListener("click", () => {
        navbar.classList.remove("open");
        navBackdrop.classList.remove("show");
    });

    // Close menu when clicking on nav links
    const navLinks = document.querySelectorAll(".nav-links a");
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navbar.classList.remove("open");
            navBackdrop.classList.remove("show");
        });
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
        navbar.classList.remove("open");
        navBackdrop.classList.remove("show");
    }
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        navbar.classList.remove("open");
        navBackdrop.classList.remove("show");
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

// ==================== FILTER POPUP ====================
const filterButton = document.getElementById("filterButton");
const filterPopup = document.getElementById("filterPopup");
const filterBackdrop = document.getElementById("filterBackdrop");
const closePopup = document.getElementById("closePopup");
const applyFilters = document.getElementById("applyFilters");
const resetFilters = document.getElementById("resetFilters");

// Open filter popup
if (filterButton) {
    filterButton.addEventListener("click", () => {
        filterPopup.classList.add("active");
        filterBackdrop.classList.add("active");
        document.body.style.overflow = "hidden";
    });
}

// Close filter popup
function closeFilterPopup() {
    filterPopup.classList.remove("active");
    filterBackdrop.classList.remove("active");
    document.body.style.overflow = "auto";
}

if (closePopup) {
    closePopup.addEventListener("click", closeFilterPopup);
}

if (filterBackdrop) {
    filterBackdrop.addEventListener("click", closeFilterPopup);
}

// Close on Escape key
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && filterPopup && filterPopup.classList.contains("active")) {
        closeFilterPopup();
    }
});

// ==================== FILTER & SORT LOGIC ====================
const productsGrid = document.getElementById("productsGrid");
const searchInput = document.getElementById("searchInput");
const noResults = document.getElementById("noResults");
const allProducts = Array.from(document.querySelectorAll(".product-card"));

let currentFilters = {
    category: "all",
    sortName: "none",
    sortPrice: "none",
    searchQuery: ""
};

// Apply Filters Button
if (applyFilters) {
    applyFilters.addEventListener("click", () => {
        // Get selected category
        const selectedCategory = document.querySelector('input[name="category"]:checked');
        
        // Get selected name sort
        const selectedNameSort = document.querySelector('input[name="sortName"]:checked');
        
        // Get selected price sort
        const selectedPriceSort = document.querySelector('input[name="sortPrice"]:checked');
        
        currentFilters.category = selectedCategory ? selectedCategory.value : "all";
        currentFilters.sortName = selectedNameSort ? selectedNameSort.value : "none";
        currentFilters.sortPrice = selectedPriceSort ? selectedPriceSort.value : "none";
        
        applyFiltersAndSort();
        closeFilterPopup();
    });
}

// Reset Filters Button
if (resetFilters) {
    resetFilters.addEventListener("click", () => {
        // Reset all radio buttons to default
        const allRadio = document.querySelector('input[name="category"][value="all"]');
        const noneNameRadio = document.querySelector('input[name="sortName"][value="none"]');
        const nonePriceRadio = document.querySelector('input[name="sortPrice"][value="none"]');
        
        if (allRadio) allRadio.checked = true;
        if (noneNameRadio) noneNameRadio.checked = true;
        if (nonePriceRadio) nonePriceRadio.checked = true;
        
        currentFilters = {
            category: "all",
            sortName: "none",
            sortPrice: "none",
            searchQuery: ""
        };
        
        if (searchInput) searchInput.value = "";
        
        applyFiltersAndSort();
        closeFilterPopup();
    });
}

// Search Input
if (searchInput) {
    searchInput.addEventListener("input", (e) => {
        currentFilters.searchQuery = e.target.value.toLowerCase();
        applyFiltersAndSort();
    });
}

// Main Filter and Sort Function
function applyFiltersAndSort() {
    let filteredProducts = [...allProducts];
    
    // Filter by category
    if (currentFilters.category !== "all") {
        if (currentFilters.category === "available") {
            filteredProducts = filteredProducts.filter(product => 
                product.getAttribute("data-available") === "yes"
            );
        } else {
            filteredProducts = filteredProducts.filter(product => 
                product.getAttribute("data-category") === currentFilters.category
            );
        }
    }
    
    // Filter by search query
    if (currentFilters.searchQuery) {
        filteredProducts = filteredProducts.filter(product => {
            const productName = product.getAttribute("data-name").toLowerCase();
            return productName.includes(currentFilters.searchQuery);
        });
    }
    
    // Sort by name
    if (currentFilters.sortName === "asc") {
        filteredProducts.sort((a, b) => {
            const nameA = a.getAttribute("data-name").toLowerCase();
            const nameB = b.getAttribute("data-name").toLowerCase();
            return nameA.localeCompare(nameB);
        });
    } else if (currentFilters.sortName === "desc") {
        filteredProducts.sort((a, b) => {
            const nameA = a.getAttribute("data-name").toLowerCase();
            const nameB = b.getAttribute("data-name").toLowerCase();
            return nameB.localeCompare(nameA);
        });
    }
    
    // Sort by price
    if (currentFilters.sortPrice === "low") {
        filteredProducts.sort((a, b) => {
            const priceA = parseInt(a.getAttribute("data-price"));
            const priceB = parseInt(b.getAttribute("data-price"));
            return priceA - priceB;
        });
    } else if (currentFilters.sortPrice === "high") {
        filteredProducts.sort((a, b) => {
            const priceA = parseInt(a.getAttribute("data-price"));
            const priceB = parseInt(b.getAttribute("data-price"));
            return priceB - priceA;
        });
    }
    
    // Display filtered and sorted products
    displayProducts(filteredProducts);
}

// Display Products Function
function displayProducts(products) {
    // Hide all products first
    allProducts.forEach(product => {
        product.style.display = "none";
    });
    
    // Show filtered products
    if (products.length > 0) {
        products.forEach(product => {
            product.style.display = "block";
        });
        if (noResults) noResults.style.display = "none";
    } else {
        if (noResults) noResults.style.display = "block";
    }
}

// ==================== PRODUCT CARD ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const productObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }, index * 50);
            
            productObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all product cards for animation
const productCards = document.querySelectorAll(".product-card");
productCards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    
    productObserver.observe(card);
});

// ==================== ORDER BUTTON CLICK ====================
const orderButtons = document.querySelectorAll(".order-btn");

orderButtons.forEach(button => {
    button.addEventListener("click", function(e) {
        if (!this.disabled) {
            const card = this.closest(".product-card");
            const productName = card.querySelector(".product-name").textContent;
            
            // Future: Redirect to order page or open order modal
            alert(`Order placed for: ${productName}\n\nThis will be connected to the order system in the future.`);
        }
    });
});

// ==================== CONSOLE MESSAGE ====================
console.log("SwargVatika Products Page Loaded Successfully! 🌱");
console.log("Browse our fresh farm products.");

// ==================== PAGE LOAD ANIMATION ====================
window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";
    
    setTimeout(() => {
        document.body.style.opacity = "1";
    }, 100);
});