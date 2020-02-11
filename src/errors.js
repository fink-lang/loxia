import {highlight_code_loc} from '@fink/snippet';


class TransformError extends Error {
  constructor(err, node, code) {
    super(
      `Transform Error '${node.type} ${node.op}':\n\n${
        highlight_code_loc(code, node.loc)
      }\n\n${err.stack}`
    );
  }
}


export const code_frame_err = (err, node, code)=> {
  if (err instanceof TransformError) {
    return err;
  }
  return new TransformError(err, node, code);
};
