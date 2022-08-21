import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { FC, ReactNode } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import CloseIcon from '@mui/icons-material/Close'
import type { Theme } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

import TooltipIconButton from '@/components/mui/TooltipIconButton/TooltipIconButton'
import { DRAWER_WIDTH, Locales, PaletteModes } from '@/constants/app'
import {
  setLocale,
  setPaletteMode,
  setSettingNavOpenStatus
} from '@/redux-actions'
import {
  selectLocale,
  selectPaletteMode,
  selectSettingNavOpenStatus
} from '@/redux-selectors'

interface CustomStyledButtonProps {
  children: ReactNode
  selected: boolean
  onClick: () => void
}

const CustomStyledButton: FC<CustomStyledButtonProps> = ({
  selected = false,
  onClick,
  children
}) => (
  <Button
    fullWidth
    variant={selected ? 'contained' : 'outlined'}
    sx={[
      {
        borderColor: (theme: Theme) => `${theme.palette.primary.main}!important`
      }
    ]}
    onClick={onClick}
  >
    {children}
  </Button>
)

const SettingsDrawer: FC = () => {
  const isSettingNavOpen = useSelector(selectSettingNavOpenStatus)
  const paletteMode = useSelector(selectPaletteMode)
  const locale = useSelector(selectLocale)
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation('common')

  return (
    <Drawer
      sx={{
        zIndex: (theme: Theme) => theme.zIndex.drawer + 2,
        '& .MuiDrawer-paper': { width: DRAWER_WIDTH }
      }}
      anchor="right"
      open={isSettingNavOpen}
      onClose={() => {
        dispatch(setSettingNavOpenStatus(false))
      }}
    >
      <Toolbar className="__d-flex __d-justify-between">
        <Typography>{t('SETTINGS')}</Typography>
        <TooltipIconButton
          title={t('CLOSE')}
          iconButtonProps={{
            onClick: () => {
              dispatch(setSettingNavOpenStatus(false))
            }
          }}
        >
          <CloseIcon />
        </TooltipIconButton>
      </Toolbar>
      <Divider />
      <Box className="__d-h-full" sx={{ px: 3 }}>
        <Typography sx={{ mt: 2, mb: 1 }} color="text.secondary">
          {t('THEME_MODE')}
        </Typography>
        <ButtonGroup
          orientation="vertical"
          className="__d-w-full"
          size="large"
          sx={{ borderRadius: 5 }}
        >
          {Object.values(PaletteModes).map((mode) => (
            <CustomStyledButton
              key={mode}
              selected={paletteMode === mode}
              onClick={() => {
                dispatch(setPaletteMode(mode))
              }}
            >
              {t(`THEME_MODE_${mode.toUpperCase()}`)}
            </CustomStyledButton>
          ))}
        </ButtonGroup>

        <Typography sx={{ mt: 2, mb: 1 }} color="text.secondary">
          {t('LANGUAGE')}
        </Typography>
        <ButtonGroup
          orientation="vertical"
          className="__d-w-full"
          size="large"
          sx={{ borderRadius: 5 }}
        >
          {Object.values(Locales).map((_locale) => (
            <CustomStyledButton
              key={_locale}
              selected={locale === _locale}
              onClick={() => {
                dispatch(setLocale(_locale))

                router.push(router.asPath, router.asPath, { locale: _locale })
              }}
            >
              {t(`LOCALE_${_locale.toUpperCase()}`)}
            </CustomStyledButton>
          ))}
        </ButtonGroup>
      </Box>
    </Drawer>
  )
}

export default SettingsDrawer
