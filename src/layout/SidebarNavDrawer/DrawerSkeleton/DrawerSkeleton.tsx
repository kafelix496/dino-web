import type { Theme } from '@mui/material'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

const DrawerSkeleton = () => {
  return (
    <Box sx={{ px: 2, py: 1 }}>
      <Skeleton
        width="100%"
        sx={{ height: (theme: Theme) => theme.spacing(6) }}
      />
    </Box>
  )
}

export default DrawerSkeleton
