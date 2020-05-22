import classNames from 'classnames/bind';
import React from 'react';
import { func, string } from 'prop-types';
import * as styles from './../input.css';

const cx = classNames.bind(styles);

const ShowPassword = ({
    buttonText,
    onClick,
}) => {
    const className = [
        'absolute',
        'text-xsmall',
        'hover:underline',
        'underline',
        cx('show-password'),
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
