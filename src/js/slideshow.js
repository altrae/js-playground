import React, { useEffect, useState } from 'react';
import { array, number } from 'prop-types';
import { isNullOrUndefined } from './utils';

const Slideshow = ({ images, rotationInterval }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const imageElements = images.map((src, key) => {
        const imgProps = {
            className: key === 0 ? 'current' : null,
            key,
            src
        };

        return <img {...imgProps} />;
    });

    const rotateImages = () => {
        const imgs = document.querySelectorAll('#hero img');
        const nextImage = currentImage + 1;

        if (isNullOrUndefined(imgs[nextImage])) {
            setCurrentImage(0);
        }
        else {
            setCurrentImage(nextImage);
        }
        
        imgs[currentImage].classList.add('current');
        
        if(isNullOrUndefined(imgs[currentImage - 1])) imgs[imgs.length - 1].classList.remove('current')
        else imgs[currentImage - 1].classList.remove('current');
    };

    useEffect(() => {
        const interval = setInterval(
            () => { rotateImages(currentImage) },
            rotationInterval
        );

        return () => clearInterval(interval);
    }, [currentImage]);

    return imageElements;
};

Slideshow.propTypes = {
    images: array.isRequired,
    rotationInterval: number.isRequired
};

export default Slideshow;