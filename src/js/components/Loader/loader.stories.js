import React from 'react';
import Loader from './loader';

export default {
    title: 'Components/Loader',
    component: Loader,
};

export const Default = () => <Loader />;

export const Overlay = () => (
    <div className="flex justify-center items-center h-full">
        Testing...
        <Loader overlay />
    </div>
);
