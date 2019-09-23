import { highlight, setActive } from './utils';
import Slideshow from './Slideshow';

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