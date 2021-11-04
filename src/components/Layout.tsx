import axios from 'axios'
import Link from 'next/link'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { signIn, getSession } from 'next-auth/client'

import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'

import type { FC } from 'react'

// TODO: Split this component and write a test code
// TODO: Use i18n
const AuthStatusButton: FC = () => {
  const [sessionStatus, setSessionStatus] = useState<boolean | null>(null)

  const signInWithGoogle = () => {
    signIn('google')
  }

  const signOut = async () => {
    try {
      const data = await axios.get('/api/auth/csrf').then((response) => response.data)
      await axios.post('/api/auth/signout', data)
    } catch (error) {
      console.error('error', error)
    }

    const session = await getSession().catch(() => false)

    setSessionStatus(!!session)
  }

  useEffect(() => {
    getSession().then((session) => {
      setSessionStatus(!!session)
    })
  }, [])

  if (sessionStatus === null) {
    return <></>
  }

  if (sessionStatus) {
    return <Button onClick={signOut}>Sign Out</Button>
  }

  return <Button onClick={signInWithGoogle}>Sign In</Button>
}

// TODO: Add theme toggle button in nav bar
const Layout: FC = ({ children }) => {
  const { t } = useTranslation('common')

  return (
    <>
      <Head>
        <title>{t('TAB_TITLE')}</title>
        <meta name="description" content={t('TAB_DESCRIPTION')} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* TODO: Change it to nav bar */}
      <AuthStatusButton />

      <Paper elevation={0} square={true} sx={{ height: '100vh' }}>
        {children}
      </Paper>
    </>
  )
}

export default Layout
