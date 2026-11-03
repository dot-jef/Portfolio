const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');
const siteHeader = document.querySelector('.site-header');
const sections = [...document.querySelectorAll('main > section[id], main > section.hero')];
const navLinks = [...document.querySelectorAll('.site-nav a')];

menuToggle?.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.querySelector('.menu-icon').textContent = isOpen ? '×' : '+';
});

siteNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        siteNav.classList.remove('open');
        menuToggle?.setAttribute('aria-expanded', 'false');
        const icon = menuToggle?.querySelector('.menu-icon');
        if (icon) icon.textContent = '+';
    });
});

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
document.querySelector('#year').textContent = new Date().getFullYear();

const updateHeaderAndActiveSection = () => {
    siteHeader?.classList.toggle('is-scrolled', window.scrollY > 0);

    const headerHeight = siteHeader?.offsetHeight ?? 0;
    const currentSection = sections.reduce((current, section) => {
        if (section.getBoundingClientRect().top <= headerHeight + 20) return section;
        return current;
    }, sections[0]);

    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${currentSection?.id || 'top'}`;
        link.classList.toggle('active', isActive);
        if (isActive) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
};

window.addEventListener('scroll', updateHeaderAndActiveSection, { passive: true });
window.addEventListener('resize', updateHeaderAndActiveSection);
updateHeaderAndActiveSection();