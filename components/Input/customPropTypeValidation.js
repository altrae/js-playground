import { isValidElement } from 'react';

export const validateErrorTextPropType = (
    { errorText, name, pattern },
    propName,
    componentName = 'Input',
) => {
    let isValid = null;
    const isValidPropType =
        (typeof errorText === 'string' && errorText.length) || isValidElement(errorText);

    if (pattern && !isValidPropType) {
        isValid = new Error(
            `${componentName} ${name}'s prop ${propName} is required
            and must be of type 'string' or a valid React element
            when pattern is set.`.replace(/[\s]{2,}/mg, ' '),
        );
    }

    return isValid;
};

export default validateErrorTextPropType;
