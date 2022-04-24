import type { FC } from 'react'

import Box from '@mui/material/Box'

interface AssetListProps {
  assets: any[]
}

const AssetList: FC<AssetListProps> = ({ assets }) => {
  return (
    <Box>
      {assets.map((asset) => (
        <span key={asset}>{asset}</span>
      ))}
    </Box>
  )
}

export default AssetList
