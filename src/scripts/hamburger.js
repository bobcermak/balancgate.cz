//hamburger + hamburger - menu
document.addEventListener("DOMContentLoaded", () => {
    let hamelmnts = document.querySelectorAll(".hamburger-zone");
    for (const btn of document.querySelectorAll(".hamburger-btn")) {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            for (const element of hamelmnts) {
                element.classList.toggle("active");
            }  
        });
    }
});

//no - scroll
function updateScrollLock() {
    const nav = document.querySelector('.hamburger-nav');
    const isActive = nav?.classList.contains('active');
    document.querySelectorAll('.page__container').forEach(container => {
        container.classList.toggle('noscroll', isActive);
    });
}

//remove - hamburger menu
function handleNavClick(e) {
    const link = e.target.closest('a[href^="#"]');
    const upBtn = e.target.closest('a.button--up-link[href="#header"]');
    if (!link && !upBtn) return;
    const nav = e.currentTarget;
    nav.classList.remove('active');
    document.body.classList.remove('noscroll');
    document.documentElement.classList.remove('noscroll');
    document.querySelectorAll(".hamburger-zone").forEach(el => el.classList.remove("active"));
}
document.addEventListener("DOMContentLoaded", () => {
    const nav = document.querySelector('.hamburger-nav');
    if (!nav) return;
    new MutationObserver(updateScrollLock).observe(nav, {
        attributes: true,
        attributeFilter: ['class']
    });
    updateScrollLock();
    nav.addEventListener('click', handleNavClick);
    document.body.addEventListener('click', (e) => {
        const upBtn = e.target.closest('a.button--up-link[href="#header"]');
        if (!upBtn) return;
        nav.classList.remove('active');
        document.body.classList.remove('noscroll');
        document.documentElement.classList.remove('noscroll');
        document.querySelectorAll(".hamburger-zone").forEach(el => el.classList.remove("active"));
    });
});