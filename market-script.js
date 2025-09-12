// Tab switching functionality
let currentTab = 'slaves';
let selectedFrame = '';
let selectedNameColor = '';
let selectedStatusColor = '';

// Generate mock player data for market
function generatePlayerData() {
    const names = [
        'Максим Максимов', 'Анна Иванова', 'Дмитрий Петров', 'Елена Сидорова',
        'Алексей Волков', 'Мария Козлова', 'Игорь Новиков', 'Ольга Морозова',
        'Сергей Лебедев', 'Татьяна Орлова', 'Андрей Попов', 'Наталья Егорова',
        'Владимир Соколов', 'Ирина Федорова', 'Николай Михайлов', 'Светлана Белова',
        'Павел Медведев', 'Екатерина Жукова', 'Виктор Зайцев', 'Юлия Романова',
        'Артем Кузнецов', 'Валентина Титова', 'Денис Григорьев', 'Марина Денисова',
        'Олег Рыбаков', 'Галина Макарова', 'Антон Крылов', 'Надежда Васильева'
    ];
    
    const owners = [
        'Олег Соболев', 'Мария Петрова', 'Иван Смирнов', 'Анна Козлова',
        'Дмитрий Васильев', 'Елена Морозова', 'Андрей Федоров', 'Татьяна Белова',
        'Владимир Новиков', 'Ирина Лебедева', 'Сергей Орлов', 'Наталья Попова'
    ];

    const players = [];
    
    // First player is always free
    const freeName = names[Math.floor(Math.random() * names.length)];
    players.push({
        id: 1,
        name: freeName,
        owner: null,
        isFree: true,
        cost: Math.floor(Math.random() * 500000) + 100000, // 100k-600k
        avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwYXZhdGFyJTIwbWFufGVufDF8fHx8MTc1NzI2MTg4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral&w=40&h=40&seed=0`
    });
    
    // Generate remaining players
    for (let i = 1; i < 30; i++) {
        const name = names[Math.floor(Math.random() * names.length)];
        const owner = owners[Math.floor(Math.random() * owners.length)];
        const cost = Math.floor(Math.random() * 900000000) + 100000000; // 100M-1B
        
        players.push({
            id: i + 1,
            name: name,
            owner: owner,
            isFree: false,
            cost: cost,
            avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwYXZhdGFyJTIwbWFufGVufDF8fHx8MTc1NzI2MTg4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral&w=40&h=40&seed=${i}`
        });
    }
    
    return players;
}

// Format number with spaces for better readability
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Render players list
function renderPlayersList(players) {
    const playersList = document.getElementById('playersList');
    if (!playersList) return;

    playersList.innerHTML = '';
    
    players.forEach(player => {
        const playerElement = document.createElement('div');
        playerElement.className = 'player-card';
        playerElement.setAttribute('data-player-id', player.id);
        
        playerElement.innerHTML = `
            <div class="player-avatar">
                <img src="${player.avatar}" alt="${player.name}">
            </div>
            <div class="player-info">
                <h3>${player.name}</h3>
                <div class="player-details">
                    <div class="icon-user"></div>
                    <span class="status">${player.isFree ? 'Свободен' : player.owner}</span>
                    <div class="separator"></div>
                    <span class="cost">${formatNumber(player.cost)}</span>
                    <div class="icon-database"></div>
                </div>
            </div>
            <button class="buy-btn">Купить</button>
        `;
        
        // Add click event to player card (excluding buy button)
        const buyButton = playerElement.querySelector('.buy-btn');
        
        // Player card click to open profile
        playerElement.addEventListener('click', function(e) {
            if (e.target === buyButton || buyButton.contains(e.target)) {
                return; // Don't open profile when clicking buy button
            }
            openPlayerProfile(player);
        });
        
        // Buy button click
        buyButton.addEventListener('click', function(e) {
            e.stopPropagation();
            buyPlayer(player);
        });
        
        playersList.appendChild(playerElement);
    });
}

// Open player profile page
function openPlayerProfile(player) {
    // Store player data in sessionStorage for the profile page
    sessionStorage.setItem('selectedSlave', JSON.stringify({
        id: player.id,
        name: player.name,
        job: player.isFree ? 'Безработный' : 'Работник месяца',
        income: Math.floor(Math.random() * 500) + 50,
        avatar: player.avatar
    }));
    
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

// Buy player functionality
function buyPlayer(player) {
    const buyButton = event.currentTarget;
    
    // Add visual feedback
    buyButton.style.backgroundColor = '#475569';
    buyButton.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        buyButton.style.backgroundColor = '#64748b';
        buyButton.style.transform = 'scale(1)';
        
        if (player.isFree) {
            alert(`Игрок ${player.name} успешно куплен за ${formatNumber(player.cost)} монет!`);
        } else {
            alert(`Для покупки ${player.name} нужно ${formatNumber(player.cost)} монет. Текущий владелец: ${player.owner}`);
        }
    }, 150);
}

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('playerSearch');
    const searchButton = document.querySelector('.search-btn');
    
    let allPlayers = [];
    
    function performSearch() {
        const query = searchInput.value.toLowerCase().trim();
        
        if (query === '') {
            renderPlayersList(allPlayers);
            return;
        }
        
        const filteredPlayers = allPlayers.filter(player => 
            player.name.toLowerCase().includes(query) ||
            (player.owner && player.owner.toLowerCase().includes(query))
        );
        
        renderPlayersList(filteredPlayers);
        
        // Show search results count
        if (filteredPlayers.length === 0) {
            const playersList = document.getElementById('playersList');
            playersList.innerHTML = `
                <div style="padding: 20px; text-align: center; color: #64748b; font-size: 14px;">
                    Игроки не найдены по запросу "${query}"
                </div>
            `;
        }
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
    
    // Store reference to all players for search
    allPlayers = generatePlayerData();
    renderPlayersList(allPlayers);
}

// Shop items data
const shopItems = [
    {
        id: 'chains',
        title: 'Цепи',
        description: 'После покупки ЦЕПЕЙ никто не сможет купить твоих рабов, и они не смогут выкупиться в течение 4 ЧАСОВ. С улучшением ЦЕПИ активны 6 ЧАСОВ.',
        buttons: [
            { text: 'Купить на 4 часа', type: 'secondary', price: '50 000' },
            { text: 'Купить на 6 часов', type: 'primary', price: '100 000' }
        ]
    },
    {
        id: 'whip',
        title: 'Плётка',
        description: 'После покупки ПЛЁТКИ доход с рабов будет увеличен вдвое. Время действия 7 дней. При просмотре рекламы активен 5 минут. Максимум 10 раз в день.',
        buttons: [
            { text: 'Активировать на 5 минут', type: 'secondary', price: 'Реклама' },
            { text: 'Купить на 7 дней', type: 'primary', price: '500 000' }
        ]
    },
    {
        id: 'custom_work',
        title: 'Индивидуальная работа',
        description: 'После покупки добавляется возможность указать работы, которые будут автоматически устанавливаться на рабов при покупке. Максимум 20 шт. Без оскорблений!',
        buttons: [
            { text: 'Изменить работы', type: 'secondary', price: '' },
            { text: 'Купить', type: 'primary', price: '200 000' }
        ]
    },
    {
        id: 'shield',
        title: 'Щит',
        description: 'После покупки ЩИТА никто не сможет тебя купить в течение 4 ЧАСОВ. С улучшением ЩИТ активен 6 ЧАСОВ.',
        buttons: [
            { text: 'Купить на 4 часа', type: 'secondary', price: '75 000' },
            { text: 'Купить на 6 часов', type: 'primary', price: '150 000' }
        ]
    }
];

// Style items data
const styleItems = [
    {
        id: 'avatar_frames',
        title: 'Рамки аватара',
        type: 'frame',
        options: [
            { id: 'none', name: 'Без рамки', class: '', price: 0 },
            { id: 'gold', name: 'Золотая', class: 'frame-gold', price: 100000 },
            { id: 'silver', name: 'Серебряная', class: 'frame-silver', price: 75000 },
            { id: 'diamond', name: 'Алмазная', class: 'frame-diamond', price: 250000 }
        ]
    },
    {
        id: 'name_colors',
        title: 'Цвет имени',
        type: 'name',
        options: [
            { id: 'default', name: 'Обычный', class: '', price: 0 },
            { id: 'gold', name: 'Золотой', class: 'name-gold', price: 50000 },
            { id: 'red', name: 'Красный', class: 'name-red', price: 30000 },
            { id: 'blue', name: 'Синий', class: 'name-blue', price: 40000 },
            { id: 'purple', name: 'Фиолетовый', class: 'name-purple', price: 60000 }
        ]
    },
    {
        id: 'status_colors',
        title: 'Цвет статуса',
        type: 'status',
        options: [
            { id: 'default', name: 'Обычный', class: '', price: 0 },
            { id: 'gold', name: 'Золотой', class: 'status-gold', price: 40000 },
            { id: 'red', name: 'Красный', class: 'status-red', price: 25000 },
            { id: 'blue', name: 'Синий', class: 'status-blue', price: 30000 },
            { id: 'purple', name: 'Фиолетовый', class: 'status-purple', price: 50000 }
        ]
    }
];

// Format number with spaces
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Render shop items
function renderShopItems() {
    const shopItemsContainer = document.getElementById('shopItems');
    if (!shopItemsContainer) return;

    shopItemsContainer.innerHTML = '';

    shopItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'shop-item';
        itemElement.setAttribute('data-item-id', item.id);

        const buttonsHtml = item.buttons.map(button => {
            const priceText = button.price ? ` (${button.price})` : '';
            return `<button class="shop-button ${button.type}" data-action="${button.text.toLowerCase()}" data-price="${button.price}">
                ${button.text}${priceText}
            </button>`;
        }).join('');

        itemElement.innerHTML = `
            <div class="shop-item-header">
                <h3>${item.title}</h3>
            </div>
            <div class="shop-item-description">
                <p>${item.description}</p>
            </div>
            <div class="shop-item-buttons">
                ${buttonsHtml}
            </div>
        `;

        // Add click events to buttons
        const buttons = itemElement.querySelectorAll('.shop-button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                handleShopButtonClick(item, this);
            });
        });

        shopItemsContainer.appendChild(itemElement);
    });
}

// Handle shop button clicks
function handleShopButtonClick(item, button) {
    const action = button.getAttribute('data-action');
    const price = button.getAttribute('data-price');

    // Add visual feedback
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);

    // Handle different actions
    setTimeout(() => {
        switch(action) {
            case 'активировать на 5 минут':
                alert('Плётка активирована на 5 минут! Доход удвоен.');
                break;
            case 'изменить работы':
                const newWork = prompt('Введите новую работу для рабов (без оскорблений):');
                if (newWork && newWork.trim()) {
                    alert(`Работа "${newWork}" добавлена в список.`);
                }
                break;
            default:
                if (price && price !== 'Реклама') {
                    const confirm = window.confirm(`Купить ${item.title.toLowerCase()} за ${price} монет?`);
                    if (confirm) {
                        alert(`${item.title} успешно куплен за ${price} монет!`);
                    }
                } else if (price === 'Реклама') {
                    alert('Показ рекламы... Плётка активирована на 5 минут!');
                }
                break;
        }
    }, 100);
}

// Render style items
function renderStyleItems() {
    const styleItemsContainer = document.getElementById('styleItems');
    if (!styleItemsContainer) return;

    styleItemsContainer.innerHTML = '';

    styleItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'style-item';
        itemElement.setAttribute('data-item-id', item.id);

        const optionsHtml = item.options.map(option => {
            const priceText = option.price > 0 ? ` (${formatNumber(option.price)})` : ' (Бесплатно)';
            return `<div class="style-option" data-type="${item.type}" data-option-id="${option.id}" data-class="${option.class}" data-price="${option.price}">
                ${option.name}${priceText}
            </div>`;
        }).join('');

        itemElement.innerHTML = `
            <h4>${item.title}</h4>
            <div class="style-options">
                ${optionsHtml}
            </div>
            <div class="style-item-buttons">
                <button class="shop-button secondary" data-action="try">Примерить</button>
                <button class="shop-button primary" data-action="buy">Купить</button>
            </div>
        `;

        // Add click events to options
        const options = itemElement.querySelectorAll('.style-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from siblings
                options.forEach(opt => opt.classList.remove('selected'));
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Update current selection
                const type = this.getAttribute('data-type');
                const optionClass = this.getAttribute('data-class');
                if (type === 'frame') selectedFrame = optionClass;
                if (type === 'name') selectedNameColor = optionClass;
                if (type === 'status') selectedStatusColor = optionClass;
            });
        });

        // Add click events to buttons
        const buttons = itemElement.querySelectorAll('.shop-button');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                handleStyleButtonClick(item, this, itemElement);
            });
        });

        styleItemsContainer.appendChild(itemElement);
    });
}

// Handle style button clicks
function handleStyleButtonClick(item, button, itemElement) {
    const action = button.getAttribute('data-action');
    const selectedOption = itemElement.querySelector('.style-option.selected');

    if (!selectedOption) {
        alert('Выберите опцию для примерки или покупки');
        return;
    }

    const optionClass = selectedOption.getAttribute('data-class');
    const price = parseInt(selectedOption.getAttribute('data-price'));
    const optionName = selectedOption.textContent.split(' (')[0];

    // Add visual feedback
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);

    setTimeout(() => {
        if (action === 'try') {
            // Apply preview
            applyPreview(item.type, optionClass);
            alert(`Примерка: ${optionName} применен к предпросмотру`);
        } else if (action === 'buy') {
            if (price === 0) {
                if (item.type === 'frame') selectedFrame = optionClass;
                if (item.type === 'name') selectedNameColor = optionClass;
                if (item.type === 'status') selectedStatusColor = optionClass;
                applyPreview(item.type, optionClass);
                alert(`${optionName} применен бесплатно!`);
            } else {
                const confirm = window.confirm(`Купить ${optionName.toLowerCase()} за ${formatNumber(price)} монет?`);
                if (confirm) {
                    if (item.type === 'frame') selectedFrame = optionClass;
                    if (item.type === 'name') selectedNameColor = optionClass;
                    if (item.type === 'status') selectedStatusColor = optionClass;
                    applyPreview(item.type, optionClass);
                    alert(`${optionName} успешно куплен за ${formatNumber(price)} монет!`);
                }
            }
        }
    }, 100);
}

// Apply preview styling
function applyPreview(type, className) {
    const previewAvatar = document.getElementById('previewAvatar');
    const previewName = document.getElementById('previewName');
    const previewStatus = document.getElementById('previewStatus');

    if (!previewAvatar || !previewName || !previewStatus) return;

    switch(type) {
        case 'frame':
            // Remove all frame classes
            previewAvatar.className = previewAvatar.className.replace(/frame-\w+/g, '');
            if (className) {
                previewAvatar.classList.add(className);
            }
            break;
        case 'name':
            // Remove all name classes
            previewName.className = previewName.className.replace(/name-\w+/g, '');
            if (className) {
                previewName.classList.add(className);
            }
            break;
        case 'status':
            // Remove all status classes
            previewStatus.className = previewStatus.className.replace(/status-\w+/g, '');
            if (className) {
                previewStatus.classList.add(className);
            }
            break;
    }
}

// Tab switching functionality
function initTabSwitching() {
    const tabs = document.querySelectorAll('.tab');
    const slavesContent = document.getElementById('slavesContent');
    const shopContent = document.getElementById('shopContent');
    const styleContent = document.getElementById('styleContent');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabType = this.getAttribute('data-tab');

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');

            // Show/hide content based on tab
            switch(tabType) {
                case 'slaves':
                    currentTab = 'slaves';
                    if (slavesContent) slavesContent.style.display = 'flex';
                    if (shopContent) shopContent.style.display = 'none';
                    if (styleContent) styleContent.style.display = 'none';
                    break;
                case 'shop':
                    currentTab = 'shop';
                    if (slavesContent) slavesContent.style.display = 'none';
                    if (shopContent) shopContent.style.display = 'flex';
                    if (styleContent) styleContent.style.display = 'none';
                    renderShopItems();
                    break;
                case 'style':
                    currentTab = 'style';
                    if (slavesContent) slavesContent.style.display = 'none';
                    if (shopContent) shopContent.style.display = 'none';
                    if (styleContent) styleContent.style.display = 'flex';
                    renderStyleItems();
                    break;
            }

            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
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
                    // Already on market page
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

// Smooth scrolling optimization
function initSmoothScrolling() {
    const playersList = document.querySelector('.players-list');
    if (!playersList) return;

    let isScrolling = false;
    let scrollTimeout;

    playersList.addEventListener('scroll', function() {
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
    initTabSwitching();
    initNavigation();
    initSmoothScrolling();
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on load
    
    console.log('Маркет с тремя вкладками загружен');
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
        const playersList = document.querySelector('.players-list');
        if (playersList) {
            playersList.style.webkitOverflowScrolling = 'touch';
        }
        
        // Add touch feedback for interactive elements
        const interactiveElements = document.querySelectorAll('.player-card, .buy-btn, .tab, .nav-item, .search-btn');
        
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