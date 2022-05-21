import { groupBy } from 'ramda'

import { Reactions } from '@/constants/album'
import { CollectionsName } from '@/constants/collection'
import type { Reaction, ReactionResponse } from '@/types/album'

export const getDefaultReaction = () =>
  Object.values(Reactions).map((reactionType) => ({
    type: reactionType,
    total: 0
  }))

export const byReactionStatus = groupBy<ReactionResponse>((reaction) => {
  switch (reaction.status) {
    case Reactions.LIKE: {
      return Reactions.LIKE
    }

    case Reactions.LOVE: {
      return Reactions.LOVE
    }

    case Reactions.HAHA: {
      return Reactions.HAHA
    }

    case Reactions.WOW: {
      return Reactions.WOW
    }

    case Reactions.SAD: {
      return Reactions.SAD
    }

    case Reactions.ANGRY: {
      return Reactions.ANGRY
    }

    default:
      return ''
  }
})

export const transformReactionsForClient = (
  userId: string,
  reactions: ReactionResponse[]
): Reaction => {
  const reactionsByStatus = byReactionStatus(reactions)
  const selfReaction = reactions.find(
    (reaction) => reaction.user.toString() === userId
  )

  return {
    _id: selfReaction?._id ?? null,
    status: selfReaction?.status ?? null,
    items: Object.values(Reactions).map((reactionType) => ({
      type: reactionType,
      total: reactionsByStatus[reactionType]?.length ?? 0
    })) as Reaction['items']
  }
}

export const generateLookupForReactions = (
  parentCollection: CollectionsName
) => ({
  $lookup: {
    from: CollectionsName.ALBUM_REACTION,
    let: { id: '$_id' },
    pipeline: [
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: ['$parent', parentCollection]
              },
              {
                $eq: ['$parentId', '$$id']
              }
            ]
          }
        }
      },
      {
        $limit: 25
      },
      {
        $project: { parent: 0, parentId: 0 }
      }
    ],
    as: 'reaction'
  }
})

export const generateLookupForComments = (
  page: number,
  parentCollection: CollectionsName
) => ({
  $lookup: {
    from: CollectionsName.ALBUM_COMMENT,
    let: { id: '$_id' },
    pipeline: [
      {
        $match: {
          $expr: {
            $and: [
              {
                $eq: ['$parent', parentCollection]
              },
              {
                $eq: ['$parentId', '$$id']
              }
            ]
          }
        }
      },
      {
        $skip: (page - 1) * 25
      },
      {
        $limit: 25
      },
      generateLookupForReactions(CollectionsName.ALBUM_COMMENT),
      {
        $project: { parent: 0, parentId: 0 }
      }
    ],
    as: 'comments'
  }
})
