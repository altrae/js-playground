import React from 'react';
import sinon from 'sinon';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';
import Image from './index';

describe('Image component should', () => {
    const getWrapper = ((propsOverrides = {}, renderType = shallow) => {
        const props = {
            alt: 'rewards banner',
            src: '//m.jcpenney.com/mobile/images/pg00001_m550007_47100016.gif',
            ...propsOverrides,
        };

        return renderType(<Image {...props} />);
    });

    let sandbox;

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox = sandbox.restore();
    });

    it('render Image only when href and route not provided', () => {
        const wrapper = getWrapper();

        expect(wrapper.find('a').exists()).to.be.false;
        expect(wrapper.find('Link').exists()).to.be.false;
        expect(wrapper.find('img').exists()).to.be.true;
    });

    it('render with Link when route is set', () => {
        const wrapper = getWrapper({ route: '/home-page' });

        expect(wrapper.find('Link').exists()).to.be.true;
    });

    it('render with anchor tag when href is set', () => {
        const wrapper = getWrapper({ href: '//example.com' });

        expect(wrapper.find('a').exists()).to.be.true;
    });

    it('not append analyticsTag when "cm_re" is present', () => {
        const wrapper = getWrapper({ analyticsTag: 'test=testtest', href: '//example.com/d/?cm_re=123abc' });

        expect(wrapper.find('a').props().href).to.equal('//example.com/d/?cm_re=123abc');
    });

    it('append analyticsTag correctly when "cm_re" not present and href includes "?"', () => {
        const wrapper = getWrapper({ analyticsTag: 'test=testtest', href: '//example.com/d/?param=one' });

        expect(wrapper.find('a').props().href).to.equal('//example.com/d/?param=one&test=testtest');
    });

    it('append analyticsTag correctly when "cm_re" not present and href excludes "?"', () => {
        const wrapper = getWrapper({ analyticsTag: 'test=testtest', href: '//example.com/d/' });

        expect(wrapper.find('a').props().href).to.equal('//example.com/d/?test=testtest');
    });

    it('add data-automation-id if automationId is set', () => {
        const wrapper = getWrapper({ automationId: 'some-id' });

        expect(wrapper.props()['data-automation-id']).to.equal('some-id');
    });

    it('not add data-automation-id if automationId is not set', () => {
        const wrapper = getWrapper();

        expect(wrapper.props()['data-automation-id']).to.equal(null);
    });

    it('set the correct padding-bottom if height and width are set', () => {
        const wrapper = getWrapper({ height: 200, width: 320 });

        expect(wrapper.find('div.h-0').props().style.paddingBottom).to.equal('62.5%');
    });

    it('add loader class if loader is true and image is loading', () => {
        const wrapper = getWrapper({ loader: true }, mount);

        expect(wrapper.find('div.loading').props().className).to.contain('loading');
    });

    it(`render custom placeholder on error event if imgRatio is not set,
        and placeholder is set either to true or a custom src`,
        () => {
            const wrapper = getWrapper({ placeholder: 'abc' }, mount);

            wrapper.find('img').simulate('error');
            expect(wrapper.find('div.not-sr-only')).to.exist;
        },
    );

    it('call onError if "error" event is triggered', () => {
        const onErrorSpy = sandbox.spy(Image.defaultProps, 'onError');
        const wrapper = getWrapper(undefined, mount);

        expect(onErrorSpy.called).to.be.false;
        expect(wrapper.exists('Icon')).to.be.false;

        wrapper.find('img').simulate('error');

        expect(onErrorSpy.called).to.be.true;
        expect(wrapper.exists('Icon')).to.be.true;
    });

    it('call onLoad if "load" event is triggered', () => {
        const onLoadSpy = sandbox.spy(Image.defaultProps, 'onLoad');
        const wrapper = getWrapper(undefined, mount);

        expect(onLoadSpy.called).to.be.false;
        wrapper.find('img').simulate('load');
        expect(onLoadSpy.called).to.be.true;
    });
});
