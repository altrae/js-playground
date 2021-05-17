import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Loader from './loader';

describe('<Loader />', () => {
    it('should render the default loader component', () => {
        const wrapper = shallow(<Loader />);

        expect(wrapper.find('div').exists()).to.be.true;
    });

    it('should use a fixed overlay when `overlay` is supplied', () => {
        const wrapper = shallow(<Loader overlay />);

        expect(wrapper.find('.fixed').exists()).to.be.true;
    });

    it('should apply the class when `className` is supplied', () => {
        const wrapper = shallow(<Loader className="testing" />);

        expect(wrapper.find('.testing').exists()).to.be.true;
    });

    it('should apply the id when `automationId` is supplied', () => {
        const wrapper = shallow(<Loader automationId="testing" />);

        expect(wrapper.find('[data-automation-id="testing"]').exists()).to.be.true;
    });
});
