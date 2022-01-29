import type { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'

import DinoTooltipIconButton from '@/components/mui/TooltipIconButton/TooltipIconButton'
import DinoAuthStatusButton from './AuthStatusButton/AuthStatusButton'
import DinoSettingsButton from './SettingsButton/SettingsButton'

import useDinoHeaderButtonColor from './useHeaderButtonColor'
import { Apps } from '@/global-types'

const DinoHeader: FC = () => {
  const router = useRouter()
  const { t } = useTranslation('common')
  const headerButtonColor = useDinoHeaderButtonColor()

  const hasSidebar =
    Object.values(Apps).find((app) =>
      new RegExp(`^/${app}`).test(router.pathname)
    ) !== undefined

  return (
    <AppBar color="inherit" position="fixed">
      <Toolbar>
        {hasSidebar ? (
          <DinoTooltipIconButton title={t('MAIN_MENU')}>
            <MenuIcon />
          </DinoTooltipIconButton>
        ) : null}

        <Link href="/">
          <Button
            disableRipple
            sx={[
              { color: headerButtonColor },
              { '&:hover': { backgroundColor: 'transparent' } }
            ]}
          >
            {t('APP_NAME')}
          </Button>
        </Link>
        <Box className="__d-grow __d-flex __d-justify-end">
          <DinoAuthStatusButton />

          <Box sx={{ ml: 2 }}>
            <DinoSettingsButton />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default DinoHeader
