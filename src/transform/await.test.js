import {fink2js} from '../testing';


test('compiles await', ()=> {
  expect(
    fink2js(`
      task1 = fn foo: - await foo

      task2 = fn foo: await (foo + 4)

      task3 = fn foo:
        bar = await foo()
        bar + 123

      a_gen = unfold curr=0:
        if:
          spam: await ni(curr)
          else : curr + 1

      await ni
    `)
  ).toMatchSnapshot();
});


