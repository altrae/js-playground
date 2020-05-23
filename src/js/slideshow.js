import React, { useEffect, useState } from 'react';
import { array, number, string } from 'prop-types';
import { isNullOrUndefined } from './utils';
import Image from './components/Image';

const Slideshow = ({ id, images, rotationInterval }) => {
    const [currentImage, setCurrentImage] = useState(0);

    const imageCollection = images.map(({ alt, src }, key) => {
        const imgProps = {
            alt,
            className: key === 0 ? 'current' : null,
            key,
            src
        };

        return <Image {...imgProps} />;
    });

    const rotateImages = () => {
        const imgs = document.querySelectorAll('[data-component-name="slideshow"] > div');
        const nextImage = currentImage + 1;

        isNullOrUndefined(imgs[nextImage])
            ? setCurrentImage(0)
            : setCurrentImage(nextImage);

        imgs[currentImage].classList.add('current');

        if (isNullOrUndefined(imgs[currentImage - 1])) imgs[imgs.length - 1].classList.remove('current')
        else imgs[currentImage - 1].classList.remove('current');
    };

    useEffect(() => {
        const interval = setInterval(
            () => { rotateImages(currentImage) },
            rotationInterval
        );

        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div data-component-name="slideshow" id={`slideshow-${id}`}>
            {imageCollection}
        </div>

    );
};

Slideshow.propTypes = {
    id: string.isRequired,
    images: array.isRequired,
    rotationInterval: number,
};

Slideshow.defaultProps = {
    rotationInterval: 1500,
};

export default Slideshow;