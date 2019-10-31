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
    btn.classList.toggle('toggled');
    var nav = document.querySelector('nav');
    nav.classList.toggle('toggled');
};

// Smooth scrolling

const homeBtn = document.getElementById('home-btn');
const causeBtn = document.getElementById('cause-btn');
const whoBtn = document.getElementById('who-are-we-btn');

homeBtn.addEventListener('click', () => {
    window.Jump('.top-home');
    var nav = document.querySelector('nav');
    if (nav.classList.contains('toggled')) {
        nav.classList.remove('toggled');
    }
})

causeBtn.addEventListener('click', () => {
    window.Jump('.our-cause');
    var nav = document.querySelector('nav');
    if (nav.classList.contains('toggled')) {
        nav.classList.remove('toggled');
    }
})

whoBtn.addEventListener('click', () => {
    window.Jump('.who-are-we');
    var nav = document.querySelector('nav');
    if (nav.classList.contains('toggled')) {
        nav.classList.remove('toggled');
    }
})

// Parallax

const rellax = new Rellax('.rellax');