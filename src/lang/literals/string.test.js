import {fink2js} from '../../testing';


describe('string', ()=> {

  it('compiles simple', ()=> {
    expect(
      fink2js(`
        str = 'ab'
      `)
    ).toMatchSnapshot();
  });


  it('compiles multiline', ()=> {
    expect(
      fink2js(`
        str = '
          line 1
          line 2 with leading space
          line 3'
      `)
    ).toMatchSnapshot();
  });


  it('compiles escape chars', ()=> {
    expect(
      fink2js(`
        ${"str1 = 'foo`bar\\nspam`ni'"}
        ${'str2 = `foo\\`bar`'}
        ${'str3 = "foo\\\\"'}
      `)
    ).toMatchSnapshot();
  });


  it('compiles tagged template string', ()=> {
    expect(
      fink2js(`
        str = foo'bar \${spam ni shrub} na'
      `)
    ).toMatchSnapshot();
  });


  it('compiles multiline with expressions', ()=> {
    expect(
      fink2js(`
        str = '
          bar
          spam \${shrub + ni}\${foo}
          ni
        '
      `)
    ).toMatchSnapshot();
  });
});
