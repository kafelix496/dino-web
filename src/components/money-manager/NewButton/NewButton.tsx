import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

import type { FC } from 'react'

interface NewButtonProps {
  innerText: string
}

const NewButton: FC<NewButtonProps> = ({ innerText }) => {
  return (
    <Button variant="contained" startIcon={<AddIcon />}>
      {innerText}
    </Button>
  )
}

export default NewButton
