// Плавное появление секций при прокрутке
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Наблюдаем за всеми секциями с классом section-reveal
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section-reveal');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Добавляем плавное появление элементам процедур
    const procedureItems = document.querySelectorAll('.procedure-item');
    procedureItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        item.style.animation = 'fadeInUp 0.6s ease forwards';
        item.style.opacity = '0';
    });
});

// Анимация fadeInUp для процедур
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Плавная прокрутка для индикатора скролла
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
        const nextSection = document.querySelector('.gift-intro');
        if (nextSection) {
            nextSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Добавляем эффект параллакса для hero секции
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.7;
    }
});

// Конфетти эффект при загрузке (опционально)
function createConfetti() {
    const confettiCount = 50;
    const colors = ['#d4a574', '#c9ada7', '#9ab8a6', '#f8f4f0'];
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.opacity = Math.random();
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            
            document.body.appendChild(confetti);
            
            const duration = Math.random() * 3 + 2;
            const endPosition = Math.random() * window.innerHeight + window.innerHeight;
            
            confetti.animate([
                { transform: 'translateY(0) rotate(0deg)' },
                { transform: `translateY(${endPosition}px) rotate(${Math.random() * 360}deg)` }
            ], {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => confetti.remove();
        }, i * 50);
    }
}

// Запускаем конфетти при загрузке страницы
window.addEventListener('load', () => {
    setTimeout(createConfetti, 500);
});
