import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import type { Dispatch, FC, SetStateAction } from 'react'

import type { Theme } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'

import type { SetSidebarNavOpen } from '../useSidebarNavState'
import DinoAuthStatusButton from './AuthStatusButton/AuthStatusButton'
import DinoSettingsButton from './SettingsButton/SettingsButton'
import DinoSidebarNavButton from './SidebarNavButton/SidebarNavButton'
import headerButtonMixin from './headerButtonMixin'

interface DinoHeaderProps {
  hasSidebarNav: boolean
  setSidebarNavOpen: SetSidebarNavOpen
  setSettingsOpen: Dispatch<SetStateAction<boolean>>
}

const DinoHeader: FC<DinoHeaderProps> = ({
  hasSidebarNav,
  setSidebarNavOpen,
  setSettingsOpen
}) => {
  const { t } = useTranslation('common')

  return (
    <Box>
      <AppBar
        color="inherit"
        position="fixed"
        sx={{ zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {hasSidebarNav && (
            <DinoSidebarNavButton setSidebarNavOpen={setSidebarNavOpen} />
          )}

          <Link href="/">
            <Button
              disableRipple
              sx={[
                { color: headerButtonMixin },
                { '&:hover': { backgroundColor: 'transparent' } }
              ]}
            >
              {t('APP_NAME')}
            </Button>
          </Link>
          <Box className="__d-grow __d-flex __d-justify-end">
            <DinoAuthStatusButton />

            <Box sx={{ ml: 2 }}>
              <DinoSettingsButton setSettingsOpen={setSettingsOpen} />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default DinoHeader
