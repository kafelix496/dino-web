import type { Dispatch, FC, SetStateAction } from 'react'
import { useTranslation } from 'next-i18next'

import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import CloseIcon from '@mui/icons-material/Close'
import type { CSSObject, Theme } from '@mui/material'

import DinoTooltipIconButton from '@/components/mui/TooltipIconButton/TooltipIconButton'

import { DRAWER_WIDTH } from '@/constants'

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(9)} + 1px)`
})

interface DinoSidebarNavDrawerProps {
  isSidebarNavOpen: boolean
  setSidebarNavOpen: Dispatch<SetStateAction<boolean>>
}

const DinoSidebarNavDrawer: FC<DinoSidebarNavDrawerProps> = ({
  isSidebarNavOpen,
  setSidebarNavOpen
}) => {
  const { t } = useTranslation('common')

  return (
    <Drawer
      sx={[
        (theme: Theme) => ({
          ...(isSidebarNavOpen && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme)
          })
        }),
        (theme: Theme) => ({
          ...(!isSidebarNavOpen && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme)
          })
        })
      ]}
      variant="permanent"
      anchor="left"
    >
      <Toolbar className="__d-flex __d-justify-between">
        <Typography>{t('SETTINGS')}</Typography>
        <DinoTooltipIconButton
          title={t('CLOSE')}
          iconButtonProps={{ onClick: () => setSidebarNavOpen(false) }}
        >
          <CloseIcon />
        </DinoTooltipIconButton>
      </Toolbar>
      <Divider />
      <Box className="__d-h-full" sx={{ px: 3 }}>
        <Typography sx={{ mt: 2, mb: 1 }} color="text.secondary">
          {t('THEME_MODE')}
        </Typography>
      </Box>
    </Drawer>
  )
}

export default DinoSidebarNavDrawer
