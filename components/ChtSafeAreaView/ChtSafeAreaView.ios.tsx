import React, { memo } from 'react'
import { SafeAreaView } from 'react-native'
import { createStyleSheet, useStyles } from 'react-native-unistyles'
import { Props } from './props'

export const ChtSafeAreaView = memo(
  ({ style, children, ...restProps }: Props) => {
    const { styles } = useStyles(stylesheet)

    return (
      <SafeAreaView style={[styles.safeArea, style]} {...restProps}>
        {children}
      </SafeAreaView>
    )
  }
)

const stylesheet = createStyleSheet((theme) => ({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.primary,
  },
}))

export type { Props as ChtSafeAreaViewProps }
