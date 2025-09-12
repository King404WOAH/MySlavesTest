// Countdown timer functionality
function updateCountdown() {
    const countdownElement = document.querySelector('.countdown-time');
    if (!countdownElement) return;

    // Create a target date (you can modify this as needed)
    const targetDate = new Date();
    targetDate.setHours(targetDate.getHours() + 19);
    targetDate.setMinutes(targetDate.getMinutes() + 23);
    targetDate.setSeconds(targetDate.getSeconds() + 12);

    function updateTimer() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance > 0) {
            const hours = Math.floor(distance / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            countdownElement.textContent = `${hours} часа, ${minutes} минуты, ${seconds} секунд`;
        } else {
            countdownElement.textContent = "Время истекло!";
        }
    }

    // Update immediately and then every second
    updateTimer();
    setInterval(updateTimer, 1000);
}

// Tab switching functionality
function initTabSwitching() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Here you could add logic to switch content based on the tab
            const tabText = this.querySelector('span').textContent;
            console.log(`Switched to ${tabText} tab`);
            
            // For demonstration, you could redirect to different pages
            if (tabText === 'Игроки') {
                // window.location.href = 'rating.html';
            } else if (tabText === 'Друзья') {
                // window.location.href = 'rating-friends.html';
            }
        });
    });
}

// Navigation functionality
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const navText = this.querySelector('span').textContent;
            
            switch(navText) {
                case 'Профиль':
                    window.location.href = 'index.html';
                    break;
                case 'Маркет':
                    window.location.href = 'market.html';
                    break;
                case 'Прочее':
                    window.location.href = 'prochee.html';
                    break;
                case 'Рейтинг':
                    // Already on rating page
                    break;
            }
        });
    });
}

// Smooth scrolling for clans list
function initSmoothScrolling() {
    const clansList = document.querySelector('.clans-list');
    if (!clansList) return;

    let isScrolling = false;
    let scrollTimeout;

    clansList.addEventListener('scroll', function() {
        if (!isScrolling) {
            isScrolling = true;
            this.style.scrollBehavior = 'smooth';
        }

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            isScrolling = false;
        }, 150);
    });
}

// Clan card click functionality
function initClanCardClicks() {
    const clanCards = document.querySelectorAll('.clan-card');
    
    clanCards.forEach(card => {
        card.addEventListener('click', function() {
            const clanName = this.querySelector('h3').textContent;
            console.log(`Clicked on clan: ${clanName}`);
            
            // Add visual feedback
            this.style.backgroundColor = '#f8fafc';
            setTimeout(() => {
                this.style.backgroundColor = '#ffffff';
            }, 150);
            
            // Here you could navigate to clan details page
            // window.location.href = `clan-details.html?clan=${encodeURIComponent(clanName)}`;
        });
    });
}

// Info icon click functionality
function initInfoIcon() {
    const infoIcon = document.querySelector('.info-icon');
    
    if (infoIcon) {
        infoIcon.addEventListener('click', function() {
            alert('Информация о судном дне:\n\nСудный день - это особое событие в игре, когда происходит сброс рейтингов и начисление наград!');
        });
    }
}

// Virtual scrolling for better performance (optional enhancement)
function initVirtualScrolling() {
    const clansList = document.querySelector('.clans-list');
    if (!clansList) return;

    // Add intersection observer for lazy loading if needed
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Load more clans if needed
                // This is where you would implement pagination
            }
        });
    });

    // Observe the last clan card
    const lastClanCard = document.querySelector('.clan-card:last-child');
    if (lastClanCard) {
        observer.observe(lastClanCard);
    }
}

// Handle window resize
function handleResize() {
    // Ensure proper layout on resize
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateCountdown();
    initTabSwitching();
    initNavigation();
    initSmoothScrolling();
    initClanCardClicks();
    initInfoIcon();
    initVirtualScrolling();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on load
});

// Add some enhanced functionality for mobile
if ('ontouchstart' in window) {
    // Add touch-specific enhancements
    document.addEventListener('DOMContentLoaded', function() {
        // Prevent rubber band scrolling on the main container
        document.body.addEventListener('touchmove', function(e) {
            if (e.target === document.body) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Add momentum scrolling
        const clansList = document.querySelector('.clans-list');
        if (clansList) {
            clansList.style.webkitOverflowScrolling = 'touch';
        }
    });
}