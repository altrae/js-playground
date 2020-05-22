import classNames from 'classnames/bind';
import React from 'react';
import { bool, string } from 'prop-types';
import * as styles from './../input.css';

const cx = classNames.bind(styles);

const Label = ({
    disabled,
    erroneous,
    focused,
    htmlFor,
    inputHasValue,
    label,
}) => {
    const className = [
        'absolute',
        cx(
            'input-label',
            {
                // apply background color
                'bg-gray-100': disabled,
                'bg-white-100': !disabled,
                // apply text color
                'text-error': erroneous,
                'text-gray-400': disabled,
                'text-gray-500': !disabled && !erroneous,
                // apply label position
                'label-to-top': inputHasValue || focused,
                // apply text size
                'text-xsmall': inputHasValue,
            },
        ),
    ].join(' ');

    return (
        <label className={className} htmlFor={htmlFor}>
            {label}
        </label>
    );
};

Label.propTypes = {
    disabled: bool.isRequired,
    erroneous: bool.isRequired,
    focused: bool.isRequired,
    htmlFor: string.isRequired,
    inputHasValue: bool.isRequired,
    label: string.isRequired,
};

export default Label;
