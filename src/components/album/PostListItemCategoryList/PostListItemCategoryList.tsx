import { compose, map } from 'ramda'
import type { FC } from 'react'

import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'

import { usePostPageQueryParams } from '@/hooks/usePostPageQueryParams'
import type { Category } from '@/types/album'
import { sortCategoriesAlphabetically } from '@/utils/album'

interface PostListItemCategoryListProps {
  categories: Category[]
}

export const PostListItemCategoryList: FC<PostListItemCategoryListProps> = ({
  categories
}) => {
  const { patch } = usePostPageQueryParams()

  const handleClick = (category: Category) => {
    patch({ qpPage: 1, qpCategoryId: category._id })
  }

  return (
    <Stack direction="row" spacing={1}>
      {compose(
        map((category) => (
          <Chip
            key={category._id}
            label={category.name}
            size="small"
            onClick={() => {
              handleClick(category)
            }}
          />
        )),
        sortCategoriesAlphabetically
      )(categories)}
    </Stack>
  )
}
