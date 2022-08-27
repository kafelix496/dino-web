import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut
} from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import Button from '@mui/material/Button'

import { useCurrentUser } from '@/hooks/useHttpApp'

import headerButtonMixin from '../headerButtonMixin'

const AuthStatusButton: FC = () => {
  const { t } = useTranslation('common')
  const { user } = useCurrentUser()

  const signInWithGoogle = () => {
    nextAuthSignIn('google')
  }

  const signOut = () => {
    nextAuthSignOut({ callbackUrl: '/' })
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
