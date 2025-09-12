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

// Current selections
let currentSelections = {
    frame: '',
    name: '',
    status: ''
};

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
                currentSelections[type] = optionClass;
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
                currentSelections[item.type] = optionClass;
                applyPreview(item.type, optionClass);
                alert(`${optionName} применен бесплатно!`);
            } else {
                const confirm = window.confirm(`Купить ${optionName.toLowerCase()} за ${formatNumber(price)} монет?`);
                if (confirm) {
                    currentSelections[item.type] = optionClass;
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
                    window.location.href = 'market.html';
                    break;
                case 'shop':
                    shopContent.style.display = 'flex';
                    styleContent.style.display = 'none';
                    break;
                case 'style':
                    shopContent.style.display = 'none';
                    styleContent.style.display = 'flex';
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
    renderShopItems();
    renderStyleItems();
    initTabSwitching();
    initNavigation();

    // Handle window resize
    window.addEventListener('resize', handleResize);
    handleResize(); // Call once on load

    console.log('Маркет магазин загружен');
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
        const scrollContainers = document.querySelectorAll('.shop-items, .style-items');
        scrollContainers.forEach(container => {
            container.style.webkitOverflowScrolling = 'touch';
        });

        // Add touch feedback for interactive elements
        const interactiveElements = document.querySelectorAll('.shop-button, .style-option, .tab, .nav-item');

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