/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import classnames from 'classnames';
import { bool, string } from 'prop-types';
import * as css from './loader.css';

const Loader = ({ automationId, className, overlay, ...attrs }) => (
    <div
        className={classnames(css.loader, 'flex', 'justify-center', 'items-center', className, {
            absolute: !overlay,
            'fixed bg-gray-660': overlay,
        })}
        data-automation-id={automationId}
        {...attrs}
    />
);

Loader.propTypes = {
    /**
     * The data-automation-id to apply.
     */
    automationId: string,
    /**
     * Extends the classes that are applied.
     */
    className: string,
    /**
     * Provides a translucent background with a fixed position to cover the full page.
     */
    overlay: bool,
};

Loader.defaultProps = {
    automationId: null,
    className: null,
    overlay: false,
};

export default Loader;
