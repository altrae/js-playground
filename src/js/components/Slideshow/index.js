import React, { useEffect, useState } from 'react';
import { array, bool, number, string } from 'prop-types';
import { isNullOrUndefined } from '../../utils';
import Image from '../Image';

const Slideshow = ({ id = '', images = [], rotationInterval = 500, shuffle = false }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [shuffled, setShuffled] = useState(false);
    const [imagesToShow, setImagesToShow] = useState(images);

    const shuffleArray = images => {
        for (let iterationCount = images.length - 1; iterationCount > 0; iterationCount--) {
            // Random index based off of iterationCount
            const randomIndex = Math.floor(Math.random() * (iterationCount + 1));
            const tempArray = images[iterationCount];
            images[iterationCount] = images[randomIndex];
            images[randomIndex] = tempArray;
        }

        setShuffled(true);

        return images;
    };

    if (shuffle && !shuffled) setImagesToShow(shuffleArray(images));

    const imageCollection = imagesToShow.map(({ alt, src }, key) => {
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
    shuffle: bool,
};

Slideshow.defaultProps = {
    rotationInterval: 1500,
    shuffle: false,
};

export default Slideshow;
