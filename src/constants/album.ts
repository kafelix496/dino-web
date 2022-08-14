export const POST_MAX_WIDTH = 600
export const POST_ROW_HEIGHT = 250
export const POST_MAX_ASSET_WIDTH = 1280

export enum PostAssetTargets {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE',
  DETAIL = 'DETAIL'
}

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
