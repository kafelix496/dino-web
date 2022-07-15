import type { FC } from 'react'

import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

interface FieldSelectProps {
  required?: boolean
  fullWidth?: boolean
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: { [key: string]: any }
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: { label: string; value: any }[]
}

const FieldSelect: FC<FieldSelectProps> = ({
  required = false,
  fullWidth = true,
  label = '',
  formik,
  name,
  options
}) => {
  return (
    <TextField
      select
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
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default FieldSelect
