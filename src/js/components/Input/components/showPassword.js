import classNames from 'classnames/bind';
import React from 'react';
import { func, string } from 'prop-types';
import * as styles from './../input.scss';

const ShowPassword = ({
    buttonText,
    onClick,
}) => {
    const className = [
        'btn',
        'btn-link',
        'position-absolute',
        'show-password',
        'text-xsmall',
    ].join(' ');

    const props = {
        className,
        onClick,
        type: 'button',
    };

    return (
        <button {...props}>
            {buttonText}
        </button>
    );
};

ShowPassword.propTypes = {
    buttonText: string.isRequired,
    onClick: func.isRequired,
};

export default ShowPassword;
