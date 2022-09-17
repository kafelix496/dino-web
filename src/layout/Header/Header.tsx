import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import type { FC } from 'react'
import { useDispatch } from 'react-redux'

import MenuIcon from '@mui/icons-material/Menu'
import SettingsIcon from '@mui/icons-material/Settings'
import type { Theme } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'

import { TooltipIconButton } from '@/components/mui/TooltipIconButton/TooltipIconButton'
import {
  setSettingNavOpenStatus,
  toggleSidebarNavOpenStatus
} from '@/redux-actions'

import AuthStatusButton from './AuthStatusButton/AuthStatusButton'
import headerButtonMixin from './headerButtonMixin'

interface HeaderProps {
  hasSidebarNav: boolean
}

const Header: FC<HeaderProps> = ({ hasSidebarNav }) => {
  const { t } = useTranslation('common')
  const dispatch = useDispatch()

  return (
    <Box>
      <AppBar
        color="inherit"
        position="fixed"
        sx={{ zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {hasSidebarNav && (
            <TooltipIconButton
              title={t('MAIN_MENU')}
              iconButtonProps={{
                sx: { color: headerButtonMixin },
                onClick: () => {
                  dispatch(toggleSidebarNavOpenStatus())
                }
              }}
            >
              <MenuIcon />
            </TooltipIconButton>
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
            <AuthStatusButton />

            <Box sx={{ ml: 2 }}>
              <TooltipIconButton
                title={t('TOGGLE_SETTINGS_DRAWER')}
                iconButtonProps={{
                  sx: { color: headerButtonMixin },
                  onClick: () => {
                    dispatch(setSettingNavOpenStatus(true))
                  }
                }}
              >
                <SettingsIcon />
              </TooltipIconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Header
