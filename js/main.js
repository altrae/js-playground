document.addEventListener('DOMContentLoaded', () => {
    const images = [
            'assets/images/1.jpg',
            'assets/images/2.jpg',
            'assets/images/3.jpg'
        ],
        navItems = document.querySelectorAll('nav li');

    createImages(images);
    setInterval(rotateImages, 6000);

    navItems.forEach((navItem, index) => {
        navItem.addEventListener('mouseenter', highlight);
        navItem.addEventListener('mouseleave', highlight);
        navItem.addEventListener('click', setActive);
    });
});

function highlight(event) {
    const classes = event.currentTarget.classList

    classes.contains('highlighted') ?
        classes.remove('highlighted') :
        classes.add('highlighted');
}

function setActive(event) {
    let element = event.currentTarget,
        navItems = element.parentNode.querySelectorAll('nav li');

    event.preventDefault();

    navItems.forEach((navItem, index) => {
        navItem.classList.remove('active');
    });

    element.classList.add('active');
}

function createImages(images) {
    const hero = document.querySelector('#hero');

    // Empty hero
    while (hero.firstChild) {
        hero.removeChild(hero.firstChild);
    }

    images.forEach((image, index) => {
        const imgElement = document.createElement('img');

        imgElement.src = image;
        hero.append(imgElement);
    });

    document.querySelector('#hero img:first-child').classList.add('current');
}

function rotateImages() {
    let currentImage = document.querySelector('#hero .current'),
        nextImage = currentImage.nextSibling;

    if (nextImage === null) {
        nextImage = document.querySelector('#hero img:first-child');
    }

    currentImage.classList.remove('current');
    nextImage.classList.add('current');
}