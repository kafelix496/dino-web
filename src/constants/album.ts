export const POST_WIDTH = 500

export enum Reactions {
  LIKE = 'LIKE',
  LOVE = 'LOVE',
  HAHA = 'HAHA',
  WOW = 'WOW',
  SAD = 'SAD',
  ANGRY = 'ANGRY'
}

export enum CommentParents {
  POST = 'POST',
  ASSET = 'ASSET'
}

export enum ReactionParents {
  POST = 'POST',
  ASSET = 'ASSET',
  COMMENT = 'COMMENT'
}

export enum PostAudiences {
  VIEWER = 'VIEWER',
  ALL = 'ALL'
}
