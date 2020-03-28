
export const get_comment = ({comment})=> {

  if (comment) {
    const {value, loc} = comment;
    return {leadingComments: [{type: 'CommentBlock', value, loc}]};
  }

  return {};
};
