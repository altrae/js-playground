import React from 'react';
import Button from '../../Button/Button';
import Input from './input';

export const ImplementationExample = () => {
    const commonProps = {
        inputClassName: 'flex-auto',
    };

    const firstNameInputProps = {
        ...commonProps,
        automationId: 'pdp-first-name',
        defaultValue: 'A-A-ron',
        foo: 'bar',
        id: 'firstName',
        inputType: 'text',
        label: 'First name',
        name: 'first-name',
        readOnly: true,
        required: true,
        wrapperClassName: 'mr-1',
    };

    const lastNameInputProps = {
        ...commonProps,
        automationId: 'pdp-last-name',
        id: 'lastName',
        inputType: 'text',
        label: 'Last name',
        name: 'last-name',
        required: true,
        wrapperClassName: 'ml-1',
    };

    const streetInputProps = {
        ...commonProps,
        automationId: 'pdp-street',
        disableAutoFeatures: true,
        id: 'streetAddress',
        inputType: 'text',
        label: '123 Some Street',
        name: 'street',
        required: true,
        wrapperClassName: 'mr-1',
    };

    const phoneInputProps = {
        ...commonProps,
        automationId: 'pdp-phone',
        errorText: 'Invalid input. Try again.',
        helpText: 'Enter a ten digit phone number.',
        id: 'phoneNumber',
        inputType: 'tel',
        label: 'Phone number',
        name: 'phone',
        pattern: /^(\+0?1[\s.-])?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
        wrapperClassName: 'mr-1',
    };

    const emailInputProps = {
        ...commonProps,
        automationId: 'pdp-email',
        disabled: true,
        id: 'email',
        inputType: 'email',
        label: 'Email',
        name: 'email',
        wrapperClassName: 'ml-1',
    };

    const passwordInputProps = {
        ...commonProps,
        automationId: 'pdp-pwd',
        id: 'password',
        inputType: 'password',
        label: 'Password',
        name: 'password',
        wrapperClassName: 'mr-1',
    };

    const passwordConfirmInputProps = {
        ...commonProps,
        automationId: 'pdp-pwd-confirm',
        id: 'passwordConfirm',
        inputType: 'password',
        label: 'Confirm password',
        name: 'password-confirm',
        wrapperClassName: 'ml-1',
    };

    const submitButtonProps = {
        ...commonProps,
        buttonType: 'Primary',
        className: 'my-1',
        onClick: (event) => {
            event.preventDefault();

            const msgContainer = document.createElement('div');
            msgContainer.style.cssText = `
                background-color: beige;
                border: 1px solid black;
                left: 50%;
                padding: 1.5rem;
                position: absolute;
                text-align: center;
                top: 25%;
                transform: translate(-50%, -50%);
                width: 500px;
            `;

            const innerContainer = document.createElement('div');
            innerContainer.style.cssText = `
                position: relative;
            `;
            innerContainer.innerText = 'Form submission successful!';
            msgContainer.appendChild(innerContainer);

            const closeButton = document.createElement('button');
            closeButton.style.cssText = `
                position: absolute;
                top: -.75em;
                right: -.75em;
            `;
            closeButton.innerText = 'X';
            innerContainer.appendChild(closeButton);

            closeButton.addEventListener('click', () => {
                msgContainer.remove();
            });

            document.body.appendChild(msgContainer);
        },
        type: 'submit',
    };

    return (
        <form
            action="/"
            className="bg-white-100 flex flex-col font-open-sans px-2 py-1"
            style={{ width: '702px' }}
        >
            <h3>Sign Up</h3>
            <div className="flex items-start mb-2 mt-2">
                <Input {...firstNameInputProps} />
                <Input {...lastNameInputProps} />
            </div>
            <div className="flex items-start mb-2">
                <Input {...streetInputProps} />
            </div>
            <div className="flex items-start mb-2">
                <Input {...phoneInputProps} />
                <Input {...emailInputProps} />
            </div>
            <div className="flex items-start mb-2">
                <Input {...passwordInputProps} />
                <Input {...passwordConfirmInputProps} />
            </div>
            <div className="flex items-start justify-end mb-2">
                <Button {...submitButtonProps}>Submit</Button>
            </div>
        </form>
    );
};

export default {
    title: 'Components/Input',
    component: Input,
};
