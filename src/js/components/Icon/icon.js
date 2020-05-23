import React from 'react';
import { string } from 'prop-types';

const Icon = ({
    automationId,
    className,
    height,
    iconName,
    width,
    ...attrs
}) => {
    const iconClasses = ['inline-block'];
    className.length && iconClasses.push(className);

    const svgProps = {
        className: iconClasses.join(' ').trim().replace(/[\s]{2,}/, ' '),
        'data-automation-id': `${automationId}`,
        height,
        /**
        * In Edge 16 browser SVG icon click cancels the bubbling phase
        * of events so disabling pointer-events. As we dont have any
        * events on SVG adding it without browser specific hack.
        */
        style: { pointerEvents: 'none' },
        width,
        ...attrs,
    };

    const icon = (
        <svg {...svgProps}>
            <use href={`#${iconName.toLowerCase()}`} />
        </svg>
    );

    return icon;
};

Icon.defaultProps = {
    className: '',
    height: '16',
    width: '16',
};

Icon.propTypes = {
    /**
     * Icon type being displayed (e.g. ydt-stars, ydt-close). A
     * complete list of icon types can be located at
     * https://wiki.jcpenney.com/display/YE/Yoda+Design+Tokens.
     */
    iconName: string.isRequired,
    /** Unique ID for automation testing. */
    automationId: string,
    /** Custom component class(es). */
    className: string,
    /** Height attribute for SVG element. */
    height: string,
    /** Width attribute for SVG element. */
    width: string,
};

export default Icon;
