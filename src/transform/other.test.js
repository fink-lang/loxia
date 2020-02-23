import {fink2js} from '../testing';


describe('identifiers', ()=> {
  it('escapes reserved JS identifiers', ()=> {
    expect(
      fink2js(`
        {do, if, in, for, let, new, try, var, case, enum, void} = foobar
        {with, break, catch, class, const, super, while, yield, delete} = spam
        {export, import, public, return, static, switch, typeof, default} = ham
        {extends, finally, package, private, continue, debugger, function} = ni
        {arguments, interface, protected, implements, instanceof} = nu
      `)
    ).toMatchSnapshot();
  });


  it('does not escape true, false, null', ()=> {
    expect(
      fink2js(`
        foo = [true, false, null]
      `)
    ).toMatchSnapshot();
  });


  it('escapes identifiers incompatible with JS', ()=> {
    expect(
      fink2js(`
        @ = spam
        ∂ = shrub
      `)
    ).toMatchSnapshot();
  });
});


describe('numbers', ()=> {
  it('transforms integers', ()=> {
    expect(
      fink2js(`
        x = 1234578
        y = 0123
      `)
    ).toMatchSnapshot();
  });

  // TODO: not yet supported by larix
  // it('transforms floats', ()=> {
  //   expect(
  //     fink2js(`
  //       x = 1.234578
  //       y = 1.23e10
  //       z = 1.23e-10
  //     `)
  //   ).toMatchSnapshot();
  // });

  // it('transforms hex, octet, binary', ()=> {
  //   expect(
  //     fink2js(`
  //       h = 0xABCDEF
  //       o = 0o1234567
  //       b = 0b01010
  //     `)
  //   ).toMatchSnapshot();
  // });
});
