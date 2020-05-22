import React from 'react';
import Icon from '../../Icon';
import Input from './input';

export const Default = () => (
    <Input
        id="default"
        inputType="text"
        label="label"
        name="name"
    />
);

export const Disabled = () => (
    <Input
        automationId="pdp-email"
        disabled
        id="pdp-email-disabled"
        inputType="email"
        label="Email"
        name="email"
    />
);

export const Email = () => (
    <Input
        automationId="pdp-email"
        id="pdp-email"
        inputType="email"
        label="Email"
        name="email"
    />
);

export const Password = () => (
    <Input
        automationId="pdp-password"
        id="pdp-password"
        inputType="password"
        label="Enter password"
        name="password"
    />
);

const icon = (
    <Icon
        className="text-info"
        height="16"
        iconName="ydt-thumbsup-fill"
        id="pdp-info"
        width="16"
    />
);

export const Tel = () => (
    <Input
        automationId="pdp-phone"
        errorText={(
            <div>
                <p>Invalid input. Try again.</p>
                <div className="my-1">{icon} Must be ten digits. {icon} Must be a US number.</div>
                <div className="my-1">{icon} Must be awesome! {icon} Must be unique.</div>
            </div>
        )}
        helpText="Enter a valid U.S. phone number."
        id="pdp-phoneNumber"
        inputType="tel"
        label="Phone number"
        name="phone"
        pattern={/^(\+0?1[\s.-])?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/}
    />
);

export const Text = () => (
    <Input
        automationId="pdp-first-name"
        id="pdp-firstName"
        inputType="text"
        label="First name"
        name="first-name"
        required
    />
);

export default {
    component: Input,
    title: 'Components/Input/Type',
};
