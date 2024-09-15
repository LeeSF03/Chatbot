import { TextInput } from 'react-native'
import React from 'react'
import { useStyles, createStyleSheet } from 'react-native-unistyles'
import { Props } from './props'

export function ChtTextInput({ style, ...restProps }: Props) {
  //========== HOOK ==========
  const { styles } = useStyles(styleSheets)

  return (
    <TextInput
      style={[styles.input, style]}
      placeholder="Send..."
      {...restProps}
    />
  )
}

const styleSheets = createStyleSheet((theme) => ({
  input: {
    backgroundColor: theme.colors.lightPrimary,
    color: theme.foreground.foreground0,
    borderRadius: 10,
    borderWidth: 1,
    padding: theme.paddings.sm,
    width: 300,
  },
}))
