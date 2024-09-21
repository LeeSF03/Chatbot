import { ReactElement } from 'react'

type Item = {
  key: string
  title: string
  icon?: ReactElement
  onPress: () => void | Promise<void>
}

export type Props = {
  trigger: ReactElement
  items: Item[]
}
