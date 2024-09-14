import React, { memo } from 'react'
import { View, Platform } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Props } from './props'

export const ChtSafeAreaView = memo(
  ({ style, children, ...restProps }: Props) => {
    const { styles } = useStyles(stylesheet)

    return (
      <View style={[styles.safeArea, style]} {...restProps}>
        {children}
      </View>
    )
  }
)

const stylesheet = createStyleSheet((theme, runtime) => ({
  safeArea: {
    paddingTop:
      Platform.OS === 'android' && runtime.statusBar.height > 0
        ? runtime.statusBar.height + 20
        : 50,
    flex: 1,
    backgroundColor: theme.background.background4,
  },
}))

export type { Props as ChtSafeAreaViewProps }
