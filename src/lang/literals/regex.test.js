import {fink2js} from '../../testing';


describe('regex', ()=> {
  it('compiles single line', ()=> {
    expect(
      fink2js(`
        regex = rx/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/
      `)
    ).toMatchSnapshot();
  });


  it('compiles multiline', ()=> {
    expect(
      fink2js(`
        regex = rx/
          (?<year>\\d{4})-    # year part of a date
          (?<month>\\d{2})-   # month part of a date
          (?<day>\\d{2})      # day part of a date
        /gm
      `)
    ).toMatchSnapshot();
  });


  it('compiles escape char', ()=> {
    expect(
      fink2js(`
        regex = rx/.+\\/.+\\\\/
      `)
    ).toMatchSnapshot();
  });
});
