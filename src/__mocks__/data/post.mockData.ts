import { PostAudiences, Reactions } from '@/constants/album'

export const getMockAssets = () => [
  {
    _id: '62e1d3e9e54d94213ef3720e',
    key: 'a93f5cf0-0e09-11ed-9f93-8f1a6ce6cf87',
    extension: 'png',
    createdAt: '2022-07-28T00:10:17.946Z',
    updatedAt: '2022-07-28T00:10:17.946Z'
  },
  {
    _id: '62e1d3e9e54d94213ef3720f',
    key: 'a93f8400-0e09-11ed-9f93-8f1a6ce6cf87',
    extension: 'png',
    createdAt: '2022-07-28T00:10:17.946Z',
    updatedAt: '2022-07-28T00:10:17.946Z'
  },
  {
    _id: '62e1d3e9e54d94213ef37210',
    key: 'a93fab10-0e09-11ed-9f93-8f1a6ce6cf87',
    extension: 'png',
    createdAt: '2022-07-28T00:10:17.946Z',
    updatedAt: '2022-07-28T00:10:17.946Z'
  },
  {
    _id: '62e1d3e9e54d94213ef37211',
    key: 'a93fd220-0e09-11ed-9f93-8f1a6ce6cf87',
    extension: 'jpeg',
    createdAt: '2022-07-28T00:10:17.946Z',
    updatedAt: '2022-07-28T00:10:17.946Z'
  },
  {
    _id: '62e1d3e9e54d94213ef37212',
    key: 'a93ff930-0e09-11ed-9f93-8f1a6ce6cf87',
    extension: 'png',
    createdAt: '2022-07-28T00:10:17.946Z',
    updatedAt: '2022-07-28T00:10:17.946Z'
  }
]

export const getMockPost = () => ({
  _id: '62e1d3e9e54d94213ef37218',
  categories: [
    { _id: '62db3f36b39b032a1b5b1f69', name: 'mock category 1' },
    { _id: '62db3f36b39b032a1b5b1f70', name: 'mock category 2' }
  ],
  assets: getMockAssets(),
  audience: PostAudiences.ALL,
  title: 'mock post title',
  description: 'mock post description',
  createdAt: '2022-07-28T00:10:17.950Z',
  updatedAt: '2022-07-28T00:10:17.950Z',
  comments: [],
  reaction: {
    _id: null,
    status: null,
    items: [
      { type: Reactions.LIKE, total: 0 },
      { type: Reactions.LOVE, total: 0 },
      { type: Reactions.HAHA, total: 0 },
      { type: Reactions.WOW, total: 0 },
      { type: Reactions.SAD, total: 0 },
      { type: Reactions.ANGRY, total: 0 }
    ]
  }
})
