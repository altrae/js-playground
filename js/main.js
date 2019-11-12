import { getRecipePuppyData, getStudioGhibliFilmData, highlight, setActive } from './utils';
import Slideshow from './Slideshow';

document.addEventListener('DOMContentLoaded', () => {
    const images = [
        'assets/images/1.jpg',
        'assets/images/2.jpg',
        'assets/images/3.jpg'
    ];

    const slideshow = new Slideshow(images, 6000);

    slideshow.init();

    const navItems = document.querySelectorAll('nav li') || [];

    [...navItems].map(navItem => {
        ['mouseenter', 'mouseleave', 'touchstart', 'touchend'].forEach(eventName => {
            navItem.addEventListener(eventName, highlight);
        });

        navItem.addEventListener('click', setActive);
    });
});

getStudioGhibliFilmData('https://ghibliapi.herokuapp.com/films', '#page-2');

document.forms['recipe-fetch-form'].addEventListener('submit', event => {
    event.preventDefault();
    getRecipePuppyData('http://www.recipepuppy.com/api/', '#recipe-fetch-list');
});