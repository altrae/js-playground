import React from 'react';
import ReactDOM from 'react-dom';
import { getRecipePuppyData, getStudioGhibliFilmData, highlight, setActive, invertObj } from './utils';
import Slideshow from './Slideshow';
import '../css/main.scss';

document.addEventListener('DOMContentLoaded', () => {
    const images = [
        '/src/assets/images/1.jpg',
        '/src/assets/images/2.jpg',
        '/src/assets/images/3.jpg'
    ];

    // const slideshow = new Slideshow(images, 6000);

    // slideshow.init();

    const navItems = document.querySelectorAll('nav li') || [];

    [...navItems].map(navItem => {
        ['mouseenter', 'mouseleave', 'touchstart', 'touchend'].forEach(eventName => {
            navItem.addEventListener(eventName, highlight);
        });

        navItem.addEventListener('click', setActive);
    });

    const userToSkill = {
        'lemiesz': ['reactjs', 'web', 'java'],
        'kimia': ['java', 'dynamodb'],
        'sai': ['html', 'frontend']
    };

    console.info(invertObj(userToSkill));

    ReactDOM.render(
        <Slideshow images={ images } interval='3000' />,
        document.getElementById('hero')
    );
});

getStudioGhibliFilmData('https://ghibliapi.herokuapp.com/films', '#page-2');

document.forms['recipe-fetch-form'].addEventListener('submit', event => {
    event.preventDefault();
    getRecipePuppyData('http://www.recipepuppy.com/api/', '#recipe-fetch-list');
});


// Making fetch using async/await
const getData = (async() => {
    try {
        const response = await fetch('https://cors-anywhere.herokuapp.com/http://recipepuppy.com/api', {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok && response.status >= 200 && response.status <= 400) {
            const json = await response.json();
            console.log('response says what?', json);
            console.log('response', response);
        }
    } catch (error) {
        console.log(error);
    }
})();