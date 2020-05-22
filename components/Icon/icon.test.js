import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Icon from './icon';

describe('Icon component should', () => {
    const getWrapper = (propsOverrides = {}) => {
        const props = {
            automationId: 'some-id',
            iconName: 'ydt-star',
            ...propsOverrides,
        };

        return shallow(<Icon {...props} />);
    };

    it('render with default height/width viewBox', () => {
        const wrapper = getWrapper();

        expect(wrapper.find('svg').props().height).to.equal('16');
        expect(wrapper.find('svg').props().width).to.equal('16');
    });

    it('render a ydt-star icon with custom dimensions', () => {
        const wrapper = getWrapper({
            height: '32',
            iconName: 'ydt-star',
            viewBox: '0 0 32 32',
            width: '32',
        });

        expect(wrapper.find('use').props().href).to.equal('#ydt-star');
        expect(wrapper.find('svg').props().height).to.equal('32');
        expect(wrapper.find('svg').props().width).to.equal('32');
        expect(wrapper.find('svg').props().viewBox).to.equal('0 0 32 32');
    });

    it('add a custom classes to the icon', () => {
        const wrapper = getWrapper({ className: 'some custom classes' });

        expect(wrapper.props().className).to.contain('inline-block some custom classes');
    });
});
