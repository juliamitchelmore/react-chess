/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import createComponent from 'helpers/shallowRenderHelper';

import Knight from 'components/Knight';

describe('KnightComponent', () => {
  let KnightComponent;

  beforeEach(() => {
    KnightComponent = createComponent(Knight);
  });

  it('should have a className', () => {
    expect(KnightComponent.props.className).to.equal('chess__knight');
  });

  it('should take a new location', () => {
    let MoveKnight = createComponent(Knight, {left: 500, top: 300});
    expect(MoveKnight.props.style.left).to.equal(500);
    expect(MoveKnight.props.style.top).to.equal(300);
  });

});
