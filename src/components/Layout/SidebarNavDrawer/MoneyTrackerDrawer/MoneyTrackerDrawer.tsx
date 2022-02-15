import type { FC } from 'react'

import Typography from '@mui/material/Typography'

interface DinoMoneyTrackerDrawerProps {
  isSidebarNavOpen: boolean
}

const DinoMoneyTrackerDrawer: FC<DinoMoneyTrackerDrawerProps> = () => {
  return (
    <Typography sx={{ mt: 2, mb: 1 }} color="text.secondary">
      money tracker
    </Typography>
  )
}

export default DinoMoneyTrackerDrawer
