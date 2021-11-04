import { useState } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, removeTodo } from '@/redux-action-creators'

import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Divider from '@mui/material/Divider'
import InputBase from '@mui/material/InputBase'
import DeleteIcon from '@mui/icons-material/Delete'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

import type { GetStaticProps, NextPage } from 'next'
import type { State } from '@/redux-types'
import type { State as TodoState } from '@/redux-types/todo'

const Todo: NextPage = () => {
  const { t } = useTranslation('todo')
  const { todos } = useSelector<State, TodoState>((state) => state.todo)
  const dispatch = useDispatch()

  const [todoTitle, setTodoTitle] = useState('')

  const clickAddTodo = (): void => {
    dispatch(addTodo(todoTitle))

    setTodoTitle('')
  }

  const clickDeleteTodo = (_id: string): void => {
    dispatch(removeTodo(_id))
  }

  return (
    <Container>
      <Paper
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder={t('ADD_TODO_PLACEHOLDER')}
          value={todoTitle}
          onChange={(event) => {
            setTodoTitle(event.target.value)
          }}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <Button onClick={clickAddTodo}>{t('ADD_TODO')}</Button>
      </Paper>

      {todos.length > 0 ? (
        <Paper sx={{ mt: 2 }}>
          <List>
            {todos.map((todo, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => {
                      clickDeleteTodo(todo._id)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText primary={todo.title} />
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        ''
      )}
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'default', ['common', 'todo']))
    }
  }
}

export default Todo
