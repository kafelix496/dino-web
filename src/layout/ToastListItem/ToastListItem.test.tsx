import { AlertColor } from '@/constants/app'
import * as reduxActions from '@/redux-actions'
import { render, screen } from '@/utils/test-utils'

import ToastListItem from './ToastListItem'

jest.mock('@/redux-actions', () => {
  const originalModule = jest.requireActual('@/redux-actions')

  return {
    __esModule: true,
    ...originalModule
  }
})
jest.useFakeTimers()

describe('#ToastListItem', () => {
  it('should render display alert and call deleteAlert in 3000 seconds', () => {
    const fakeId = 'FAKE_ID'
    const severity = AlertColor.ERROR
    const fakeMessage = 'FAKE_MESSAGE'

    jest.spyOn(reduxActions, 'deleteAlert')

    render(
      <ToastListItem id={fakeId} severity={severity} message={fakeMessage} />
    )

    const message = screen.getByText(fakeMessage)
    expect(message).toBeInTheDocument()

    expect(reduxActions.deleteAlert).not.toHaveBeenCalled()
    jest.advanceTimersByTime(3000)
    expect(reduxActions.deleteAlert).toHaveBeenCalledWith(fakeId)
  })
})
