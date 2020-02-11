import {fink2js} from '../testing';


test('compiles import', ()=> {
  expect(
    fink2js(`
      jsx1 = <a/>
      jsx2 = <b></b>
      jsx3 = <a foo bar="ni" />
      jsx4 = <a foo bar='ni' />
      jsx5 = <a foo bar={1234} />
      jsx6 =
        <a>
          foo {ni}
          <b /> ham
          spam
          <c />
          ni
        </a>
      `)
  ).toMatchSnapshot();
});


