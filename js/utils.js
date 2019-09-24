export const highlight = event => {
    event.currentTarget.classList.toggle('highlighted');
};

export const setActive = event => {
    event.preventDefault();

    const { currentTarget } = event;
    const navItems = currentTarget.parentNode.querySelectorAll('nav li');

    navItems.forEach(navItem => {
        navItem.classList.remove('active');
    });

    currentTarget.classList.add('active');
};