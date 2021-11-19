import { useTranslation } from 'next-i18next'
import {
  signIn as nextAuthSignIn,
  signOut as nextAuthSignOut,
  useSession
} from 'next-auth/client'

import Button, { ButtonProps } from '@mui/material/Button'
import { styled } from '@mui/material/styles'

import type { FC } from 'react'

const CustomizedButton = styled(({ className, ...props }: ButtonProps) => (
  <Button {...props} variant="outlined" color="primary" classes={{ root: className }} />
))(
  ({ theme }) => `
  &.MuiButton-root {
    border: 1px solid ${theme.palette.primary.main};
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 10px;
    color: ${
      theme.palette.mode === 'dark'
        ? theme.palette.primary.contrastText
        : theme.palette.primary.main
    };
  }
  &.MuiButton-root:hover {
    background-color: ${theme.palette.bgHoverDim};
  }
`
)

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
    return <CustomizedButton onClick={signOut}>{t('SIGN_OUT')}</CustomizedButton>
  }

  return <CustomizedButton onClick={signInWithGoogle}>{t('SIGN_IN')}</CustomizedButton>
}

export default AuthStatusButton
