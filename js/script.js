// Mobile Menu
const mobileMenu = document.createElement('div');
mobileMenu.className = 'mobile-menu fixed inset-0 bg-black/95 backdrop-blur-sm z-50 transform -translate-x-full transition-transform duration-300 ease-in-out';
mobileMenu.innerHTML = `
    <div class="container mx-auto px-6 py-8">
        <div class="flex justify-end mb-8">
            <button class="mobile-close text-gray-300 hover:text-white">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <nav class="space-y-8">
            <div class="space-y-4">
                <h3 class="text-lg font-semibold text-white">Creation (3)</h3>
                <div class="space-y-2 pl-4">
                    <a href="/creation/our-frequency.html" class="block text-gray-300 hover:text-white">Our Frequency</a>
                    <a href="/creation/solution-engineering.html" class="block text-gray-300 hover:text-white">Solution Engineering</a>
                    <a href="/creation/the-369-academy.html" class="block text-gray-300 hover:text-white">The 369 Academy</a>
                </div>
            </div>
            <div class="space-y-4">
                <h3 class="text-lg font-semibold text-white">Harmony (6)</h3>
                <div class="space-y-2 pl-4">
                    <a href="/harmony/the-sandbox.html" class="block text-gray-300 hover:text-white">The Sandbox</a>
                    <a href="/harmony/emerging-tech-radar.html" class="block text-gray-300 hover:text-white">Emerging Tech Radar</a>
                    <a href="/harmony/innovation-storehouse.html" class="block text-gray-300 hover:text-white">Innovation Storehouse</a>
                </div>
            </div>
            <div class="space-y-4">
                <h3 class="text-lg font-semibold text-white">Fulfillment (9)</h3>
                <div class="space-y-2 pl-4">
                    <a href="/fulfillment/the-current.html" class="block text-gray-300 hover:text-white">The Current</a>
                    <a href="/fulfillment/connect.html" class="block text-gray-300 hover:text-white">Connect</a>
                </div>
            </div>
            <div class="pt-4">
                <a href="/my-369-hub.html" class="tesla-button bg-cyan-400 hover:bg-cyan-500 text-black font-medium px-6 py-2 rounded-full transition-all inline-block">My 369 Hub</a>
            </div>
        </nav>
    </div>
`;
document.body.appendChild(mobileMenu);

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.querySelector('.md\\:hidden');
    const mobileCloseButton = document.querySelector('.mobile-close');
    
    if (mobileMenuButton && mobileCloseButton) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('-translate-x-full');
        });
        
        mobileCloseButton.addEventListener('click', () => {
            mobileMenu.classList.add('-translate-x-full');
        });
    }
});

// Dropdown Menu Toggle (Click)
document.querySelectorAll('.dropdown').forEach(dropdown => { 
    const button = dropdown.querySelector('button'); 
    const content = dropdown.querySelector('.dropdown-content'); 
    if (button && content) { 
        button.addEventListener('click', (event) => { 
            event.stopPropagation(); 
            document.querySelectorAll('.dropdown-content.show').forEach(openDropdown => { 
                if (openDropdown !== content) { 
                    openDropdown.classList.remove('show'); 
                    const otherButton = openDropdown.previousElementSibling; 
                    if (otherButton) otherButton.setAttribute('aria-expanded', 'false'); 
                } 
            }); 
            const isShowing = content.classList.toggle('show'); 
            button.setAttribute('aria-expanded', isShowing); 
        }); 
    } 
});

document.addEventListener('click', (event) => { 
    document.querySelectorAll('.dropdown-content.show').forEach(openDropdown => { 
        if (!openDropdown.contains(event.target) && !openDropdown.previousElementSibling.contains(event.target)) { 
            openDropdown.classList.remove('show'); 
            const button = openDropdown.previousElementSibling; 
            if (button) button.setAttribute('aria-expanded', 'false'); 
        } 
    }); 
});

// Theme Toggle and System Preferences
function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = getSystemTheme();
    const themeToApply = savedTheme || systemTheme;
    
    applyTheme(themeToApply);
    updateThemeIcon(themeToApply);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
}

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
}

function updateThemeIcon(theme) {
    const themeIcon = document.querySelector('.theme-toggle svg path');
    if (themeIcon) {
        if (theme === 'dark') {
            themeIcon.setAttribute('d', 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z');
        } else {
            themeIcon.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z');
        }
    }
}

// Initialize theme and event listeners
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    
    // Add theme toggle click handler
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Update current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// Dynamic Energy Nodes (Basic - only run on homepage or pages with the container)
document.addEventListener('DOMContentLoaded', function() { 
    const nodesContainer = document.getElementById('hero-nodes-container'); 
    if (!nodesContainer) return; 
    // Node generation logic only needed on homepage (would go here)
});