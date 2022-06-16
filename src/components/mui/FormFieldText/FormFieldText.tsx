import type { FC } from 'react'
import { useEffect, useRef } from 'react'

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
  const inputRef = useRef<HTMLElement>()

  // I don't know why 'autoFocus' props doesn't work.
  // This is alternative way to fix it.
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus, inputRef])

  return (
    <TextField
      inputRef={inputRef}
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

export default FieldText
