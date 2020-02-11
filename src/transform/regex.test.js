import {fink2js} from '../testing';


test('compiles regex', ()=> {
  expect(
    fink2js(`
      regex2 = rx/
      (?<year>\\d{4})-    # year part of a date
      (?<month>\\d{2})-   # month part of a date
      (?<day>\\d{2})      # day part of a date
    /gm

    regex3 = rx/(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})/
    `)
  ).toMatchSnapshot();
});
