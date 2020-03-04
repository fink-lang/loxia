import {fink2js} from '../../testing';


describe('new', ()=> {
  it('transforms new', ()=> {
    expect(
      fink2js(`
        foo = new Set()
      `)
    ).toMatchSnapshot();
  });
});
