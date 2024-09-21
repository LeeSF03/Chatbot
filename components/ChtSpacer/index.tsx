import { View } from 'react-native'
import React, { memo } from 'react'
import { Props } from './props'

export const ChtSpacer = memo(
  ({ style, height = 10, width = '100%', ...restProps }: Props) => {
    return <View style={[{ height, width }, style]} {...restProps} />
  }
)
