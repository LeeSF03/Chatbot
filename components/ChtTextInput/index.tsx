import { TextInput } from 'react-native'
import React, { memo, forwardRef } from 'react'
import { useStyles, createStyleSheet } from 'react-native-unistyles'
import { Props } from './props'

export const ChtTextInput = memo(
  forwardRef<TextInput, Props>(({ style, ...restProps }: Props, ref) => {
    //========== HOOK ==========
    const { styles } = useStyles(styleSheets)

    return (
      <TextInput
        ref={ref}
        style={[styles.input, style]}
        placeholder="Send..."
        {...restProps}
      />
    )
  })
)

const styleSheets = createStyleSheet((theme) => ({
  input: {
    backgroundColor: theme.colors.lightPrimary,
    color: theme.foreground.foreground0,
    borderRadius: 10,
    padding: theme.paddings.sm,
    width: 300,
  },
}))
