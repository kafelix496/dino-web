import { AccessLevels } from '@/constants'

export const getMockUser = () => ({
  _id: '62503637c7f67e97a1b74e22',
  name: 'dino test',
  email: 'dino.test4961@gmail.com',
  emailVerified: null,
  image: '',
  accessLevel: {
    fa: AccessLevels.ADMIN,
    mt: AccessLevels.NONE
  },
  createdAt: '2022-04-08T13:18:47.714Z',
  updatedAt: '2022-04-08T13:18:47.714Z'
})

export const getMockUsers = () => [
  {
    _id: '6250363ec7f67e97a1b74e29',
    name: 'dino test',
    email: 'dino.test4962@gmail.com',
    emailVerified: null,
    image: '',
    accessLevel: {
      fa: AccessLevels.EDITOR,
      mt: AccessLevels.NONE
    },
    createdAt: '2022-04-08T13:18:54.016Z',
    updatedAt: '2022-04-08T14:08:28.217Z'
  },
  {
    _id: '62503643c7f67e97a1b74e30',
    name: 'dino test',
    email: 'dino.test4963@gmail.com',
    emailVerified: null,
    image: '',
    accessLevel: {
      fa: AccessLevels.VIEWER,
      mt: AccessLevels.NONE
    },
    createdAt: '2022-04-08T13:18:59.761Z',
    updatedAt: '2022-04-08T15:21:20.838Z'
  }
]
