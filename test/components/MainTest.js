/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import React from 'react';
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

  it('should render a board and knight', () => {
    expect(MainComponent.props.children[0].ref).to.equal('board');
    expect(MainComponent.props.children[1].ref).to.equal('knight');
  });
});
