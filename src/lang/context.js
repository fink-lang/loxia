export const any = false;


export const add = (type, op, transformer)=> ({transformers, ...ctx})=> {
  const next_transformers = {
    ...transformers,
    [type || op]: transformer
  };
  return {transformers: next_transformers, ...ctx};
};


// eslint-disable-next-line prefer-reflect
const obj_has = (obj, key)=> Object.prototype.hasOwnProperty.call(obj, key);


export const get_transformer = (op, type, {transformers})=> {
  if (obj_has(transformers, op)) {
    return transformers[op];
  }

  if (obj_has(transformers, type)) {
    return transformers[type];
  }
};
