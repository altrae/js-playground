class Slideshow {
    constructor(images, interval = 3000) {
        this.images = images;
        this.interval = interval;
    }

    createImages() {
        const hero = document.querySelector('#hero');

        // Empty hero
        while (hero.firstChild) {
            hero.removeChild(hero.firstChild);
        }

        this.images.forEach((image, index) => {
            const imgElement = document.createElement('img');

            imgElement.src = image;
            hero.append(imgElement);
        });

        document.querySelector('#hero img:first-child').classList.add('current');
    }

    rotateImages() {
        let currentImage = document.querySelector('#hero .current'),
            nextImage = currentImage.nextSibling;

        if (nextImage === null) {
            nextImage = document.querySelector('#hero img:first-child');
        }

        currentImage.classList.remove('current');
        nextImage.classList.add('current');
    }

    init() {
        this.createImages();
        setInterval(this.rotateImages, this.interval);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'assets/images/1.jpg',
        'assets/images/2.jpg',
        'assets/images/3.jpg'
    ];

    const slideshow = new Slideshow(images, 6000);

    slideshow.init();

    const navItems = document.querySelectorAll('nav li');

    navItems.forEach((navItem, index) => {
        navItem.addEventListener('mouseenter', highlight);
        navItem.addEventListener('mouseleave', highlight);
        navItem.addEventListener('click', setActive);
    });
});

const highlight = event => {
    const classes = event.currentTarget.classList;

    classes.toggle('highlighted');
};

const setActive = event => {
    const element = event.currentTarget,
        navItems = element.parentNode.querySelectorAll('nav li');

    event.preventDefault();

    navItems.forEach((navItem, index) => {
        navItem.classList.remove('active');
    });

    element.classList.add('active');
};