import { View, Text } from 'react-native'
import React from 'react'
import { useStyles, createStyleSheet } from 'react-native-unistyles'
import { Props } from './props'
import { Circle, Svg } from 'react-native-svg'

export const ChtMessageBubble = ({
  message,
  containerProps,
  messageProps,
  type = 'sent',
}: Props) => {
  //========== HOOKS ==========
  const { styles } = useStyles(styleSheets, {
    type,
  })

  //========== VARIABLES ==========
  const { style: viewStyle = {}, ...viewProps } = containerProps || {}
  const { style: textStyle = {}, ...textProps } = messageProps || {}

  return (
    <View style={[styles.chatContainer, viewStyle]} {...viewProps}>
      <Text style={[styles.chatMessage, textStyle]} {...textProps}>
        {message}
      </Text>
    </View>
  )
}

const styleSheets = createStyleSheet((theme) => ({
  chatContainer: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    padding: theme.paddings.md,
    flexShrink: 1,
    flexGrow: 1,
  },
  chatMessage: {
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
