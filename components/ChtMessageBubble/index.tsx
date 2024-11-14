import { View, Text } from 'react-native'
import React, { memo } from 'react'
import { useStyles, createStyleSheet } from 'react-native-unistyles'
import { Props } from './props'

export { Props as ChtMessageBubbleProps }

export const ChtMessageBubble = memo(
  ({ message, containerProps, messageProps, type = 'sent' }: Props) => {
    //= ========= HOOKS ==========
    const { styles } = useStyles(styleSheets, {
      type,
    })

    //= ========= VARIABLES ==========
    const { style: viewStyle = {}, ...viewProps } = containerProps || {}
    const { style: textStyle = {}, ...textProps } = messageProps || {}

    return (
      <View style={[styles.container, viewStyle]} {...viewProps}>
        <Text style={[styles.message, textStyle]} {...textProps}>
          {message}
        </Text>
      </View>
    )
  }
)

const styleSheets = createStyleSheet((theme) => ({
  container: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    padding: theme.paddings.md,
    flexShrink: 1,
    flexGrow: 1,
  },
  message: {
    color: 'white',
    fontFamily: 'JetBrains',
    fontSize: 14,
    variants: {
      type: {
        sent: {
          textAlign: 'right',
        },
        received: {
          textAlign: 'left',
        },
      },
    },
  },
}))
