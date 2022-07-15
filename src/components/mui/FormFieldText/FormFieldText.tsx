import type { FC } from 'react'

import TextField from '@mui/material/TextField'

interface FieldTextProps {
  autoFocus?: boolean
  required?: boolean
  fullWidth?: boolean
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: { [key: string]: any }
  name: string
}

const FieldText: FC<FieldTextProps> = ({
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
      onBlur={formik.handleBlur}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
    />
  )
}

export default FieldText
