import React from 'react';
import ReactDOM from 'react-dom';
import { getRecipePuppyData, getStudioGhibliFilmData, highlight, setActive } from './utils';
import Slideshow from './slideshow';
import Input from './components/Input';
import '../css/main.scss';

document.addEventListener('DOMContentLoaded', () => {
    const images = [
        // {
        //     alt: 'sunset',
        //     src: '/src/assets/images/1.jpg',
        // },
        // {
        //     alt: 'flowers',
        //     src: '/src/assets/images/2.jpg',
        // },
        // {
        //     alt: 'flower bowl',
        //     src: '/src/assets/images/3.jpg',
        // },
        {
            alt: 'big tits',
            src: '/src/assets/images/4.jpg',
        },
        {
            alt: 'big tits',
            src: '/src/assets/images/5.jpg',
        },
        {
            alt: 'big tits',
            src: '/src/assets/images/6.jpg',
        },
    ];

    const navItems = document.querySelectorAll('nav li') || [];

    [...navItems].map(navItem => {
        ['mouseenter', 'mouseleave', 'touchstart', 'touchend'].forEach(eventName => {
            navItem.addEventListener(eventName, highlight);
        });

        navItem.addEventListener('click', setActive);
    });

    const slideshowProps = {
        id: 'hero-1',
        images,
        rotationInterval: 3000
    };

    const inputProps = {
        id: 'name',
        label: 'Find recipe (e.g. chicken, vegan, eggroll, pastry)',
        name: 'q',
        inputType: 'text',
        required: true,
        size: '50',
        wrapperClassName: 'form-group',
        inputClassName: 'p-1 border rounded'
    };

    ReactDOM.render(
        <Slideshow {...slideshowProps} />,
        document.getElementById('hero')
    );

    ReactDOM.render(
        <form id="recipe-fetch-form" method="get" className="mx-auto my-3 text-center" style={{ width: '500px' }}>
            <Input {...inputProps} />
            <div className="form-submit">
                <input type="submit" className="btn btn-primary" value="Search" />
            </div>
        </form>,
        document.getElementById('recipe-fetch-form')
    );

    document.forms['recipe-fetch-form'].addEventListener('submit', event => {
        event.preventDefault();
        getRecipePuppyData('//www.recipepuppy.com/api/', '#recipe-fetch-list');
    });
});

getStudioGhibliFilmData('https://ghibliapi.herokuapp.com/films', '#page-2');


// Making fetch using async/await
const getData = (async () => {
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