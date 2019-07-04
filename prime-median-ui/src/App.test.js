import React from 'react';
import App from './App';
import { shallow } from 'enzyme';
import * as api from './api';

jest.mock('./api', () => ({
  // Mock the API using synchronized call
  getMedianPrime: () => ({ then: f => f({ result: [12, 13]}) }),
}));

it('renders without crashing', () => {
  shallow(<App />);
});

it('shows input test', () => {
  const wrapper = shallow(<App />);
  wrapper.find('input').simulate('change', { target: { value: '278'}});
  expect(wrapper.find('input').props().value).toEqual('278');
});

it('renders API output', () => {
  const wrapper = shallow(<App />);
  wrapper.find('input').simulate('change', { target: { value: '278'}});
  expect(wrapper.find('span').text()).toEqual('12, 13');
});