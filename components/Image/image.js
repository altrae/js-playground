import React, { useState, forwardRef } from 'react';
import { bool, func, number, oneOf, string } from 'prop-types';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import Icon from '../../Icon';
import * as styles from './image.css';

const cx = classNames.bind(styles);

/**
 * Image component usage allows image to be rendered
 * as a stand-alone image or wrapped in an anchor tag
 * either using a React route or an image src.
 *
 * If a height and width are set the image aspect
 * ratio is determined using the following formula:
 *     Landscape: image height / image width  * 100
 *     Portrait: image width / image height  * 100
 *
 * http://aspiringwebdev.com/stop-your-web-pages-from-jumping-around-while-images-load/
 *
 * The aspect ratio is set to prevent page jumping. Page
 * jumps occur because the browser does not know the width
 * and height of the images in advance. On a responsive
 * site, the image could be a different height and width
 * depending on the screen size. We may, however, know the
 * ratio of the image’s height to its width. That will not
 * change for a given image, no matter the screen size.
 *
 * Caveats:
 * To accomodate different aspect ratios, create multiple
 * image containers and use them where appropriate. Use this
 * technique only where the aspect ratio is certain; images
 * that don’t fit the aspect ratio will look distorted.
 *
 * A common challenge in responsive design – not just with
 * this technique – is maintaining the right image quality
 * for each screen.
 *
 * Case study of a news site that implemented it successfully:
 * https://www.smashingmagazine.com/2013/09/responsive-images-performance-problem-case-study/
 *
 * Similar technique for embedded content:
 * https://www.smashingmagazine.com/2014/02/making-embedded-content-work-in-responsive-design/
 */

const Image = forwardRef((props, ref) => {
    const {
        alt,
        analyticsTag,
        automationId,
        className,
        height,
        loader,
        onError,
        onLoad,
        placeholder,
        route,
        src,
        target,
        width,
        ...additionalImgProps
    } = props;

    delete additionalImgProps.href;

    let { href } = props;

    const [isPlaceholder, setIsPlaceholder] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const hasImgRatio = (height && width);

    const eventHandlers = {
        onError: (event) => {
            setIsPlaceholder(true);
            setIsLoading(false);
            onError(event);
        },
        onLoad: (event) => {
            setIsLoading(false);
            onLoad(event);
        },
    };

    const getImgRatio = () => {
        const sorted = [height, width].sort((a, b) => a - b);

        // eslint-disable-next-line no-mixed-operators
        return `${sorted[0] / sorted[1] * 100}%`;
    };

    const config = {
        img: {
            ...additionalImgProps,
            alt,
            className: [
                cx({
                    invisible: isLoading,
                    visible: !isLoading,
                }),
                'max-w-full',
            ].join(' '),
            onError: eventHandlers.onError,
            onLoad: eventHandlers.onLoad,
            ref,
            src,
        },
        imgError: {
            icon: {
                className: 'w-full',
                height: '64',
                iconName: 'no-image',
                width: '64',
            },
            wrapper: {
                className: [
                    'border-1',
                    'border-gray-400',
                    'border-solid',
                    'flex',
                    'flex-col',
                    'font-open-sans-bold',
                    'h-full',
                    'justify-center',
                    'not-sr-only',
                    'text-center',
                    'text-gray-400',
                    'text-xlarge',
                    'uppercase',
                    'w-full',
                ].join(' '),
                style: {
                    minHeight: '180px',
                    minWidth: '200px',
                },
            },
        },
        imgRatio: {
            className: 'h-0 overflow-hidden',
            style: { paddingBottom: getImgRatio() },
        },
        wrapper: {
            'data-automation-id': automationId,
            className: [
                className,
                cx({
                    loading: loader && isLoading,
                    relative: loader && isLoading,
                }),
            ].join(' '),
        },
    };

    const getPlaceholder = () => {
        let imgErrorPlaceholder = (
            <div {...config.imgError.wrapper}>
                <Icon {...config.imgError.icon} />
                <div>Image Not<br />Available</div>
            </div>
        );

        if (placeholder) {
            imgErrorPlaceholder = (
                <img
                    alt="placeholder"
                    className="not-sr-only"
                    src={placeholder}
                />
            );
        }

        return imgErrorPlaceholder;
    };

    const getImage = () => {
        // eslint-disable-next-line jsx-a11y/img-has-alt
        let image = <img {...config.img} />;

        if (route) image = <Link to={route}>{image}</Link>;

        if (href) {
            // Append analytics tag when href doesn't contain 'cm_re'.
            if (analyticsTag && !/cm_re/i.test(href)) {
                href.includes('?')
                    ? href += `&${analyticsTag}`
                    : href += `?${analyticsTag}`;
            }

            image = <a href={href} target={target}>{image}</a>;
        }

        return isPlaceholder ? getPlaceholder() : image;
    };

    return (
        <div {...config.wrapper}>
            {
                hasImgRatio
                    ? <div {...config.imgRatio}>
                        {getImage()}
                    </div>
                    : getImage()
            }
        </div>
    );
});

Image.propTypes = {
    /** Alternative text for the image. */
    alt: string.isRequired,
    /** Source path of the image. */
    src: string.isRequired,
    /** Analytics tagging. */
    analyticsTag: string,
    /** Automation testing ID. */
    automationId: string,
    /** Allows custom class(es) for img wrapper element. */
    className: string,
    /** Height of image used calculate the image ratio. */
    height: number,
    /** URL of the destination page when image is clicked */
    href: string,
    /**
     * If loader is true and the image state is loading a loading
     * animation will display until either the 'error' or 'load'
     * event occurs.
     */
    loader: bool,
    /** Allows custom functionality if image fails to load. */
    onError: func,
    /** Allows custom functionality on successful image load. */
    onLoad: func,
    /** '
     * This takes an image src URL. If not provided a default
     * placeholder of 'Image Not Available' will display in the
     * case of an 'error' event.
     */
    placeholder: string,
    /** Used for React Router instead of href. */
    route: string,
    /** Specifies where to open the destination page */
    target: oneOf(['_blank', '_parent', '_self', '_top']),
    /** Width of image used to calculate the image ratio. */
    width: number,
};

Image.defaultProps = {
    analyticsTag: null,
    automationId: null,
    className: null,
    height: null,
    href: null,
    loader: false,
    onError: () => { },
    onLoad: () => { },
    placeholder: null,
    route: null,
    target: '_self',
    width: null,
};

Image.displayName = 'Image';

export default Image;
