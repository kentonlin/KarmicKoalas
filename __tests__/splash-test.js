import 'react-native';
import React from 'react';
import Splash from '../app/components/Splash';

import renderer from 'react-test-renderer';


describe('Splash', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Splash />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
