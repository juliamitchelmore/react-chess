/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import createComponent from 'helpers/shallowRenderHelper';

import Board from 'components/Board';

describe('BoardComponent', () => {
  let BoardComponent;

  beforeEach(() => {
    BoardComponent = createComponent(Board);
  });

  it('should have a className', () => {
    expect(BoardComponent.props.className).to.equal('chess__board');
  });

  it('should render 64 squares', () => {
    expect(BoardComponent.props.children.length).to.equal(64);
  });
});
