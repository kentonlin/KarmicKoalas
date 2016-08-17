import 'react-native';
import React from 'react';
import Splash from '../app/components/Splash';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Splash', () => {
  it('renders correctly', () => {
    const tree = renderer.create(
      <Splash />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
