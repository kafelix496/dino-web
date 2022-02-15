import type { Dispatch, FC, SetStateAction } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'
import type { Theme } from '@mui/material'

import DinoTooltipIconButton from '@/components/mui/TooltipIconButton/TooltipIconButton'

import type { State } from '@/redux-types'
import { setLocale, setPaletteMode } from '@/redux-action-creators'
import { Locale, PaletteMode } from '@/redux-types/settings'
import { DRAWER_WIDTH } from '@/constants'

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

interface DinoSettingsDrawerProps {
  isSettingsOpen: boolean
  setSettingsOpen: Dispatch<SetStateAction<boolean>>
}

const DinoSettingsDrawer: FC<DinoSettingsDrawerProps> = ({
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
        <DinoTooltipIconButton
          title={t('CLOSE')}
          iconButtonProps={{ onClick: () => setSettingsOpen(false) }}
        >
          <CloseIcon />
        </DinoTooltipIconButton>
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

export default DinoSettingsDrawer
