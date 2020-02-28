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
