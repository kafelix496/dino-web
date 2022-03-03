import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import type { Dispatch, FC, SetStateAction } from 'react'
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
import { DRAWER_WIDTH } from '@/constants'
import { setLocale, setPaletteMode } from '@/redux-action-creators'
import type { State } from '@/redux-types'
import { Locale, PaletteMode } from '@/redux-types/settings'

interface CustomStyledButtonProps {
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

interface SettingsDrawerProps {
  isSettingsOpen: boolean
  setSettingsOpen: Dispatch<SetStateAction<boolean>>
}

const SettingsDrawer: FC<SettingsDrawerProps> = ({
  isSettingsOpen,
  setSettingsOpen
}) => {
  const { paletteMode, locale } = useSelector((state: State) => ({
    paletteMode: state.settings.paletteMode,
    locale: state.settings.locale
  }))
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
      open={isSettingsOpen}
      onClose={() => {
        setSettingsOpen(false)
      }}
    >
      <Toolbar className="__d-flex __d-justify-between">
        <Typography>{t('SETTINGS')}</Typography>
        <TooltipIconButton
          title={t('CLOSE')}
          iconButtonProps={{ onClick: () => setSettingsOpen(false) }}
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
          {Object.values(PaletteMode).map((mode) => (
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
          {Object.values(Locale).map((_locale) => (
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
