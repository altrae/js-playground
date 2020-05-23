import React, { Fragment } from 'react';
import { Link, Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import * as tokens from 'yoda-design-tokens';
import Image from './index';

const createStory = (propsOverrides = {}) => () => {
    const props = {
        alt: 'image alt text',
        automationId: 'some-id',
        src: '//m.jcpenney.com/mobile/images/pg00001_m550007_47100016.gif',
        ...propsOverrides,
    };

    return (
        <Image {...props} />
    );
};

const LocationDisplay = withRouter(({ location }) => (<h2>Current route: {location.pathname}</h2>));

const Backpacks = () => (
    <Fragment>
        {createStory({
            height: '336px',
            route: '/rewards',
            src: '//www.jcpenney.com/dotcom/images/07_Kids\'-backpacks_072117.jpg',
            width: '336px'
        })()}
        <LocationDisplay />
    </Fragment>
);

const Rewards = () => (
    <Fragment>
        {createStory({ route: '/backpacks' })()}
        <LocationDisplay />
    </Fragment>
);

export const ImageNoURL = createStory();

export const ImageBroken = createStory({ src: '123abc' });

export const HasHref = createStory({
    analyticsTag: 'asfasfs=asdfasf',
    href: '//example.com',
    target: '_blank',
});

export const SkeletonPlaceholder = () => (
    <div style={{ maxWidth: '600px' }}>
        <div className="pb-2">
            The loader is only visible until the image either successfully
            loads or throws an error which would result in the placeholder
            being shown instead. Refresh the page to see the loading
            background prior to those events.
        </div>
        <div className="mb-1" style={{ backgroundColor: 'black', height: '20px' }} />
        <div className="mx-auto relative" style={{ height: '200px', width: '320px' }}>
            {
                createStory({
                    loader: true,
                    src: 'https://upload.wikimedia.org/wikipedia/commons/c/ce/Transparent.gif',
                    style: {
                        backgroundColor: tokens.colorCoreBrand,
                        border: '2px solid black',
                        borderRadius: '50%',
                        clipPath: 'circle(32px at center)',
                        height: '64px',
                        left: '50%',
                        position: 'absolute',
                        top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '64px',
                    },
                })()
            }
        </div>
        <div className="mt-1" style={{ backgroundColor: 'black', height: '20px' }}/>
    </div>
);

export const ImageResponsive = createStory({
    height: 200,
    width: 320,
});

export const HasRoute = () => {
    const linkProps = {
        className: [
            'active:text-white-100',
            'bg-brand',
            'display-block',
            'font-open-sans-bold',
            'hover:text-white-100',
            'p-2',
            'text-white-100',
            'uppercase',
            'visited:text-white-100',
        ].join(' '),
    };

    return (
        <Router>
            <div style={{ width: '600px' }}>
                In this implementation each button contains a route that displays
                the relative image. Each image has a route pointing back to the
                other so clicking the images switches between them.

                <nav className="my-2">
                    <ul>
                        <li className="display-inline-b mr-2">
                            <Link {...linkProps} to="/backpacks">Backpacks</Link>
                        </li>
                        <li className="display-inline-b">
                            <Link {...linkProps} to="/rewards">Rewards</Link>
                        </li>
                    </ul>
                </nav>


                <Switch>
                    <Route path="/backpacks" component={Backpacks} />
                    <Route path="/rewards" component={Rewards} />
                </Switch>
            </div>
        </Router>
    );
};

export default {
    component: Image,
    title: 'Components/Image',
};
