/**
 * @fileoverview Resolver's
 */
import { Comments } from "../models/comments.js";

const Query = {
  comments(parent, args, contextValue, info) {
    console.log(args);
    if (!args.query) {
      return Comments;
    }
    return Comments.filter(comment => comment.id === args.query);
  }
};

export default Query;
