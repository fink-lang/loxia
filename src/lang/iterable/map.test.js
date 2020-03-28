import {fink2js} from '../../testing';


describe('map', ()=> {
  it('compiles single line', ()=> {
    expect(
      fink2js(`
        map item: item * 2
      `)
    ).toMatchSnapshot();
  });


  it('compiles multi line', ()=> {
    expect(
      fink2js(`
        map item:
          item * 2
      `)
    ).toMatchSnapshot();
  });


  it('compiles single line with default value', ()=> {
    expect(
      fink2js(`
        map item=123: item * 2
      `)
    ).toMatchSnapshot();
  });


  it('compiles single line with destructured obj', ()=> {
    expect(
      fink2js(`
        map {item}: item * 2
      `)
    ).toMatchSnapshot();
  });


  it('compiles single line with destructured array', ()=> {
    expect(
      fink2js(`
        map [x, y]: x + y
      `)
    ).toMatchSnapshot();
  });


  it('compiles as flat map', ()=> {
    expect(
      fink2js(`
        map [x, y]:
          ...[x, y]
      `)
    ).toMatchSnapshot();
  });
});


describe('flat_map', ()=> {

  it('compiles', ()=> {
    expect(
      fink2js(`
        flat_map item: [spam + item]

        flat_map item: [spam]
      `)
    ).toMatchSnapshot();
  });

});


