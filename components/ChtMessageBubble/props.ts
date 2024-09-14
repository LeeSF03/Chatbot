import { TextProps, ViewProps } from 'react-native'

export type Props = {
  message: string
  containerProps?: ViewProps
  messageProps?: TextProps
  type?: 'sent' | 'received'
}
