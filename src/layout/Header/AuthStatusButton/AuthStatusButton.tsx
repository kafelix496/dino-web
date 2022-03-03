import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  useSession
} from 'next-auth/react'
import { useTranslation } from 'next-i18next'
import type { FC } from 'react'

import Button from '@mui/material/Button'

import headerButtonMixin from '../headerButtonMixin'

const AuthStatusButton: FC = () => {
  const { t } = useTranslation('common')
  const { data: session } = useSession()

  const signInWithGoogle = () => {
    nextAuthSignIn('google')
  }

  const signOut = () => {
    nextAuthSignOut()
  }

  if (session) {
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
