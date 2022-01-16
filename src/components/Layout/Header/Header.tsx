import type { FC } from 'react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'

import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import MenuIcon from '@mui/icons-material/Menu'

import DinoTooltipIconButton from '@/components/mui/TooltipIconButton/TooltipIconButton'
import DinoAuthStatusButton from './AuthStatusButton/AuthStatusButton'
import DinoPaletteModeButton from './PaletteModeButton/PaletteModeButton'

import useDinoHeaderButtonColor from './useHeaderButtonColor'

interface DinoHeaderProps {
  withSidebarMenu?: boolean
}

const DinoHeader: FC<DinoHeaderProps> = ({ withSidebarMenu }) => {
  const { t } = useTranslation('common')
  const headerButtonColor = useDinoHeaderButtonColor()

  return (
    <AppBar
      color="inherit"
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {withSidebarMenu ? (
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
            <DinoPaletteModeButton />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default DinoHeader
