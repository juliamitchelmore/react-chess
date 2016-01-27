/*eslint-env node, mocha */
/*global expect */
/*eslint no-console: 0*/
'use strict';

import createComponent from 'helpers/shallowRenderHelper';

import Square from 'components/Square';

describe('SquareComponent', () => {
  let SquareComponent;

  beforeEach(() => {
    SquareComponent = createComponent(Square);
  });

  it('should have a className', () => {
    expect(SquareComponent.props.className).to.equal('chess__square');
  });

  it('should have a black background', () => {
    let BlackSquare = createComponent(Square, {blackBg: true});
    expect(BlackSquare.props.style.backgroundColor).to.equal('black');
  });

  it('should have a white background', () => {
    let WhiteSquare = createComponent(Square, {blackBg: false});
    expect(WhiteSquare.props.style.backgroundColor).to.equal('white');
  });

  it('can be highlighted yellow', () => {
    let YellowSquare = createComponent(Square, {highlight: true});
    expect(YellowSquare.props.style.backgroundColor).to.equal('yellow');
  });

  it('can be highlighted blue', () => {
    let BlueSquare = createComponent(Square, {current: true});
    expect(BlueSquare.props.style.backgroundColor).to.equal('blue');
  });
});
