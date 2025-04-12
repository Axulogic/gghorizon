document.addEventListener('DOMContentLoaded', () => {
    const translations = {
        en: {
            title: "Grand Guide: Horizon",
            coming_soon: "We’re Building Something Amazing!",
            description: "Grand Guide: Horizon is currently in development. Stay tuned for an epic gaming experience.",
            days: "Days",
            hours: "Hours",
            minutes: "Minutes",
            seconds: "Seconds",
            release_date: "Estimated Launch: May 19, 2025",
            about: 'Grand Guide: Horizon is a project by <strong><a href="https://github.com/Axulogic" target="_blank" rel="noopener noreferrer">Axulogic, Inc.</a></strong>, led by programmer <strong><a href="https://github.com/linwaru" target="_blank" rel="noopener noreferrer">Linwaru</a></strong>. Development began on <strong>March 9, 2025</strong>.',
            contact: 'Contact us: <a href="mailto:gghorizon.contact@gmail.com">gghorizon.contact@gmail.com</a>'
        },
        pt: {
            title: "Grand Guide: Horizon",
            coming_soon: "Estamos Construindo Algo Incrível!",
            description: "Grand Guide: Horizon está atualmente em desenvolvimento. Fique ligado para uma experiência de jogo épica.",
            days: "Dias",
            hours: "Horas",
            minutes: "Minutos",
            seconds: "Segundos",
            release_date: "Lançamento Estimado: 19 de Maio de 2025",
            about: 'Grand Guide: Horizon é um projeto da <strong><a href="https://github.com/Axulogic" target="_blank" rel="noopener noreferrer">Axulogic, Inc.</a></strong>, liderado pela programadora <strong><a href="https://github.com/linwaru" target="_blank" rel="noopener noreferrer">Linwaru</a></strong>. O desenvolvimento começou em <strong>9 de Março de 2025</strong>.',
            contact: 'Entre em contato: <a href="mailto:gghorizon.contact@gmail.com">gghorizon.contact@gmail.com</a>'
        }
    };    

    const languageBtn = document.getElementById('language-btn');
    const languageText = document.getElementById('language-text');
    const translatableElements = document.querySelectorAll('[data-translate]');

    let currentLang = localStorage.getItem('language') || 'en';
    languageText.textContent = currentLang.toUpperCase();

    const updateLanguage = (lang) => {
        translatableElements.forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        languageText.textContent = lang.toUpperCase();
        localStorage.setItem('language', lang);
    };

    updateLanguage(currentLang);

    languageBtn.addEventListener('click', () => {
        currentLang = currentLang === 'en' ? 'pt' : 'en';
        updateLanguage(currentLang);
    });

    const launchDate = new Date('2025-05-19T00:00:00').getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const timeLeft = launchDate - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            document.querySelector('.countdown').innerHTML = currentLang === 'en' ? '<p>We’re Live!</p>' : '<p>Estamos ao Vivo!</p>';
        }
    };

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
});
