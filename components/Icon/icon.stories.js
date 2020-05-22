import React from 'react';
import Icon from './icon';

const createStory = (propsOverrides = {}) => () => {
    const props = {
        automationId: 'some-id',
        height: '32',
        iconName: 'ydt-arrow-left',
        viewBox: '0 0 32 32',
        width: '32',
        ...propsOverrides,
    };

    return <Icon {...props} />;
};

export const ydtArrowLeft = createStory({
    className: 'text-success',
});

export const ydtStars = createStory({
    iconName: 'ydt-stars',
    viewBox: '0 0 160 32',
    width: '160',
});

export default {
    title: 'Components/Icon',
    component: Icon,
};
