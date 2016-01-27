import ChessActions from 'actions/ChessActions';
import ChessStore from 'stores/ChessStore';

describe('ChessStore', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });
 
  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('sets initial coordinates to (0,0)', () => {
    ChessActions.create();

    var coords = ChessStore.getCoords();
    expect(coords).to.eql({x: 0, y: 0});
  });

  it('sets initial coordinates to cookie value', () => {
    ChessActions.create({x: 4, y: 7});

    var coords = ChessStore.getCoords();
    expect(coords).to.eql({x: 4, y: 7});
  });

  it('updates coordinates to input', () => {
    ChessActions.update(1, 4);

    var coords = ChessStore.getCoords();
    expect(coords).to.eql({x: 1, y: 4});
  });

  it('calculates correct drop locations for (0, 0)', () => {
    ChessActions.calculateDrop(0, 0);
    var options = ChessStore.getOptions();

    expect(options[0]).to.eql({x: 2, y: 1});
    expect(options[1]).to.eql({x: 1, y: 2});
  });

  it('calculates correct drop locations for (4, 4)', () => {
    ChessActions.calculateDrop(4, 4);
    var options = ChessStore.getOptions();

    expect(options[0]).to.eql({x: 6, y: 5});
    expect(options[1]).to.eql({x: 6, y: 3});
    expect(options[2]).to.eql({x: 2, y: 5});
    expect(options[3]).to.eql({x: 2, y: 3});
    expect(options[4]).to.eql({x: 5, y: 6});
    expect(options[5]).to.eql({x: 5, y: 2});
    expect(options[6]).to.eql({x: 3, y: 6});
    expect(options[7]).to.eql({x: 3, y: 2});
  });

  it('clears drop options', () => {
    ChessActions.clearHighlight();
    var options = ChessStore.getOptions();

    expect(options).to.eql([]);
  });

});