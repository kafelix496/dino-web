import type { FC } from 'react'

import TextField from '@mui/material/TextField'

interface DinoFieldTextProps {
  autoFocus?: boolean
  required?: boolean
  fullWidth?: boolean
  label?: string
  formik: { [key: string]: any }
  name: string
}

const DinoFieldText: FC<DinoFieldTextProps> = ({
  autoFocus = false,
  required = false,
  fullWidth = true,
  label = '',
  formik,
  name
}) => {
  return (
    <TextField
      autoFocus={autoFocus}
      required={required}
      fullWidth={fullWidth}
      name={name}
      label={label}
      margin="dense"
      value={formik.values[name]}
      onChange={formik.handleChange}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  )
}

export default DinoFieldText
