import { useTranslation } from 'next-i18next'
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  useSession
} from 'next-auth/client'

import Button from '@mui/material/Button'

import type { FC } from 'react'

const AuthStatusButton: FC = () => {
  const { t } = useTranslation('common')
  const [session] = useSession()

  const signInWithGoogle = () => {
    nextAuthSignIn('google')
  }

  const signOut = () => {
    nextAuthSignOut()
  }

  if (session) {
    return <Button onClick={signOut}>{t('SIGN_OUT')}</Button>
  }

  return <Button onClick={signInWithGoogle}>{t('SIGN_IN')}</Button>
}

export default AuthStatusButton
