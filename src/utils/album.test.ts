import { Reactions } from '@/constants/album'
import { CollectionsName } from '@/constants/collection'
import { byReactionStatus, transformReactionsForClient } from '@/utils/album'

describe('#byReactionStatus', () => {
  it('should group by reaction status', () => {
    expect(
      byReactionStatus([
        {
          _id: '11',
          parent: CollectionsName.ALBUM_ASSET,
          parentId: '11-parent',
          user: '11-user',
          status: Reactions.LIKE
        },
        {
          _id: '22',
          parent: CollectionsName.ALBUM_ASSET,
          parentId: '22-parent',
          user: '22-user',
          status: Reactions.LIKE
        },
        {
          _id: '33',
          parent: CollectionsName.ALBUM_ASSET,
          parentId: '33-parent',
          user: '33-user',
          status: Reactions.HAHA
        }
      ])
    ).toEqual({
      LIKE: [
        {
          _id: '11',
          parent: CollectionsName.ALBUM_ASSET,
          parentId: '11-parent',
          user: '11-user',
          status: Reactions.LIKE
        },
        {
          _id: '22',
          parent: CollectionsName.ALBUM_ASSET,
          parentId: '22-parent',
          user: '22-user',
          status: Reactions.LIKE
        }
      ],
      HAHA: [
        {
          _id: '33',
          parent: CollectionsName.ALBUM_ASSET,
          parentId: '33-parent',
          user: '33-user',
          status: Reactions.HAHA
        }
      ]
    })
  })
})

describe('#transformReactionsForClient', () => {
  it('should transform reaction response for client', () => {
    expect(
      transformReactionsForClient('33-user', [
        {
          _id: '11',
          parent: CollectionsName.ALBUM_ASSET,
          parentId: '11-parent',
          user: '11-user',
          status: Reactions.LIKE
        },
        {
          _id: '22',
          parent: CollectionsName.ALBUM_ASSET,
          parentId: '22-parent',
          user: '22-user',
          status: Reactions.LIKE
        },
        {
          _id: '33',
          parent: CollectionsName.ALBUM_ASSET,
          parentId: '33-parent',
          user: '33-user',
          status: Reactions.HAHA
        }
      ])
    ).toEqual({
      _id: '33',
      status: Reactions.HAHA,
      items: [
        { type: Reactions.LIKE, total: 2 },
        { type: Reactions.LOVE, total: 0 },
        { type: Reactions.HAHA, total: 1 },
        { type: Reactions.WOW, total: 0 },
        { type: Reactions.SAD, total: 0 },
        { type: Reactions.ANGRY, total: 0 }
      ]
    })
  })

  it("should return status: null if there's no matching user", () => {
    expect(
      transformReactionsForClient('44-user', [
        {
          _id: '11',
          parent: CollectionsName.ALBUM_ASSET,
          parentId: '11-parent',
          user: '11-user',
          status: Reactions.LIKE
        },
        {
          _id: '22',
          parent: CollectionsName.ALBUM_ASSET,
          parentId: '22-parent',
          user: '22-user',
          status: Reactions.LIKE
        },
        {
          _id: '33',
          parent: CollectionsName.ALBUM_ASSET,
          parentId: '33-parent',
          user: '33-user',
          status: Reactions.HAHA
        }
      ])
    ).toEqual({
      _id: null,
      status: null,
      items: [
        { type: Reactions.LIKE, total: 2 },
        { type: Reactions.LOVE, total: 0 },
        { type: Reactions.HAHA, total: 1 },
        { type: Reactions.WOW, total: 0 },
        { type: Reactions.SAD, total: 0 },
        { type: Reactions.ANGRY, total: 0 }
      ]
    })
  })
})
