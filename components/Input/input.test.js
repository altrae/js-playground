import React from 'react';
import sinon from 'sinon';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
import Input from './input';

const getWrapper = (propsOverrides = {}, renderType = shallow) => {
    const props = {
        id: 'iUnique',
        inputType: 'text',
        label: 'give me your data',
        name: 'some name',
        ...propsOverrides,
    };

    return renderType(<Input {...props} />);
};

describe('Input component should', () => {
    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('add custom classes if inputClassName or wrapperClassName are set', () => {
        const wrapper = getWrapper({
            inputClassName: 'input custom classes',
            wrapperClassName: 'wrapper custom classes',
        });

        expect(wrapper.find('input').props().className).to.contain('input custom classes');
        expect(wrapper.find('.input-wrapper').props().className).to.contain('wrapper custom classes');
    });

    it('add disabled classes to input and label if input is disabled', () => {
        const wrapper = getWrapper({
            disabled: true,
        }, mount);

        expect(wrapper.find('input').props().className).to.contain('bg-gray-100 border-1 border-dashed border-gray-300');
        expect(wrapper.find('label').props().className).to.contain('bg-gray-100 text-gray-400');
    });

    it('add a class to account for label position if input has a value', () => {
        const wrapper = getWrapper({
            defaultValue: 'some value',
        }, mount);

        expect(wrapper.find('label').props().className).to.contain('label-to-top');
    });

    it('set autoCapitalize, autoComplete, autoCorrect, and spellcheck to "off" if disableAutoFeatures is "true"', () => {
        const wrapper = getWrapper({ disableAutoFeatures: true });
        const input = wrapper.find('input');

        expect(input.props().autoCapitalize).to.equal('off');
        expect(input.props().autoComplete).to.equal('off');
        expect(input.props().autoCorrect).to.equal('off');
        expect(input.props().spellCheck).to.be.equal('false');
    });

    it('add data-automation-id to input if automationId is set', () => {
        const wrapper = getWrapper({ automationId: 'some-automation-id' });

        expect(wrapper.props()['data-automation-id'])
            .to.equal('some-automation-id');
    });

    describe('handle event', () => {
        it('"blur" by displaying error text if input entered does not match pattern and errorText is set', () => {
            const wrapper = getWrapper({
                errorText: 'you done messed up',
                pattern: /notit/i,
            }, mount);

            wrapper.find('input').simulate('blur', { target: { value: 'abc' } });

            expect(wrapper.find('div.text-error').props().children).to.equal('you done messed up');
            expect(wrapper.find('input').props()['aria-invalid']).to.be.true;
        });

        it('"blur" by marking input as invalid if input entered does not match pattern', () => {
            const wrapper = getWrapper({
                errorText: 'does not match',
                pattern: /notit/i,
            }, mount);

            wrapper.find('input').simulate('blur', { target: { value: 'abc' } });

            expect(wrapper.find('input').props().className).to.contain('border-error');
            expect(wrapper.find('label').props().className).to.contain('text-error');
        });

        it('"blur" by not marking input as invalid if input entered matches pattern', () => {
            const wrapper = getWrapper({
                errorText: 'does not match',
                pattern: /abc/i,
            }, mount);
            const input = wrapper.find('input');

            input.simulate('blur', { target: { value: 'abc' } });

            expect(input.props().className).to.contain('border-gray-300');
        });

        it('"blur" by resetting label position if no value', () => {
            const wrapper = getWrapper(undefined, mount);

            wrapper.find('input').simulate('blur', { target: { value: 'abc' } });

            expect(wrapper.find('label').props().className).to.not.contain('label-to-top');
        });

        it('"change" by updating input value when triggered', () => {
            const wrapper = getWrapper(undefined, mount);

            wrapper.find('input').simulate('change', { target: { value: 'a' } });
            expect(wrapper.find('input').props().value).to.equal('a');
            wrapper.find('input').simulate('change', { target: { value: 'ab' } });
            expect(wrapper.find('input').props().value).to.equal('ab');
            wrapper.find('input').simulate('change', { target: { value: 'abc' } });
            expect(wrapper.find('input').props().value).to.equal('abc');
        });

        it('"focus" by updating label position with label-to-top class', () => {
            const wrapper = getWrapper(undefined, mount);

            expect(wrapper.find('label').props().className).to.not.contain('label-to-top');
            wrapper.find('input').simulate('focus');
            expect(wrapper.find('label').props().className).to.contain('label-to-top');
        });

        it('"blur", "change", and "focus" by calling appropriate default handler', () => {
            const onBlurSpy = sandbox.spy(Input.defaultProps, 'onBlur');
            const onChangeSpy = sandbox.spy(Input.defaultProps, 'onChange');
            const onFocusSpy = sandbox.spy(Input.defaultProps, 'onFocus');

            const wrapper = getWrapper(undefined, mount);
            const input = wrapper.find('input');

            expect(onBlurSpy.called).to.be.false;
            expect(onChangeSpy.called).to.be.false;
            expect(onFocusSpy.called).to.be.false;

            input.simulate('blur');
            input.simulate('change');
            input.simulate('focus');

            expect(onBlurSpy.called).to.be.true;
            expect(onChangeSpy.called).to.be.true;
            expect(onFocusSpy.called).to.be.true;
        });
    });

    describe('validate custom prop types by throwing an error if ', () => {
        it('pattern is set but errorText is not set', () => {
            const stub = sandbox.stub(console, 'error');
            getWrapper({ pattern: /.*/ });

            expect(stub.calledOnce).to.equal(true);
            expect(stub.firstCall.calledWithExactly(
                'Warning: Failed prop type: Input some name\'s '
                + 'prop errorText is required and must be of '
                + 'type \'string\' or a valid React element '
                + 'when pattern is set.\n    in Input',
            )).to.be.true;
        });
    });
});

describe('HelperText component should', () => {
    it('display error text if errorText is set and pattern validation fails', () => {
        const wrapper = getWrapper({
            errorText: 'not in my house!',
            pattern: /^(?=[0-9]{10})(?=(?!([0-9])\1{9})).*$/g,
        }, mount);
        const input = wrapper.find('input');

        input.simulate('blur', { target: { value: 'I Am AwEsOmE!!!' } });

        expect(wrapper.find('div.text-error:not(.input-wrapper)').props().children).to.equal('not in my house!');
    });
    it('display help text if helpText is set', () => {
        const wrapper = getWrapper({ helpText: 'just do it' }, mount);

        expect(wrapper.find('div:not(.text-error):not(.input-wrapper)').props().children).to.equal('just do it');
    });
});

describe('ShowPassword component should', () => {
    it('update input type and button text when "show" button is clicked', () => {
        const wrapper = getWrapper({ inputType: 'password' }, mount);

        expect(wrapper.find('input').props().type).to.equal('password');
        expect(wrapper.find('button').props().children).to.equal('show');
        wrapper.find('button').simulate('click');
        expect(wrapper.find('button').props().children).to.equal('hide');
        expect(wrapper.find('input').props().type).to.equal('text');
        wrapper.find('button').simulate('click');
        expect(wrapper.find('input').props().type).to.equal('password');
        expect(wrapper.find('button').props().children).to.equal('show');
    });
});
