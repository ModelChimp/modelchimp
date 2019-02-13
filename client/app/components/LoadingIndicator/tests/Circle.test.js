import React from 'react';
import { mount } from 'enzyme';

import Circle from '../Circle';

describe('<Circle />', () => {
  it('should render an <div> tag', () => {
    const renderedComponent = mount(<Circle />);
    expect(renderedComponent.find('div')).toHaveLength(1);
  });

  it('should have a className attribute', () => {
    const renderedComponent = mount(<Circle />);
    expect(renderedComponent.find('div').prop('className')).toBeDefined();
  });

  it('should not adopt attributes', () => {
    const id = 'test';
    const renderedComponent = mount(<Circle id={id} />);
    expect(renderedComponent.find('div').prop('id')).toBeUndefined();
  });
});
