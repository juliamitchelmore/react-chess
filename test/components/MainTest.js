/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import createComponent from 'helpers/shallowRenderHelper';

import Main from 'components/Main';

describe('MainComponent', () => {
  let MainComponent;

  beforeEach(() => {
    MainComponent = createComponent(Main);
  });

  it('should have a className', () => {
    expect(MainComponent.props.className).to.equal('page');
  });
});
