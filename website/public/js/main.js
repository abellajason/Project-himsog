AOS.init();

const header = document.querySelector('header');

function applyBackground() {
    if (window.scrollY > header.offsetTop) {
        header.classList.add('header-scrolled');
    } else {
        header.classList.remove('header-scrolled');
    }
}

window.addEventListener('scroll', applyBackground);

// Mobile Nav Toggling

var btn = document.querySelector('#mobile-nav-toggle');

btn.onclick = function () {
    var nav = document.querySelector('nav');
    nav.classList.toggle('toggled');
};