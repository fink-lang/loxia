

export const transform_async = (path)=> {
  if (path.isArrowFunctionExpression()) {
    path.node.async = true;
  } else if (path.isFunctionExpression()) {
    path.node.async = true;
  } else if (path.parentPath) {
    transform_async(path.parentPath);
  }
};
