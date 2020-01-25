import React, { Component } from 'react';

export default class Slideshow extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const firstImage = document.querySelector('#hero img:first-child');
        firstImage.classList.add('current');

        setInterval(() => {
            this.rotateImages(firstImage);
        }, this.props.interval);
    }

    rotateImages(firstImage) {
        const currentImage = document.querySelector('#hero .current');
        let nextImage = currentImage && currentImage.nextSibling;

        if (nextImage === undefined || nextImage === null) {
            nextImage = firstImage;
        }

        currentImage.classList.remove('current');
        nextImage.classList.add('current');
    }

    render() {
        return (
            this.props.images.map((image, idx) => (
                <img
                    key={ idx }
                    src={ image }
                />
            ))
        )
    }
}