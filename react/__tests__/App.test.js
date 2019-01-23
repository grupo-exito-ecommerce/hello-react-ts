/* eslint-env jest */
import React from 'react';
import { render } from 'react-testing-library';

import App from '../App';

describe('Carousel component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = render(<App />);
  });

  it('should be rendered', () => {
    expect(wrapper).toBeDefined();
  });

  it('should match snapshot', () => {
    expect(wrapper.container).toMatchSnapshot();
  });
});
