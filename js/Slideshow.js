export default class Slideshow {
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