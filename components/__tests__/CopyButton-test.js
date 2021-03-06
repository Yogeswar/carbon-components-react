import React from 'react';
import CopyButton from '../CopyButton';
import Icon from '../Icon';
import { shallow, mount } from 'enzyme';

jest.useFakeTimers();

describe('CopyButton', () => {
  describe('Renders common props as expected', () => {
    const wrapper = shallow(
      <CopyButton tabIndex={2} className="extra-class"><div className="test" /></CopyButton>
    );

    it('Renders children as expected', () => {
      expect(wrapper.find('.test').length).toBe(1);
    });

    it('Should set tabIndex if one is passed via props', () => {
      expect(wrapper.props().tabIndex).toEqual(2);
    });

    it('Should add extra classes via className', () => {
      expect(wrapper.hasClass('extra-class')).toBe(true);
    });
  });

  describe('Renders button props as expected', () => {
    const wrapper = shallow(<CopyButton>Copy</CopyButton>);

    it('Renders children as expected', () => {
      expect(wrapper.is('button')).toBe(true);
      expect(wrapper.hasClass('bx--btn--copy')).toBe(true);
      expect(wrapper.find('.bx--btn--copy__feedback').length).toBe(1);
      expect(wrapper.find(Icon).length).toBe(1);
      expect(wrapper.find(Icon).props().name).toBe('copy--glyph');
    });

    it('Should have default props', () => {
      expect(wrapper.props().disabled).toBe(false);
    });

    it('Should be able to disable the button', () => {
      wrapper.setProps({ disabled: true });
      expect(wrapper.props().disabled).toBe(true);
      wrapper.setProps({ disabled: false });
    });

    it('Should have a default feedback timeout', () => {
      const timeoutWrapper = mount(<CopyButton>Copy</CopyButton>);
      expect(timeoutWrapper.props().feedbackTimeout).toBe(2000);
    });

    it('Should be able to set the timeout for displaying feedback', () => {
      const timeoutWrapper = mount(<CopyButton feedbackTimeout={5000}>Copy</CopyButton>);
      expect(timeoutWrapper.props().feedbackTimeout).toBe(5000);
    });

    it('Should be able to specify the feedback message', () => {
      const feedbackWrapper = mount(<CopyButton feedback="Copied!">Copy</CopyButton>);
      expect(feedbackWrapper.find('.bx--btn--copy__feedback').props()['data-feedback']).toBe(
        'Copied!'
      );
    });
  });

  describe('Renders feedback as expected', () => {
    it('Should make the feedback visible', () => {
      const feedbackWrapper = mount(<CopyButton feedback="Copied!">Copy</CopyButton>);
      const feedback = feedbackWrapper.find('.bx--btn--copy__feedback');
      expect(feedback.hasClass('bx--btn--copy__feedback--displayed')).toBe(false);
      feedbackWrapper.setState({ showFeedback: true });
      expect(feedback.hasClass('bx--btn--copy__feedback--displayed')).toBe(true);
    });

    it('Should show feedback for a limited amount of time', () => {
      const feedbackWrapper = mount(
        <CopyButton feedback="Copied!" feedbackTimeout={5000}>Copy</CopyButton>
      );
      expect(feedbackWrapper.state().showFeedback).toBe(false);
      feedbackWrapper.simulate('click');
      expect(feedbackWrapper.state().showFeedback).toBe(true);
      expect(setTimeout.mock.calls.length).toBe(1);
      expect(setTimeout.mock.calls[0][1]).toBe(5000);
      jest.runAllTimers();
      expect(feedbackWrapper.state().showFeedback).toBe(false);
    });
  });

  describe('Triggers appropriate events', () => {
    it('should call the click handler', () => {
      const onClick = jest.fn();
      const clickWrapper = mount(<CopyButton onClick={onClick}>Copy</CopyButton>);
      clickWrapper.simulate('click');
      expect(onClick).toBeCalled();
    });
  });
});
