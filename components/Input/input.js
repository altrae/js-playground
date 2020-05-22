import classNames from 'classnames/bind';
import {
    bool,
    func,
    instanceOf,
    node,
    oneOf,
    oneOfType,
    string,
} from 'prop-types';
import React, { forwardRef, useState } from 'react';
import HelperText from './components/helperText';
import Label from './components/label';
import ShowPassword from './components/showPassword';
import { validateErrorTextPropType } from './customPropTypeValidation';
import * as styles from './input.css';

const cx = classNames.bind(styles);

/**
 * Displays an email, password, tel, or text input field
 * depending on configuration.
 *
 * All extra `props` (not accounted for in `propTypes`)
 * get spread on the `<input />` element, including `ref`.
 */
const Input = forwardRef((props, ref) => {
    const {
        automationId,
        defaultValue,
        disableAutoFeatures,
        disabled,
        errorText,
        helpText,
        id,
        inputClassName,
        inputType,
        name,
        onBlur,
        onChange,
        onFocus,
        pattern,
        label,
        wrapperClassName,
        ...additionalProps
    } = props;

    const [erroneous, setErroneous] = useState(false);
    const [focused, setFocused] = useState(false);
    const [showPasswordButtonText, setShowPasswordButtonText] = useState('show');
    const [type, setType] = useState(inputType);
    const [value, setValue] = useState(defaultValue);
    const [showPasswordButton] = useState(type === 'password');

    const eventHandlers = {
        onBlur: (event) => {
            setFocused(false);

            if (pattern) {
                const isValidValue = pattern.test(event.target.value);
                setErroneous(!isValidValue);
            }

            onBlur(event);
        },
        onChange: (event) => {
            setValue(event.target.value);
            onChange(event);
        },
        onFocus: (event) => {
            setFocused(true);
            onFocus(event);
        },
        onShowPasswordClick: () => {
            if (type === 'password') {
                setShowPasswordButtonText('hide');
                setType('text');
            } else {
                setShowPasswordButtonText('show');
                setType('password');
            }
        },
    };

    const classes = {
        input: [
            'font-open-sans',
            'px-2',
            'py-1',
            'rounded-medium',
            cx({
                // apply background color
                'bg-gray-100': disabled,
                'bg-white-100': !disabled,
                // apply border width
                'border-1': !erroneous,
                'border-2': erroneous,
                // apply border style
                'border-dashed': disabled,
                'border-solid': !disabled,
                // apply border color
                'border-error': erroneous,
                'border-gray-300': !erroneous,
                'border-gray-600': focused,
            }),
            inputClassName,
        ].join(' '),
        wrapper: [
            'relative',
            cx('input-wrapper'),
            wrapperClassName,
        ].join(' '),
    };

    const componentProps = {
        helperText: {
            erroneous,
            errorText,
            helpText,
        },
        input: {
            ...additionalProps,
            className: classes.input,
            disabled,
            id,
            name,
            onBlur: eventHandlers.onBlur,
            onChange: eventHandlers.onChange,
            onFocus: eventHandlers.onFocus,
            pattern: pattern && pattern.source,
            placeholder: label,
            ref,
            type,
            value,
        },
        label: {
            disabled,
            erroneous,
            focused,
            htmlFor: id,
            inputHasValue: !!value,
            label,
        },
        showPasswordButton: {
            buttonText: showPasswordButtonText,
            onClick: eventHandlers.onShowPasswordClick,
        },
        wrapper: { className: classes.wrapper },
    };

    if (automationId) componentProps.wrapper['data-automation-id'] = automationId;
    if (erroneous) componentProps.input['aria-invalid'] = true;

    if (disableAutoFeatures) {
        componentProps.input.autoCapitalize = 'off';
        componentProps.input.autoComplete = 'off';
        componentProps.input.autoCorrect = 'off';
        componentProps.input.spellCheck = 'false';
    }

    return (
        <div {...componentProps.wrapper}>
            <span className="relative">
                <input {...componentProps.input} />
                <Label {...componentProps.label} />
                {showPasswordButton && <ShowPassword {...componentProps.showPasswordButton} />}
            </span>
            <HelperText {...componentProps.helperText} />
        </div>
    );
});

Input.propTypes = {
    /** Unique input ID. */
    id: string.isRequired,
    /** Input type. */
    inputType: oneOf(['email', 'password', 'tel', 'text']).isRequired,
    /**
     * Label text used for both label and placeholder and
     * required to ensure accessibility.
     */
    label: string.isRequired,
    /**
     * Name of the input form control. Submitted with
     * the form as part of a name/value pair.
     */
    name: string.isRequired,
    /** ID for automated testing. */
    automationId: string,
    /** Initial input value. */
    defaultValue: string,
    /**
     * Disables autocapitalize, autocomplete, autocorrect, and spellcheck.
     *
     * autocapitalize: Controls whether and how text input is automatically
     * capitalized as it is entered/edited by the user.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autocapitalize
     *
     * autocomplete: Hint for form autofill feature.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
     *
     * autocorrect: Safari only. A string indicating whether or not autocorrect is
     * on or off.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocorrect
     *
     * spellcheck: Enables/disables spellchecking.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/spellcheck
     */
    disableAutoFeatures: bool,
    /**
     * Indicates user should not be able to interact with the input.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefdisabled
     */
    disabled: bool,
    /**
     * Error text displayed under input. Is required if
     * pattern is set and must be a valid React element
     * or typeof 'string'.
     */
    errorText: validateErrorTextPropType,
    /** Help text displayed under input. */
    helpText: oneOfType([node, string]),
    /** Custom class(es) for input. */
    inputClassName: string,
    /**
     * Event handler for 'blur' event. By default it
     * updates the input as erroneous in state if a
     * pattern is passed and the value does not match.
     * It also resets the label position if there is no
     * field value.
     */
    onBlur: func,
    /**
     * Event handler for 'change' event. By default it
     * updates the input value in state.
     */
    onChange: func,
    /**
     * Event handler for 'focus' event. By default it
     */
    onFocus: func,
    /**
     * Regular expression input value must match in order
     * for the value to pass constraint validation.
     * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefpattern
     */
    pattern: instanceOf(RegExp),
    /** Custom class(es) for input wrapper. */
    wrapperClassName: string,
};

Input.defaultProps = {
    automationId: '',
    defaultValue: '',
    disableAutoFeatures: false,
    disabled: false,
    errorText: '',
    helpText: '',
    inputClassName: '',
    onBlur: () => {},
    onChange: () => {},
    onFocus: () => {},
    pattern: null,
    wrapperClassName: '',
};

Input.displayName = 'Input';

export default Input;
