import {fink2js} from '../testing';


describe('throw', ()=> {
  it('transforms throw', ()=> {
    expect(
      fink2js(`
        foo = bar || throw err('spam')
      `)
    ).toMatchSnapshot();
  });
});
