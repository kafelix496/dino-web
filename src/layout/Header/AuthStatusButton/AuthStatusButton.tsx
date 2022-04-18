import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut
} from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'
import { useSelector } from 'react-redux'

import Button from '@mui/material/Button'

import { selectUser } from '@/redux-selectors'

import headerButtonMixin from '../headerButtonMixin'

const AuthStatusButton: FC = () => {
  const { t } = useTranslation('common')
  const user = useSelector(selectUser)

  const signInWithGoogle = () => {
    nextAuthSignIn('google')
  }

  const signOut = () => {
    nextAuthSignOut()
  }

  if (user) {
    return (
      <Button sx={{ color: headerButtonMixin }} onClick={signOut}>
        {t('SIGN_OUT')}
      </Button>
    )
  }

  return (
    <Button sx={{ color: headerButtonMixin }} onClick={signInWithGoogle}>
      {t('SIGN_IN')}
    </Button>
  )
}

export default AuthStatusButton
