import React from 'react';
import { bool, string } from 'prop-types';
import { validateErrorTextPropType } from '../customPropTypeValidation';

validateErrorTextPropType.isRequired = validateErrorTextPropType;

const HelperText = ({
    erroneous,
    errorText,
    helpText,
}) => {
    const helperText = erroneous && errorText
        ? errorText
        : helpText;

    const helperTextColor = erroneous
        ? 'text-danger'
        : 'text-secondary';

    const props = {
        className: `${helperTextColor} text-small`,
    };

    return (
        helperText
        && <div {...props}>
            {helperText}
        </div>
    );
};

HelperText.propTypes = {
    erroneous: bool.isRequired,
    errorText: validateErrorTextPropType.isRequired,
    helpText: string.isRequired,
};

export default HelperText;
