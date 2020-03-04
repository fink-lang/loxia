import {fink2js} from '../../testing';


describe('numbers', ()=> {
  it('transforms integers', ()=> {
    expect(
      fink2js(`
        x = 1234578
        y = 0123
      `)
    ).toMatchSnapshot();
  });


  it('transforms floats', ()=> {
    expect(
      fink2js(`
        x = 1.234578
        y = 1.23e45
        z = 1.23e-45
        a = 1.23e+45
      `)
    ).toMatchSnapshot();
  });


  it('transforms hex, octet, binary', ()=> {
    expect(
      fink2js(`
        h = 0x123456789ABCDEF0
        o = 0o12345670
        b = 0b01010
      `)
    ).toMatchSnapshot();
  });
});
