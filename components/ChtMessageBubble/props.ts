import { ReactNode } from 'react'
import { TextProps, ViewProps } from 'react-native'

export type Props = {
  message: ReactNode
  containerProps?: ViewProps
  messageProps?: TextProps
  type?: 'sent' | 'received'
}
