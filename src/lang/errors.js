import {highlight_code_loc} from '@fink/snippet';


class TransformError extends Error {
  constructor(err, node, {code, filename}) {
    const {start: {line, column}} = node.loc;
    const type_op = (
      node.op
        ? `${node.type} ${node.op}`
        : node.type
    );

    super(
      `${filename}:${line}:${column}: Unable to transform '${type_op}':\n\n${
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
