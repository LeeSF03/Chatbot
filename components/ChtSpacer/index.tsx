import { View } from 'react-native'
import React from 'react'
import { Props } from './props'

export function ChtSpacer({
  style,
  height = 10,
  width = '100%',
  ...restProps
}: Props) {
  return <View style={[{ height, width }, style]} {...restProps} />
}
