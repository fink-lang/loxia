export const any = false;


export const add = (type, op, transformer)=> ({transformers, ...ctx})=> {
  const next_transformers = {
    ...transformers,
    [type || op]: transformer
  };
  return {transformers: next_transformers, ...ctx};
};

