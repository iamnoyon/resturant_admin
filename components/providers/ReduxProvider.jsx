"use client"
import { Provider } from 'react-redux'
import { store } from '@/store/index'

const ReduxProvider = ({
    children
}) => {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default ReduxProvider