// ПЛАВНАЯ ПРОКРУТКА К ПРОДУКЦИИ
function scrollToProducts() {
    const productsSection = document.getElementById('products');
    if (productsSection) {
        productsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// КАЛЬКУЛЯТОР ПРИБЫЛИ
function calculateProfit() {
    const input = document.getElementById('portions');
    const result = document.getElementById('profit-result');
    
    if (input && result) {
        const portions = input.value;
        if (portions > 0) {
            const profit = portions * 100;
            result.innerHTML = '<h4>💵 Прибыль: ' + profit + '₽</h4>';
        } else {
            result.innerHTML = '<p style="color: #ff6b00;">Введите количество порций</p>';
        }
    }
}

// ЗАКАЗ ЧЕРЕЗ TELEGRAM
function orderProduct(productName) {
    const message = 'Здравствуйте! Хочу заказать: ' + productName;
    const url = 'https://t.me/share/url?text=' + encodeURIComponent(message);
    window.open(url, '_blank');
}

// ТАЙМЕР ОБРАТНОГО ОТСЧЕТА
function startTimer() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;
    
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    
    function updateTimer() {
        const now = new Date();
        const diff = targetDate - now;
        
        if (diff <= 0) {
            timerElement.innerHTML = 'Урожай готов! 🎉';
            return;
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        const hoursStr = hours.toString().padStart(2, '0');
        const minutesStr = minutes.toString().padStart(2, '0');
        const secondsStr = seconds.toString().padStart(2, '0');
        
        timerElement.innerHTML = days + ' дней ' + hoursStr + ':' + minutesStr + ':' + secondsStr;
    }
    
    setInterval(updateTimer, 1000);
    updateTimer();
}

// АНИМАЦИИ ПРИ СКРОЛЛЕ
function initAnimations() {
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { 
        threshold: 0.1 
    });

    const cards = document.querySelectorAll('.product-card, .benefit-card, .money-card');
    cards.forEach(function(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ОБРАБОТКА КЛИКОВ ПО КОНТАКТАМ
function setupContactButtons() {
    const contactButtons = document.querySelectorAll('.contact-btn');
    contactButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            const platform = this.classList[1];
            console.log('Клик по ' + platform);
        });
    });
}

// ЗАПУСК ПРИ ЗАГРУЗКЕ СТРАНИЦЫ
document.addEventListener('DOMContentLoaded', function() {
    initAnimations();
    startTimer();
    setupContactButtons();
    
    console.log('🌵 Сайт ГидроФермы загружен!');
    
    // Показываем общую прибыль в консоли
    const totalProfit = 3 * 100;
    console.log('💰 Прибыль с одного цикла: ~' + totalProfit + '₽');
});