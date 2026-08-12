const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');

const currentTheme = localStorage.getItem('theme');

if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
}

themeBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    
    if (theme === 'dark') {
        document.documentElement.removeAttribute('data-theme');
        themeIcon.classList.replace('ri-sun-line', 'ri-moon-line');
        localStorage.setItem('theme', 'light'); // লোকাল স্টোরেজে সেভ
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('ri-moon-line', 'ri-sun-line');
        localStorage.setItem('theme', 'dark'); // লোকাল স্টোরেজে সেভ
    }
});