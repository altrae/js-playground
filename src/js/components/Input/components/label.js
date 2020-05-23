import React from 'react';
import { bool, string } from 'prop-types';

const Label = ({
    disabled,
    erroneous,
    focused,
    htmlFor,
    inputHasValue,
    label,
}) => {
    const className = [
        'font-open-sans-regular',
        'input-label',
        'position-absolute',
        'px-1',
    ];

    if (disabled) className.push('bg-secondary', 'text-secondary');
    if (!disabled) className.push('bg-white');
    if (erroneous) className.push('text-danger');
    if (!disabled && !erroneous) className.push('text-muted');
    if (inputHasValue || focused) className.push('label-to-top');
    if (inputHasValue) className.push('text-xsmall');

    return (
        <label className={className.join(' ')} htmlFor={htmlFor}>
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
