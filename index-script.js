// Generate mock slave data
function generateSlaveData() {
    const names = [
        'Максим Максимов', 'Анна Иванова', 'Дмитрий Петров', 'Елена Сидорова',
        'Алексей Волков', 'Мария Козлова', 'Игорь Новиков', 'Ольга Морозова',
        'Сергей Лебедев', 'Татьяна Орлова', 'Андрей Попов', 'Наталья Егорова',
        'Владимир Соколов', 'Ирина Федорова', 'Николай Михайлов', 'Светлана Белова',
        'Павел Медведев', 'Екатерина Жукова', 'Виктор Зайцев', 'Юлия Романова'
    ];
    
    const jobs = [
        'Работник месяца', 'Мойщик окон', 'Уборщик офисов', 'Курьер доставки',
        'Охранник', 'Садовник', 'Строитель', 'Водитель', 'Повар', 'Продавец',
        'Менеджер', 'Программист', 'Дизайнер', 'Маркетолог', 'Бухгалтер'
    ];

    const slaves = [];
    for (let i = 0; i < 25; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const job = jobs[Math.floor(Math.random() * jobs.length)];
        const income = Math.floor(Math.random() * 500) + 50;
        
        slaves.push({
            id: i + 1,
            name: name,
            job: job,
            income: income,
            avatar: `https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYXZhdGFyJTIwcHJvZmlsZSUyMHVzZXJ8ZW58MXx8fHwxNzU3NzE1OTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral&w=40&h=40&seed=${i}`
        });
    }
    
    return slaves;
}

// Render slaves list
function renderSlavesList(slaves) {
    const slavesList = document.getElementById('slavesList');
    if (!slavesList) return;

    slavesList.innerHTML = '';
    
    slaves.forEach(slave => {
        const slaveElement = document.createElement('div');
        slaveElement.className = 'slave-item';
        slaveElement.setAttribute('data-slave-id', slave.id);
        
        slaveElement.innerHTML = `
            <div class="slave-avatar">
                <img src="${slave.avatar}" alt="${slave.name}">
            </div>
            <div class="slave-info">
                <h3>${slave.name}</h3>
                <div class="slave-job">
                    <div class="briefcase-icon"></div>
                    <span>${slave.job}</span>
                </div>
            </div>
            <span class="slave-income">${slave.income}/час</span>
        `;
        
        // Add click event to open slave profile
        slaveElement.addEventListener('click', function() {
            openSlaveProfile(slave);
        });
        
        slavesList.appendChild(slaveElement);
    });
}

// Open slave profile page
function openSlaveProfile(slave) {
    // Store slave data in sessionStorage for the profile page
    sessionStorage.setItem('selectedSlave', JSON.stringify(slave));
    
    // Add visual feedback
    event.currentTarget.style.backgroundColor = '#f1f5f9';
    setTimeout(() => {
        event.currentTarget.style.backgroundColor = '#ffffff';
    }, 150);
    
    // Navigate to slave profile page
    setTimeout(() => {
        window.location.href = 'slave-profile.html';
    }, 100);
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('playerSearch');
    const searchButton = document.querySelector('.search-button');
    
    let allSlaves = [];
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query === '') {
            renderSlavesList(allSlaves);
            return;
        }
        
        const filteredSlaves = allSlaves.filter(slave => 
            slave.name.toLowerCase().includes(query) ||
            slave.job.toLowerCase().includes(query)
        );
        
        renderSlavesList(filteredSlaves);
    }
    
    // Search on button click
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // Search on Enter key
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
        
        // Real-time search as user types
        searchInput.addEventListener('input', function() {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(performSearch, 300);
        });
    }
    
    // Store reference to all slaves for search
    allSlaves = generateSlaveData();
    renderSlavesList(allSlaves);
}

// Navigation functionality
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const navText = this.querySelector('span').textContent;
            
            switch(navText) {
                case 'Профиль':
                    // Already on profile page
                    break;
                case 'Маркет':
                    window.location.href = 'market.html';
                    break;
                case 'Прочее':
                    window.location.href = 'prochee.html';
                    break;
                case 'Рейтинг':
                    window.location.href = 'rating.html';
                    break;
            }
        });
    });
}

// Action buttons functionality
function initActionButtons() {
    const actionButtons = document.querySelectorAll('.action-button');
    const rewardButton = document.querySelector('.reward-button');
    const slaveryActionButtons = document.querySelectorAll('.action-btn');
    
    // Main action buttons
    actionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.querySelector('span').textContent;
            
            // Add visual feedback
            this.style.backgroundColor = '#f1f5f9';
            setTimeout(() => {
                this.style.backgroundColor = '#ffffff';
            }, 150);
            
            switch(buttonText) {
                case 'Магазин':
                    setTimeout(() => window.location.href = 'market.html', 100);
                    break;
                case 'Уведомления':
                    alert('Уведомления: У вас нет новых уведомлений');
                    break;
                case 'Пополнить':
                    alert('Пополнение баланса: Функция временно недоступна');
                    break;
            }
        });
    });
    
    // Reward button
    if (rewardButton) {
        rewardButton.addEventListener('click', function() {
            this.style.backgroundColor = '#f1f5f9';
            setTimeout(() => {
                this.style.backgroundColor = '#ffffff';
            }, 150);
            
            setTimeout(() => {
                alert('Реклама: Вы получили +100 монет за просмотр рекламы!');
            }, 100);
        });
    }
    
    // Slavery action buttons
    slaveryActionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent;
            
            this.style.color = '#0f172a';
            setTimeout(() => {
                this.style.color = '#64748b';
            }, 150);
            
            switch(buttonText) {
                case 'Профиль':
                    setTimeout(() => window.location.href = 'slave-profile.html', 100);
                    break;
                case 'Выкупиться':
                    setTimeout(() => alert('Выкуп: Для выкупа требуется 1,000,000 монет'), 100);
                    break;
                case 'Написать':
                    setTimeout(() => alert('Сообщение отправлено владельцу'), 100);
                    break;
            }
        });
    });
}

// Pagination functionality
function initPagination() {
    const dots = document.querySelectorAll('.dot');
    
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            // Remove active class from all dots
            dots.forEach(d => d.classList.remove('active'));
            
            // Add active class to clicked dot
            this.classList.add('active');
            
            // Here you could implement pagination logic
            console.log(`Switched to page ${index + 1}`);
        });
    });
}

// Smooth scrolling optimization
function initSmoothScrolling() {
    const slavesList = document.querySelector('.slaves-list');
    if (!slavesList) return;

    let isScrolling = false;
    let scrollTimeout;

    slavesList.addEventListener('scroll', function() {
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

// Handle window resize for responsive layout
function handleResize() {
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSearch();
    initNavigation();
    initActionButtons();
    initPagination();
    initSmoothScrolling();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on load
    
    console.log('The РАБЫ - Главная страница загружена');
});

// Enhanced mobile touch support
if ('ontouchstart' in window) {
    document.addEventListener('DOMContentLoaded', function() {
        // Prevent rubber band scrolling on the main container
        document.body.addEventListener('touchmove', function(e) {
            if (e.target === document.body) {
                e.preventDefault();
            }
        }, { passive: false });
        
        // Add momentum scrolling
        const slavesList = document.querySelector('.slaves-list');
        if (slavesList) {
            slavesList.style.webkitOverflowScrolling = 'touch';
        }
        
        // Add touch feedback for interactive elements
        const interactiveElements = document.querySelectorAll('.slave-item, .action-button, .reward-button, .action-btn, .nav-item');
        
        interactiveElements.forEach(element => {
            element.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            element.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            }, { passive: true });
        });
    });
}