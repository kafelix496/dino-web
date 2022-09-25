import type { FormikProps } from 'formik'
import { useState } from 'react'
import type { FC } from 'react'

import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'

interface FieldMultiSelectProps {
  fullWidth?: boolean
  label?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: { label: string; value: any }[]
}

export const FieldMultiSelect: FC<FieldMultiSelectProps> = ({
  fullWidth = true,
  label = '',
  formik,
  name,
  options
}) => {
  const [selected, setSelected] = useState<FieldMultiSelectProps['options']>(
    options.filter((option) => formik.values[name].includes(option.value))
  )

  return (
    <Autocomplete
      multiple
      disableCloseOnSelect
      fullWidth={fullWidth}
      options={options}
      getOptionLabel={(option) => option.label}
      onChange={(_, values) => {
        setSelected(values)

        formik.setFieldValue(
          name,
          values.map(({ value }) => value)
        )
      }}
      onBlur={formik.handleBlur}
      isOptionEqualToValue={(option, value) => option.value === value.value}
      value={selected}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox checked={selected} />
          {option.label}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label={label} name={name} margin="dense" />
      )}
    />
  )
}
