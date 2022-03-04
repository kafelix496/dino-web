import type { FC } from 'react'

import Typography from '@mui/material/Typography'

interface MoneyTrackerDrawerProps {
  isSidebarNavOpen: boolean
}

const MoneyTrackerDrawer: FC<MoneyTrackerDrawerProps> = () => {
  return (
    <Typography sx={{ mt: 2, mb: 1 }} color="text.secondary">
      money tracker
    </Typography>
  )
}

export default MoneyTrackerDrawer
